'use strict'

const sequelizePaginate = require('sequelize-paginate')
const { Op } = require('sequelize')
const moment = require('moment')
moment.locale('ru')

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
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

  Patient.associate = function(models) {
    Patient.hasMany(models.patientPhone, {
      foreignKey: 'iPatientID',
      as: 'phones'
    })
    Patient.hasMany(models.event, {
      foreignKey: 'iPatientID',
      as: 'events'
    })
  }

  sequelizePaginate.paginate(Patient)

  Patient.get = async function(params) {
    const page = params.page || 1
    const limit = params.limit || 15
    const search = params.search || false
    const searchArray = search ? search.split(' ') : []
    const searchWhereLike = []
    searchArray.forEach((value) => {
      searchWhereLike.push({
        [Op.or]: {
          sPatientLastname: {
            [Op.like]: '%' + value + '%'
          },
          sPatientFirstname: {
            [Op.like]: '%' + value + '%'
          },
          sPatientMiddlename: {
            [Op.like]: '%' + value + '%'
          }
        }
      })
    })

    const patients = await Patient.paginate({
      paginate: limit,
      page,
      where: searchWhereLike
    })

    return patients
  }

  Patient.item = async function(iPatientID) {
    iPatientID = Number(iPatientID) || false
    if (!iPatientID) return {}
    const patient = await Patient.findByPk(iPatientID, {
      include: [
        {
          model: sequelize.models.patientPhone,
          as: 'phones'
        },
        {
          model: sequelize.models.event,
          as: 'events',
          include: [
            {
              model: sequelize.models.file,
              as: 'files'
            }
          ]
        }
      ],
      order: [['events', 'dDate', 'DESC']]
    })
    patient.dataValues.sDateBirthday = patient.dDateBirthday ? moment(patient.dDateBirthday).format('D MMMM YYYY') : null

    return patient
  }

  return Patient
}
