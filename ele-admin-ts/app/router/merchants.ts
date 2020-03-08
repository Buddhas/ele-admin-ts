/*
 * @Descripttion: 商铺路由设置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-07 15:52:31
 */

export function merchants(app) {
    const { router, controller } = app

    router.post('/merchants/createMerchants', controller.merchants.createMerchants)
    router.post('/merchants/deleteMerchants', controller.merchants.deleteMerchants)
    router.post('/merchants/updateMerchants', controller.merchants.updateMerchants)
    router.get('/merchants/getMerchantsByPage', controller.merchants.getMerchantsByPage)
    router.post('/merchants/updateShopAvatar', controller.merchants.updateShopAvatar)
    router.post('/merchants/updateBusinessLicense', controller.merchants.updateBusinessLicense)
    router.post('/merchants/updateCateringLicense', controller.merchants.updateCateringLicense)
    router.post('/merchants/updateShopEnv', controller.merchants.updateShopEnv)
    router.post('/merchants/findMerchantsByName', controller.merchants.findMerchantsByName)
    router.get('/merchants/getMerchantsById', controller.merchants.getMerchantsById)
    router.get('/merchants/getFoodByMerId', controller.merchants.getFoodByMerId)
    router.get('/merchants/getMerByCategory', controller.merchants.getMerByCategory)
    router.get('/merchants/getMerByKeyword', controller.merchants.getMerByKeyword)
}