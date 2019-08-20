/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-19 21:07:42
 */
'use strict';

import { Application } from "egg";
import { admin } from "./router/admin"

export default function(app: Application) {
  const { router, controller } = app;
  admin(app)
}
