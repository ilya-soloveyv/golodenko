'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('patient_phone', {
      iPatientPhoneID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iPatientID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'patient',
          key: 'iPatientID'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      iPhone: {
        allowNull: false,
        type: Sequelize.BIGINT
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('patient_phone')
  }
}
