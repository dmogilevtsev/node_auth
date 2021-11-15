'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'test@test.ru',
      password: '$2a$12$qOu.pJKFw.WoluKYHmfP2eyZ9JjBcWsCU3A4w4KfW3CdnUmpjecoy',
      isActivated: true,
      activationLink: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
