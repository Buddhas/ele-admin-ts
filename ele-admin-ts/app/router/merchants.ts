/*
 * @Descripttion: 商铺路由设置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 15:57:51
 */

export function merchants(app) {
    const { router, controller } = app
    const jwt = app.middleware.jwt({}, app)

    router.post('/api/merchants/createMerchants', jwt, controller.merchants.createMerchants)
    router.post('/api/merchants/deleteMerchants', jwt, controller.merchants.deleteMerchants)
    router.post('/api/merchants/updateMerchants', jwt, controller.merchants.updateMerchants)
    router.get('/api/merchants/getMerchantsByPage', controller.merchants.getMerchantsByPage)
    router.post('/api/merchants/updateShopAvatar', jwt, controller.merchants.updateShopAvatar)
    router.post('/api/merchants/updateBusinessLicense', jwt, controller.merchants.updateBusinessLicense)
    router.post('/api/merchants/updateCateringLicense', jwt, controller.merchants.updateCateringLicense)
    router.post('/api/merchants/updateShopEnv', jwt, controller.merchants.updateShopEnv)
    router.get('/api/merchants/getMerchantsById', controller.merchants.getMerchantsById)
    router.get('/api/merchants/getFoodByMerId', controller.merchants.getFoodByMerId)
    router.get('/api/merchants/getMerByCategory', controller.merchants.getMerByCategory)
    router.get('/api/merchants/getMerByKeyword', controller.merchants.getMerByKeyword)
}