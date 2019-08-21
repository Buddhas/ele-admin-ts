/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-21 11:32:50
 */

import { Controller } from "egg";
import * as path from "path";
import { mkdirSync, saveImg } from "../util/util";

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
      ctx.validate({ password: { type: "string", min: 1, max: 10 } });
    } catch (error) {
      ctx.body = {
        msg: error,
        status: "-1"
      };
      return;
    }

    let res = await ctx.service.admin.hasUser(mobile);
    if (!res) {
      let user = await ctx.service.admin.createUser(mobile, password);
    } else {
      if (res.password == password) {
        ctx.body = res;
        ctx.session = res
      } else {
        ctx.body = {
          status: "-100",
          msg: "密码错误"
        };
      }
    }
  }
  /**
   * @Descripttion: 修改管理员头像
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updateAvatar() {
    const stream = await this.ctx.getFileStream();
    const uplaodBasePath = "app/public/adminAvatar";
    const filename = `${Date.now()}${path
      .extname(stream.filename)
      .toLocaleLowerCase()}`;

    try {
      mkdirSync(path.join(uplaodBasePath));
      const target = path.join(uplaodBasePath, filename);
      saveImg(stream, target);
      await this.ctx.service.admin.updateAvatar(filename, "17688702092");
      this.ctx.body = {
        status: 200,
        url: filename
      };
    } catch (error) {
      this.ctx.body = {
        status: -1,
        msg: "图片保存失败"
      };
    }
  }
  /**
   * @Descripttion: 获取管理员数量
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async getAdminCount() {
    return await this.ctx.service.admin.getAdminCount();
  }
  /**
   * @Descripttion: 管理员列表分页
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async findAdminByPage() {
    let { page, pageSize } = this.ctx.request.body;
    page = Number(page);
    pageSize = Number(pageSize);
    try {
      this.ctx.validate({ page: "number" }, { page: page });
      this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize });
    } catch (error) {
      this.ctx.body = {
        msg: "参数错误",
        status: "-1"
      };
      return;
    }

    try {
      this.ctx.body = await this.ctx.service.admin.findAdminByPage(
        page,
        pageSize
      );
    } catch (error) {
      throw {
        message: "查询出错",
        status: 400
      };
    }
  }
  public async test() {
    await this.ctx.service.admin.test().then(res => {
      console.log(res);
    });
    this.ctx.body = await this.ctx.service.admin.test();
  }
}
