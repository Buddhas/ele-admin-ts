/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-26 10:32:55
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-20 17:25:42
 */
import { Service } from "egg";

class Order extends Service {
    /**
     * @Descripttion: 创建订单
     * @Author: 笑佛弥勒
     * @param {params} 订单详情 
     * @return: 
     */
    public async createdOrder(params: any) {
        return await this.ctx.model.Order.create({
            shop_id: params.shop_id,
            price: params.price,
            create_time: new Date(),
            user_id: params.user_id,
            ship_fee: params.ship_fee,
            meals_fee: params.meals_fee,
            user_address_id: params.user_address_id,
            preferential_id: params.preferential_id,
            status: 0,
            shop_name: params.shop_name
        })
    }

    /**
     * @Descripttion: 修改订单状态
     * @Author: 笑佛弥勒
     * @param {orderId} 订单id
     * @param {status} 订单状态
     * @return: 
     */
    public async updateStatus(orderId: number, status: number) {
        return await this.ctx.model.Order.updateStatus(orderId, status)
    }

    /**
     * @Descripttion: 查询订单
     * @Author: 笑佛弥勒
     * @param {page} 页码
     * @param {pageSize} 页数
     * @param {shopName} 店铺名称
     * @return: 
     */
    public async findOrderByPage(page: number, pageSize: number, shopName: string) {
        return await this.ctx.model.Order.findOrderByPage(page, pageSize, shopName)
    }
    /**
     * @Descripttion: 获取今日订单总量
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async findOrderTodayCount() {
        return await this.ctx.model.Order.findOrderTodayCount()
    }
    /**
     * @Descripttion: 获取订单总量
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async orderCount() {
        return await this.ctx.model.Order.count()
    }
}

module.exports = Order