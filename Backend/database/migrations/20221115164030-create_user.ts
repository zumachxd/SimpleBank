'use strict';

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.createTable('users', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password_hash'
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'account_id',
        references: {
          model: 'accounts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      }
     }
    )
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.dropTable('users');
  }
};

