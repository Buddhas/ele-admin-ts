"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 前端首页controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2020-01-22 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime : 2020-01-26 12:43:41
 */
const baseController_1 = require("../core/baseController");
const enum_1 = require("../util/enum");
class AdminController extends baseController_1.BaseController {
    /**
     * @Descripttion: 前端首页查询分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getShopCategory() {
        try {
            let category = await this.ctx.service.shopCategory.getAllCategory();
            this.success(enum_1.Status.Success, '查询成功', category);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, "获取数据出错");
        }
    }
    /**
     * @Descripttion: 获取全国城市列表
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getAllCity() {
        try {
            let data = await this.ctx.helper.getAllCity();
            this.success(enum_1.Status.Success, '查询成功', data);
        }
        catch (error) {
            this.success(enum_1.Status.SystemError, '查询失败');
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbkluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbkluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILDJEQUF1RDtBQUN2RCx1Q0FBcUM7QUFFckMsTUFBcUIsZUFBZ0IsU0FBUSwrQkFBYztJQUN6RDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxlQUFlO1FBQzFCLElBQUk7WUFDRixJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1NBQy9DO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUE7U0FDeEM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsVUFBVTtRQUNyQixJQUFJO1lBQ0YsSUFBSSxJQUFJLEdBQUksTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQzNDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDekM7SUFDSCxDQUFDO0NBQ0Y7QUE5QkQsa0NBOEJDIn0=