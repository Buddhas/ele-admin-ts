"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-12 17:47:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-12 18:17:54
 */
const path = require('path');
class AppBootHook {
    constructor(app) {
        this.app = app;
    }
    /**
     * @Descripttion: 插件加载完成后加入校验规则
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async willReady() {
        const directory = path.join(this.app.config.baseDir, 'app/validate');
        this.app.loader.loadToApp(directory, 'validate');
    }
}
exports.default = AppBootHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixNQUFxQixXQUFXO0lBRzVCLFlBQVksR0FBRztRQUNYLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxTQUFTO1FBQ2xCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNKO0FBaEJELDhCQWdCQyJ9