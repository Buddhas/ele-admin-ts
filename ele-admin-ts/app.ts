/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-12 17:47:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-12 18:17:54
 */
const path = require('path');

export default class AppBootHook {
    public app : any

    constructor(app) {
        this.app = app;
    }
    /**
     * @Descripttion: 插件加载完成后加入校验规则
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async willReady() {
        const directory = path.join(this.app.config.baseDir, 'app/validate');
        this.app.loader.loadToApp(directory, 'validate');
    }
}
