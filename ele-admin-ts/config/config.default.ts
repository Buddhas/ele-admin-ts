/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-12 20:02:08
 */
'use strict';

import { EggAppConfig, PowerPartial } from 'egg';

export default function(appInfo: EggAppConfig) {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '123123';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
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
  }
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  // 中间件配置
  config.middleware = ['errorHandler']
  const bizConfig = {
    // your biz config
  };

  return {
    ...config as {},
    ...bizConfig,
  };
}
