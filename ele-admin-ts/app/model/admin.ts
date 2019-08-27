/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 15:17:07
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-26 10:22:12
 */
import { Application } from "egg";

export default function (app: Application) {
  const { STRING, INTEGER, DATE, BIGINT } = app.Sequelize;
  const Admin = app.model.define(
    "admin",
    {
      id: {
        type: BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      avatar: STRING(255),
      user_name: STRING(255),
      mobile: STRING(50),
      registe_time: DATE(6),
      permissions: STRING(10),
      created_at: DATE(6),
      updated_at: DATE(6),
      password: STRING(255)
    },
    {
      freezeTableName: false,
      tableName: "admins",
      timestamps: false
    }
  );
  return class extends Admin {
    static async updateAvatar(url: string, mobile: string) {
      return await this.update({ avatar: url }, { where: { mobile: mobile } });
    }
    static async findByIdMobile(mobile: string) {
      return await this.findOne({
        where: { mobile: mobile }
      });
    }
    static async findAdminByPage(page: number, pageSize: number) {
      return await this.findAndCountAll({
        offset: (page - 1) * pageSize,
        limit: pageSize
      });
    }
  };
}
