'use strict'

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'event',
    {
      iEventID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      iPatientID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      tEventText: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      dDate: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'event'
    }
  )
  Event.associate = function(models) {
    Event.belongsTo(models.patient, {
      foreignKey: 'iPatientID'
    })
    Event.hasMany(models.file, {
      foreignKey: 'iEventID'
    })
  }
  Event.get = async function(iPatientID) {
    iPatientID = Number(iPatientID) || false
    if (!iPatientID) return {}
    const events = await Event.findAll({
      where: {
        iPatientID
      },
      include: [
        {
          model: sequelize.models.file,
          as: 'files'
        }
      ],
      order: [['dDate', 'DESC']]
    })
    return events
  }
  Event.delete = async function(iEventID) {
    const files = await sequelize.models.file.get(iEventID)
    const filesAction = async () => {
      for (const file of files) {
        await sequelize.models.file.remove(file)
      }
    }
    await filesAction()
    await Event.destroy({
      where: {
        iEventID
      }
    })
  }
  return Event
}
