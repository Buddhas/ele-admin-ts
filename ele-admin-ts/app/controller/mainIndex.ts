/*
 * @Descripttion: 前端首页controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2020-01-22 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-01-22 16:46:01
 */
import { BaseController } from "../core/baseController"

export default class AdminController extends BaseController { 
  public async getShopCategory() {
    try {
      let category = await this.ctx.service.shopCategory.getAllCategory()
      this.success(200, '查询成功', category)
    } catch (error) {
      this.fail(500, "获取数据出错")
    }
  }
}