/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-24 17:34:52
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(appInfo) {
    const config = {};
    config.keys = appInfo.name + '123123';
    config.sequelize = {
        dialect: 'mysql',
        database: 'ele',
        host: '120.79.131.113',
        port: 3306,
        username: 'root',
        password: 'rootpassword',
        timezone: '+08:00'
    };
    config.security = {
        csrf: {
            enable: false
        }
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    config.multipart = {
        fieldSize: '60kb',
        mode: 'stream',
        fileExtensions: ['.jpg', '.jpeg', '.png'],
    };
    // 中间件配置
    config.middleware = ['errorHandler'];
    const bizConfig = {
    // your biz config
    };
    config.redis = {
        client: {
            port: 6379,
            host: '120.79.131.113',
            password: '',
            db: 0
        }
    };
    return Object.assign(Object.assign({}, config), bizConfig);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBQ0gsWUFBWSxDQUFDOztBQUliLG1CQUF3QixPQUFxQjtJQUMzQyxNQUFNLE1BQU0sR0FBRyxFQUFnQyxDQUFDO0lBRWhELE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7SUFFdEMsTUFBTSxDQUFDLFNBQVMsR0FBRztRQUNqQixPQUFPLEVBQUUsT0FBTztRQUNoQixRQUFRLEVBQUUsS0FBSztRQUNmLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUUsUUFBUTtLQUNuQixDQUFDO0lBQ0YsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsS0FBSztTQUNkO0tBQ0YsQ0FBQTtJQUNELE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixNQUFNLEVBQUMsR0FBRztRQUNWLFlBQVksRUFBRSxnQ0FBZ0M7S0FDL0MsQ0FBQztJQUNGLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDakIsU0FBUyxFQUFFLE1BQU07UUFDakIsSUFBSSxFQUFFLFFBQVE7UUFDZCxjQUFjLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztLQUMxQyxDQUFDO0lBQ0YsUUFBUTtJQUNSLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUNwQyxNQUFNLFNBQVMsR0FBRztJQUNoQixrQkFBa0I7S0FDbkIsQ0FBQztJQUNGLE1BQU0sQ0FBQyxLQUFLLEdBQUc7UUFDYixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsUUFBUSxFQUFFLEVBQUU7WUFDWixFQUFFLEVBQUUsQ0FBQztTQUNKO0tBQ0osQ0FBQTtJQUNELHVDQUNLLE1BQVksR0FDWixTQUFTLEVBQ1o7QUFDSixDQUFDO0FBN0NELDRCQTZDQyJ9