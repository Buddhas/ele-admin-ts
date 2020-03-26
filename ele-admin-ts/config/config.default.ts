/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-26 23:31:38
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
    },
    domainWhiteList: ['http://localhost:8081'],
  }
  config.cors = {
    // origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.multipart = {
    fieldSize: '60kb',
    mode: 'stream',
    fileExtensions: ['.jpg', '.jpeg', '.png'], // 扩展几种上传的文件格式
  };
  // 中间件配置
  config.middleware = ['errorHandler']
  const bizConfig = {
    // your biz config
  };
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '120.79.131.113', // Redis host
      password: '',
      db: 0
    }
  }
  return {
    ...config as {},
    ...bizConfig,
  };
}
