"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-26 10:32:55
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-20 17:25:42
 */
const egg_1 = require("egg");
class Order extends egg_1.Service {
    /**
     * @Descripttion: 创建订单
     * @Author: 笑佛弥勒
     * @param {params} 订单详情
     * @return:
     */
    async createdOrder(params) {
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
        });
    }
    /**
     * @Descripttion: 修改订单状态
     * @Author: 笑佛弥勒
     * @param {orderId} 订单id
     * @param {status} 订单状态
     * @return:
     */
    async updateStatus(orderId, status) {
        return await this.ctx.model.Order.updateStatus(orderId, status);
    }
    /**
     * @Descripttion: 查询订单
     * @Author: 笑佛弥勒
     * @param {page} 页码
     * @param {pageSize} 页数
     * @param {shopName} 店铺名称
     * @return:
     */
    async findOrderByPage(page, pageSize, shopName) {
        return await this.ctx.model.Order.findOrderByPage(page, pageSize, shopName);
    }
    /**
     * @Descripttion: 获取今日订单总量
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async findOrderTodayCount() {
        return await this.ctx.model.Order.findOrderTodayCount();
    }
    /**
     * @Descripttion: 获取订单总量
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async orderCount() {
        return await this.ctx.model.Order.count();
    }
}
module.exports = Order;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0dBT0c7QUFDSCw2QkFBOEI7QUFFOUIsTUFBTSxLQUFNLFNBQVEsYUFBTztJQUN2Qjs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBVztRQUNqQyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNyQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFdBQVcsRUFBRSxJQUFJLElBQUksRUFBRTtZQUN2QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixlQUFlLEVBQUUsTUFBTSxDQUFDLGVBQWU7WUFDdkMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1lBQ3ZDLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1NBQzlCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQWUsRUFBRSxNQUFjO1FBQ3JELE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsUUFBZ0I7UUFDekUsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMvRSxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsbUJBQW1CO1FBQzVCLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtJQUMzRCxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsVUFBVTtRQUNuQixPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzdDLENBQUM7Q0FDSjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBIn0=