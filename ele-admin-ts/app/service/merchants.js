"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:30:21
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-07 15:46:08
 */
const egg_1 = require("egg");
const Sequelize = require("sequelize");
class Merchants extends egg_1.Service {
    /**
     * @Descripttion: 创建商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return: 商户信息
     */
    async createMerchants(params) {
        return await this.ctx.model.Merchants.create({
            name: params.name,
            address: params.address,
            mobile: params.mobile,
            synopsis: params.synopsis,
            slogan: params.slogan,
            first_category: params.category[0],
            second_category: params.category[1],
            ship_price: params.ship_price,
            send_price: params.send_price,
            start_time: params.start_time,
            end_time: params.end_time,
            shop_avatar: params.shop_avatar,
            shop_environment: params.shop_environment,
            business_license: params.business_license,
            catering_license: params.catering_license,
            top_up: params.top_up,
            minus: params.minus,
            description: '蜂鸟专送',
            need_time: this.ctx.helper.random(20, 60),
            mon_sale: this.ctx.helper.random(1000, 20000),
            score: 4 + Number(Math.random().toFixed(1)),
            longitude: params.longitude,
            latitude: params.latitude,
            is_delete: 0
        });
    }
    /**
     * @Descripttion: 删除商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async deleteMerchants(id) {
        return await this.ctx.model.Merchants.deleteMerchants(id);
    }
    /**
     * @Descripttion: 商户列表分页
     * @Author: 笑佛弥勒
     * @param {page} 当前页 {pageSize} 当前页数
     * @return:
     */
    async getMerchantsByPage(page, pageSize, orderType) {
        let order = [['score', 'desc']];
        switch (orderType) {
            case 0:
                order = [['id', 'desc']]; // 综合排序
                break;
            case 1:
                order = [['score', 'desc']]; // 好评优先
                break;
            case 2:
                order = [['top_up', 'asc']]; // 起送价最低
                break;
            case 3:
                order = [['need_time', 'asc']]; // 配送最快
                break;
            default:
                break;
        }
        return await this.ctx.model.Merchants.findAndCountAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
            where: {
                is_delete: 0
            },
            order: order
        });
    }
    /**
     * @Descripttion: 更新商户信息
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateMerchants(params) {
        return await this.ctx.model.Merchants.update({
            name: params.name,
            address: params.address,
            mobile: params.mobile,
            synopsis: params.synopsis,
            slogan: params.slogan,
            first_category: params.category[0],
            second_category: params.category[1],
            ship_price: params.ship_price,
            send_price: params.send_price,
            start_time: params.business_hours.start_time,
            end_time: params.business_hours.end_time,
            shop_avatar: params.shop_avatar,
            shop_environment: params.shop_environment,
            business_license: params.business_license,
            catering_license: params.catering_license,
            longitude: params.longitude,
            latitude: params.latitude
        }, {
            where: { id: params.id }
        });
    }
    /**
     * @Descripttion: 根据商铺名称模糊查询商铺
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async findMerchantsByName(page, pageSize, name) {
        return this.ctx.model.Merchants.findMerchantsByName(page, pageSize, name);
    }
    /**
     * @Descripttion: 查询单个商铺
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getMerchantsById(id) {
        let categorys = await this.ctx.model.MerchantCategory.findAll({ raw: true });
        let merchantDetail = await this.ctx.model.Merchants.findOne({
            where: {
                id: id
            },
            raw: true
        }) || {};
        if (merchantDetail) {
            merchantDetail['categorys'] = [];
            categorys.forEach((item, index) => {
                if (item['id'] == merchantDetail['first_category'] || item['id'] == merchantDetail['second_category']) {
                    merchantDetail['categorys'].push(item['name']);
                }
            });
        }
        return merchantDetail;
    }
    /**
     * @Descripttion: 获取商铺下食品
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getFoodByMerId(id) {
        let foodList = [];
        // 查找出商铺下所有分类
        let categorys = await this.ctx.model.FoodCategory.getCategoryByPid(id);
        for (const category of categorys) {
            let items = {};
            // 查找分类下食品
            let foods = await this.ctx.model.Food.findAll({
                where: {
                    category: category['id']
                },
                raw: true
            });
            if (foods && foods.length > 0) {
                items['name'] = category['name'];
                items['foods'] = foods;
                foodList.push(items);
            }
        }
        return foodList;
    }
    /**
     * @Descripttion: 获取分类下商铺数量
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getMerByCategory(type, id, page, pageSize, orderType) {
        let order = [['score', 'desc']];
        switch (orderType) {
            case 0:
                order = [['id', 'desc']]; // 综合排序
                break;
            case 1:
                order = [['score', 'desc']]; // 好评优先
                break;
            case 2:
                order = [['top_up', 'asc']]; // 起送价最低
                break;
            case 3:
                order = [['need_time', 'asc']]; // 配送最快
                break;
            default:
                break;
        }
        // 一级分类
        if (type === 0) {
            return await this.ctx.model.Merchants.findAndCountAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                where: {
                    first_category: id
                },
                order: order
            });
        }
        else { // 二级分类
            return await this.ctx.model.Merchants.findAndCountAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                where: {
                    second_category: id
                },
                order: order
            });
        }
    }
    /**
     * @Descripttion: 模糊搜索商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getMerByKeyword(page, pageSize, keyword) {
        return await this.ctx.model.Merchants.findAndCountAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
            where: {
                is_delete: 0,
                name: {
                    [Sequelize.Op.like]: `%${keyword}%`
                }
            },
        });
    }
}
module.exports = Merchants;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyY2hhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILDZCQUE4QjtBQUM5Qix1Q0FBc0M7QUFDdEMsTUFBTSxTQUFVLFNBQVEsYUFBTztJQUM3Qjs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTTtRQUNqQyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUMzQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDakIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLGNBQWMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxVQUFVO1lBQzdCLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTtZQUM3QixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVU7WUFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztZQUMvQixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1lBQ3pDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7WUFDekMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtZQUN6QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLFdBQVcsRUFBRSxNQUFNO1lBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FB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