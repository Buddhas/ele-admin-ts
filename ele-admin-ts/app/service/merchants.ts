/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:30:21
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-26 21:06:51
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
      start_time: params.business_hours.start_time,
      end_time: params.business_hours.end_time,
      shop_avatar: params.shop_avatar,
      business_license: params.business_license,
      catering_license: params.catering_license,
      score: params.score,
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
      shop_avatar: params.shop_avatar,
      longitude: params.longitude,
      latitude: params.latitude,
    }, {
        where: { id: params.id }
      })
  }

  public async findMerchantsByName(page: number, pageSize: number, name: string) {
    return this.ctx.model.Merchants.findMerchantsByName(page, pageSize, name)
  }
}

module.exports = Merchants;
