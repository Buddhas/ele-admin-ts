/*
 * @Descripttion: 管理员model层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 15:17:07
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-26 17:38:25
 */
import { Application } from "egg";

export default function (app: Application) {
  const { STRING, BIGINT,  } = app.Sequelize;
  const ShopCategory = app.model.define(
    "shop_category",
    {
      id: {
        type: BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: STRING(255),
      pid: BIGINT,
      image: STRING(255)
    },
    {
      freezeTableName: false,
      tableName: "shop_category",
      timestamps: false
    }
  );
  return class extends ShopCategory {
    
  };
}
