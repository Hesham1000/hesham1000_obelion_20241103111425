module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      username: 'username1',
      email: 'email1@example.com',
      password: 'hashed_password1',
    },
    {
      username: 'username2',
      email: 'email2@example.com',
      password: 'hashed_password2',
    },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
