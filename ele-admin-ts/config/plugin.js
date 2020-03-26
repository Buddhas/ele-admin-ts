/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-10 14:36:57
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const plugin = {};
plugin.sequelize = {
    package: 'egg-sequelize',
    enable: true,
};
plugin.cors = {
    enable: true,
    package: 'egg-cors',
};
plugin.validate = {
    enable: true,
    package: 'egg-validate',
};
// 开启redis
plugin.redis = {
    enable: true,
    package: 'egg-redis',
};
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFDSCxZQUFZLENBQUM7O0FBSWIsTUFBTSxNQUFNLEdBQWMsRUFBRSxDQUFDO0FBRTdCLE1BQU0sQ0FBQyxTQUFTLEdBQUc7SUFDakIsT0FBTyxFQUFFLGVBQWU7SUFDeEIsTUFBTSxFQUFFLElBQUk7Q0FDYixDQUFDO0FBRUYsTUFBTSxDQUFDLElBQUksR0FBRztJQUNaLE1BQU0sRUFBRSxJQUFJO0lBQ1osT0FBTyxFQUFFLFVBQVU7Q0FDcEIsQ0FBQTtBQUVELE1BQU0sQ0FBQyxRQUFRLEdBQUk7SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixPQUFPLEVBQUUsY0FBYztDQUN4QixDQUFBO0FBQ0QsVUFBVTtBQUNWLE1BQU0sQ0FBQyxLQUFLLEdBQUc7SUFDYixNQUFNLEVBQUUsSUFBSTtJQUNaLE9BQU8sRUFBRSxXQUFXO0NBQ3JCLENBQUM7QUFDRixrQkFBZSxNQUFNLENBQUMifQ==