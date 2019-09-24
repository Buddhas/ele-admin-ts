/*
 * @Descripttion: 商铺路由设置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-24 18:13:51
 */

export function merchants(app) {
    const { router, controller } = app

    router.post('/merchants/createMerchants', controller.merchants.createMerchants)
    router.post('/merchants/deleteMerchants', controller.merchants.deleteMerchants)
    router.post('/merchants/findMerchantsByPage', controller.merchants.findMerchantsByPage)
    router.post('/merchants/updateShopAvatar', controller.merchants.updateShopAvatar)
    router.post('/merchants/updateBusinessLicense', controller.merchants.updateBusinessLicense)
    router.post('/merchants/updateCateringLicense', controller.merchants.updateCateringLicense)
    router.post('/merchants/findMerchantsByName', controller.merchants.findMerchantsByName)
}