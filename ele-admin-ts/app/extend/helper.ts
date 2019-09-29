/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-05 20:17:58
 */
/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-13 16:39:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-29 20:50:54
 */
import * as fs from "fs";
import * as path from "path";
import * as sendToWormhole from "stream-wormhole";
import { write as awaitWriteStream } from "await-stream-ready";
import * as jwt from "jsonwebtoken"
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
  const exp = Math.floor(Date.now() / 1000) + expires
  const cert = fs.readFileSync(path.join(__dirname, '../public/tokenKey/rsa_private_key.pem')) // 私钥，看后面生成方法
  const token = jwt.sign({ data, exp }, cert, { algorithm: 'RS256' })
  return token
}


/**
 * @Descripttion: 生成范围内随机数，[lower, upper)
 * @Author: 笑佛弥勒
 * @param {lower} 最小值
 * @param {upper} 最大值
 * @return:
 */
export function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower
}