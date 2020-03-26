"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 食品Service层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:15:46
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-05 18:13:50
 */
const egg_1 = require("egg");
class Food extends egg_1.Service {
    /**
     * @Descripttion: 添加食品
     * @Author: 笑佛弥勒
     * @param {params} 食品信息
     * @return:
     */
    async createdFood(params) {
        return await this.ctx.model.Food.create({
            name: params.name,
            introduce: params.introduce,
            category: params.category,
            image: params.image,
            shop_id: params.shop_id,
            price: params.price,
            package_price: params.package_price,
            rate: this.ctx.helper.random(90, 100),
            mon_sale: this.ctx.helper.random(100, 2000),
            score: 4 + Number(Math.random().toFixed(1)),
            is_delete: 0
        });
    }
    /**
     * @Descripttion: 删除食品
     * @Author: 笑佛弥勒
     * @param {foodId} 食品id
     * @return:
     */
    async deleteFood(foodId) {
        return await this.ctx.model.Food.update({
            is_delete: '1'
        }, {
            where: {
                id: foodId
            }
        });
    }
    /**
     * @Descripttion: 修改食品属性
     * @Author: 笑佛弥勒
     * @param {params} 食品属性
     * @return:
     */
    async updatedFood(params) {
        return await this.ctx.model.Food.update({
            name: params.name,
            introduce: params.introduce,
            category: params.category,
            image: params.image,
            price: params.price,
            package_price: params.package_price
        }, {
            where: {
                id: params.id
            }
        });
    }
    /**
     * @Descripttion: 食品分页查询
     * @Author: 笑佛弥勒
     * @param {page} 当前页 {pageSize} 当前页数
     * @return:
     */
    async findFoodByPage(page, pageSize) {
        return await this.ctx.model.Food.findFoodByPage(page, pageSize);
    }
    /**
     * @Descripttion: 获取单个食品详情
     * @Author: 笑佛弥勒
     * @param {page} 当前页 {pageSize} 当前页数
     * @return:
     */
    async getFoodById(id) {
        return await this.ctx.model.Food.findAll({
            where: {
                id: id
            }
        });
    }
}
module.exports = Food;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsNkJBQThCO0FBRTlCLE1BQU0sSUFBSyxTQUFRLGFBQU87SUFDdEI7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQVU7UUFDL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDcEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztZQUN2QixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO1lBQ25DLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQztZQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDM0MsS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxTQUFTLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYztRQUNsQyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxTQUFTLEVBQUUsR0FBRztTQUNqQixFQUFDO1lBQ0UsS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxNQUFNO2FBQ2I7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQVU7UUFDL0IsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDcEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7U0FDdEMsRUFBQztZQUNFLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7YUFDaEI7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQVksRUFBRSxRQUFnQjtRQUN0RCxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFVO1FBQy9CLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3JDLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsRUFBRTthQUNUO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMifQ==