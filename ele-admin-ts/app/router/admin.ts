/*
 * @Descripttion: 管理员模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 18:29:44
 */

export function admin(app) {
    const { router, controller } = app
    const jwt = app.middleware.jwt({}, app)
    
    router.post('/api/admin/login', controller.admin.login)
    router.post('/api/admin/logOut', jwt, controller.admin.logOut)
    router.post('/api/admin/updateAvatar', jwt, controller.admin.updateAvatar)
    router.post('/api/admin/getAdminCount', jwt, controller.admin.getAdminCount)
    router.get('/api/admin/findAdminByPage', jwt, controller.admin.findAdminByPage)
    router.get('/api/admin/totalData', jwt, controller.admin.totalData)
    router.get('/api/admin/getShopCategory', jwt, controller.admin.getShopCategory)
    router.get('/api/admin/getCurrentAdmin', jwt, controller.admin.getCurrentAdmin)
    router.get('/api/admin/isLogin', controller.admin.isLogin)
}