/*
 * @Descripttion: 食品Service层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:15:46
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-23 17:21:16
 */
import { Service } from "egg";

class Food extends Service {
    /**
     * @Descripttion: 添加食品
     * @Author: 笑佛弥勒
     * @param {params} 食品信息
     * @return: 
     */
    public async createdFood(params:any) {
        return await this.ctx.model.Food.create({
            name: params.name,
            introduce: params.introduce,
            category: params.category,
            image: params.image,
            shop_id: params.shop_id,
            price: params.price,
            score: params.score,
            is_delete: 0
        })
    }

    /**
     * @Descripttion: 删除食品
     * @Author: 笑佛弥勒
     * @param {foodId} 食品id
     * @return: 
     */
    public async deleteFood(foodId: number) {
        return await this.ctx.model.Food.update({
            is_delete: '1'
        },{
            where: {
                id: foodId
            }
        })
    }

    /**
     * @Descripttion: 修改食品属性
     * @Author: 笑佛弥勒
     * @param {params} 食品属性
     * @return: 
     */
    public async updatedFood(params:any) {
        return await this.ctx.model.Food.update({
            name: params.name,
            introduce: params.introduce,
            category: params.category,
            image: params.image,
            price: params.price
        },{
            where: {
                id: params.id
            }
        })
    }

    /**
     * @Descripttion: 食品分页查询
     * @Author: 笑佛弥勒
     * @param {page} 当前页 {pageSize} 当前页数
     * @return: 
     */
    public async findFoodByPage(page: number, pageSize: number) {
        return await this.ctx.model.Food.findFoodByPage(page, pageSize);
    }
}

module.exports = Food;