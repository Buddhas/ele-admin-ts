"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-12-31 23:59:22
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 15:34:07
 */
const egg_1 = require("egg");
class shopCatefory extends egg_1.Service {
    /**
     * @Descripttion: 获取全部分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getAllCategory() {
        let data = await this.ctx.model.MerchantCategory.findAll({ raw: true }); // 设置Sequelize不自动包装返回结果
        let categoryList = [];
        let items;
        let item;
        // 找到一级分类
        for (items of data) {
            if (items.pid === -1) {
                categoryList.push(items);
                items.child = [];
            }
        }
        // 二级分类
        for (items of categoryList) {
            for (item of data) {
                if (items.id === item.pid) {
                    items.child.push(item);
                }
            }
        }
        return categoryList;
    }
    /**
     * @Descripttion: 获取一级分类下的二级分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getSecLevelCategory(id) {
        let first = await this.ctx.model.MerchantCategory.findOne({ raw: true, where: { id: id } }) || {};
        let sec = await this.ctx.model.MerchantCategory.findAll({
            where: {
                pid: id
            }
        });
        sec.unshift(first);
        return sec;
    }
    /**
     * @Descripttion: 获取二级分类下的数量
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getSecLevelFoodCount() {
        // 获取所有分类
        let categories = await this.getAllCategory();
        for (let i = 0; i < categories.length; i++) {
            if (categories[i]['child'].length > 0) {
                for (let j = 0; j < categories[i]['child'].length; j++) {
                    let count = await this.ctx.model.Merchants.count({
                        where: {
                            second_category: categories[i]['child'][j]['id']
                        }
                    });
                    categories[i]['child'][j]['count'] = count;
                }
            }
        }
        return categories;
    }
}
module.exports = shopCatefory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcENhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hvcENhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILDZCQUE4QjtBQUU5QixNQUFNLFlBQWEsU0FBUSxhQUFPO0lBQ2hDOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLGNBQWM7UUFDekIsSUFBSSxJQUFJLEdBQUksTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFDLHVCQUF1QjtRQUM5RixJQUFJLFlBQVksR0FBa0IsRUFBRSxDQUFBO1FBQ3BDLElBQUksS0FBVyxDQUFBO1FBQ2YsSUFBSSxJQUFVLENBQUE7UUFDZCxTQUFTO1FBQ1QsS0FBSyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDcEIsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDeEIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7YUFDakI7U0FDRjtRQUNELE9BQU87UUFDUCxLQUFNLEtBQUssSUFBSSxZQUFZLEVBQUU7WUFDM0IsS0FBSyxJQUFJLElBQUssSUFBSSxFQUFFO2dCQUNsQixJQUFJLEtBQUssQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQ3ZCO2FBQ0Y7U0FDRjtRQUNELE9BQU8sWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFVO1FBQ3pDLElBQUksS0FBSyxHQUFVLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsRUFBRSxFQUFFLEVBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNwRyxJQUFJLEdBQUcsR0FBa0IsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDckUsS0FBSyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxFQUFFO2FBQ1I7U0FDRixDQUFDLENBQUE7UUFDRixHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xCLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLG9CQUFvQjtRQUMvQixTQUFTO1FBQ1QsSUFBSSxVQUFVLEdBQWlCLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQzFELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyRCxJQUFJLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQy9DLEtBQUssRUFBRTs0QkFDTCxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzt5QkFDakQ7cUJBQ0YsQ0FBQyxDQUFBO29CQUNGLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUE7aUJBQzNDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFBIn0=