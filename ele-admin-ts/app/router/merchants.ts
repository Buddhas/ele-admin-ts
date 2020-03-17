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

    router.post('/merchants/createMerchants', jwt, controller.merchants.createMerchants)
    router.post('/merchants/deleteMerchants', jwt, controller.merchants.deleteMerchants)
    router.post('/merchants/updateMerchants', jwt, controller.merchants.updateMerchants)
    router.get('/merchants/getMerchantsByPage', controller.merchants.getMerchantsByPage)
    router.post('/merchants/updateShopAvatar', jwt, controller.merchants.updateShopAvatar)
    router.post('/merchants/updateBusinessLicense', jwt, controller.merchants.updateBusinessLicense)
    router.post('/merchants/updateCateringLicense', jwt, controller.merchants.updateCateringLicense)
    router.post('/merchants/updateShopEnv', jwt, controller.merchants.updateShopEnv)
    router.get('/merchants/getMerchantsById', controller.merchants.getMerchantsById)
    router.get('/merchants/getFoodByMerId', controller.merchants.getFoodByMerId)
    router.get('/merchants/getMerByCategory', controller.merchants.getMerByCategory)
    router.get('/merchants/getMerByKeyword', controller.merchants.getMerByKeyword)
}