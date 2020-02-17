/*
 * @Descripttion: 地址模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-17 22:32:28
 */

export function address(app) {
  const { router, controller } = app
  const jwt = app.middleware.jwt({}, app)
  
  router.post('/address/createdAddress', controller.address.createdAddress)
  router.post('/address/updatedAddress', controller.address.updatedAddress)
  router.get('/address/deleteAddress', controller.address.deleteAddress)
}