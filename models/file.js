'use strict'

require('dotenv').config()
const fs = require('fs')
const selectel = require('selectel-storage-promise')
const fileExtension = require('file-extension')
const Jimp = require('jimp')
const sizeOf = require('image-size')

module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    'file',
    {
      iFileID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      iEventID: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      sFileName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      iFileSize: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      iFileWidth: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      iFileHeight: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      freezeTableName: false,
      tableName: 'file'
    }
  )
  File.associate = function(models) {
    File.belongsTo(models.event, {
      foreignKey: 'iEventID'
    })
  }

  File.get = async function(iEventID) {
    const files = await File.findAll({
      where: {
        iEventID
      }
    })
    return files
  }

  File.upload = async function(iEventID, files) {
    const response = []
    await selectel.auth(process.env.SELECTEL_USER, process.env.SELECTEL_PASSWORD)
    for (const file of files) {
      const ext = fileExtension(file.originalname)
      const localPath = 'static/upload/'
      const localPathOriginal = localPath + file.filename
      const sFileName = file.filename + '.' + ext
      const localPathPreview = localPath + sFileName
      const sFileNamePathOriginal = '/' + process.env.SELECTEL_CONTAINER + '/' + iEventID + '/original/' + sFileName
      const sFileNamePathPreview = '/' + process.env.SELECTEL_CONTAINER + '/' + iEventID + '/preview/' + sFileName
      await File.resize(file)
      await selectel.uploadFile(localPathOriginal, sFileNamePathOriginal)
      await selectel.uploadFile(localPathPreview, sFileNamePathPreview)
      const iFileSize = file.size
      const dimensions = await sizeOf(localPathOriginal)
      const iFileWidth = dimensions.width
      const iFileHeight = dimensions.height
      await File.create({ iEventID, sFileName, iFileSize, iFileWidth, iFileHeight })
      await fs.unlinkSync(localPathOriginal)
      await fs.unlinkSync(localPathPreview)
    }
    return response
  }

  File.resize = function(file) {
    const ext = fileExtension(file.originalname)
    const sFileName = file.filename + '.' + ext
    return Jimp.read(file.path)
      .then((preview) => {
        return preview
          .cover(300, 300)
          .quality(90)
          .write('static/upload/' + sFileName, () => {
            return sFileName
          })
      })
      .catch((err) => {
        return err
      })
  }

  File.remove = async function(file) {
    const iFileID = file.iFileID
    const iEventID = file.iEventID
    const sFileName = file.sFileName
    await File.destroy({
      where: {
        iFileID
      }
    })
    await selectel.auth(process.env.SELECTEL_USER, process.env.SELECTEL_PASSWORD)
    await selectel.deleteFile('/' + process.env.SELECTEL_CONTAINER + '/' + iEventID + '/original/' + sFileName)
    await selectel.deleteFile('/' + process.env.SELECTEL_CONTAINER + '/' + iEventID + '/preview/' + sFileName)
    return true
  }

  return File
}
