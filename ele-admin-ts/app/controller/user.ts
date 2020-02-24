/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2020-02-18 17:21:14
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-25 00:20:01
 */

import { BaseController } from "../core/baseController"

export default class User extends BaseController {

  /**
   * @Descripttion: 发送邮件
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async sendEmail() {
    let { email } = this.ctx.request.body
    let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
    if (!reg.test(email)) {
      this.fail(500, '邮箱格式错误')
      return
    }
    try {
      // let data = await this.ctx.helper.sendEmail(email, this.app) // 发送邮箱
      
      const codeExit = await this.app.redis.get(`code_${email}`)
      if (codeExit) {
        this.success(200, '不可重复发送')
        return
      }
      const code = this.ctx.helper.random(10000,99999)
      await this.app.redis.set(`code_${email}`, code, 'ex', 3600)
      this.success(200, '发送成功', code)
    } catch (error) {
      this.fail(500, '发送失败')
    }
  }

  /**
   * @Descripttion: 注册或登录页面
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async login() {
    let { email, code } = this.ctx.request.body
    let token:string = ''
    if (await this.app.redis.get(`code_${email}`) != code) {
      this.fail(500,'验证码错误')
    } else {
      let userDetail:any = await this.ctx.service.user.getUserByEmail(email)
      // 如果用户存在了
      if (userDetail) {
        await this.ctx.helper.loginToken({ user_id: userDetail['user_id'], email: userDetail['email'] }).then((res) => token = res) // 取到生成token
        await this.app.redis.set(email, token, 'ex', 7200) // 保存到redis
        this.ctx.cookies.set('authorization', token, {
          httpOnly: true, // 默认就是 true
          maxAge: 7200,
          domain: 'localhost'
        }) // 保存到cookie
        this.success(200, '登录成功')
      } else {
        await this.ctx.service.user.createdUser({
          email: email,
          user_name: email
        })
        let userDetail:any = await this.ctx.service.user.getUserByEmail(email)
        await this.ctx.helper.loginToken({ user_id: userDetail['user_id'], email: userDetail['email'] }).then((res) => token = res) // 取到生成token
        await this.app.redis.set(email, token, 'ex', 7200) // 保存到redis
        this.ctx.cookies.set('authorization', token, {
          httpOnly: true, // 默认就是 true
          maxAge: 7200,
          domain: 'localhost'
        }) // 保存到cookie
        this.success(200, '注册成功')
      }
    }
  }
}