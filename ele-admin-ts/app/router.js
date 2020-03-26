/*
 * @Descripttion: 路由配置
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-18 22:31:27
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./router/admin");
const merchants_1 = require("./router/merchants");
const food_1 = require("./router/food");
const order_1 = require("./router/order");
const mainIndex_1 = require("./router/mainIndex");
const merchantCategory_1 = require("./router/merchantCategory");
const address_1 = require("./router/address");
const user_1 = require("./router/user");
module.exports = app => {
    admin_1.admin(app);
    merchants_1.merchants(app);
    food_1.food(app);
    order_1.order(app);
    mainIndex_1.mainIndex(app);
    merchantCategory_1.merchantCategory(app);
    address_1.address(app);
    user_1.user(app);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFDSCxZQUFZLENBQUM7O0FBRWIsMENBQXNDO0FBQ3RDLGtEQUE4QztBQUM5Qyx3Q0FBb0M7QUFDcEMsMENBQXNDO0FBQ3RDLGtEQUE4QztBQUM5QyxnRUFBNEQ7QUFDNUQsOENBQTBDO0FBQzFDLHdDQUFvQztBQUVwQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0lBQ3JCLGFBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNWLHFCQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDZCxXQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxhQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVixxQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2QsbUNBQWdCLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNaLFdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNYLENBQUMsQ0FBQSJ9