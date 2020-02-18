/*
 * @Descripttion: 管理员模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-18 22:37:22
 */

export function admin(app) {
    const { router, controller } = app
    const jwt = app.middleware.jwt({}, app)
    
    router.post('/admin/login', controller.admin.login)
    router.post('/admin/logOut', controller.admin.logOut)
    router.post('/admin/updateAvatar', controller.admin.updateAvatar)
    router.post('/admin/getAdminCount', controller.admin.getAdminCount)
    router.get('/admin/findAdminByPage', controller.admin.findAdminByPage)
    router.get('/admin/totalData', jwt, controller.admin.totalData)
    router.get('/admin/getShopCategory', controller.admin.getShopCategory)
    router.get('/admin/getCurrentAdmin', controller.admin.getCurrentAdmin)
}