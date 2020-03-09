/*
 * @Descripttion:商户分类controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:59:30
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-09 23:32:17
 */
import { BaseController } from "../core/baseController"
import { Status } from "../util/enum"
export default class merchantCategory extends BaseController {
  /**
   * @Descripttion: 获取二级分类下所有商铺数量
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getSecLevelFoodCount() {
    try {
      let data = await this.ctx.service.shopCategory.getSecLevelFoodCount()
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, error)
    }
  }

  /**
   * @Descripttion: 获取一级分类下的二级分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getSecLevelCategory() {
    let { id } = this.ctx.query
    id = Number(id)
    
    try {
      this.ctx.validate({ id: "number" }, { id: id })
    } catch (error) {
      this.fail(Status.InvalidParams, '参数错误')
      return
    }
    try {
      let data = await this.ctx.service.shopCategory.getSecLevelCategory(id)
      this.success(Status.Success, '成功', data)
    } catch (error) {
      this.fail(Status.SystemError, '查询错误')
    }
  }
}