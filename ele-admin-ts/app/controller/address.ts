/*
 * @Descripttion: 食品Controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-18 15:49:28
 */
import { BaseController } from "../core/baseController";

export default class Address extends BaseController {
  /**
   * @Descripttion: 添加食品
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async createdAddress() {
    let params = this.ctx.request.body;
    try {
      this.ctx.validate({ params: "addAddress" }, { params: params });
    } catch (error) {
      this.fail(500, error);
      return;
    }

    try {
      await this.ctx.service.address.createdAddress(params);
      this.success(200, "添加成功");
    } catch (error) {
      this.ctx.logger.error(`-----地址添加失败------`, error);
      this.ctx.logger.error(`入参params：${params}`);
      this.fail(500, "地址添加失败");
    }
  }

  /**
   * @Descripttion: 添加食品
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async updatedAddress() {
    let params = this.ctx.request.body;
    params.update = 1;
    try {
      this.ctx.validate({ params: "addAddress" }, { params: params });
    } catch (error) {
      this.fail(500, error);
      return;
    }

    try {
      await this.ctx.service.address.updatedAddress(params);
      this.success(200, "更新成功");
    } catch (error) {
      this.ctx.logger.error(`-----更新地址添加失败------`, error);
      this.ctx.logger.error(`入参params：${params}`);
      this.fail(500, "更新地址添加失败");
    }
  }
  /**
   * @Descripttion: 删除地址
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async deleteAddress() {
    let { id } = this.ctx.query;
    try {
      this.ctx.validate({ id: "number" }, { id: Number(id) });
    } catch (error) {
      this.fail(500, "参数错误");
      return;
    }

    try {
      let res = await this.ctx.service.address.deleteAddress(Number(id));
      if (res[0]) {
        this.success(200, "删除成功");
      } else {
        this.fail(500, "地址不存在或者已删除");
      }
    } catch (error) {
      this.ctx.logger.error(`-----地址删除失败------`, error);
      this.ctx.logger.error(`id：${id}`);
      this.fail(500, "地址删除失败");
    }
  }

  public async getAddressById() {
    let { id } = this.ctx.query;
    try {
      this.ctx.validate({ id: "number" }, { id: Number(id) });
    } catch (error) {
      this.fail(500, "参数错误");
      return;
    }

    try {
        let data = await this.ctx.service.address.getAddressById(Number(id));
        this.success(200, "成功", data);
      } catch (error) {
        this.ctx.logger.error(`-----地址查询失败------`, error);
        this.ctx.logger.error(`id：${id}`);
        this.fail(500, "地址查询失败");
      }
  }
}
