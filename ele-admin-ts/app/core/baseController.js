"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: controller基类
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-09 10:43:37
 */
const egg_1 = require("egg");
class BaseController extends egg_1.Controller {
    /**
     * @Descripttion: 请求成功
     * @Author: 笑佛弥勒
     * @param {status} 状态
     * @param {data} 响应数据
     * @return:
     */
    success(status, message, data) {
        if (data) {
            this.ctx.body = {
                status: status,
                message: message,
                data: data
            };
        }
        else {
            this.ctx.body = {
                status: status,
                message: message
            };
        }
    }
    /**
     * @Descripttion: 失败
     * @Author: 笑佛弥勒
     * @param {status} 状态
     * @param {data} 错误提示
     * @return:
     */
    fail(status, message) {
        this.ctx.body = {
            status: status || 500,
            message: message,
        };
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXNlQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0dBT0c7QUFDSCw2QkFBZ0M7QUFDaEMsTUFBYSxjQUFlLFNBQVEsZ0JBQVU7SUFFNUM7Ozs7OztPQU1HO0lBRUgsT0FBTyxDQUFDLE1BQWMsRUFBRSxPQUFlLEVBQUUsSUFBVTtRQUNqRCxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixJQUFJLEVBQUUsSUFBSTthQUNYLENBQUE7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLE9BQU87YUFDakIsQ0FBQTtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILElBQUksQ0FBQyxNQUFjLEVBQUUsT0FBZTtRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRztZQUNkLE1BQU0sRUFBRSxNQUFNLElBQUksR0FBRztZQUNyQixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBdENELHdDQXNDQyJ9