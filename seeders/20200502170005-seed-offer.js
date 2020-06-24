const faker = require('faker');


module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [];

    for (let i = 0; i < 10; i += 1) {
      data.push({
        provider_id: i + 1,
        name: faker.name.jobType(),
        start_date: faker.date.recent(),
        description: faker.name.jobDescriptor(),
        learn_and_earn: 'learn',
        credit: 1,
        pay: 1,
        pay_unit: 1,
        cost: 1,
      });
    }
    return queryInterface.bulkInsert('offers', data, {});
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('offers', null, {}),
};
