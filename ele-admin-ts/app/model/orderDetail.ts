/*
 * @Descripttion: 订单食品详情model层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 14:03:38
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-26 14:37:19
 */
import { Application } from "egg";

export default function (app: Application) {
    const { INTEGER, DECIMAL, BIGINT, STRING } = app.Sequelize
    const Op = app.Sequelize.Op
    const OrderDetail = app.model.define(
        "order_detail",
        {
            id: {
                type: BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            shop_id: BIGINT,
            user_id: BIGINT,
            food_name: STRING(255),
            food_id: BIGINT,
            count: INTEGER,
            prince: DECIMAL(10, 2)
        },
        {
            freezeTableName: false,
            tableName: "order_detail",
            timestamps: false
        }
    );
    return class extends OrderDetail {
       
    }
}