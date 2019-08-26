/*
 * @Descripttion: 食品模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-23 15:16:18
 */

export function food(app) {
    const { router, controller } = app
    
    router.post('/food/createdFood', controller.food.createdFood)
    router.get('/food/deleteFood', controller.food.deleteFood)
    router.post('/food/updatedFood', controller.food.updatedFood)
    router.post('/food/findFoodByPage', controller.food.findFoodByPage)
}