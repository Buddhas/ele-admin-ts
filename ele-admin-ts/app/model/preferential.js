"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;
    const Preferential = app.model.define("preferential", {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        type: STRING(10),
        full_deduction: STRING(10),
        preferential_price: STRING(10),
        shop_id: STRING(10)
    }, {
        freezeTableName: false,
        tableName: "preferential",
        timestamps: false
    });
    return class extends Preferential {
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW50aWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJlZmVyZW50aWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVUEsbUJBQXlCLEdBQWdCO0lBQ3JDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ3hELE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNqQyxjQUFjLEVBQ2Q7UUFDSSxFQUFFLEVBQUU7WUFDQSxJQUFJLEVBQUUsTUFBTTtZQUNaLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCO1FBQ0QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUIsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM5QixPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztLQUN0QixFQUNEO1FBQ0ksZUFBZSxFQUFFLEtBQUs7UUFDdEIsU0FBUyxFQUFFLGNBQWM7UUFDekIsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FDSixDQUFDO0lBQ0YsT0FBTyxLQUFNLFNBQVEsWUFBWTtLQUVoQyxDQUFBO0FBQ0wsQ0FBQztBQXhCRCw0QkF3QkMifQ==