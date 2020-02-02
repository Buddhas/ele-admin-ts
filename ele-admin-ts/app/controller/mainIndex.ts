/*
 * @Descripttion: 前端首页controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2020-01-22 16:46:01
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-26 12:43:41
 */
import { BaseController } from "../core/baseController"

export default class AdminController extends BaseController {
  /**
   * @Descripttion: 前端首页查询分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getShopCategory() {
    try {
      let category = await this.ctx.service.shopCategory.getAllCategory()
      this.success(200, '查询成功', category)
    } catch (error) {
      this.fail(500, "获取数据出错")
    }
  }
}