/*
 * @Descripttion: 前端首页controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2020-01-22 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-04-06 10:55:58
 */
import { BaseController } from "../core/baseController"
import { Status } from "../util/enum"

export default class AdminController extends BaseController {
  /**
   * @Descripttion: 前端首页查询分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getShopCategory() {
    try {
      console.log(this.app.config.env, '++++++++++++++++')
      let category = await this.ctx.service.shopCategory.getAllCategory()
      this.success(Status.Success, '查询成功', category)
    } catch (error) {
      this.fail(Status.SystemError, "获取数据出错")
    }
  }

  /**
   * @Descripttion: 获取全国城市列表
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getAllCity() {
    try {
      let data =  await this.ctx.helper.getAllCity()
      this.success(Status.Success, '查询成功', data)
    } catch (error) {
      this.success(Status.SystemError, '查询失败')
    }
  }
}