/*
 * @Descripttion: 食品模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 15:59:48
 */

export function food(app) {
    const { router, controller } = app
    const jwt = app.middleware.jwt({}, app)

    router.post('/api/food/createdFood', jwt, controller.food.createdFood)
    router.get('/api/food/deleteFood', jwt, controller.food.deleteFood)
    router.post('/api/food/updatedFood', jwt, controller.food.updatedFood)
    router.get('/api/food/findFoodByPage', controller.food.findFoodByPage)
    router.post('/api/food/createFoodCategory', jwt, controller.food.createFoodCategory)
    router.get('/api/food/getCategoryByPid', controller.food.getCategoryByPid)
    router.post('/api/food/updateFoodImg', jwt, controller.food.updateFoodImg)
    router.get('/api/food/getFoodById', controller.food.getFoodById)
}