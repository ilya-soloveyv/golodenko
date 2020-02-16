'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'patient_phone',
      [
        {
          iPatientPhoneID: 1,
          iPatientID: 3,
          iPhone: 79037876601
        },
        {
          iPatientPhoneID: 2,
          iPatientID: 3,
          iPhone: 79036324450
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('patient_phone', null, {})
  }
}
