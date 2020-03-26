"use strict";
/*
 * @Descripttion: 商铺分类路由配置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-09 23:31:19
 */
Object.defineProperty(exports, "__esModule", { value: true });
function merchantCategory(app) {
    const { router, controller } = app;
    router.get('/merchantCategory/getSecLevelFoodCount', controller.merchantCategory.getSecLevelFoodCount);
    router.get('/merchantCategory/getSecLevelCategory', controller.merchantCategory.getSecLevelCategory);
}
exports.merchantCategory = merchantCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbnRDYXRlZ29yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lcmNoYW50Q2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsU0FBZ0IsZ0JBQWdCLENBQUMsR0FBRztJQUNsQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQTtJQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQ3RHLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDdEcsQ0FBQztBQUpELDRDQUlDIn0=