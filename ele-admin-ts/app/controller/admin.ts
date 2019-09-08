/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-08 17:02:48
 */

import { Controller } from "egg"
import * as path from "path"
import { mkdirSync, saveImg } from "../util/util"
import  * as utility from 'utility'

export default class AdminController extends Controller {
  /**
   * @Descripttion: 管理员登录 || 注册 接口
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async login() {
    const { ctx } = this
    let { mobile, password } = this.ctx.request.body
    try {
      ctx.validate({ mobile: "mobile" })
      ctx.validate({ password: { type: "string", min: 1, max: 10 } })
    } catch (error) {
      ctx.body = {
        msg: error,
        status: 500
      }
      return
    }

    let res = await ctx.service.admin.hasUser(mobile)
    // 加密密码
    password = utility.md5(password)
    if (!res) {
      await ctx.service.admin.createUser(mobile, password)
      ctx.body = {
        msg: "注册成功",
        status: 200,
      }
    } else {
      if (res.password == password) {
        ctx.body = {
          msg: "登录成功",
          status: 200
        }
      } else {
        ctx.body = {
          status: 500,
          msg: "密码错误"
        }
      }
    }
  }
  /**
   * @Descripttion: 修改管理员头像
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updateAvatar() {
    const stream = await this.ctx.getFileStream()
    const uplaodBasePath = "app/public/adminAvatar"
    const filename = `${Date.now()}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`

    try {
      mkdirSync(path.join(uplaodBasePath))
      const target = path.join(uplaodBasePath, filename)
      saveImg(stream, target)
      await this.ctx.service.admin.updateAvatar(filename, "17688702092")
      this.ctx.body = {
        status: 200,
        url: filename
      }
    } catch (error) {
      this.ctx.body = {
        status: 500,
        msg: "图片保存失败"
      }
    }
  }
  /**
   * @Descripttion: 获取管理员数量
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async getAdminCount() {
    return await this.ctx.service.admin.getAdminCount()
  }
  /**
   * @Descripttion: 管理员列表分页
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async findAdminByPage() {
    let { page, pageSize } = this.ctx.request.body
    try {
      this.ctx.validate({ page: "number" }, { page: page })
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
    } catch (error) {
      this.ctx.body = {
        msg: "参数错误",
        status: 500
      }
      return
    }

    try {
      this.ctx.body = await this.ctx.service.admin.findAdminByPage(
        page,
        pageSize
      )
    } catch (error) {
      throw {
        message: "查询出错",
        status: 500
      }
    }
  }

  /**
   * @Descripttion: 数据总览
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async totalData() {
    try {
      let todayAd = await this.ctx.service.admin.findRegTodayCount()
      let todayOrder = await this.ctx.service.order.findOrderTodayCount()

      let countAd = await this.ctx.service.admin.regCount()
      let countOrder = await this.ctx.service.order.orderCount()
      
      this.ctx.body = {
        data:{
          today: {
            admin: todayAd,
            order: todayOrder
          },
          total: {
            admin: countAd,
            order: countOrder
          }
        },
        status: 200
      }
    } catch (error) {
      this.ctx.body = {
        msg: '获取数据出错',
        status: 500
      }
    }
    
  }
}
