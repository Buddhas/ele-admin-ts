"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { INTEGER, DECIMAL, BIGINT, STRING } = app.Sequelize;
    const Op = app.Sequelize.Op;
    const OrderDetail = app.model.define("order_detail", {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        shop_id: BIGINT,
        user_id: BIGINT,
        food_name: STRING(255),
        food_id: BIGINT,
        count: INTEGER,
        prince: DECIMAL(10, 2)
    }, {
        freezeTableName: false,
        tableName: "order_detail",
        timestamps: false
    });
    return class extends OrderDetail {
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJEZXRhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcmRlckRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLG1CQUF5QixHQUFnQjtJQUNyQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQTtJQUMxRCxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQTtJQUMzQixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDaEMsY0FBYyxFQUNkO1FBQ0ksRUFBRSxFQUFFO1lBQ0EsSUFBSSxFQUFFLE1BQU07WUFDWixVQUFVLEVBQUUsSUFBSTtZQUNoQixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxNQUFNO1FBQ2YsT0FBTyxFQUFFLE1BQU07UUFDZixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3pCLEVBQ0Q7UUFDSSxlQUFlLEVBQUUsS0FBSztRQUN0QixTQUFTLEVBQUUsY0FBYztRQUN6QixVQUFVLEVBQUUsS0FBSztLQUNwQixDQUNKLENBQUM7SUFDRixPQUFPLEtBQU0sU0FBUSxXQUFXO0tBRS9CLENBQUE7QUFDTCxDQUFDO0FBM0JELDRCQTJCQyJ9