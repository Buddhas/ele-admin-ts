"use strict";
/*
 * @Descripttion: 管理员模块路由配置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-10-10 20:43:48
 */
Object.defineProperty(exports, "__esModule", { value: true });
function mainIndex(app) {
    const { router, controller } = app;
    router.get('/mainIndex/getShopCategory', controller.mainIndex.getShopCategory);
    router.get('/mainIndex/getAllCity', controller.mainIndex.getAllCity);
}
exports.mainIndex = mainIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbkluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbkluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztHQU9HOztBQUVILFNBQWdCLFNBQVMsQ0FBQyxHQUFHO0lBQzNCLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBRWxDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUM5RSxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDdEUsQ0FBQztBQUxELDhCQUtDIn0=