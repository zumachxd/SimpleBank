'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('accounts', [{
        id: 1,
        balance: 100,

     },
     {
      id: 2,
      balance:323,
     }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('account', null, {});
     
  }
};
