/*
 * @Descripttion: 订单食品详情service层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-26 10:32:55
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-03 11:06:21
 */
import { Service } from "egg";

class OrderDetail extends Service {
    /**
     * @Descripttion: 插入订单
     * @Author: 笑佛弥勒
     * @param {params} 订单详情 
     * @return: 
     */
    public async createdOrder(params: any) {
        return await this.ctx.model.OrderDetail.create({
            shop_id: params.shop_id,
            price: params.price,
            user_id: params.user_id,
            food_name: params.food_name,
            food_id: params.food_id,
            count: params.count
        })
    }
}

module.exports = OrderDetail