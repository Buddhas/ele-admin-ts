/*
 * @Descripttion: 用户模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-18 23:29:16
 */

export function user(app) {
  const { router, controller } = app
  const jwt = app.middleware.jwt({}, app)
  
  router.post('/user/sendEmail', controller.user.sendEmail)
  router.post('/user/login', controller.user.login)
}