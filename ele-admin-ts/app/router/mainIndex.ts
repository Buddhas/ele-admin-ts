/*
 * @Descripttion: 管理员模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-10-10 20:43:48
 */

export function mainIndex(app) {
  const { router, controller } = app
  
  router.get('/api/mainIndex/getShopCategory', controller.mainIndex.getShopCategory)
  router.get('/api/mainIndex/getAllCity', controller.mainIndex.getAllCity)
}