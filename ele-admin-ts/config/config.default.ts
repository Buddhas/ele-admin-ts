/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-27 22:24:26
 */
'use strict';

import { EggAppConfig, PowerPartial } from 'egg';
import * as path from 'path'

export default function(appInfo: EggAppConfig) {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '123123';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'ele',
    host: '120.79.131.113',
    port: 3306,
    username: '',
    password: '',
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
  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/static', 
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  }
  return {
    ...config as {},
    ...bizConfig,
  };
}
