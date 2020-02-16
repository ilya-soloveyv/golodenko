'use strict'

module.exports = (sequelize, DataTypes) => {
  const patientPhone = sequelize.define(
    'patientPhone',
    {
      iPatientPhoneID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      iPatientID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      iPhone: {
        allowNull: false,
        type: DataTypes.BIGINT
      }
    },
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'patient_phone'
    }
  )
  patientPhone.associate = function(models) {
    patientPhone.belongsTo(models.patient, {
      foreignKey: 'iPatientID'
    })
  }
  return patientPhone
}
