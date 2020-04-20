module.exports = {
  up: (queryInterface, Sequelize) => {
    const data = [
      {
        name: 'International',
        description: 'International provider',
        type: 'provider',
      },
      {
        name: 'Finance & Business',
        description: 'This is a generic offer',
        type: 'offer_category',
      },
      {
        name: 'Science Offers',
        description: 'Offers about science',
        type: 'offer_category',
      },
      {
        name: 'Web Development',
        description: 'Offers about web development',
        type: 'offer_category',
      },
      {
        name: 'hrs/day',
        description: null,
        type: 'frequency_unit',
      },
      {
        name: 'hrs/wk',
        description: null,
        type: 'frequency_unit',
      },
      {
        name: 'days/m',
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
        name: 'Weekly',
        description: null,
        type: 'credit_unit',
      },
      {
        name: 'Biweekly',
        description: null,
        type: 'credit_unit',
      },
      {
        name: 'Monthly',
        description: null,
        type: 'credit_unit',
      },
      {
        name: 'Every Quarter',
        description: null,
        type: 'credit_unit',
      },
      {
        name: 'Biannual',
        description: null,
        type: 'credit_unit',
      },
      {
        name: 'Weekly',
        description: null,
        type: 'payment_unit',
      },
      {
        name: 'Biweekly',
        description: null,
        type: 'payment_unit',
      },
      {
        name: 'Monthly',
        description: null,
        type: 'payment_unit',
      },
      {
        name: 'Every Quarter',
        description: null,
        type: 'payment_unit',
      },
      {
        name: 'Biannual',
        description: null,
        type: 'payment_unit',
      },
      {
        name: 'weeks',
        description: null,
        type: 'length_unit',
      },
      {
        name: 'biweek',
        description: null,
        type: 'length_unit',
      },
      {
        name: 'months',
        description: null,
        type: 'length_unit',
      },
      {
        name: 'quarters',
        description: null,
        type: 'length_unit',
      },
      {
        name: 'semesters',
        description: null,
        type: 'length_unit',
      },
      {
        name: 'Dollars',
        description: null,
        type: 'cost_unit',
      },
      {
        name: 'Month',
        description: null,
        type: 'cost_unit',
      },
      {
        name: 'Computer Science',
        description: 'Computer Science',
        type: 'topic',
      },
      {
        name: 'Finance',
        description: 'Finance Topic',
        type: 'topic',
      },
      {
        name: 'Education',
        description: 'Topic description',
        type: 'topic',
      },
      {
        name: 'Biology',
        description: 'Biology',
        type: 'topic',
      },
      {
        name: 'AI',
        description: 'AI',
        type: 'topic',
      },
      {
        name: 'Economics',
        description: 'Economics',
        type: 'topic',
      },
      {
        name: 'Hardware',
        description: 'Hardware',
        type: 'topic',
      },
      {
        name: 'Physics',
        description: 'Physics',
        type: 'topic',
      },
    ];

    return queryInterface.bulkInsert('datafields', data, {});
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('datafields', null, {}),
};
