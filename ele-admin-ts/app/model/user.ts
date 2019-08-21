/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-05 20:17:58
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-21 11:32:33
 */
'use strict';

import { Application } from 'egg';

export default function (app: Application) {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE(6),
    updated_at: DATE(6),
  },
    {
      freezeTableName: true,
      tableName: 'user',
      timestamps: false
    }
  );

  return class extends User {

  }
}