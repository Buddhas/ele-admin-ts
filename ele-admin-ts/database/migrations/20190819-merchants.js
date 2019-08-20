/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-19 16:05:26
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-19 17:42:31
 */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      const { INTEGER, DATE, STRING,DECIMAL } = Sequelize;
      await queryInterface.createTable('merchants', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(255),
        address: STRING(255),
        mobile: STRING(20),
        synopsis: STRING(255),
        slogan: STRING(255),
        category: STRING(255),
        ship_price: DECIMAL(3, 0),
        send_price: DECIMAL(3, 0),
        start_time: STRING(10),
        end_time: STRING(10),
        shop_avatar: STRING(50),
        business_license: STRING(50),
        catering_license: STRING(50),
        score: STRING(10),
        longitude: STRING(10),
        latitude: STRING(10),
        is_delete: INTEGER
      });
    },
  
    down: async queryInterface => {
      await queryInterface.dropTable('merchants');
    },
  };