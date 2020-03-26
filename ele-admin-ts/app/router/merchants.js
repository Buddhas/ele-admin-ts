"use strict";
/*
 * @Descripttion: 商铺路由设置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 15:57:51
 */
Object.defineProperty(exports, "__esModule", { value: true });
function merchants(app) {
    const { router, controller } = app;
    const jwt = app.middleware.jwt({}, app);
    router.post('/merchants/createMerchants', jwt, controller.merchants.createMerchants);
    router.post('/merchants/deleteMerchants', jwt, controller.merchants.deleteMerchants);
    router.post('/merchants/updateMerchants', jwt, controller.merchants.updateMerchants);
    router.get('/merchants/getMerchantsByPage', controller.merchants.getMerchantsByPage);
    router.post('/merchants/updateShopAvatar', jwt, controller.merchants.updateShopAvatar);
    router.post('/merchants/updateBusinessLicense', jwt, controller.merchants.updateBusinessLicense);
    router.post('/merchants/updateCateringLicense', jwt, controller.merchants.updateCateringLicense);
    router.post('/merchants/updateShopEnv', jwt, controller.merchants.updateShopEnv);
    router.get('/merchants/getMerchantsById', controller.merchants.getMerchantsById);
    router.get('/merchants/getFoodByMerId', controller.merchants.getFoodByMerId);
    router.get('/merchants/getMerByCategory', controller.merchants.getMerByCategory);
    router.get('/merchants/getMerByKeyword', controller.merchants.getMerByKeyword);
}
exports.merchants = merchants;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyY2hhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztHQU9HOztBQUVILFNBQWdCLFNBQVMsQ0FBQyxHQUFHO0lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUV2QyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3BGLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDcEYsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNwRixNQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNwRixNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDdEYsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ2hHLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUNoRyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ2hGLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ2hGLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUM1RSxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUNoRixNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDbEYsQ0FBQztBQWhCRCw4QkFnQkMifQ==