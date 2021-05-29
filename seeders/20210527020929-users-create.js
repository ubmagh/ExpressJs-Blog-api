'use strict';

const faker = require('faker');

faker.locale = "en";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    for( let i=0; i<20; i++){
      let created_at = faker.date.past(1);
      await queryInterface.bulkInsert('users', [{
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.randomize([ 'admin', 'author', 'guest']),
        createdAt: created_at,
        updatedAt: faker.date.between( created_at, new Date())
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
