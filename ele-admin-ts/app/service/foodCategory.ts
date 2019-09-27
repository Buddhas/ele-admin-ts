/*
 * @Descripttion: 食品分类service
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-09-27 18:22:39
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-27 18:33:45
 */
import { Service } from "egg";

class foodCategory extends Service {
  /**
   * @Descripttion: 获取餐厅下的食品分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getCategoryByPid(pid: number) {
    return await this.ctx.model.FoodCategory.getCategoryByPid(pid)
  }
  /**
   * @Descripttion: 创建食品分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async createCategory(params) {
    return await this.ctx.model.FoodCategory.create({
      pid: params.pid,
      name: params.name,
      desc: params.desc
    })
  }
}

module.exports = foodCategory