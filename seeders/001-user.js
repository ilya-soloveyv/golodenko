'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user',
      [
        {
          iUserID: 1,
          sUserName: 'Илюнька',
          sUserPhone: '79037876601',
          sUserPassword: '3fc0a7acf087f549ac2b266baf94b8b1', // qwerty
          iUserKey: 123,
          iUserAdmin: true,
          iPatientLimit: 20,
          iPatientPhoneCode: null
        },
        {
          iUserID: 2,
          sUserName: 'Уофка',
          sUserPhone: '79999999999',
          sUserPassword: '635092b43f6daab6e117b2429f5e6236', // 123456
          iUserKey: 987,
          iUserAdmin: false,
          iPatientLimit: 10,
          iPatientPhoneCode: null
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {})
  }
}
