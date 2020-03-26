"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { INTEGER, DECIMAL, BIGINT, STRING, DATE } = app.Sequelize;
    const Op = app.Sequelize.Op;
    const sequelize = app.Sequelize;
    const Order = app.model.define("order", {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        shop_id: INTEGER,
        price: DECIMAL(10, 2),
        create_time: DATE(6),
        user_id: BIGINT,
        ship_fee: DECIMAL(10, 2),
        meals_fee: DECIMAL(10, 2),
        user_address_id: BIGINT,
        preferential_id: BIGINT,
        status: STRING,
        shop_name: STRING(255)
    }, {
        freezeTableName: false,
        tableName: "order",
        timestamps: false
    });
    return class extends Order {
        /**
         * @Descripttion: 修改订单状态
         * @Author: 笑佛弥勒
         * @param {orderId} 订单id
         * @param {status} 订单状态
         * @return:
         */
        static async updateStatus(orderId, status) {
            this.update({
                status: status
            }, {
                where: {
                    id: orderId
                }
            });
        }
        /**
         * @Descripttion: 查询订单
         * @Author: 笑佛弥勒
         * @param {page} 页码
         * @param {pageSize} 页数
         * @param {shopName} 店铺名称
         * @return:
         */
        static async findOrderByPage(page, pageSize, shopName) {
            return this.findAndCountAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                where: {
                    shop_name: {
                        [Op.like]: `%${shopName}%`
                    }
                }
            });
        }
        /**
         * @Descripttion: 当日新增订单数
         * @Author: 笑佛弥勒
         * @param {type}
         * @return:
         */
        static async findOrderTodayCount() {
            return await this.count({
                where: sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('order.create_time')), '>=', sequelize.fn('TO_DAYS', sequelize.fn('now')))
            });
        }
        /**
         * @Descripttion: 获取当前日期前N天订单总量
         * @Author: 笑佛弥勒
         * @param {type}
         * @return:
         */
        static async getAdate(day) {
            return await this.count({
                where: sequelize.where(sequelize.fn('DATE_SUB', sequelize.fn('curdate'), sequelize.literal(`INTERVAL ${day} DAY`)), '=', sequelize.fn('DATE_FORMAT', sequelize.col('order.create_time'), '%Y-%m-%d'))
            });
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLG1CQUF5QixHQUFnQjtJQUNyQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7SUFDaEUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7SUFDM0IsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQTtJQUMvQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDMUIsT0FBTyxFQUNQO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsSUFBSSxFQUFFLE1BQU07WUFDWixVQUFVLEVBQUUsSUFBSTtZQUNoQixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixPQUFPLEVBQUUsTUFBTTtRQUNmLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QixTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekIsZUFBZSxFQUFFLE1BQU07UUFDdkIsZUFBZSxFQUFFLE1BQU07UUFDdkIsTUFBTSxFQUFFLE1BQU07UUFDZCxTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUN6QixFQUNEO1FBQ0ksZUFBZSxFQUFFLEtBQUs7UUFDdEIsU0FBUyxFQUFFLE9BQU87UUFDbEIsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FDSixDQUFDO0lBQ0YsT0FBTyxLQUFNLFNBQVEsS0FBSztRQUN0Qjs7Ozs7O1dBTUc7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFlLEVBQUUsTUFBYztZQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLEVBQUU7Z0JBQ0ssS0FBSyxFQUFFO29CQUNILEVBQUUsRUFBRSxPQUFPO2lCQUNkO2FBQ0osQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUNEOzs7Ozs7O1dBT0c7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtZQUN6RSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3hCLE1BQU0sRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRO2dCQUM3QixLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUU7b0JBQ0gsU0FBUyxFQUFFO3dCQUNQLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksUUFBUSxHQUFHO3FCQUM3QjtpQkFDSjthQUNKLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRDs7Ozs7V0FLRztRQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQzVCLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNwQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzFJLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRDs7Ozs7V0FLRztRQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQVc7WUFDN0IsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3BCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ3hNLENBQUMsQ0FBQTtRQUNOLENBQUM7S0FDSixDQUFBO0FBQ0wsQ0FBQztBQXhGRCw0QkF3RkMifQ==