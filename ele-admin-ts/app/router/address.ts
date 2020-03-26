/*
 * @Descripttion: 地址模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-05 23:24:08
 */

export function address(app) {
  const { router, controller } = app
  const jwt = app.middleware.jwt({}, app)
  
  router.post('/api/userAddress/createdAddress', jwt, controller.address.createdAddress)
  router.post('/api/userAddress/updatedAddress', jwt, controller.address.updatedAddress)
  router.post('/api/userAddress/deleteAddress', jwt, controller.address.deleteAddress)
  router.get('/api/userAddress/getAddressById', jwt, controller.address.getAddressById)
  router.get('/api/userAddress/getAddressList', jwt, controller.address.getAddressList)
}