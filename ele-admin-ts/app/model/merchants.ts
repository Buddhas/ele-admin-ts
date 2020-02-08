/*
 * @Descripttion: 商户model层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:21:27
 * @LastEditors  : 笑佛弥勒
 * @LastEditTime : 2020-02-08 16:24:36
 */
"use strict";

import { Application } from "egg";


export default function (app: Application) {
  const { INTEGER, DATE, STRING, DECIMAL,BIGINT } = app.Sequelize;
  const Op = app.Sequelize.Op
  
  const Merchants = app.model.define(
    "merchants",
    {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      address: STRING(255),
      mobile: STRING(20),
      synopsis: STRING(255),
      slogan: STRING(255),
      first_category: STRING(10),
      second_category: STRING(10),
      ship_price: DECIMAL(3, 0),
      send_price: DECIMAL(3, 0),
      start_time: STRING(10),
      end_time: STRING(10),
      shop_avatar: STRING(50),
      shop_environment: STRING(50),
      business_license: STRING(50),
      catering_license: STRING(50),
      need_time: INTEGER,
      mon_sale: INTEGER,
      description: STRING(50),
      top_up: INTEGER,
      minus: INTEGER,
      score: STRING(10),
      longitude: STRING(10),
      latitude: STRING(10),
      is_delete: INTEGER
    },
    {
      freezeTableName: false,
      tableName: "merchants",
      timestamps: false
    }
  );

  return class extends Merchants {
    /**
     * @Descripttion: 逻辑删除商户
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    static async deleteMerchants(id: number) {
      return this.update(
        {
          is_delete: 1
        },
        {
          where: { id: id }
        }
      );
    }
    /**
     * @Descripttion: 商户列表分页
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    static async findMerchantsByPage(page: number, pageSize: number) {
      return await this.findAndCountAll({
        offset: (page - 1) * pageSize,
        limit: pageSize,
        where: {
          is_delete: 0
        }
      });
    }
    /**
     * @Descripttion: 根据商铺名称模糊查询商铺
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    static async findMerchantsByName(page: number, pageSize: number, name: string) {
      return await this.findAndCountAll({
        offset: (page - 1) * pageSize,
        limit: pageSize,
        where: {
          name: {
            [Op.like]: `%${name}%` 
          }, 
          is_delete: 0
        }
      }).then(res => {
        res['page'] = page
        res['pageSize'] = pageSize
        return res
      })
    }
  };
}
