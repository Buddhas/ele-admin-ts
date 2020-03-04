/*
 * @Descripttion:工具类
 * @version:1.0
 * @Author: 笑佛弥勒
 * @Date: 2019-08-13 16:39:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-04 22:54:17
 */
import * as fs from "fs";
import * as path from "path";
import * as sendToWormhole from "stream-wormhole";
import { write as awaitWriteStream } from "await-stream-ready";
import * as jwt from "jsonwebtoken";
import * as request from "request";
import * as pinyin from "pinyin";
import * as nodemailer from "nodemailer";
/**
 * @Descripttion: 同步创建文件夹
 * @Author: 笑佛弥勒
 * @param {dirname} 文件夹名称
 * @return:
 */
export function mkdirSync(dirname) {
  try {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  } catch (error) {
    throw "创建文件夹失败";
  }
}

/**
 * @Descripttion: 保存图片
 * @Author: 笑佛弥勒
 * @param {stream} 文件流 {target} 地址
 * @return:
 */
export async function saveImg(stream, target) {
  const writeStream = fs.createWriteStream(target);
  try {
    //异步把文件流 写入
    await awaitWriteStream(stream.pipe(writeStream));
  } catch (err) {
    //如果出现错误，关闭管道
    await sendToWormhole(stream);
    throw "图片保存失败";
  }
}

/**
 * @Descripttion: 生成token
 * @Author: 笑佛弥勒
 * @param {type}
 * @return:
 */
export async function loginToken(data, expires = 7200) {
  const exp = Math.floor(Date.now() / 1000) + expires;
  const cert = fs.readFileSync(
    path.join(__dirname, "../public/tokenKey/rsa_private_key.pem")
  ); // 私钥，看后面生成方法
  const token = jwt.sign({ data, exp }, cert, { algorithm: "RS256" });
  return token;
}

/**
 * @Descripttion: 生成范围内随机数，[lower, upper)
 * @Author: 笑佛弥勒
 * @param {lower} 最小值
 * @param {upper} 最大值
 * @return:
 */
export function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower;
}

/**
 * @Descripttion: 解码token
 * @Author: 笑佛弥勒
 * @param {token} token值
 * @return:
 */
export function verifyToken(token) {
  const cert = fs.readFileSync(
    path.join(__dirname, "../public/tokenKey/rsa_public_key.pem")
  ); // 公钥，看后面生成方法
  let res = "";
  try {
    const result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
    const { exp } = result,
      current = Math.floor(Date.now() / 1000);
    if (current <= exp) {
      res = result.data || {};
    }
  } catch (e) {
    console.log(e);
  }
  return res;
}

/**
 * @Descripttion: 获取全国所有城市
 * @Author: 笑佛弥勒
 * @param {type}
 * @return:
 */
export async function getAllCity() {
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
    request(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        body = JSON.parse(body);
        if (body.status == 0) {
          reject(err);
        } else {
          let cityList: Array<Object> = [];
          getAllCityList(cityList, body.districts);
          cityList = orderByPinYin(cityList);
          resolve(cityList);
        }
      }
    });
  });
}
// 给全国城市根据拼音分组
function orderByPinYin(cityList) {
  const newCityList: Array<Object> = [];
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
    let items: Array<Object> = [];
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
function getAllCityList(cityList: Array<Object>, parent: any) {
  let exception: Array<string> = ["010", "021", "022", "023"]; // 四个直辖市另外处理
  for (let i = 0; i < parent.length; i++) {
    if (parent[i].level === "province") {
      if (exception.includes(parent[i].citycode)) {
        parent[i].districts = [];
        parent[i].level = "city";
        cityList.push(parent[i]);
      } else {
        cityList.push(...parent[i].districts);
      }
    } else {
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
export async function sendEmail(receiver:string,app) {
  const codeExit = await app.redis.get(`code_${receiver}`)
  if (codeExit) {
    return { hasExit:true }
  }
  const user = "2424932515@qq.com"
  const code = random(10000,99999)
  // 封装发送者信息
  const transporter = nodemailer.createTransport({
    service: "qq", // 调用qq服务器
    secureConnection: true, // 启动SSL
    port: 465, // 端口就是465
    auth: {
      user: user, // 账号
      pass: "hwacaansliwadhja" // 授权码,
    }
  })
  const mailOptions = {
    from: user, // 发送者,与上面的user一致
    to: receiver, // 接收者,可以同时发送多个,以逗号隔开
    subject: '登陆验证码', // 标题
    // text: '测试内容', // 文本
    html: `<h2>登陆验证码:</h2><div>${code}</div>`,
  }
  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, async function(err, info) {
      if (err) {
        reject(err)
      } else {
        await app.redis.set(`code_${receiver}`, code, 'ex', 3600)  //半小时过期
        resolve(info)
      }
    })
  })
}

/**
 * @Descripttion: 获取用户信息
 * @Author: 笑佛弥勒
 * @param {type} 
 * @return: 
 */
export async function getUserMsg(ctx) {
  const authorization = ctx.cookies.get('authorization')
  const userMsg = ctx.helper.verifyToken(authorization)
  const userDetail = await ctx.service.user.getUserByEmail(userMsg.email)
  return userDetail
}
