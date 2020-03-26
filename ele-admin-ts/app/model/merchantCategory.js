"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { STRING, BIGINT, } = app.Sequelize;
    const merchantCategory = app.model.define("shop_category", {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING(255),
        pid: BIGINT,
        image: STRING(255)
    }, {
        freezeTableName: false,
        tableName: "shop_category",
        timestamps: false
    });
    return class extends merchantCategory {
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbnRDYXRlZ29yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lcmNoYW50Q2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFrQkEsbUJBQXlCLEdBQWdCO0lBQ3ZDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxHQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUMzQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUN2QyxlQUFlLEVBQ2Y7UUFDRSxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsTUFBTTtZQUNaLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1NBQ3BCO1FBQ0QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDakIsR0FBRyxFQUFFLE1BQU07UUFDWCxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNuQixFQUNEO1FBQ0UsZUFBZSxFQUFFLEtBQUs7UUFDdEIsU0FBUyxFQUFFLGVBQWU7UUFDMUIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FDRixDQUFDO0lBQ0YsT0FBTyxLQUFNLFNBQVEsZ0JBQWdCO0tBRXBDLENBQUM7QUFDSixDQUFDO0FBdkJELDRCQXVCQyJ9