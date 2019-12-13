'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('patient', {
      iPatientID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sPatientLastname: {
        type: Sequelize.STRING
      },
      sPatientMiddlename: {
        type: Sequelize.STRING
      },
      sPatientFirstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dDateBirthday: {
        type: Sequelize.DATEONLY
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('patient')
  }
}
