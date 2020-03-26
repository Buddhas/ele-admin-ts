/*
 * @Descripttion: 用户模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 16:14:20
 */

export function user(app) {
  const { router, controller } = app
  const jwt = app.middleware.jwt({}, app)
  
  router.post('/api/user/sendEmail', controller.user.sendEmail)
  router.post('/api/user/login', controller.user.login)
  router.get('/api/user/isLogin', controller.user.isLogin)
  router.get('/api/user/getUserList', jwt, controller.user.getUserList)
}