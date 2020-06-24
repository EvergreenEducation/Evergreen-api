module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name: 'Online',
        description: null,
        type: 'provider',
      },
      {
        name: 'Community College',
        description: null,
        type: 'provider',
      },
      {
        name: 'Charter School',
        description: null,
        type: 'provider',
      },
      {
        name: 'High School',
        description: null,
        type: 'provider',
      },
      {
        name: 'University',
        description: null,
        type: 'provider',
      },
      {
        name: 'Private Employer',
        description: null,
        type: 'provider',
      },
      {
        name: 'Military',
        description: null,
        type: 'provider',
      },
      {
        name: 'Government',
        description: null,
        type: 'provider',
      },
      {
        name: 'Space Exploration',
        description: null,
        type: 'offer_category',
      },
      {
        name: 'History',
        description: null,
        type: 'offer_category',
      },
      {
        name: 'Natural Science',
        description: null,
        type: 'offer_category',
      },
      {
        name: 'Days/week',
        description: null,
        type: 'frequency_unit',
      },
      {
        name: 'Morning',
        description: null,
        type: 'part_of_day_unit',
      },
      {
        name: 'Afternoon',
        description: null,
        type: 'part_of_day_unit',
      },
      {
        name: 'Evening',
        description: null,
        type: 'part_of_day_unit',
      },
      {
        name: 'Per Semester',
        description: null,
        type: 'credit_unit',
      },
      {
        name: 'Dollars',
        description: null,
        type: 'payment_unit',
      },
      {
        name: 'Semesters',
        description: null,
        type: 'length_unit',
      },
      {
        name: 'Dollars',
        description: null,
        type: 'cost_unit',
      },
      {
        name: 'Astrophysics',
        description: null,
        type: 'topic',
      },
      {
        name: 'Astrobiology',
        description: null,
        type: 'topic',
      },
      {
        name: 'Aerospace Engineering',
        description: null,
        type: 'topic',
      },
      {
        name: 'Computer Networks',
        description: null,
        type: 'topic',
      },
      {
        name: 'Software Engineering',
        description: null,
        type: 'topic',
      },
      {
        name: 'Habitat Construction',
        description: null,
        type: 'topic',
      },
      {
        name: 'Plumbing',
        description: null,
        type: 'topic',
      },
      {
        name: 'Electrical Contracting',
        description: null,
        type: 'topic',
      },
      {
        name: 'Space Exploration',
        description: null,
        type: 'topic',
      },
      {
        name: 'Ancient History',
        description: null,
        type: 'topic',
      },
      {
        name: 'Geology',
        description: null,
        type: 'topic',
      },
      {
        name: 'Ecology',
        description: null,
        type: 'topic',
      },
    ];

    return queryInterface.bulkInsert('datafields', data, {});
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('datafields', null, {}),
};
