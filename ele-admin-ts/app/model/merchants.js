/*
 * @Descripttion: 商户model层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:21:27
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-11 23:24:02
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { INTEGER, DATE, STRING, DECIMAL, BIGINT } = app.Sequelize;
    const Op = app.Sequelize.Op;
    const Merchants = app.model.define("merchants", {
        id: { type: BIGINT, primaryKey: true, autoIncrement: true },
        name: STRING(255),
        address: STRING(255),
        mobile: STRING(20),
        synopsis: STRING(255),
        slogan: STRING(255),
        first_category: STRING(10),
        second_category: STRING(10),
        ship_price: DECIMAL(3, 0),
        send_price: DECIMAL(3, 0),
        start_time: STRING(10),
        end_time: STRING(10),
        shop_avatar: STRING(50),
        shop_environment: STRING(50),
        business_license: STRING(50),
        catering_license: STRING(50),
        need_time: INTEGER,
        mon_sale: INTEGER,
        description: STRING(50),
        top_up: INTEGER,
        minus: INTEGER,
        score: STRING(10),
        longitude: STRING(10),
        latitude: STRING(10),
        is_delete: INTEGER
    }, {
        freezeTableName: false,
        tableName: "merchants",
        timestamps: false
    });
    return class extends Merchants {
        /**
         * @Descripttion: 逻辑删除商户
         * @Author: 笑佛弥勒
         * @param {type}
         * @return:
         */
        static async deleteMerchants(id) {
            return this.update({
                is_delete: 1
            }, {
                where: { id: id }
            });
        }
        /**
         * @Descripttion: 商户列表分页
         * @Author: 笑佛弥勒
         * @param {type}
         * @return:
         */
        static async getMerchantsByPage(page, pageSize) {
            return await this.findAndCountAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                where: {
                    is_delete: 0
                }
            });
        }
        /**
         * @Descripttion: 根据商铺名称模糊查询商铺
         * @Author: 笑佛弥勒
         * @param {type}
         * @return:
         */
        static async findMerchantsByName(page, pageSize, name) {
            return await this.findAndCountAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    },
                    is_delete: 0
                }
            }).then(res => {
                res['page'] = page;
                res['pageSize'] = pageSize;
                return res;
            });
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVyY2hhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFDSCxZQUFZLENBQUM7O0FBS2IsbUJBQXlCLEdBQWdCO0lBQ3ZDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNoRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUUzQixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDaEMsV0FBVyxFQUNYO1FBQ0UsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUU7UUFDM0QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDakIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDcEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDbkIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUIsZUFBZSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDM0IsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixVQUFVLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNwQixXQUFXLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN2QixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzVCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDNUIsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM1QixTQUFTLEVBQUUsT0FBTztRQUNsQixRQUFRLEVBQUUsT0FBTztRQUNqQixXQUFXLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN2QixNQUFNLEVBQUUsT0FBTztRQUNmLEtBQUssRUFBRSxPQUFPO1FBQ2QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDakIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDcEIsU0FBUyxFQUFFLE9BQU87S0FDbkIsRUFDRDtRQUNFLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQ0YsQ0FBQztJQUVGLE9BQU8sS0FBTSxTQUFRLFNBQVM7UUFDNUI7Ozs7O1dBS0c7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFVO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FDaEI7Z0JBQ0UsU0FBUyxFQUFFLENBQUM7YUFDYixFQUNEO2dCQUNFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7YUFDbEIsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQUNEOzs7OztXQUtHO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsUUFBZ0I7WUFDNUQsT0FBTyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ2hDLE1BQU0sRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRO2dCQUM3QixLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUU7b0JBQ0wsU0FBUyxFQUFFLENBQUM7aUJBQ2I7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0Q7Ozs7O1dBS0c7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLElBQVk7WUFDM0UsT0FBTyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ2hDLE1BQU0sRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRO2dCQUM3QixLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFO3dCQUNKLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxHQUFHO3FCQUN2QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQztpQkFDYjthQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQTtnQkFDbEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtnQkFDMUIsT0FBTyxHQUFHLENBQUE7WUFDWixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQztBQS9GRCw0QkErRkMifQ==