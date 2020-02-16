'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('event', {
      iEventID: {
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
      tEventText: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      dDate: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('event')
  }
}
