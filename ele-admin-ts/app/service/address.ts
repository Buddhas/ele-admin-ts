/*
 * @Descripttion: 地址Service层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:15:46
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-04 23:45:43
 */
import { Service } from "egg";

class Address extends Service {
  /**
   * @Descripttion: 添加地址
   * @Author: 笑佛弥勒
   * @param {params} 地址信息
   * @return:
   */
  public async createdAddress(params: any) {
    return await this.ctx.model.Address.create({
      user_id: params.id,
      user_name: params.user_name,
      sex: params.sex,
      mobile: params.mobile,
      address: params.address,
      detail: params.detail,
      label: params.label,
      is_delete: 0
    });
  }

  /**
   * @Descripttion: 删除地址
   * @Author: 笑佛弥勒
   * @param {foodId} 地址id
   * @return:
   */
  public async deleteAddress(id: number) {
    return await this.ctx.model.Address.update(
      {
        is_delete: "1"
      },
      {
        where: {
          id: id
        }
      }
    );
  }

  /**
   * @Descripttion: 修改地址属性
   * @Author: 笑佛弥勒
   * @param {params} 地址属性
   * @return:
   */
  public async updatedAddress(params: any) {
    return await this.ctx.model.Address.update(
      {
        user_id: params.user_id,
        user_name: params.user_name,
        sex: params.sex,
        mobile: params.mobile,
        address: params.address,
        detail: params.detail,
        label: params.label
      },
      {
        where: {
          id: params.id
        }
      }
    );
  }

  /**
   * @Descripttion: 获取地址详情
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getAddressById(id: number) {
    return await this.ctx.model.Address.findOne({
      where: {
        id: id
      },
      attributes: { exclude: ['is_delete'] },
      raw: true
    })
  }

  public async getAddressList(id: number) {
    return await this.ctx.model.Address.findAll({
      where: {
        user_id: id
      },
      attributes: { exclude: ['is_delete'] },
      raw: true
    })
  }
}

module.exports = Address;
