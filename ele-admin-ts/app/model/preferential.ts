/*
 * @Descripttion:
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 14:03:38
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-05 21:01:46
 */
import { Application } from "egg";

export default function (app: Application) {
    const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;
    const Preferential = app.model.define(
        "preferential",
        {
            id: {
                type: BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            type: STRING(10),
            full_deduction: STRING(10),
            preferential_price: STRING(10),
            shop_id: STRING(10)
        },
        {
            freezeTableName: false,
            tableName: "preferential",
            timestamps: false
        }
    );
    return class extends Preferential {

    }
}