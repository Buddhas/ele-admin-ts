/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-12 16:49:07
 */
'use strict';

import { EggPlugin } from 'egg';

const plugin: EggPlugin = {};

plugin.sequelize = {
  package: 'egg-sequelize',
  enable: true,
};

plugin.cors = {
  enable: true,
  package: 'egg-cors',
}

plugin.validate  = {
  enable: true,
  package: 'egg-validate',
}
export default plugin;
