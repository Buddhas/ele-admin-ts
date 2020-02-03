/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:30:21
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-03 23:59:42
 */
import { Service } from "egg";

class Merchants extends Service {
  /**
   * @Descripttion: 创建商户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return: 商户信息
   */
  public async createMerchants(params) {
    return await this.ctx.model.Merchants.create({
      name: params.name,
      address: params.address,
      mobile: params.mobile,
      synopsis: params.synopsis,
      slogan: params.slogan,
      first_category: params.category[0],
      second_category: params.category[1],
      ship_price: params.ship_price,
      send_price: params.send_price,
      start_time: params.start_time,
      end_time: params.end_time,
      shop_avatar: params.shop_avatar,
      business_license: params.business_license,
      catering_license: params.catering_license,
      top_up: params.top_up,
      minus: params.minus,
      need_time: this.ctx.helper.random(20, 60), // 随机生成配送时间
      mon_sale: this.ctx.helper.random(1000, 20000), //随机生成一个月销售量
      score: 4 + Number(Math.random().toFixed(1)), // 随机生成一个食品评分
      longitude: params.longitude,
      latitude: params.latitude,
      is_delete: 0
    });
  }

  /**
   * @Descripttion: 删除商户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async deleteMerchants(id: number) {
    return await this.ctx.model.Merchants.deleteMerchants(id);
  }
  /**
   * @Descripttion: 商户列表分页
   * @Author: 笑佛弥勒
   * @param {page} 当前页 {pageSize} 当前页数
   * @return:
   */
  public async findAdminByPage(page: number, pageSize: number) {
    return await this.ctx.model.Merchants.findMerchantsByPage(page, pageSize);
  }
  /**
   * @Descripttion: 更新商户信息
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async updateMerchants(params) {
    return await this.ctx.model.Merchants.update({
      name: params.name,
      address: params.address,
      mobile: params.mobile,
      synopsis: params.synopsis,
      slogan: params.slogan,
      first_category: params.category[0],
      second_category: params.category[1],
      ship_price: params.ship_price,
      send_price: params.send_price,
      start_time: params.business_hours.start_time,
      end_time: params.business_hours.end_time,
      shop_avatar: params.shop_avatar,
      business_license: params.business_license,
      catering_license: params.catering_license,
      longitude: params.longitude,
      latitude: params.latitude
    }, {
        where: { id: params.id }
      })
  }
  /**
   * @Descripttion: 根据商铺名称模糊查询商铺
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async findMerchantsByName(page: number, pageSize: number, name: string) {
    return this.ctx.model.Merchants.findMerchantsByName(page, pageSize, name)
  }
  /**
   * @Descripttion: 查询单个商铺
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getMerchantsById(id: number) {
    return this.ctx.model.Merchants.findOne({
      where: {
        id: id
      }
    })
  }
  /**
   * @Descripttion: 获取商铺下食品
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getFoodByMerId(id: number) {
    // 查找出商铺下所有分类
    let foodList:Array<Object> = []
    let categorys:Array<Object> = await this.ctx.model.FoodCategory.getCategoryByPid(id)
    
    for (const category of categorys) {
      // 查找分类下食品
      let items:Array<Object> = await this.ctx.model.Food.findAll({
        where: {
          category: category['id']
        },
        raw: true
      })
      if (items) {
        items.forEach((item, index) => {
          item['category_name'] = category['name']
        })
      }
      foodList.push(items)
    }
    return foodList
  }
}

module.exports = Merchants;
