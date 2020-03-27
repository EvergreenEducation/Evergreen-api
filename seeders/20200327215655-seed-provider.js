const faker = require('faker');


module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [];

    for (let i = 0; i < 10; i += 1) {
      data.push({
        name: faker.company.companyName(),
        industry: faker.name.jobType(),
        is_public: false,
        description: faker.random.words(),
        location: faker.address.city(),
        cost: faker.random.number(),
        pay: faker.random.number(),
        credit: faker.random.number(),
        created_at: Sequelize.fn('NOW'),
        updated_at: Sequelize.fn('NOW'),
      });
    }
    queryInterface.bulkInsert('providers', data, {});
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('providers', null, {}),
};
