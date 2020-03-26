"use strict";
/*
 * @Descripttion: 食品模块路由配置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-26 17:06:01
 */
Object.defineProperty(exports, "__esModule", { value: true });
function order(app) {
    const { router, controller } = app;
    router.post('/order/createdOrder', controller.order.createdOrder);
    router.post('/order/findOrderByPage', controller.order.findOrderByPage);
}
exports.order = order;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7R0FPRzs7QUFFSCxTQUFnQixLQUFLLENBQUMsR0FBRztJQUNyQixNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQTtJQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQzNFLENBQUM7QUFKRCxzQkFJQyJ9