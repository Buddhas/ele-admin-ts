/*
 * @Descripttion: 管理员模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-10-10 20:43:48
 */

export function admin(app) {
    const { router, controller } = app
    const jwt = app.middleware.jwt({}, app)
    
    router.post('/admin/login', controller.admin.login)
    router.post('/admin/logOut', controller.admin.logOut)
    router.post('/admin/updateAvatar', controller.admin.updateAvatar)
    router.post('/admin/getAdminCount', controller.admin.getAdminCount)
    router.get('/admin/findAdminByPage', controller.admin.findAdminByPage)
    router.get('/admin/totalData', controller.admin.totalData)
    router.get('/admin/getShopCategory', controller.admin.getShopCategory)
    router.get('/admin/getCurrentAdmin', controller.admin.getCurrentAdmin)
}