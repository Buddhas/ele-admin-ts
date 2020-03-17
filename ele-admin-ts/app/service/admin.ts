/*
 * @Descripttion: 管理员Service层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 15:38:40
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 18:07:15
 */
import { Service } from "egg";

class Admin extends Service {
  /**
   * @Descripttion: 检测时候有这个用户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async hasUser() {
    try {
      let mobile = this.ctx.request.body.mobile;
      return await this.ctx.model.Admin.getByIdMobile(mobile);
    } catch (error) {
      throw "查询用户出错";
    }
  }
  /**
   * @Descripttion: 获取用户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async getUser(mobile:string) {
      return await this.ctx.model.Admin.getByIdMobile(mobile);
  }
  /**
   * @Descripttion: 创建用户
   * @Author: 笑佛弥勒
   * @param {mobile} 手机号 
   * @param {password} 密码
   * @return:
   */
  public async createUser(mobile, password) {
    return await this.ctx.model.Admin.create({
      mobile: mobile,
      password: password,
      user_name: mobile,
      registe_time: new Date(),
      permissions: 1,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  /**
   * @Descripttion: 更新管理员头像
   * @Author: 笑佛弥勒
   * @param {url} 头像地址，{mobile}管理员手机号
   * @return:
   */
  public async updateAvatar(url, mobile) {
    return await this.ctx.model.Admin.updateAvatar(url, mobile);
  }

  /**
   * @Descripttion: 管理员列表分页
   * @Author: 笑佛弥勒
   * @param {page} 当前页 {pageSize} 当前页数
   * @return:
   */
  public async findAdminByPage(page: number, pageSize: number) {
    return await this.ctx.model.Admin.findAdminByPage(page, pageSize);
  }
  /**
   * @Descripttion: 获取当日新注册管理员总数
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async findRegTodayCount() {
    return await this.ctx.model.Admin.findRegTodayCount()
  }
  /**
   * @Descripttion: 获取管理员数量
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async regCount() {
    return await this.ctx.model.Admin.count()
  }
  /**
   * @Descripttion: 查询一周数据
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async dateAWeek() {
    let adminData: Array<any> = []
    let orderData: Array<any> = []
    let weekData = {
      adminData: adminData,
      orderData: orderData
    }
    for (let i = 0; i < 7; i++) {
      weekData.adminData.push(await this.ctx.model.Admin.getAdate(i))
      weekData.orderData.push(await this.ctx.model.Order.getAdate(i))
    }
    return weekData
  }

  /**
   * @Descripttion: 查询当天数据
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async currentData() {
    let todayAd = await this.ctx.model.Admin.findRegTodayCount()
    let todayOrder = await this.ctx.model.Order.findOrderTodayCount()
    let countAd = await this.ctx.model.Admin.count()
    let countOrder = await this.ctx.model.Order.count()
    let current = {
      today: {
        admin: todayAd,
        order: todayOrder
      },
      total: {
        admin: countAd,
        order: countOrder
      },
    }
    return current
  }
}

module.exports = Admin;
