"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 用户service层
 * @version: 1.0
 * @Author: 笑佛弥勒
 * @Date: 2020-02-18 16:47:33
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 12:11:45
 */
const egg_1 = require("egg");
class User extends egg_1.Service {
    /**
     * @Descripttion: 创建用户
     * @Author: 笑佛弥勒
     * @param {params} 用户信息
     * @return:
     */
    async createdUser(params) {
        return await this.ctx.model.User.create({
            user_name: params.user_name,
            email: params.email,
            created_at: new Date(),
            updated_at: new Date(),
            is_delete: 0
        });
    }
    /**
     * @Descripttion: 获取用户详情
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getUserByEmail(email) {
        let data = await this.ctx.model.User.findOne({
            where: {
                email: email
            },
            attributes: { exclude: ['is_delete'] }
        }) || null;
        return data;
    }
    /**
     * @Descripttion: 获取用户列表
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getUserList(page, pageSize) {
        return await this.ctx.model.User.findAndCountAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
            where: {
                is_delete: 0
            },
            attributes: { exclude: ['is_delete'] }
        });
    }
}
module.exports = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsNkJBQThCO0FBRTlCLE1BQU0sSUFBSyxTQUFRLGFBQU87SUFDeEI7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQVc7UUFDbEMsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdEMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztZQUNuQixVQUFVLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ3RCLFNBQVMsRUFBRSxDQUFDO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFZO1FBQ3RDLElBQUksSUFBSSxHQUFRLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNoRCxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7YUFDYjtZQUNELFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1NBQ3ZDLENBQUMsSUFBSSxJQUFJLENBQUE7UUFDVixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBVyxFQUFFLFFBQWU7UUFDbkQsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDL0MsTUFBTSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVE7WUFDN0IsS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1NBQ3ZDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDIn0=