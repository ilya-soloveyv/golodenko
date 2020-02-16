'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      iUserID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sUserName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sUserPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sUserPassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iUserKey: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iUserAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      iPatientLimit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      iPatientPhoneCode: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user')
  }
}
