"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    const { STRING, INTEGER, DATE, BIGINT, } = app.Sequelize;
    const sequelize = app.Sequelize;
    const Admin = app.model.define("admin", {
        id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        avatar: STRING(255),
        user_name: STRING(255),
        mobile: STRING(50),
        registe_time: DATE(6),
        permissions: STRING(10),
        created_at: DATE(6),
        updated_at: DATE(6),
        password: STRING(255)
    }, {
        freezeTableName: false,
        tableName: "admins",
        timestamps: false
    });
    return class extends Admin {
        static async updateAvatar(url, mobile) {
            return await this.update({ avatar: url }, { where: { mobile: mobile } });
        }
        static async getByIdMobile(mobile) {
            return await this.findOne({
                attributes: ['id', 'avatar', 'user_name', 'permissions', 'registe_time', 'password'],
                where: { mobile: mobile }
            });
        }
        static async findAdminByPage(page, pageSize) {
            return await this.findAndCountAll({
                attributes: ['id', 'avatar', 'user_name', 'permissions', 'registe_time'],
                offset: (page - 1) * pageSize,
                limit: pageSize
            });
        }
        /**
         * @Descripttion: 查询当前注册用户
         * @Author: 笑佛弥勒
         * @param {type}
         * @return:
         */
        static async findRegTodayCount() {
            return await this.count({
                where: sequelize.where(sequelize.fn('TO_DAYS', sequelize.col('admin.registe_time')), '>=', sequelize.fn('TO_DAYS', sequelize.fn('now')))
            });
        }
        /**
         * @Descripttion: 获取当前日期前N天新增管理员总量
         * @Author: 笑佛弥勒
         * @param {type}
         * @return:
         */
        static async getAdate(day) {
            return await this.count({
                where: sequelize.where(sequelize.fn('DATE_SUB', sequelize.fn('curdate'), sequelize.literal(`INTERVAL ${day} DAY`)), '=', sequelize.fn('DATE_FORMAT', sequelize.col('admin.registe_time'), '%Y-%m-%d'))
            });
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLG1CQUF5QixHQUFnQjtJQUN2QyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxHQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUMxRCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFBO0lBQy9CLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUM1QixPQUFPLEVBQ1A7UUFDRSxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsTUFBTTtZQUNaLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1NBQ3BCO1FBQ0QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDbkIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDbEIsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDdkIsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDdEIsRUFDRDtRQUNFLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFNBQVMsRUFBRSxRQUFRO1FBQ25CLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQ0YsQ0FBQztJQUNGLE9BQU8sS0FBTSxTQUFRLEtBQUs7UUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBVyxFQUFFLE1BQWM7WUFDbkQsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFjO1lBQ3ZDLE9BQU8sTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QixVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztnQkFDcEYsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTthQUMxQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBWSxFQUFFLFFBQWdCO1lBQ3pELE9BQU8sTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUNoQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDO2dCQUN4RSxNQUFNLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUTtnQkFDN0IsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNEOzs7OztXQUtHO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7WUFDNUIsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDekksQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNEOzs7OztXQUtHO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBVztZQUMvQixPQUFPLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUU7YUFDdE0sQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDO0FBbEVELDRCQWtFQyJ9