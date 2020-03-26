"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 食品Controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-09 10:49:28
 */
const baseController_1 = require("../core/baseController");
const enum_1 = require("../util/enum");
class Address extends baseController_1.BaseController {
    async createdAddress() {
        let userDetail = await this.ctx.helper.getUserMsg(this.ctx);
        let params = this.ctx.request.body;
        params.id = userDetail.id;
        try {
            this.ctx.validate({ params: "addAddress" }, { params: params });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, error);
            return;
        }
        try {
            await this.ctx.service.address.createdAddress(params);
            this.success(enum_1.Status.Success, "添加成功");
        }
        catch (error) {
            this.ctx.logger.error(`-----地址添加失败------`, error);
            this.ctx.logger.error(`入参params：${params}`);
            this.fail(enum_1.Status.SystemError, "地址添加失败");
        }
    }
    /**
     * @Descripttion: 添加食品
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updatedAddress() {
        let params = this.ctx.request.body;
        params.update = 1;
        try {
            this.ctx.validate({ params: "addAddress" }, { params: params });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, error);
            return;
        }
        try {
            await this.ctx.service.address.updatedAddress(params);
            this.success(enum_1.Status.Success, "更新成功");
        }
        catch (error) {
            this.ctx.logger.error(`-----更新地址添加失败------`, error);
            this.ctx.logger.error(`入参params：${params}`);
            this.fail(enum_1.Status.SystemError, "更新地址添加失败");
        }
    }
    /**
     * @Descripttion: 删除地址
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async deleteAddress() {
        let { id } = this.ctx.request.body;
        try {
            this.ctx.validate({ id: "number" }, { id: Number(id) });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, "参数错误");
            return;
        }
        try {
            let res = await this.ctx.service.address.deleteAddress(Number(id));
            if (res[0]) {
                this.success(enum_1.Status.Success, "删除成功");
            }
            else {
                this.fail(enum_1.Status.SystemError, "地址不存在或者已删除");
            }
        }
        catch (error) {
            this.ctx.logger.error(`-----地址删除失败------`, error);
            this.ctx.logger.error(`id：${id}`);
            this.fail(enum_1.Status.SystemError, "地址删除失败");
        }
    }
    /**
     * @Descripttion: 获取单个地址详情
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getAddressById() {
        let { id } = this.ctx.request.query;
        try {
            this.ctx.validate({ id: "number" }, { id: Number(id) });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, "参数错误");
            return;
        }
        try {
            let data = await this.ctx.service.address.getAddressById(Number(id));
            this.success(enum_1.Status.Success, "成功", data);
        }
        catch (error) {
            this.ctx.logger.error(`-----地址查询失败------`, error);
            this.ctx.logger.error(`id：${id}`);
            this.fail(enum_1.Status.SystemError, "地址查询失败");
        }
    }
    /**
     * @Descripttion: 获取地址列表
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getAddressList() {
        let userDetail = await this.ctx.helper.getUserMsg(this.ctx);
        let id = userDetail.id;
        try {
            this.ctx.validate({ id: "number" }, { id: Number(id) });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, "参数错误");
            return;
        }
        try {
            let data = await this.ctx.service.address.getAddressList(Number(id));
            this.success(enum_1.Status.Success, "成功", data);
        }
        catch (error) {
            this.ctx.logger.error(`-----地址查询失败------`, error);
            this.ctx.logger.error(`id：${id}`);
            this.fail(enum_1.Status.SystemError, "地址查询失败");
        }
    }
}
exports.default = Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsMkRBQXdEO0FBRXhELHVDQUFxQztBQUNyQyxNQUFxQixPQUFRLFNBQVEsK0JBQWM7SUFDMUMsS0FBSyxDQUFDLGNBQWM7UUFDekIsSUFBSSxVQUFVLEdBQVEsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUNsQyxNQUFNLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUE7UUFDekIsSUFBSTtZQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDakU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2QyxPQUFPO1NBQ1I7UUFFRCxJQUFJO1lBQ0YsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0QztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLE1BQU0s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