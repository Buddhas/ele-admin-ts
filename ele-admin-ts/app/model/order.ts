/*
 * @Descripttion: 订单model层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 14:03:38
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-26 17:15:40
 */
import { Application } from "egg";

export default function (app: Application) {
    const { INTEGER, DECIMAL, BIGINT, STRING } = app.Sequelize
    const Op = app.Sequelize.Op
    const Order = app.model.define(
        "order",
        {
            id: {
                type: BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            shop_id: INTEGER,
            price: DECIMAL(10, 2),
            create_time: BIGINT,
            user_id: BIGINT,
            ship_fee: DECIMAL(10, 2),
            meals_fee: DECIMAL(10, 2),
            user_address_id: BIGINT,
            preferential_id: BIGINT,
            status: INTEGER,
            shop_name: STRING(255)
        },
        {
            freezeTableName: false,
            tableName: "order",
            timestamps: false
        }
    );
    return class extends Order {
        /**
         * @Descripttion: 修改订单状态
         * @Author: 笑佛弥勒
         * @param {orderId} 订单id
         * @param {status} 订单状态
         * @return: 
         */
        static async updateStatus(orderId: number, status: number) {
            this.update({
                status: status
            }, {
                    where: {
                        id: orderId
                    }
                })
        }
        /**
         * @Descripttion: 查询订单
         * @Author: 笑佛弥勒
         * @param {page} 页码
         * @param {pageSize} 页数
         * @param {shopName} 店铺名称
         * @return: 
         */
        static async findOrderByPage(page: number, pageSize: number, shopName: string) {
            return this.findAndCountAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                where: {
                    shop_name: {
                        [Op.like]: `%${shopName}%`
                    }
                }
            })
        }
    }
}