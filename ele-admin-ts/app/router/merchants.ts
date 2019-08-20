/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-19 20:59:23
 */

module.exports = app => {
    const { router, controller } = app

    router.post('/createMerchants', controller.merchants.createMerchants)
    router.post('/deleteMerchants', controller.merchants.deleteMerchants)
    router.post('/findMerchantsByPage', controller.merchants.findMerchantsByPage)
    router.post('/updateShopAvatar', controller.merchants.updateShopAvatar)
    router.post('/updateBusinessLicense', controller.merchants.updateBusinessLicense)
    router.post('/updateCateringLicense', controller.merchants.updateCateringLicense)
}