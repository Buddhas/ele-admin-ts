"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 订单食品详情service层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-26 10:32:55
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-03 11:06:21
 */
const egg_1 = require("egg");
class OrderDetail extends egg_1.Service {
    /**
     * @Descripttion: 插入订单
     * @Author: 笑佛弥勒
     * @param {params} 订单详情
     * @return:
     */
    async createdOrder(params) {
        return await this.ctx.model.OrderDetail.create({
            shop_id: params.shop_id,
            price: params.price,
            user_id: params.user_id,
            food_name: params.food_name,
            food_id: params.food_id,
            count: params.count
        });
    }
}
module.exports = OrderDetail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJEZXRhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlckRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0dBT0c7QUFDSCw2QkFBOEI7QUFFOUIsTUFBTSxXQUFZLFNBQVEsYUFBTztJQUM3Qjs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBVztRQUNqQyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUMzQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztZQUN2QixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDM0IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztTQUN0QixDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQSJ9