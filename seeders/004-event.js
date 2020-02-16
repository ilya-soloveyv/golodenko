'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'event',
      [
        {
          iEventID: 1,
          iPatientID: 3,
          tEventText: null,
          dDate: new Date()
        },
        {
          iEventID: 2,
          iPatientID: 3,
          tEventText: 'Парам парам',
          dDate: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('event', null, {})
  }
}
