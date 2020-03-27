/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-27 22:23:24
 */
'use strict';

import { EggPlugin } from 'egg';

const plugin: EggPlugin = {};

plugin.sequelize = {
  package: 'egg-sequelize',
  enable: true
};

plugin.cors = {
  enable: true,
  package: 'egg-cors'
}

plugin.validate  = {
  enable: true,
  package: 'egg-validate'
}
// 开启redis
plugin.redis = {
  enable: true,
  package: 'egg-redis'
};
// 静态资源
plugin.static = {
  enable: true,
  package: 'egg-static'
}
export default plugin;
