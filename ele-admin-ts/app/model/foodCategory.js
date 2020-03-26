"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { STRING, BIGINT, } = app.Sequelize;
    const FoodCategory = app.model.define("food_category", {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING(255),
        pid: BIGINT,
        desc: STRING(255)
    }, {
        freezeTableName: false,
        tableName: "food_category",
        timestamps: false
    });
    return class extends FoodCategory {
        static async getCategoryByPid(pid) {
            return await this.findAll({
                where: {
                    pid: pid
                },
                raw: true
            });
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vZENhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9vZENhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsbUJBQXlCLEdBQWdCO0lBQ3ZDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxHQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUMzQyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbkMsZUFBZSxFQUNmO1FBQ0UsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLE1BQU07WUFDWixVQUFVLEVBQUUsSUFBSTtZQUNoQixhQUFhLEVBQUUsSUFBSTtTQUNwQjtRQUNELElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2pCLEdBQUcsRUFBRSxNQUFNO1FBQ1gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDbEIsRUFDRDtRQUNFLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFNBQVMsRUFBRSxlQUFlO1FBQzFCLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQ0YsQ0FBQztJQUNGLE9BQU8sS0FBTSxTQUFRLFlBQVk7UUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFXO1lBQ3ZDLE9BQU8sTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QixLQUFLLEVBQUU7b0JBQ0wsR0FBRyxFQUFFLEdBQUc7aUJBQ1Q7Z0JBQ0QsR0FBRyxFQUFFLElBQUk7YUFDVixDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUE5QkQsNEJBOEJDIn0=