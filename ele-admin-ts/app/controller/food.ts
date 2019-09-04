/*
 * @Descripttion: 食品Controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-03 21:04:51
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
        try {
            this.ctx.validate({params: 'addFood', }, {params: params})
        } catch (error) {
            this.ctx.body = {
                msg: error,
                status: 500
            }
            return
        }

        try {
            await this.ctx.service.food.createdFood(params)
            this.ctx.body = {
                msg: "添加成功",
                status: 200
            }
        } catch (error) {
            this.ctx.body = {
                msg: "添加失败",
                status: 500
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
        try {
            this.ctx.validate({ foodId: 'number' }, { foodId: Number(foodId) })
        } catch (error) {
            this.ctx.body = {
                msg: '参数错误',
                status: 500
            }
            return 
        }

        try {
            let res = await this.ctx.service.food.deleteFood(Number(foodId))
            if (res[0]) {
                this.ctx.body = {
                    msg: "删除成功",
                    status: 200
                }
            } else {
                this.ctx.body = {
                    msg: "食品不存在或者已删除",
                    status: 500
                }
            }
        } catch (error) {
            this.ctx.body = {
                msg: "删除失败",
                status: 500
            }
        }
        
    }

    /**
     * @Descripttion: 更新食品属性
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async updatedFood() {
        let params = this.ctx.request.body
        try {
            this.ctx.validate({params: 'updatFood', }, {params: params})
        } catch (error) {
            this.ctx.body = {
                msg: error,
                status: 500
            }
            return
        }

        try {
            await this.ctx.service.food.updatedFood(params)
            this.ctx.body = {
                msg: '更新食品属性成功',
                status: 200
            }
        } catch (error) {
            this.ctx.body = {
                msg: '更新食品属性失败',
                status: 500
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

        try {
            this.ctx.validate({ page: "number" }, { page: page })
            this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize })
        } catch (error) {
            this.ctx.body = {
                msg: "参数错误",
                status: 500
            }
            return
        }

        try {
            this.ctx.body = await this.service.food.findFoodByPage(page, pageSize)
        } catch (error) {
            this.ctx.body = {
                msg: '查询错误',
                status: 500
            }
        }
    }

}