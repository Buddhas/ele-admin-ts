"use strict";
/*
 * @Descripttion: 用户模块路由配置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 16:14:20
 */
Object.defineProperty(exports, "__esModule", { value: true });
function user(app) {
    const { router, controller } = app;
    const jwt = app.middleware.jwt({}, app);
    router.post('/user/sendEmail', controller.user.sendEmail);
    router.post('/user/login', controller.user.login);
    router.get('/user/isLogin', controller.user.isLogin);
    router.get('/user/getUserList', jwt, controller.user.getUserList);
}
exports.user = user;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsU0FBZ0IsSUFBSSxDQUFDLEdBQUc7SUFDdEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNuRSxDQUFDO0FBUkQsb0JBUUMifQ==