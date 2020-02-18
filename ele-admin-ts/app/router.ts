/*
 * @Descripttion: 路由配置
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-18 22:31:27
 */
'use strict';

import { admin } from "./router/admin"
import { merchants } from "./router/merchants"
import { food } from './router/food'
import { order } from './router/order'
import { mainIndex } from './router/mainIndex'
import { merchantCategory } from './router/merchantCategory'
import { address } from './router/address'
import { user } from './router/user'

module.exports = app => {
  admin(app)
  merchants(app)
  food(app)
  order(app)
  mainIndex(app)
  merchantCategory(app)
  address(app)
  user(app)
}
