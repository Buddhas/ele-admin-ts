"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 地址Service层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:15:46
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-05 23:29:57
 */
const egg_1 = require("egg");
class Address extends egg_1.Service {
    /**
     * @Descripttion: 添加地址
     * @Author: 笑佛弥勒
     * @param {params} 地址信息
     * @return:
     */
    async createdAddress(params) {
        return await this.ctx.model.Address.create({
            user_id: params.id,
            user_name: params.user_name,
            sex: params.sex,
            mobile: params.mobile,
            address: params.address,
            detail: params.detail,
            label: params.label,
            is_delete: 0
        });
    }
    /**
     * @Descripttion: 删除地址
     * @Author: 笑佛弥勒
     * @param {foodId} 地址id
     * @return:
     */
    async deleteAddress(id) {
        return await this.ctx.model.Address.update({
            is_delete: 1
        }, {
            where: {
                id: id
            }
        });
    }
    /**
     * @Descripttion: 修改地址属性
     * @Author: 笑佛弥勒
     * @param {params} 地址属性
     * @return:
     */
    async updatedAddress(params) {
        return await this.ctx.model.Address.update({
            user_id: params.user_id,
            user_name: params.user_name,
            sex: params.sex,
            mobile: params.mobile,
            address: params.address,
            detail: params.detail,
            label: params.label
        }, {
            where: {
                id: params.id
            }
        });
    }
    /**
     * @Descripttion: 获取地址详情
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getAddressById(id) {
        return await this.ctx.model.Address.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['is_delete'] },
            raw: true
        });
    }
    /**
     * @Descripttion: 获取地址列表
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getAddressList(id) {
        return await this.ctx.model.Address.findAll({
            where: {
                user_id: id,
                is_delete: 0
            },
            attributes: { exclude: ['is_delete'] },
            raw: true
        });
    }
}
module.exports = Address;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztHQU9HO0FBQ0gsNkJBQThCO0FBRTlCLE1BQU0sT0FBUSxTQUFRLGFBQU87SUFDM0I7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQVc7UUFDckMsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDekMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsU0FBUyxFQUFFLENBQUM7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQVU7UUFDbkMsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ3hDO1lBQ0UsU0FBUyxFQUFFLENBQUM7U0FDYixFQUNEO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxFQUFFO2FBQ1A7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQVc7UUFDckMsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ3hDO1lBQ0UsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7U0FDcEIsRUFDRDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7YUFDZDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBVTtRQUNwQyxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUMxQyxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLEVBQUU7YUFDUDtZQUNELFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RDLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFVO1FBQ3BDLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQzFDLEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEMsR0FBRyxFQUFFLElBQUk7U0FDVixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyJ9