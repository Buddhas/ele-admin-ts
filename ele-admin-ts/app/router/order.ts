/*
 * @Descripttion: 食品模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-26 17:06:01
 */

export function order(app) {
    const { router, controller } = app
    router.post('/order/createdOrder', controller.order.createdOrder)
    router.post('/order/findOrderByPage', controller.order.findOrderByPage)
}