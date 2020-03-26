"use strict";
/*
 * @Descripttion: 食品模块路由配置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 15:59:48
 */
Object.defineProperty(exports, "__esModule", { value: true });
function food(app) {
    const { router, controller } = app;
    const jwt = app.middleware.jwt({}, app);
    router.post('/food/createdFood', jwt, controller.food.createdFood);
    router.get('/food/deleteFood', jwt, controller.food.deleteFood);
    router.post('/food/updatedFood', jwt, controller.food.updatedFood);
    router.get('/food/findFoodByPage', controller.food.findFoodByPage);
    router.post('/food/createFoodCategory', jwt, controller.food.createFoodCategory);
    router.get('/food/getCategoryByPid', controller.food.getCategoryByPid);
    router.post('/food/updateFoodImg', jwt, controller.food.updateFoodImg);
    router.get('/food/getFoodById', controller.food.getFoodById);
}
exports.food = food;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsU0FBZ0IsSUFBSSxDQUFDLEdBQUc7SUFDcEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDaEYsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDdEUsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN0RSxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDaEUsQ0FBQztBQVpELG9CQVlDIn0=