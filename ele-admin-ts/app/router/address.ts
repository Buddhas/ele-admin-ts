/*
 * @Descripttion: 地址模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-02 23:54:15
 */

export function address(app) {
  const { router, controller } = app
  const jwt = app.middleware.jwt({}, app)
  
  router.post('/userAddress/createdAddress', jwt, controller.address.createdAddress)
  router.post('/userAddress/updatedAddress', jwt, controller.address.updatedAddress)
  router.get('/userAddress/deleteAddress', jwt, controller.address.deleteAddress)
  router.get('/userAddress/getAddressById', jwt, controller.address.getAddressById)
}