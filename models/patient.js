'use strict'

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define(
    'patient',
    {
      iPatientID: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sPatientLastname: {
        type: DataTypes.STRING
      },
      sPatientMiddlename: {
        type: DataTypes.STRING
      },
      sPatientFirstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dDateBirthday: {
        type: DataTypes.DATEONLY
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'patient'
    }
  )
  patient.associate = function(models) {}
  sequelizePaginate.paginate(patient)
  return patient
}
