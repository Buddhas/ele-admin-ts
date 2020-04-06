/*
 * @Descripttion: 食品Controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-04-06 12:14:59
 */
import { BaseController } from '../core/baseController'
import * as path from 'path'
import { Status } from "../util/enum"

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
            this.ctx.validate({ params: 'addFood', }, { params: params })
        } catch (error) {
            this.fail(Status.InvalidParams, error)
            return
        }

        try {
            await this.ctx.service.food.createdFood(params)
            this.success(Status.Success, '添加成功')
        } catch (error) {
            this.ctx.logger.error(`-----食品添加失败------`, error)
            this.ctx.logger.error(`入参params：${params}`)
            this.fail(Status.SystemError, "添加失败")
        }
    }
    /**
     * @Descripttion: 上传食品图片
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async updateFoodImg() {
        const stream = await this.ctx.getFileStream()
        const uploadBasePath = "app/public/foodImg"
        const filename = `${Date.now()}${path
            .extname(stream.filename)
            .toLocaleLowerCase()}`
        const target = path.join(uploadBasePath, filename)
        try {
            this.ctx.helper.mkdirSync(path.join(uploadBasePath))
            await this.ctx.helper.saveImg(stream, target)
            let data = {
                filename: 'foodImg/' + filename,
                attribute: 'image'
            }
            this.success(Status.Success, '食品图片上传成功', data)
        } catch (error) {
            this.ctx.logger.error(`-----食品图片上传失败------`, error)
            this.fail(Status.SystemError, "食品图片上传失败")
        }
    }
    /**
     * @Descripttion: 删除食品
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async deleteFood() {
        let { foodId } = this.ctx.query
        try {
            this.ctx.validate({ foodId: 'number' }, { foodId: Number(foodId) })
        } catch (error) {
            this.fail(Status.InvalidParams, "参数错误")
            return
        }

        try {
            let res = await this.ctx.service.food.deleteFood(Number(foodId))
            if (res[0]) {
                this.success(Status.Success, '删除成功')
            } else {
                this.fail(Status.SystemError, "食品不存在或者已删除")
            }
        } catch (error) {
            this.ctx.logger.error(`-----食品删除失败------`, error)
            this.ctx.logger.error(`入参foodId：${foodId}`)
            this.fail(Status.SystemError, "食品删除失败")
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
            this.ctx.validate({ params: 'addFood', }, { params: params })
        } catch (error) {
            this.fail(Status.InvalidParams, error)
            return
        }

        try {
            await this.ctx.service.food.updatedFood(params)
            this.success(Status.Success, '更新食品属性成功')
        } catch (error) {
            this.ctx.logger.error(`-----更新食品属性失败------`, error)
            this.ctx.logger.error(`入参params：${params}`)
            this.fail(Status.SystemError, '更新食品属性失败')
        }
    }

    /**
     * @Descripttion: 食品分页
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async findFoodByPage() {
        let { page, pageSize } = this.ctx.query

        try {
            this.ctx.validate({ page: "number" }, { page: Number(page) })
            this.ctx.validate({ pageSize: "number" }, { pageSize: Number(pageSize) })
        } catch (error) {
            this.fail(Status.InvalidParams, '参数错误')
            return
        }

        try {
            let data = await this.service.food.findFoodByPage(Number(page), Number(pageSize))
            this.success(Status.Success, '成功', data)
        } catch (error) {
            this.fail(Status.SystemError, '查询错误')
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
            this.ctx.validate({ pid: "number" }, { pid: Number(params.pid) })
            this.ctx.validate({ name: "string" }, { name: params.name })
            this.ctx.validate({ desc: "string" }, { desc: params.desc })
        } catch (error) {
            this.fail(Status.InvalidParams, '参数错误')
            return
        }

        try {
            await this.ctx.service.foodCategory.createCategory(params)
            this.success(Status.Success, '成功')
        } catch (error) {
            this.fail(Status.SystemError, '创建食品分类错误')
            return
        }
    }

    /**
     * @Descripttion: 获取商铺下食品分类
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async getCategoryByPid() {
        let pid = Number(this.ctx.query.pid)
        try {
            this.ctx.validate({ pid: 'number' }, { pid: pid })
        } catch (error) {
            this.fail(Status.InvalidParams, '参数错误')
            return
        }
        try {
            let data = await this.ctx.service.foodCategory.getCategoryByPid(pid)
            this.success(Status.Success, '成功', data)
        } catch (error) {
            this.fail(Status.SystemError, '获取食品分类出错')
        }
    }

    /**
     * @Descripttion: 获取单个食品详情
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async getFoodById() {
        let foodId = Number(this.ctx.query.foodId)
        try {
            this.ctx.validate({ foodId: 'number' }, { foodId: foodId })
        } catch (error) {
            this.fail(Status.InvalidParams, '参数错误')
            return
        }
        try {
            let data = await this.ctx.service.food.getFoodById(foodId)
            this.success(Status.Success, '成功', data)
        } catch (error) {
            this.fail(Status.SystemError, '获取食品详情出错')
        }
    }
    
}