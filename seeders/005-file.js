'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'file',
      [
        {
          iFileID: 1,
          iEventID: 1,
          sFileName: '1.jpg',
          iFileSize: 12345,
          iFileWidth: 600,
          iFileHeight: 500
        },
        {
          iFileID: 2,
          iEventID: 1,
          sFileName: '2.jpg',
          iFileSize: 12345,
          iFileWidth: 600,
          iFileHeight: 500
        },
        {
          iFileID: 3,
          iEventID: 1,
          sFileName: '3.jpg',
          iFileSize: 12345,
          iFileWidth: 600,
          iFileHeight: 500
        },
        {
          iFileID: 4,
          iEventID: 2,
          sFileName: '4.jpg',
          iFileSize: 12345,
          iFileWidth: 600,
          iFileHeight: 500
        },
        {
          iFileID: 5,
          iEventID: 2,
          sFileName: '5.jpg',
          iFileSize: 12345,
          iFileWidth: 600,
          iFileHeight: 500
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('file', null, {})
  }
}
