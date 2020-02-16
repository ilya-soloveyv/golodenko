'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('file', {
      iFileID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iEventID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'event',
          key: 'iEventID'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      sFileName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iFileSize: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iFileWidth: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iFileHeight: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('file')
  }
}
