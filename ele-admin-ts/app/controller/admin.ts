/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-12 20:31:09
 */

import { Controller } from "egg";

export default class AdminController extends Controller {
  /**
   * @Descripttion: 管理员登录 || 注册 接口
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async login() {
    const { ctx } = this;
    const { mobile, password } = this.ctx.request.body;

    try {
      ctx.validate({ mobile: "mobile" });
      ctx.validate({ password: {type: 'string', min: 1, max: 10}})
    } catch (error) {
      ctx.body = {
        msg: error,
        status: '-1'
      };
      return;
    }

    let res = await ctx.service.admin.hasUser(mobile);
    if (!res) {
      await ctx.service.admin.createUser(mobile, password);
    } else {
      if (res.password == password) {
        ctx.body = res;
      } else {
        ctx.body = {
          status: "-100",
          msg: "密码错误"
        };
      }
    }
  }
}
