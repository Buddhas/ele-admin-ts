/*
 * @Descripttion:工具类
 * @version:1.0
 * @Author: 笑佛弥勒
 * @Date: 2019-08-13 16:39:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-10-08 20:12:00
 */
import * as fs from "fs";
import * as path from "path";
import * as sendToWormhole from "stream-wormhole";
import { write as awaitWriteStream } from "await-stream-ready";
import * as jwt from "jsonwebtoken"
import * as request from 'request'
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

/**
 * @Descripttion: 解码token
 * @Author: 笑佛弥勒
 * @param {token} token值
 * @return:
 */
export function verifyToken(token) {
  const cert = fs.readFileSync(path.join(__dirname, '../public/tokenKey/rsa_public_key.pem')) // 公钥，看后面生成方法
  let res = ''
  try {
    const result = jwt.verify(token, cert, { algorithms: [ 'RS256' ] }) || {}
    const { exp } = result,
      current = Math.floor(Date.now() / 1000)
    if (current <= exp) {
      res = result.data || {}
    }
  } catch (e) {
    console.log(e)
  }
  return res
}

/**
 * @Descripttion: 获取全国所有城市
 * @Author: 笑佛弥勒
 * @param {type} 
 * @return: 
 */
export async function getAllCity() {
  let url = `https://restapi.amap.com/v3/config/district?keywords=&subdistrict=1&key=44b1b802a3d72663f2cb9c3288e5311e`
  var options = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'  // 需指定这个参数 否则 在特定的环境下 会引起406错误
    }
  }
  return request(options, await function(err, res, body) {
    if (err) {
      return err
    } else {
      let cityList = []
      return body
    }
  })
}

// 递归获取全部城市列表
function getAllCityList(cityList:Array<Object>, parent:any) {
  let exception:Array<string> = ['010', '021', '022', '023'] // 四个直辖市另外处理
  for(let i = 0; i < parent.length; i++) {
    if (parent[i].level === 'province') {
      if (exception.includes(parent[i].citycode)) {
        parent[i].districts = []
        parent[i].level = 'city'
        cityList.push(parent[i])
      } else {
        cityList.push(...parent[i].districts)
      }
    } else {
      getAllCityList(cityList, parent.districts)
    }
  }
}