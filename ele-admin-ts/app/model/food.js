"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { STRING, DECIMAL, BIGINT, INTEGER } = app.Sequelize;
    const Food = app.model.define("food", {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING(255),
        introduce: STRING(255),
        category: STRING(50),
        image: STRING(50),
        shop_id: BIGINT,
        rate: INTEGER,
        price: DECIMAL,
        package_price: DECIMAL,
        mon_sale: BIGINT,
        score: STRING(10),
        is_delete: STRING(10)
    }, {
        freezeTableName: false,
        tableName: "food",
        timestamps: false
    });
    return class extends Food {
        static async findFoodByPage(page, pageSize) {
            return await this.findAndCountAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                where: {
                    is_delete: 0
                }
            });
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFVQSxtQkFBeUIsR0FBZ0I7SUFDckMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ3pCLE1BQU0sRUFDTjtRQUNFLEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxNQUFNO1lBQ1osVUFBVSxFQUFFLElBQUk7WUFDaEIsYUFBYSxFQUFFLElBQUk7U0FDcEI7UUFDRCxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNqQixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNwQixLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNqQixPQUFPLEVBQUUsTUFBTTtRQUNmLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFLE9BQU87UUFDZCxhQUFhLEVBQUUsT0FBTztRQUN0QixRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNqQixTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUN0QixFQUNEO1FBQ0UsZUFBZSxFQUFFLEtBQUs7UUFDdEIsU0FBUyxFQUFFLE1BQU07UUFDakIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FDSixDQUFBO0lBQ0QsT0FBTyxLQUFNLFNBQVEsSUFBSTtRQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFZLEVBQUUsUUFBZ0I7WUFDeEQsT0FBTyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ2hDLE1BQU0sRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRO2dCQUM3QixLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUU7b0JBQ0wsU0FBUyxFQUFFLENBQUM7aUJBQ2I7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0YsQ0FBQTtBQUNMLENBQUM7QUF2Q0QsNEJBdUNDIn0=