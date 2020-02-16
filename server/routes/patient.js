const { Router } = require('express')
const router = Router()

const _trim = require('trim')
const multer = require('multer')
const upload = multer({ dest: 'static/upload/' })
const _ = require('lodash')

const Patient = require('../../models').patient
const PatientPhones = require('../../models').patientPhone
// const Event = require('../../models').event
const File = require('../../models').file

router.post('/list', async function(req, res, next) {
  const patients = await Patient.get(req.body)
  res.json(patients)
})

router.post('/get', async function(req, res, next) {
  const patient = await Patient.item(req.body.id)
  res.json(patient)
})

router.post('/update', async function(req, res, next) {
  const response = {}

  let iPatientID = req.body.iPatientID ? req.body.iPatientID : false
  const sPatientLastname = req.body.sPatientLastname ? _trim(req.body.sPatientLastname) : null
  const sPatientMiddlename = req.body.sPatientMiddlename ? _trim(req.body.sPatientMiddlename) : null
  const sPatientFirstname = req.body.sPatientFirstname ? _trim(req.body.sPatientFirstname) : false
  const dDateBirthday = req.body.dDateBirthday || null
  const phones = req.body.phones || []

  if (iPatientID) {
    response.update = await Patient.update(
      {
        sPatientLastname,
        sPatientMiddlename,
        sPatientFirstname,
        dDateBirthday
      },
      {
        where: {
          iPatientID
        }
      }
    )
  } else {
    response.create = await Patient.create({
      sPatientLastname,
      sPatientMiddlename,
      sPatientFirstname,
      dDateBirthday
    })
    iPatientID = response.create.iPatientID
  }

  const phonesOld = await PatientPhones.findAll({
    where: {
      iPatientID
    }
  }).map((x) => x.toJSON())

  const phonesAction = async () => {
    const phonesOldId = _.map(phonesOld, 'iPatientPhoneID')
    const phonesId = _.map(phones, 'iPatientPhoneID')
    const phonesDifference = _.differenceBy(phonesOldId, phonesId)

    for (const phone of phones) {
      if (phone.iPatientPhoneID && !phone.del) {
        await PatientPhones.update(
          {
            iPatientID,
            iPhone: phone.iPhone
          },
          {
            where: {
              iPatientPhoneID: phone.iPatientPhoneID
            }
          }
        )
      } else if (!phone.iPatientPhoneID && !phone.del) {
        await PatientPhones.create({
          iPatientID,
          iPhone: '7' + phone.iPhone
        })
      } else if (phone.iPatientPhoneID && phone.del) {
        await PatientPhones.destroy({
          where: {
            iPatientPhoneID: phone.iPatientPhoneID
          }
        })
      }
    }

    if (phonesDifference) {
      await PatientPhones.destroy({
        where: {
          iPatientPhoneID: phonesDifference
        }
      })
    }
  }
  await phonesAction()

  response.patient = await Patient.item(iPatientID)

  res.json(response)
})

router.post('/upload', upload.any(), async (req, res, next) => {
  const response = {}
  const iEventID = req.body.iEventID

  await File.upload(iEventID, req.files)

  response.files = await File.get(iEventID)

  res.json(response)
})

router.post('/image/remove', upload.any(), async (req, res, next) => {
  const response = {}
  const file = req.body.file
  const iEventID = file.iEventID

  await File.remove(file)

  response.files = await File.get(iEventID)

  res.json(response)
})

module.exports = router
