/*
 * @Descripttion: 食品Controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-23 17:23:23
 */
import { Controller } from "egg"

export default class Food extends Controller {
    /**
     * @Descripttion: 添加食品
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async createdFood() {
        let params = this.ctx.request.body
        params.shop_id = Number(params.shop_id)
        params.price = Number(params.price)
        
        try {
            this.ctx.validate({params: 'addFood', }, {params: params})
        } catch (error) {
            this.ctx.body = {
                msg: error,
                status: "-1"
            }
            return
        }

        try {
            this.ctx.body = await this.ctx.service.food.createdFood(params)
        } catch (error) {
            this.ctx.body = {
                msg: "添加食品失败",
                status: "-1"
            }
        }
    }

    /**
     * @Descripttion: 删除食品
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async deleteFood() {
        let foodId = this.ctx.query.foodId
        foodId = Number(foodId)
        try {
            this.ctx.validate({ foodId: 'number' }, { foodId: foodId })
        } catch (error) {
            this.ctx.body = {
                msg: '参数错误',
                status: '-1'
            }
        }
        return await this.ctx.service.food.deleteFood(foodId)
    }

    /**
     * @Descripttion: 更新食品属性
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async updatedFood() {
        let params = this.ctx.request.body
        params.price = Number(params.price)
        try {
            this.ctx.validate({params: 'updatFood', }, {params: params})
        } catch (error) {
            this.ctx.body = {
                msg: error,
                status: "-1"
            }
            return
        }

        try {
            return await this.ctx.service.food.updatedFood(params)
        } catch (error) {
            this.ctx.body = {
                error: error,
                msg: '更新商品属性失败',
                status: '-1'
            }
        }
    }

    /**
     * @Descripttion: 食品分类
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async findFoodByPage() {
        let { page, pageSize } = this.ctx.request.body
        page = Number(page)
        pageSize = Number(pageSize)

        try {
            this.ctx.validate({ page: "number" }, { page: page })
            this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
        } catch (error) {
            this.ctx.body = {
                msg: "参数错误",
                status: "-1"
            }
            return
        }

        try {
            this.ctx.body = await this.service.food.findMerchantsByName(page, pageSize)
        } catch (error) {
            this.ctx.body = {
                msg: '查询错误',
                status: '-1'
            }
        }

    }

}