'use strict';

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.createTable('accounts', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
 
   return await queryInterface.dropTable('accounts');
  
  }
};