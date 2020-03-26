"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 食品Controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-26 12:34:18
 */
const baseController_1 = require("../core/baseController");
const path = require("path");
const enum_1 = require("../util/enum");
class Food extends baseController_1.BaseController {
    /**
     * @Descripttion: 添加食品
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async createdFood() {
        let params = this.ctx.request.body;
        try {
            this.ctx.validate({ params: 'addFood', }, { params: params });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, error);
            return;
        }
        try {
            await this.ctx.service.food.createdFood(params);
            this.success(enum_1.Status.Success, '添加成功');
        }
        catch (error) {
            this.ctx.logger.error(`-----食品添加失败------`, error);
            this.ctx.logger.error(`入参params：${params}`);
            this.fail(enum_1.Status.SystemError, "添加失败");
        }
    }
    /**
     * @Descripttion: 上传食品图片
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateFoodImg() {
        const stream = await this.ctx.getFileStream();
        const uploadBasePath = "app/public/foodImg";
        const filename = `${Date.now()}${path
            .extname(stream.filename)
            .toLocaleLowerCase()}`;
        const target = path.join(uploadBasePath, filename);
        try {
            this.ctx.helper.mkdirSync(path.join(uploadBasePath));
            this.ctx.helper.saveImg(stream, target);
            let data = {
                filename: filename,
                attribute: 'image'
            };
            this.success(enum_1.Status.Success, '食品图片上传成功', data);
        }
        catch (error) {
            this.ctx.logger.error(`-----食品图片上传失败------`, error);
            this.fail(enum_1.Status.SystemError, "食品图片上传失败");
        }
    }
    /**
     * @Descripttion: 删除食品
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async deleteFood() {
        let { foodId } = this.ctx.query;
        try {
            this.ctx.validate({ foodId: 'number' }, { foodId: Number(foodId) });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, "参数错误");
            return;
        }
        try {
            let res = await this.ctx.service.food.deleteFood(Number(foodId));
            if (res[0]) {
                this.success(enum_1.Status.Success, '删除成功');
            }
            else {
                this.fail(enum_1.Status.SystemError, "食品不存在或者已删除");
            }
        }
        catch (error) {
            this.ctx.logger.error(`-----食品删除失败------`, error);
            this.ctx.logger.error(`入参foodId：${foodId}`);
            this.fail(enum_1.Status.SystemError, "食品删除失败");
        }
    }
    /**
     * @Descripttion: 更新食品属性
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updatedFood() {
        let params = this.ctx.request.body;
        try {
            this.ctx.validate({ params: 'addFood', }, { params: params });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, error);
            return;
        }
        try {
            await this.ctx.service.food.updatedFood(params);
            this.success(enum_1.Status.Success, '更新食品属性成功');
        }
        catch (error) {
            this.ctx.logger.error(`-----更新食品属性失败------`, error);
            this.ctx.logger.error(`入参params：${params}`);
            this.fail(enum_1.Status.SystemError, '更新食品属性失败');
        }
    }
    /**
     * @Descripttion: 食品分页
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async findFoodByPage() {
        let { page, pageSize } = this.ctx.query;
        try {
            this.ctx.validate({ page: "number" }, { page: Number(page) });
            this.ctx.validate({ pageSize: "number" }, { pageSize: Number(pageSize) });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.service.food.findFoodByPage(Number(page), Number(pageSize));
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询错误');
        }
    }
    /**
     * @Descripttion: 创建食品分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async createFoodCategory() {
        let params = this.ctx.request.body;
        try {
            this.ctx.validate({ pid: "number" }, { pid: Number(params.pid) });
            this.ctx.validate({ name: "string" }, { name: params.name });
            this.ctx.validate({ desc: "string" }, { desc: params.desc });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            await this.ctx.service.foodCategory.createCategory(params);
            this.success(enum_1.Status.Success, '成功');
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '创建食品分类错误');
            return;
        }
    }
    /**
     * @Descripttion: 获取商铺下食品分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getCategoryByPid() {
        let pid = Number(this.ctx.query.pid);
        try {
            this.ctx.validate({ pid: 'number' }, { pid: pid });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.foodCategory.getCategoryByPid(pid);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '获取食品分类出错');
        }
    }
    /**
     * @Descripttion: 获取单个食品详情
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getFoodById() {
        let foodId = Number(this.ctx.query.foodId);
        try {
            this.ctx.validate({ foodId: 'number' }, { foodId: foodId });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.food.getFoodById(foodId);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '获取食品详情出错');
        }
    }
}
exports.default = Food;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsMkRBQXVEO0FBQ3ZELDZCQUE0QjtBQUM1Qix1Q0FBcUM7QUFFckMsTUFBcUIsSUFBSyxTQUFRLCtCQUFjO0lBQzVDOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLFdBQVc7UUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ2xDLElBQUk7WUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1NBQ2hFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsT0FBTTtTQUNUO1FBRUQsSUFBSTtZQUNBLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDdkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUN4QztJQUNMLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLEtBQUss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