/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 20:45:02
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-19 21:08:00
 */

export function admin(app) {
    const { router, controller } = app
    console.log(app)
    router.post('/login', controller.admin.login)
    router.post('/updateAvatar', controller.admin.updateAvatar)
    router.post('/getAdminCount', controller.admin.getAdminCount)
    router.post('/findAdminByPage', controller.admin.findAdminByPage)
}