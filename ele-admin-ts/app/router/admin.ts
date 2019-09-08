/*
 * @Descripttion: 管理员模块路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-08 16:44:41
 */

export function admin(app) {
    const { router, controller } = app
    
    router.post('/admin/login', controller.admin.login)
    router.post('/admin/updateAvatar', controller.admin.updateAvatar)
    router.post('/admin/getAdminCount', controller.admin.getAdminCount)
    router.post('/admin/findAdminByPage', controller.admin.findAdminByPage)
    router.get('/admin/totalData', controller.admin.totalData)
}