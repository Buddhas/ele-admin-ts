"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:商户controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:59:30
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 15:57:33
 */
const baseController_1 = require("../core/baseController");
const path = require("path");
const enum_1 = require("../util/enum");
class Merchants extends baseController_1.BaseController {
    /**
     * @Descripttion: 创建商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async createMerchants() {
        let params = this.ctx.request.body;
        console.log(params);
        try {
            this.ctx.validate({ params: "addMerchants" }, { params: params });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, error);
            return;
        }
        try {
            await this.ctx.service.merchants.createMerchants(params);
            this.success(enum_1.Status.Success, '创建商户成功');
        }
        catch (error) {
            this.ctx.logger.error(`-----创建商户错误------`, error);
            this.ctx.logger.error(`入参params：${params}`);
            this.fail(enum_1.Status.SystemError, error);
        }
    }
    /**
     * @Descripttion: 删除商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async deleteMerchants() {
        try {
            this.ctx.validate({ id: "number" }, this.ctx.request.body);
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '商户id错误');
            return;
        }
        try {
            let res = await this.ctx.service.merchants.deleteMerchants(this.ctx.request.body.id);
            if (res[0]) {
                this.success(enum_1.Status.Success, '删除商户成功');
            }
            else {
                this.fail(enum_1.Status.SystemError, "商户不存在或者已删除");
            }
        }
        catch (error) {
            this.ctx.logger.error(`-----删除商户错误------`, error);
            this.ctx.logger.error(`入参params：${this.ctx.request.body}`);
            this.fail(enum_1.Status.SystemError, "删除商户错误");
        }
    }
    /**
     * @Descripttion: 商户列表分页
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getMerchantsByPage() {
        let { page, pageSize, orderType } = this.ctx.query;
        try {
            this.ctx.validate({ page: "number" }, { page: Number(page) });
            this.ctx.validate({ pageSize: "number" }, { pageSize: Number(pageSize) });
            this.ctx.validate({ orderType: "number" }, { orderType: Number(orderType) });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.merchants.getMerchantsByPage(Number(page), Number(pageSize), Number(orderType));
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询出错');
        }
    }
    /**
     * @Descripttion: 更新商户头像
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateShopAvatar() {
        const stream = await this.ctx.getFileStream();
        const uploadBasePath = "app/public/shopAvatar";
        const filename = `${Date.now()}${path
            .extname(stream.filename)
            .toLocaleLowerCase()}`;
        const target = path.join(uploadBasePath, filename);
        try {
            this.ctx.helper.mkdirSync(path.join(uploadBasePath));
            this.ctx.helper.saveImg(stream, target);
            let data = {
                filename: filename,
                attribute: 'shop_avatar'
            };
            this.success(enum_1.Status.Success, '商户头像上传成功', data);
        }
        catch (error) {
            this.ctx.logger.error(`-----更新商户头像失败------`, error);
            this.fail(enum_1.Status.SystemError, "更新商户头像失败");
        }
    }
    /**
     * @Descripttion: 更新商家实景图片
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateShopEnv() {
        const stream = await this.ctx.getFileStream();
        const uploadBasePath = "app/public/environment";
        const filename = `${Date.now()}${path
            .extname(stream.filename)
            .toLocaleLowerCase()}`;
        const target = path.join(uploadBasePath, filename);
        try {
            this.ctx.helper.mkdirSync(path.join(uploadBasePath));
            this.ctx.helper.saveImg(stream, target);
            let data = {
                filename: filename,
                attribute: 'shop_environment'
            };
            this.success(enum_1.Status.Success, '商户商家实景图片', data);
        }
        catch (error) {
            this.ctx.logger.error(`-----更新商家实景图片------`, error);
            this.fail(enum_1.Status.SystemError, "更新商家实景图片");
        }
    }
    /**
     * @Descripttion: 更新商户营业执照
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateBusinessLicense() {
        const stream = await this.ctx.getFileStream();
        const uploadBasePath = "app/public/businessLicense";
        const filename = `${Date.now()}${path
            .extname(stream.filename)
            .toLocaleLowerCase()}`;
        const target = path.join(uploadBasePath, filename);
        try {
            this.ctx.helper.mkdirSync(path.join(uploadBasePath));
            this.ctx.helper.saveImg(stream, target);
            let data = {
                filename: filename,
                attribute: 'business_license'
            };
            this.success(enum_1.Status.Success, '商户营业执照上传成功', data);
        }
        catch (error) {
            this.ctx.logger.error(`-----更新商户营业执照失败------`, error);
            this.fail(enum_1.Status.SystemError, "更新商户营业执照失败");
        }
    }
    /**
     * @Descripttion: 更新商户餐饮许可证
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateCateringLicense() {
        const stream = await this.ctx.getFileStream();
        const uploadBasePath = "app/public/cateringLicense";
        const filename = `${Date.now()}${path
            .extname(stream.filename)
            .toLocaleLowerCase()}`;
        const target = path.join(uploadBasePath, filename);
        try {
            this.ctx.helper.mkdirSync(path.join(uploadBasePath));
            this.ctx.helper.saveImg(stream, target);
            let data = {
                filename: filename,
                attribute: 'catering_license'
            };
            this.success(enum_1.Status.Success, '商户餐饮许可证上传成功', data);
        }
        catch (error) {
            this.ctx.logger.error(`-----更新商户餐饮许可证失败------`, error);
            this.fail(enum_1.Status.SystemError, "更新商户餐饮许可证失败");
        }
    }
    /**
     * @Descripttion: 更新商户信息
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateMerchants() {
        let params = this.ctx.request.body;
        try {
            this.ctx.validate({ params: "addMerchants" }, { params: params });
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, error);
            return;
        }
        try {
            await this.ctx.service.merchants.updateMerchants(params);
            this.success(enum_1.Status.Success, '商铺信息更新成功');
        }
        catch (error) {
            this.ctx.body = {
                msg: "更新商铺信息失败",
                status: enum_1.Status.SystemError
            };
            this.ctx.logger.error(`-----更新商铺信息失败------`, error);
            this.ctx.logger.error(`入参params：${params}`);
            this.fail(enum_1.Status.SystemError, "更新商铺信息失败");
        }
    }
    /**
     * @Descripttion: 根据id获取单个商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getMerchantsById() {
        let { id } = this.ctx.query;
        id = Number(id);
        try {
            this.ctx.validate({ id: "number" }, { id: id });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.merchants.getMerchantsById(id);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询错误');
        }
    }
    /**
     * @Descripttion: 获取商铺下食品
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getFoodByMerId() {
        let { id } = this.ctx.query;
        id = Number(id);
        try {
            this.ctx.validate({ id: "number" }, { id: id });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.merchants.getFoodByMerId(id);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询错误');
        }
    }
    async getMerByCategory() {
        let { type, id, page, pageSize, orderType } = this.ctx.query;
        id = Number(id);
        type = Number(type);
        page = Number(page);
        pageSize = Number(pageSize);
        orderType = Number(orderType);
        try {
            this.ctx.validate({ id: "number" }, { id: id });
            this.ctx.validate({ type: "number" }, { type: type });
            this.ctx.validate({ page: "number" }, { page: page });
            this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize });
            this.ctx.validate({ orderType: "number" }, { orderType: orderType });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.merchants.getMerByCategory(type, id, page, pageSize, orderType);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询错误');
        }
    }
    /**
     * @Descripttion: 根据名称模糊查询商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getMerByKeyword() {
        let { page, pageSize, keyword } = this.ctx.query;
        page = Number(page);
        pageSize = Number(pageSize);
        try {
            this.ctx.validate({ page: "number" }, { page: page });
            this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize });
        }
        catch (error) {
            this.ctx.body = {
                msg: "参数错误",
                status: enum_1.Status.InvalidParams
            };
            return;
        }
        try {
            let data = await this.ctx.service.merchants.getMerByKeyword(page, pageSize, keyword);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询错误');
        }
    }
}
exports.default = Merchants;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyY2hhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILDJEQUF1RDtBQUN2RCw2QkFBNEI7QUFDNUIsdUNBQXFDO0FBRXJDLE1BQXFCLFNBQVUsU0FBUSwrQkFBYztJQUVuRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxlQUFlO1FBQzFCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25CLElBQUk7WUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1NBQ2xFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsT0FBTTtTQUNQO1FBQ0QsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDdkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFL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