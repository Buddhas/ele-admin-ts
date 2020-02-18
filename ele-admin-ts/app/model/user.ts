/*
 * @Descripttion: 用户model层
 * @version: 1.0
 * @Author: 笑佛弥勒
 * @Date: 2020-02-18 16:42:14
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-18 16:46:44
 */
import { Application } from "egg";

export default function (app: Application) {
    const { STRING, DECIMAL, BIGINT, INTEGER,CHAR } = app.Sequelize;
    const User = app.model.define(
        "user",
        {
          id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
          user_name: STRING(255),
          email: STRING(255),
          avatar: STRING(255),
          is_delete: INTEGER
        },
        {
          freezeTableName: false,
          tableName: "user",
          timestamps: false
        }
    )
    return class extends User {
    }
}