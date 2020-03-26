"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 食品分类service
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-09-27 18:22:39
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-28 15:09:28
 */
const egg_1 = require("egg");
class foodCategory extends egg_1.Service {
    /**
     * @Descripttion: 获取餐厅下的食品分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getCategoryByPid(pid) {
        return await this.ctx.model.FoodCategory.getCategoryByPid(pid);
    }
    /**
     * @Descripttion: 创建食品分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async createCategory(params) {
        return await this.ctx.model.FoodCategory.create({
            pid: params.pid,
            name: params.name,
            desc: params.desc
        });
    }
}
module.exports = foodCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vZENhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9vZENhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILDZCQUE4QjtBQUU5QixNQUFNLFlBQWEsU0FBUSxhQUFPO0lBQ2hDOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQixDQUFDLEdBQVc7UUFDdkMsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU07UUFDaEMsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDOUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQSJ9