/*
 * @Descripttion: 食品Controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-09 10:49:28
 */
import { BaseController } from "../core/baseController";
import { User } from '../interface/interface'
import { Status } from "../util/enum"
export default class Address extends BaseController {
  public async createdAddress() {
    let userDetail:User = await this.ctx.helper.getUserMsg(this.ctx)
    let params = this.ctx.request.body
    params.id = userDetail.id
    try {
      this.ctx.validate({ params: "addAddress" }, { params: params });
    } catch (error) {
      this.fail(Status.InvalidParams, error);
      return;
    }

    try {
      await this.ctx.service.address.createdAddress(params);
      this.success(Status.Success, "添加成功");
    } catch (error) {
      this.ctx.logger.error(`-----地址添加失败------`, error);
      this.ctx.logger.error(`入参params：${params}`);
      this.fail(Status.SystemError, "地址添加失败");
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
      this.fail(Status.InvalidParams, error);
      return;
    }

    try {
      await this.ctx.service.address.updatedAddress(params);
      this.success(Status.Success, "更新成功");
    } catch (error) {
      this.ctx.logger.error(`-----更新地址添加失败------`, error);
      this.ctx.logger.error(`入参params：${params}`);
      this.fail(Status.SystemError, "更新地址添加失败");
    }
  }
  /**
   * @Descripttion: 删除地址
   * @Author: 笑佛弥勒
   * @param {type}
   * @return:
   */
  public async deleteAddress() {
    let { id } = this.ctx.request.body
    try {
      this.ctx.validate({ id: "number" }, { id: Number(id) });
    } catch (error) {
      this.fail(Status.InvalidParams, "参数错误");
      return;
    }

    try {
      let res = await this.ctx.service.address.deleteAddress(Number(id));
      if (res[0]) {
        this.success(Status.Success, "删除成功");
      } else {
        this.fail(Status.SystemError, "地址不存在或者已删除");
      }
    } catch (error) {
      this.ctx.logger.error(`-----地址删除失败------`, error);
      this.ctx.logger.error(`id：${id}`);
      this.fail(Status.SystemError, "地址删除失败");
    }
  }

  /**
   * @Descripttion: 获取单个地址详情
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getAddressById() {
    let { id } = this.ctx.request.query
    try {
      this.ctx.validate({ id: "number" }, { id: Number(id) });
    } catch (error) {
      this.fail(Status.InvalidParams, "参数错误");
      return;
    }

    try {
        let data = await this.ctx.service.address.getAddressById(Number(id));
        this.success(Status.Success, "成功", data);
      } catch (error) {
        this.ctx.logger.error(`-----地址查询失败------`, error);
        this.ctx.logger.error(`id：${id}`);
        this.fail(Status.SystemError, "地址查询失败");
      }
  }

  /**
   * @Descripttion: 获取地址列表
   * @Author: 笑佛弥勒
   * @param {type} 
   * @return: 
   */
  public async getAddressList() {
    let userDetail:User = await this.ctx.helper.getUserMsg(this.ctx)
    let id:number = userDetail.id
    try {
      this.ctx.validate({ id: "number" }, { id: Number(id) });
    } catch (error) {
      this.fail(Status.InvalidParams, "参数错误");
      return;
    }

    try {
        let data = await this.ctx.service.address.getAddressList(Number(id));
        this.success(Status.Success, "成功", data);
      } catch (error) {
        this.ctx.logger.error(`-----地址查询失败------`, error);
        this.ctx.logger.error(`id：${id}`);
        this.fail(Status.SystemError, "地址查询失败");
      }
  }
}
