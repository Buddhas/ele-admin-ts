const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken') 

module.exports = (options, app) => {
  return async function userInterceptor(ctx, next) {
    let authToken = ctx.cookies.get('authorization') // 获取header里的authorization
    if (authToken) {
      const res = verifyToken(authToken) // 解密获取的Token
      if (res) {
        // 此处使用redis进行保存
        const redis_token = await app.redis.get(res.mobile) // 获取保存的token
        if (authToken === redis_token) {
          app.redis.expire(res.mobile, 7200) // 重置redis过期时间
          await next()
        } else {
          ctx.body = { status: 10001, message: '您的账号已在其他地方登录' }
        }
      } else {
        ctx.body = { status: 10002, message: '登录状态已过期' }
      }
    } else {
      ctx.body = { status: 10003, message: '请登陆后再进行操作' }
    }
  }
}

// 解密，验证
function verifyToken(token) {
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