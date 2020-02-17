/*
 * @Descripttion: 地址model层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:10:27
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-02-17 21:48:02
 */
import { Application } from "egg";

export default function (app: Application) {
    const { STRING, DECIMAL, BIGINT, INTEGER,CHAR } = app.Sequelize;
    const Address = app.model.define(
        "address",
        {
          id: {
            type: BIGINT,
            primaryKey: true,
            autoIncrement: true
          },
          user_id: INTEGER,
          sex: INTEGER,
          mobile: CHAR(20),
          address: STRING(255),
          detail: STRING(255),
          label: INTEGER,
          is_delete: INTEGER
        },
        {
          freezeTableName: false,
          tableName: "address",
          timestamps: false
        }
    )
    return class extends Address {
    }
}