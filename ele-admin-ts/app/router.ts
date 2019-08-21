/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-21 14:07:18
 */
'use strict';

import { Application } from "egg"
import { admin } from "./router/admin"
import { merchants } from "./router/merchants"

export default function (app: Application) {
  
  admin(app)
  merchants(app)
}
