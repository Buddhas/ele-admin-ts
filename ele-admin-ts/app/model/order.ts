/*
 * @Descripttion: 订单model层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 14:03:38
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-23 20:53:21
 */
import { Application } from "egg";

export default function (app: Application) {
    const { STRING, INTEGER, DECIMAL, DATE } = app.Sequelize;
    const Preferential = app.model.define(
        "preferential",
        {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            shop_id: INTEGER,
            price: DECIMAL,
            create_time: DATE,
            user_id: INTEGER,
            ship_fee: DECIMAL,
            meals_fee: DECIMAL,
            user_address_id: INTEGER,
            preferential_id: INTEGER
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