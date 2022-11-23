'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('users', [{
        username:"Zezito",
        password_hash:"$2a$10$y7JB.mbq6BBssB/6UR.PpOFeIOwfJEVprp4furctP9qj.lXJdDut6",
        account_id:1
     },
     {
      username:"EdwardElric",
        password_hash:"$2a$10$Mmn6R2kWhq4rdR2nKwiQ9uaQMtwm54lcG42fim4Wr2WTlcGxTtAdS",
        account_id:2
     }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
