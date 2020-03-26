/*
 * @Descripttion: 商铺分类路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-09 23:31:19
 */

export function merchantCategory(app) {
  const { router, controller } = app
  router.get('/api/merchantCategory/getSecLevelFoodCount', controller.merchantCategory.getSecLevelFoodCount)
  router.get('/api/merchantCategory/getSecLevelCategory', controller.merchantCategory.getSecLevelCategory)
}