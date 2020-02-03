/*
 * @Descripttion: 食品分类model层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 15:17:07
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-03 23:26:42
 */
import { Application } from "egg";

export default function (app: Application) {
  const { STRING, BIGINT,  } = app.Sequelize;
  const FoodCategory = app.model.define(
    "food_category",
    {
      id: {
        type: BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: STRING(255),
      pid: BIGINT,
      desc: STRING(255)
    },
    {
      freezeTableName: false,
      tableName: "food_category",
      timestamps: false
    }
  );
  return class extends FoodCategory {
    static async getCategoryByPid(pid: number) {
      return await this.findAll({
        where: {
          pid: pid
        },
        raw: true
      })
    }
  };
}
