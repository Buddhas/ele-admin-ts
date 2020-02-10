/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-12-31 23:59:22
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-10 10:29:17
 */
import { Service } from "egg";

class shopCatefory extends Service {
  /**
   * @Descripttion: 获取全部分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getAllCategory() {
    console.log('$$$$$')
    let data =  await this.ctx.model.MerchantCategory.findAll({raw: true}) // 设置Sequelize不自动包装返回结果
    let categoryList: Array<Object> = []
    let items : any 
    let item : any
    // 找到一级分类
    for (items of data) {
      if (items.pid === -1) {
        categoryList.push(items)
        items.child = []
      }
    }
    // 二级分类
    for ( items of categoryList) {
      for (item  of data) {
        if (items.id === item.pid) {
          items.child.push(item)
        }
      }
    }
    return categoryList
  }
  /**
   * @Descripttion: 获取一级分类下的二级分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getSecLevelCategory(id: number) {
    let first:Object = await this.ctx.model.MerchantCategory.findOne({ raw:true, where:{ id:id }}) || {}
    let sec:Array<Object> =  await this.ctx.model.MerchantCategory.findAll({
      where: {
        pid: id
      }
    })
    sec.unshift(first)
    return sec
  }
  /**
   * @Descripttion: 获取二级分类下的数量
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getSecLevelFoodCount() {
    // 获取所有分类
    let categories:Array<Object> = await this.getAllCategory()
    for(let i = 0; i < categories.length; i++) {
      if(categories[i]['child'].length > 0) {
        for(let j = 0; j < categories[i]['child'].length; j++) {
          let count = await this.ctx.model.Merchants.count({
            where: {
              second_category: categories[i]['child'][j]['id']
            }
          })
          categories[i]['child'][j]['count'] = count
        }
      }
    }
    return categories
  }
}

module.exports = shopCatefory