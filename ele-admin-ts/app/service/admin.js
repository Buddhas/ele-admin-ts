"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 管理员Service层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 15:38:40
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 18:07:15
 */
const egg_1 = require("egg");
class Admin extends egg_1.Service {
    /**
     * @Descripttion: 检测时候有这个用户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async hasUser() {
        try {
            let mobile = this.ctx.request.body.mobile;
            return await this.ctx.model.Admin.getByIdMobile(mobile);
        }
        catch (error) {
            throw "查询用户出错";
        }
    }
    /**
     * @Descripttion: 获取用户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getUser(mobile) {
        return await this.ctx.model.Admin.getByIdMobile(mobile);
    }
    /**
     * @Descripttion: 创建用户
     * @Author: 笑佛弥勒
     * @param {mobile} 手机号
     * @param {password} 密码
     * @return:
     */
    async createUser(mobile, password) {
        return await this.ctx.model.Admin.create({
            mobile: mobile,
            password: password,
            user_name: mobile,
            registe_time: new Date(),
            permissions: 1,
            created_at: new Date(),
            updated_at: new Date()
        });
    }
    /**
     * @Descripttion: 更新管理员头像
     * @Author: 笑佛弥勒
     * @param {url} 头像地址，{mobile}管理员手机号
     * @return:
     */
    async updateAvatar(url, mobile) {
        return await this.ctx.model.Admin.updateAvatar(url, mobile);
    }
    /**
     * @Descripttion: 管理员列表分页
     * @Author: 笑佛弥勒
     * @param {page} 当前页 {pageSize} 当前页数
     * @return:
     */
    async findAdminByPage(page, pageSize) {
        return await this.ctx.model.Admin.findAdminByPage(page, pageSize);
    }
    /**
     * @Descripttion: 获取当日新注册管理员总数
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async findRegTodayCount() {
        return await this.ctx.model.Admin.findRegTodayCount();
    }
    /**
     * @Descripttion: 获取管理员数量
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async regCount() {
        return await this.ctx.model.Admin.count();
    }
    /**
     * @Descripttion: 查询一周数据
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async dateAWeek() {
        let adminData = [];
        let orderData = [];
        let weekData = {
            adminData: adminData,
            orderData: orderData
        };
        for (let i = 0; i < 7; i++) {
            weekData.adminData.push(await this.ctx.model.Admin.getAdate(i));
            weekData.orderData.push(await this.ctx.model.Order.getAdate(i));
        }
        return weekData;
    }
    /**
     * @Descripttion: 查询当天数据
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async currentData() {
        let todayAd = await this.ctx.model.Admin.findRegTodayCount();
        let todayOrder = await this.ctx.model.Order.findOrderTodayCount();
        let countAd = await this.ctx.model.Admin.count();
        let countOrder = await this.ctx.model.Order.count();
        let current = {
            today: {
                admin: todayAd,
                order: todayOrder
            },
            total: {
                admin: countAd,
                order: countOrder
            },
        };
        return current;
    }
}
module.exports = Admin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0dBT0c7QUFDSCw2QkFBOEI7QUFFOUIsTUFBTSxLQUFNLFNBQVEsYUFBTztJQUN6Qjs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLElBQUk7WUFDRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzFDLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLFFBQVEsQ0FBQztTQUNoQjtJQUNILENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBYTtRQUM5QixPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUTtRQUN0QyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN2QyxNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFlBQVksRUFBRSxJQUFJLElBQUksRUFBRTtZQUN4QixXQUFXLEVBQUUsQ0FBQztZQUNkLFVBQVUsRUFBRSxJQUFJLElBQUksRUFBRTtZQUN0QixVQUFVLEVBQUUsSUFBSSxJQUFJLEVBQUU7U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLFlBQVks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