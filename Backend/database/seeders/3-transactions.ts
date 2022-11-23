'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('transactions', [{
        debitedAccountId: 1,
          value: 14,
          credtedAccountId: 2,
          createdAt: "2022/11/20"
     },
     {
        debitedAccountId: 1,
        value: 25,
        credtedAccountId: 2,
        createdAt: "2022/11/18"
     },
     {
        debitedAccountId: 2,
        value: 50,
        credtedAccountId: 1,
        createdAt: "2022/10/28"
     }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('transactions', null, {});
     
  }
};