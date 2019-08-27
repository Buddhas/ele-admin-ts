/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-27 09:59:50
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
        let orderDetail = JSON.parse(params.order_detail)
        params.shop_id = Number(params.shop_id)
        params.price = Number(params.price)
        params.user_id = Number(params.user_id)
        params.ship_fee = Number(params.ship_fee)
        params.meals_fee = Number(params.meals_fee)
        params.user_address_id = Number(params.user_address_id)
        params.preferential_id = Number(params.preferential_id)
        params.status = Number(params.status)
        try {
            this.ctx.validate({ params: 'addOrder' }, { params: params })
            this.ctx.validate({ orderDetail: 'orderDetail' }, { orderDetail: orderDetail})
        } catch (error) {
            this.ctx.body = {
                msg: error,
                status: '-1'
            }
            return
        }

        try {
            
            for (const item of orderDetail) {
                item.shop_id = Number(item.shop_id)
                item.price = Number(item.price)
                item.user_id = Number(item.user_id)
                item.food_id = Number(item.food_id)
                item.count = Number(item.count)
                await this.ctx.service.orderDetail.createdOrder(item)
            }
            await this.ctx.service.order.createdOrder(params)
        } catch (error) {
            this.ctx.body = {
                msg: "创建订单错误",
                status: '-1'
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
