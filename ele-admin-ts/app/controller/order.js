"use strict";
/*
 * @Descripttion:订单controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-09 11:04:40
 */
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = require("../core/baseController");
const enum_1 = require("../util/enum");
class Order extends baseController_1.BaseController {
    /**
     * @Descripttion: 创建订单
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async createdOrder() {
        let params = this.ctx.request.body;
        let orderDetail = params.order_detail;
        try {
            this.ctx.validate({ params: 'addOrder' }, { params: params });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, error);
            return;
        }
        try {
            Order.createOrderDetail(orderDetail, this.ctx);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, error);
            return;
        }
        try {
            await this.ctx.service.order.createdOrder(params);
            this.success(enum_1.Status.Success, '订单创建成功');
        }
        catch (error) {
            this.ctx.logger.error(`-----创建订单错误------`, error);
            this.ctx.logger.error(`入参params：${params}`);
            this.fail(enum_1.Status.SystemError, "创建订单错误");
        }
    }
    /**
     * @Descripttion: 创建订单详情
     * @Author: 笑佛弥勒
     * @param {orderDetail} 订单详情
     * @param {ctx} 当前请求对象
     * @return:
     */
    static async createOrderDetail(orderDetail, ctx) {
        for (const item of orderDetail) {
            try {
                ctx.validate({ orderDetail: 'orderDetail' }, { orderDetail: item });
            }
            catch (error) {
                throw error;
            }
            try {
                await ctx.service.orderDetail.createdOrder(item);
            }
            catch (error) {
                ctx.logger.error(`-----用户注册失败------`, error);
                ctx.logger.error(`入参：orderDetail:${orderDetail}，item: ${item}`);
                throw "详情创建订单错误";
            }
        }
    }
    /**
     * @Descripttion: 订单分页
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async findOrderByPage() {
        let { page, pageSize, shopName } = this.ctx.request.body;
        try {
            this.ctx.validate({ page: "number" }, { page: page });
            this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize });
            this.ctx.validate({ shopName: "string" }, { shopName: shopName });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, "参数错误");
            return;
        }
        try {
            this.ctx.body = await this.ctx.service.order.findOrderByPage(page, pageSize, shopName);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, "查询失败");
        }
    }
}
exports.default = Order;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRzs7QUFFSCwyREFBdUQ7QUFDdkQsdUNBQXFDO0FBRXJDLE1BQXFCLEtBQU0sU0FBUSwrQkFBYztJQUM3Qzs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxZQUFZO1FBQ3JCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUNsQyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFBO1FBQ3JDLElBQUk7WUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1NBQ2hFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsT0FBTTtTQUNUO1FBQ0QsSUFBSTtZQUNBLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2pEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDcEMsT0FBTTtTQUNUO1FBRUQsSUFBSTtZQUNBLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDekM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUss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