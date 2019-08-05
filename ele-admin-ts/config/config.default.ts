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

  const bizConfig = {
    // your biz config
  };

  return {
    ...config as {},
    ...bizConfig,
  };
}
