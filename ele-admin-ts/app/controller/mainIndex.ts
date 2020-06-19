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
      const all_city_list = await this.app.redis.get('all_city_list')
      if (!all_city_list) {
        let data =  await this.ctx.helper.getAllCity()
        await this.app.redis.set('all_city_list', JSON.stringify(data), 'ex', 60*60*24) // 保存到redis
        this.success(Status.Success, '查询成功', data)
      } else {
        this.success(Status.Success, '查询成功', JSON.parse(all_city_list))
      }
    } catch (error) {
      this.success(Status.SystemError, '查询失败')
    }
  }
}