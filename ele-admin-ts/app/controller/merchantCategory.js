"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:商户分类controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:59:30
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-09 23:32:17
 */
const baseController_1 = require("../core/baseController");
const enum_1 = require("../util/enum");
class merchantCategory extends baseController_1.BaseController {
    /**
     * @Descripttion: 获取二级分类下所有商铺数量
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getSecLevelFoodCount() {
        try {
            let data = await this.ctx.service.shopCategory.getSecLevelFoodCount();
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, error);
        }
    }
    /**
     * @Descripttion: 获取一级分类下的二级分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getSecLevelCategory() {
        let { id } = this.ctx.query;
        id = Number(id);
        try {
            this.ctx.validate({ id: "number" }, { id: id });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.shopCategory.getSecLevelCategory(id);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询错误');
        }
    }
}
exports.default = merchantCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbnRDYXRlZ29yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lcmNoYW50Q2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsMkRBQXVEO0FBQ3ZELHVDQUFxQztBQUNyQyxNQUFxQixnQkFBaUIsU0FBUSwrQkFBYztJQUMxRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxvQkFBb0I7UUFDL0IsSUFBSTtZQUNGLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLENBQUE7WUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUN6QztRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQ3JDO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLG1CQUFtQjtRQUM5QixJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDM0IsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUVmLElBQUk7WUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQ2hEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDdkMsT0FBTTtTQUNQO1FBQ0QsSUFBSTtZQUNGLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3RFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDekM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUN0QztJQUNILENBQUM7Q0FDRjtBQXZDRCxtQ0F1Q0MifQ==