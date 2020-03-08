/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:30:21
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-07 15:46:08
 */
import { Service } from "egg";
import * as Sequelize from 'sequelize' 
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
      shop_environment: params.shop_environment,
      business_license: params.business_license,
      catering_license: params.catering_license,
      top_up: params.top_up,
      minus: params.minus,
      description: '蜂鸟专送',
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
  public async getMerchantsByPage(page: number, pageSize: number, orderType: number) {
    let order:any = [['score', 'desc']]
    switch (orderType) {
      case 0:
        order = [['id', 'desc']] // 综合排序
        break;
      case 1:
        order = [['score', 'desc']] // 好评优先
        break;
      case 2:
        order = [['top_up', 'asc']] // 起送价最低
        break;
      case 3:
        order = [['need_time', 'asc']] // 配送最快
        break;
      default:
        break;
    }
    return await this.ctx.model.Merchants.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where: {
        is_delete: 0
      },
      order: order
    });
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
      shop_environment: params.shop_environment,
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
    let categorys:Array<Object> = await this.ctx.model.MerchantCategory.findAll({raw:true})
    let merchantDetail:Object =  await this.ctx.model.Merchants.findOne({
      where: {
        id: id
      },
      raw:true
    }) || {}
    if (merchantDetail) {
    merchantDetail['categorys'] = []
    categorys.forEach((item, index) => {
        if (item['id'] == merchantDetail['first_category'] || item['id'] == merchantDetail['second_category']) {
          merchantDetail['categorys'].push(item['name'])
        }
      })
    }
    return merchantDetail
  }
  /**
   * @Descripttion: 获取商铺下食品
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getFoodByMerId(id: number) {
    
    let foodList:Array<Object> = []
    // 查找出商铺下所有分类
    let categorys:Array<Object> = await this.ctx.model.FoodCategory.getCategoryByPid(id)
    
    for (const category of categorys) {
      let items = {}
      // 查找分类下食品
      let foods:Array<Object> = await this.ctx.model.Food.findAll({
        where: {
          category: category['id']
        },
        raw: true
      })
      if (foods && foods.length > 0) {
        items['name'] = category['name']
        items['foods'] = foods
        foodList.push(items)
      }
    }
    return foodList
  }

  /**
   * @Descripttion: 获取分类下商铺数量
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getMerByCategory(type: number, id: number, page: number, pageSize:number, orderType: number ) {
    let order:any = [['score', 'desc']]
    switch (orderType) {
      case 0:
        order = [['id', 'desc']] // 综合排序
        break;
      case 1:
        order = [['score', 'desc']] // 好评优先
        break;
      case 2:
        order = [['top_up', 'asc']] // 起送价最低
        break;
      case 3:
        order = [['need_time', 'asc']] // 配送最快
        break;
      default:
        break;
    }
    // 一级分类
    if (type === 0) {
      return await this.ctx.model.Merchants.findAndCountAll({
        offset: (page - 1) * pageSize,
        limit: pageSize,
        where: {
          first_category: id
        },
        order: order
      })
    } else { // 二级分类
      return await this.ctx.model.Merchants.findAndCountAll({
        offset: (page - 1) * pageSize,
        limit: pageSize,
        where: {
          second_category: id
        },
        order: order
      })
    }
  }

  /**
   * @Descripttion: 模糊搜索商户
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getMerByKeyword(page: number, pageSize:number, keyword:string) {
    return await this.ctx.model.Merchants.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where: {
        is_delete: 0,
        name: {
          [Sequelize.Op.like]: `%${keyword}%`
        }
      },
    })
  }
}

module.exports = Merchants;
