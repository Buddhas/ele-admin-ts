"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:工具类
 * @version:1.0
 * @Author: 笑佛弥勒
 * @Date: 2019-08-13 16:39:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-04 22:54:17
 */
const fs = require("fs");
const path = require("path");
const sendToWormhole = require("stream-wormhole");
const await_stream_ready_1 = require("await-stream-ready");
const jwt = require("jsonwebtoken");
const request = require("request");
const pinyin = require("pinyin");
const nodemailer = require("nodemailer");
/**
 * @Descripttion: 同步创建文件夹
 * @Author: 笑佛弥勒
 * @param {dirname} 文件夹名称
 * @return:
 */
function mkdirSync(dirname) {
    try {
        if (fs.existsSync(dirname)) {
            return true;
        }
        else {
            if (mkdirSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }
    catch (error) {
        throw "创建文件夹失败";
    }
}
exports.mkdirSync = mkdirSync;
/**
 * @Descripttion: 保存图片
 * @Author: 笑佛弥勒
 * @param {stream} 文件流 {target} 地址
 * @return:
 */
async function saveImg(stream, target) {
    const writeStream = fs.createWriteStream(target);
    try {
        //异步把文件流 写入
        await await_stream_ready_1.write(stream.pipe(writeStream));
    }
    catch (err) {
        //如果出现错误，关闭管道
        await sendToWormhole(stream);
        throw "图片保存失败";
    }
}
exports.saveImg = saveImg;
/**
 * @Descripttion: 生成token
 * @Author: 笑佛弥勒
 * @param {type}
 * @return:
 */
async function loginToken(data, expires = 7200) {
    const exp = Math.floor(Date.now() / 1000) + expires;
    const cert = fs.readFileSync(path.join(__dirname, "../public/tokenKey/rsa_private_key.pem")); // 私钥，看后面生成方法
    const token = jwt.sign({ data, exp }, cert, { algorithm: "RS256" });
    return token;
}
exports.loginToken = loginToken;
/**
 * @Descripttion: 生成范围内随机数，[lower, upper)
 * @Author: 笑佛弥勒
 * @param {lower} 最小值
 * @param {upper} 最大值
 * @return:
 */
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}
exports.random = random;
/**
 * @Descripttion: 解码token
 * @Author: 笑佛弥勒
 * @param {token} token值
 * @return:
 */
function verifyToken(token) {
    const cert = fs.readFileSync(path.join(__dirname, "../public/tokenKey/rsa_public_key.pem")); // 公钥，看后面生成方法
    let res = "";
    try {
        const result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
        const { exp } = result, current = Math.floor(Date.now() / 1000);
        if (current <= exp) {
            res = result.data || {};
        }
    }
    catch (e) {
        console.log(e);
    }
    return res;
}
exports.verifyToken = verifyToken;
/**
 * @Descripttion: 获取全国所有城市
 * @Author: 笑佛弥勒
 * @param {type}
 * @return:
 */
async function getAllCity() {
    let url = `https://restapi.amap.com/v3/config/district?keywords=&subdistrict=2&key=44b1b802a3d72663f2cb9c3288e5311e`;
    var options = {
        method: "get",
        url: url,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json" // 需指定这个参数 否则 在特定的环境下 会引起406错误
        }
    };
    return await new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (err) {
                reject(err);
            }
            else {
                body = JSON.parse(body);
                if (body.status == 0) {
                    reject(err);
                }
                else {
                    let cityList = [];
                    getAllCityList(cityList, body.districts);
                    cityList = orderByPinYin(cityList);
                    resolve(cityList);
                }
            }
        });
    });
}
exports.getAllCity = getAllCity;
// 给全国城市根据拼音分组
function orderByPinYin(cityList) {
    const newCityList = [];
    const title = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ];
    for (let i = 0; i < title.length; i++) {
        let items = [];
        newCityList.push({
            name: title[i],
            items: []
        });
        for (let j = 0; j < cityList.length; j++) {
            let indexLetter = pinyin(cityList[j].name.substring(0, 1), {
                style: pinyin.STYLE_FIRST_LETTER // 设置拼音风格
            })[0][0].toUpperCase(); // 提取首字母
            if (indexLetter === title[i]) {
                items.push(cityList[j]);
            }
        }
        newCityList[i]["items"] = items;
    }
    return newCityList;
}
// 递归获取全部城市列表
function getAllCityList(cityList, parent) {
    let exception = ["010", "021", "022", "023"]; // 四个直辖市另外处理
    for (let i = 0; i < parent.length; i++) {
        if (parent[i].level === "province") {
            if (exception.includes(parent[i].citycode)) {
                parent[i].districts = [];
                parent[i].level = "city";
                cityList.push(parent[i]);
            }
            else {
                cityList.push(...parent[i].districts);
            }
        }
        else {
            getAllCityList(cityList, parent[i].districts);
        }
    }
}
/**
 * @Descripttion: 发送邮件
 * @Author: 笑佛弥勒
 * @param {type}
 * @return:
 */
async function sendEmail(receiver, app) {
    const codeExit = await app.redis.get(`code_${receiver}`);
    if (codeExit) {
        return { hasExit: true };
    }
    const user = "2424932515@qq.com";
    const code = random(10000, 99999);
    // 封装发送者信息
    const transporter = nodemailer.createTransport({
        service: "qq",
        secureConnection: true,
        port: 465,
        auth: {
            user: user,
            pass: "hwacaansliwadhja" // 授权码,
        }
    });
    const mailOptions = {
        from: user,
        to: receiver,
        subject: '登陆验证码',
        // text: '测试内容', // 文本
        html: `<h2>登陆验证码:</h2><div>${code}</div>`,
    };
    return await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, async function (err, info) {
            if (err) {
                reject(err);
            }
            else {
                await app.redis.set(`code_${receiver}`, code, 'ex', 3600); //半小时过期
                resolve(info);
            }
        });
    });
}
exports.sendEmail = sendEmail;
/**
 * @Descripttion: 获取用户信息
 * @Author: 笑佛弥勒
 * @param {type}
 * @return:
 */
async function getUserMsg(ctx) {
    const authorization = ctx.cookies.get('authorization');
    const userMsg = ctx.helper.verifyToken(authorization);
    const userDetail = await ctx.service.user.getUserByEmail(userMsg.email);
    return userDetail;
}
exports.getUserMsg = getUserMsg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0Isa0RBQWtEO0FBQ2xELDJEQUErRDtBQUMvRCxvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQyx5Q0FBeUM7QUFDekM7Ozs7O0dBS0c7QUFDSCxTQUFnQixTQUFTLENBQUMsT0FBTztJQUMvQixJQUFJO1FBQ0YsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtnQkFDcEMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO0tBQ0Y7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE1BQU0sU0FBUyxDQUFDO0tBQ2pCO0FBQ0gsQ0FBQztBQWJELDhCQWFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxLQUFLLFVBQVUsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNO0lBQzFDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxJQUFJO1FBQ0YsV0FBVztRQUNYLE1BQU0sMEJBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixhQUFhO1FBQ2IsTUFBTSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsTUFBTSxRQUFRLENBQUM7S0FDaEI7QUFDSCxDQUFDO0FBVkQsMEJBVUM7QUFFRDs7Ozs7R0FLRztBQUNJLEtBQUssVUFBVSxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sR0FBRyxJQUFJO0lBQ25ELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNwRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx3Q0FBd0MsQ0FBQyxDQUMvRCxDQUFDLENBQUMsYUFBYTtJQUNoQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQVBELGdDQU9DO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLO0lBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDN0QsQ0FBQztBQUZELHdCQUVDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixXQUFXLENBQUMsS0FBSztJQUMvQixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx1Q0FBdUMsQ0FBQyxDQUM5RCxDQUFDLENBQUMsYUFBYTtJQUNoQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4RSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxFQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFO1lBQ2xCLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUN6QjtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBaEJELGtDQWdCQztBQUVEOzs7OztHQUtHO0FBQ0ksS0FBSyxVQUFVLFVBQVU7SUFDOUIsSUFBSSxHQUFHLEdBQUcsMEdBQTBHLENBQUM7SUFDckgsSUFBSSxPQUFPLEdBQUc7UUFDWixNQUFNLEVBQUUsS0FBSztRQUNiLEdBQUcsRUFBRSxHQUFHO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsOEJBQThCO1NBQzFEO0tBQ0YsQ0FBQztJQUNGLE9BQU8sTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMzQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQ3RDLElBQUksR0FBRyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNiO2lCQUFNO2dCQUNMLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsSUFBSSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztvQkFDakMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3pDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBM0JELGdDQTJCQztBQUNELGNBQWM7QUFDZCxTQUFTLGFBQWEsQ0FBQyxRQUFRO0lBQzdCLE1BQU0sV0FBVyxHQUFrQixFQUFFLENBQUM7SUFDdEMsTUFBTSxLQUFLLEdBQUc7UUFDWixHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztRQUNILEdBQUc7UUFDSCxHQUFHO1FBQ0gsR0FBRztLQUNKLENBQUM7SUFDRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxJQUFJLEtBQUssR0FBa0IsRUFBRSxDQUFDO1FBQzlCLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDekQsS0FBSyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO2FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFFBQVE7WUFDaEMsSUFBSSxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0Y7UUFDRCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUNELGFBQWE7QUFDYixTQUFTLGNBQWMsQ0FBQyxRQUF1QixFQUFFLE1BQVc7SUFDMUQsSUFBSSxTQUFTLEdBQWtCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZO0lBQ3pFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbEMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdkM7U0FDRjthQUFNO1lBQ0wsY0FBYyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0M7S0FDRjtBQUNILENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLEtBQUssVUFBVSxTQUFTLENBQUMsUUFBZSxFQUFDLEdBQUc7SUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDeEQsSUFBSSxRQUFRLEVBQUU7UUFDWixPQUFPLEVBQUUsT0FBTyxFQUFDLElBQUksRUFBRSxDQUFBO0tBQ3hCO0lBQ0QsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQUE7SUFDaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUNoQyxVQUFVO0lBQ1YsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUM3QyxPQUFPLEVBQUUsSUFBSTtRQUNiLGdCQUFnQixFQUFFLElBQUk7UUFDdEIsSUFBSSxFQUFFLEdBQUc7UUFDVCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxPQUFPO1NBQ2pDO0tBQ0YsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxXQUFXLEdBQUc7UUFDbEIsSUFBSSxFQUFFLElBQUk7UUFDVixFQUFFLEVBQUUsUUFBUTtRQUNaLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLHNCQUFzQjtRQUN0QixJQUFJLEVBQUUsdUJBQXVCLElBQUksUUFBUTtLQUMxQyxDQUFBO0lBQ0QsT0FBTyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzNDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVSxHQUFHLEVBQUUsSUFBSTtZQUN4RCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDWjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFFLE9BQU87Z0JBQ2xFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFsQ0QsOEJBa0NDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxLQUFLLFVBQVUsVUFBVSxDQUFDLEdBQUc7SUFDbEMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDdEQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDckQsTUFBTSxVQUFVLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3ZFLE9BQU8sVUFBVSxDQUFBO0FBQ25CLENBQUM7QUFMRCxnQ0FLQyJ9