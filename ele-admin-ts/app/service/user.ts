/*
 * @Descripttion: 用户service层
 * @version: 1.0
 * @Author: 笑佛弥勒
 * @Date: 2020-02-18 16:47:33
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-04 23:05:01
 */
import { Service } from "egg";

class User extends Service {
  /**
   * @Descripttion: 创建用户
   * @Author: 笑佛弥勒
   * @param {params} 用户信息
   * @return:
   */
  public async createdUser(params: any) {
    return await this.ctx.model.User.create({
      user_name: params.user_name,
      email: params.email,
      is_delete: 0
    });
  }

  /**
   * @Descripttion: 获取用户详情
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getUserByEmail(email:string) {
    let data:any =  await this.ctx.model.User.findOne({
      where: {
        email: email
      },
      attributes: { exclude: ['is_delete'] }
    }) || null
    return data
  }
}

module.exports = User;