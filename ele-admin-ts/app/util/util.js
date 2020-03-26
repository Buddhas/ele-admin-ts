"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:工具类
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-13 16:39:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-29 20:49:56
 */
const fs = require("fs");
const path = require("path");
const sendToWormhole = require("stream-wormhole");
const await_stream_ready_1 = require("await-stream-ready");
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
 * @param {stream} 文件流
 * @param {target} 图片地址
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixrREFBa0Q7QUFDbEQsMkRBQStEO0FBQy9EOzs7OztHQUtHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLE9BQWM7SUFDdEMsSUFBSTtRQUNGLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtLQUNGO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLFNBQVMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFiRCw4QkFhQztBQUNEOzs7Ozs7R0FNRztBQUNJLEtBQUssVUFBVSxPQUFPLENBQUMsTUFBVSxFQUFFLE1BQWE7SUFDckQsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELElBQUk7UUFDRixXQUFXO1FBQ1gsTUFBTSwwQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDbEQ7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLGFBQWE7UUFDYixNQUFNLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixNQUFNLFFBQVEsQ0FBQztLQUNoQjtBQUNILENBQUM7QUFWRCwwQkFVQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSztJQUNqQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFBO0FBQzVELENBQUM7QUFGRCx3QkFFQyJ9