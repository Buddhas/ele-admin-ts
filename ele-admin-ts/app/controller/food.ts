/*
 * @Descripttion: 食品Controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-28 15:17:59
 */
import { BaseController } from '../core/baseController'

export default class Food extends BaseController {
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
            this.fail(500, error)
            return
        }

        try {
            await this.ctx.service.food.createdFood(params)
            this.success(200, '添加成功')
        } catch (error) {
            this.ctx.logger.error(`-----食品添加失败------`, error)
            this.ctx.logger.error(`入参params：${params}`)
            this.fail(500, "添加失败")
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
            this.fail(500, "参数错误")
            return 
        }

        try {
            let res = await this.ctx.service.food.deleteFood(Number(foodId))
            if (res[0]) {
                this.success(200, '删除成功')
            } else {
                this.fail(500, "食品不存在或者已删除")
            }
        } catch (error) {
            this.ctx.logger.error(`-----食品删除失败------`, error)
            this.ctx.logger.error(`入参foodId：${foodId}`)
            this.fail(500, "食品删除失败")
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
            this.fail(500, error)
            return
        }

        try {
            await this.ctx.service.food.updatedFood(params)
            this.success(200, '更新食品属性成功')
        } catch (error) {
            this.ctx.logger.error(`-----更新食品属性失败------`, error)
            this.ctx.logger.error(`入参params：${params}`)
            this.fail(500, '更新食品属性失败')
        }
    }

    /**
     * @Descripttion: 食品分页
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
            this.fail(500, '参数错误')
            return
        }

        try {
            this.ctx.body = await this.service.food.findFoodByPage(page, pageSize)
        } catch (error) {
            this.fail(500, '查询错误')
        }
    }

    /**
     * @Descripttion: 创建食品分类
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async createFoodCategory() {
        let params = this.ctx.request.body
        try {
            this.ctx.validate({ pid: "number" }, { pid: params.pid })
            this.ctx.validate({ name: "string" }, { name: params.name })
            this.ctx.validate({ desc: "string" }, { desc: params.desc })
        } catch (error) {
            this.fail(500, '参数错误')
            return
        }

        try {
            await this.ctx.service.foodCategory.createCategory(params)
            this.success(200, '成功')
        } catch (error) {
            this.fail(500, '创建食品分类错误')
            return
        }
    }
    
    public async getCategoryByPid() {
        let pid = this.ctx.query.pid
        try {
            this.ctx.validate({pid: 'number'},{pid: pid})
        } catch (error) {
            this.fail(500, '参数错误')
        }
        try {
            let data = await this.ctx.service.foodCategory.getCategoryByPid(pid)
            this.success(200, '成功', data)
        } catch (error) {
            this.fail(500, '获取食品分类出错')
        }
    }

}