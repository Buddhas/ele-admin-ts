'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('admins', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      avatar: STRING(255),
      user_name: STRING(255),
      mobile: STRING(50),
      registe_time: DATE(6),
      permissions: STRING(10),
      created_at:  DATE(6),
      updated_at: DATE(6),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('admins');
  },
};
