/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2020-02-18 17:21:14
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-04-06 10:58:06
 */

import { BaseController } from "../core/baseController"
import { Status } from "../util/enum"
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
      this.fail(Status.InvalidParams, '邮箱格式错误')
      return
    }
    try {
      // let data = await this.ctx.helper.sendEmail(email, this.app) // 发送邮箱
      const codeExit = await this.app.redis.get(`code_${email}`)
      if (codeExit) {
        this.success(Status.InvalidRequest, '不可重复发送')
        return
      }
      const code = this.ctx.helper.random(10000,99999)
      await this.app.redis.set(`code_${email}`, code, 'ex', 3600)
      this.success(Status.Success, '发送成功', code)
    } catch (error) {
      this.fail(Status.SystemError, '发送失败')
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
      this.fail(Status.CodeError,'验证码错误')
    } else {
      let userDetail:any = await this.ctx.service.user.getUserByEmail(email)
      // 如果用户存在了
      if (userDetail) {
        await this.ctx.helper.loginToken({ user_id: userDetail['user_id'], email: userDetail['email'] }).then((res) => token = res) // 取到生成token
        await this.app.redis.set(email, token, 'ex', 7200) // 保存到redis
        this.ctx.cookies.set('authorization', token, {
          maxAge: 1000 * 60 * 60, // egg中是以毫秒为单位的
          domain: this.app.config.env == 'production' ? '120.79.131.113' : 'localhost'
        }) // 保存到cookie
        await this.app.redis.del(`code_${email}`)
        this.success(Status.Success, '登录成功')
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
          maxAge: 1000 * 60 * 60, // egg中是以毫秒为单位的
          domain: this.app.config.env == 'production' ? '120.79.131.113' : 'localhost'
        }) // 保存到cookie
        await this.app.redis.del(`code_${email}`)
        this.success(Status.Success, '注册成功')
      }
    }
  }

  /**
   * @Descripttion: 验证用户是否登录
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async isLogin() {
    let authToken = this.ctx.cookies.get('authorization')
    if (!authToken) {
      this.success(Status.Success, '未登录', '')
      return
    }
    const res = this.ctx.helper.verifyToken(authToken)
    try {
      let data = await this.ctx.service.user.getUserByEmail(res.email)
      this.success(Status.Success, '已登录', data)
    } catch (error) {
      this.fail(Status.SystemError, '系统错误')
    }
  }

  /**
   * @Descripttion: 获取参数列表
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getUserList() {
    let { page, pageSize } = this.ctx.query
    try {
      this.ctx.validate({ page: "number" }, { page: Number(page) })
      this.ctx.validate({ pageSize: "number" }, { pageSize: Number(pageSize) })
    } catch (error) {
      this.fail(Status.InvalidParams, '参数错误')
      return
    }

    try {
      let data = await this.ctx.service.user.getUserList(Number(page), Number(pageSize))
      this.success(Status.Success, '查询成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询失败')
    }
  }
}