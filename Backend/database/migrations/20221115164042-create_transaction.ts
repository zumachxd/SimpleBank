
'use strict';

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.createTable('transactions', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      credtedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      }

  })
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.dropTable('transactions');

  }
};
