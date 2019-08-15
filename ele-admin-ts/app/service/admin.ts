/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 15:38:40
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-14 14:39:55
 */
import { Service } from "egg";

class Admin extends Service {
  /**
   * @Descripttion: 检测时候有这个用户
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async hasUser() {
    try {
      let mobile = this.ctx.request.body.mobile;
      return await this.ctx.model.Admin.findByIdMobile(mobile);
    } catch (error) {
      throw "查询用户出错";
    }
  }
  /**
   * @Descripttion: 创建用户
   * @Author: 笑佛弥勒
   * @param {mobile} 手机号 {password} 密码
   * @return:
   */
  public async createUser(mobile, password) {
    return await this.ctx.model.Admin.create({
      mobile: mobile,
      password: password,
      user_name: mobile,
      registe_time: new Date(),
      permissions: 1,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  /**
   * @Descripttion: 更新管理员头像
   * @Author: 笑佛弥勒
   * @param {url} 头像地址，{mobile}管理员手机号
   * @return:
   */
  public async updateAvatar(url, mobile) {
    return await this.ctx.model.Admin.updateAvatar(url, mobile);
  }

  /**
   * @Descripttion: 获取管理员数量
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async getAdminCount() {
    return await this.ctx.model.Admin.count();
  }
  /**
   * @Descripttion: 管理员列表分页
   * @Author: 笑佛弥勒
   * @param {page} 当前页 {pageSize} 当前页数
   * @return:
   */
  public async findAdminByPage(page: number, pageSize: number) {
    return await this.ctx.model.Admin.findAdminByPage(page, pageSize);
  }
}

module.exports = Admin;
