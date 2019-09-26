import { Service } from "egg";

class shopCatefory extends Service {
  /**
   * @Descripttion: 获取全部分类
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getAllCategory() {
    let data =  await this.ctx.model.ShopCategory.findAll({raw: true}) // 设置Sequelize不自动包装返回结果
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
}

module.exports = shopCatefory