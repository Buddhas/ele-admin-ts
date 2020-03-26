"use strict";
/*
 * @Descripttion: 地址模块路由配置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-05 23:24:08
 */
Object.defineProperty(exports, "__esModule", { value: true });
function address(app) {
    const { router, controller } = app;
    const jwt = app.middleware.jwt({}, app);
    router.post('/userAddress/createdAddress', jwt, controller.address.createdAddress);
    router.post('/userAddress/updatedAddress', jwt, controller.address.updatedAddress);
    router.post('/userAddress/deleteAddress', jwt, controller.address.deleteAddress);
    router.get('/userAddress/getAddressById', jwt, controller.address.getAddressById);
    router.get('/userAddress/getAddressList', jwt, controller.address.getAddressList);
}
exports.address = address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsU0FBZ0IsT0FBTyxDQUFDLEdBQUc7SUFDekIsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDbEYsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ2hGLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDakYsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtBQUNuRixDQUFDO0FBVEQsMEJBU0MifQ==