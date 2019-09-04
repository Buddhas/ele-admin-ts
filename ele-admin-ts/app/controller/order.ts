/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-03 13:48:19
 */

import { Controller } from "egg"

export default class Order extends Controller {
    /**
     * @Descripttion: 创建订单
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async createdOrder() {
        let params = this.ctx.request.body
        let orderDetail = params.order_detail
        try {
            this.ctx.validate({ params: 'addOrder' }, { params: params })
        } catch (error) {
            this.ctx.body = {
                msg: error,
                status: '-1'
            }
            return
        }
        Order.createOrderDetail(orderDetail, this.ctx)
        try {
            await this.ctx.service.order.createdOrder(params)
        } catch (error) {
            this.ctx.body = {
                error: error,
                msg: "创建订单错误",
                status: '-1'
            }
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
                ctx.validate({ orderDetail: 'orderDetail' }, { orderDetail: item })
            } catch (error) {
                ctx.body = {
                    msg: error,
                    status: '-1'
                }
                return
            }
            try {
                await ctx.service.orderDetail.createdOrder(item)
            } catch (error) {
                ctx.body = {
                    error: error,
                    msg: "创建订单错误",
                    status: '-1'
                }
                return
            }
        }
    }
    public async findOrderByPage() {
        let { page, pageSize, shopName } = this.ctx.request.body
        page = Number(page)
        pageSize = Number(pageSize)

        try {
            this.ctx.validate({ page: "number" }, { page: page })
            this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
            this.ctx.validate({ shopName: "string" }, { shopName: shopName })
        } catch (error) {
            this.ctx.body = {
                msg: "参数错误",
                status: "-1"
            }
            return
        }

        try {
            this.ctx.body = await this.ctx.service.order.findOrderByPage(page, pageSize, shopName)
        } catch (error) {
            this.ctx.body = {
                msg: "查询失败",
                status: "-1"
            }
        }
    }
}
