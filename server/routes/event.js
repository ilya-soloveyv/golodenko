const { Router } = require('express')
const router = Router()

const Event = require('../../models').event

router.post('/add', async function(req, res, next) {
  const response = {}
  const iPatientID = req.body.iPatientID
  response.event = await Event.create({
    iPatientID,
    dDate: new Date()
  })
  response.events = await Event.get(iPatientID)
  res.json(response)
})

router.post('/textUpdate', async function(req, res, next) {
  const response = {}
  const iEventID = req.body.iEventID
  const tEventText = req.body.tEventText
  response.event = await Event.update(
    {
      tEventText
    },
    {
      where: {
        iEventID
      }
    }
  )
  res.json(response)
})

router.post('/remove', async function(req, res, next) {
  const iEventID = req.body.iEventID
  await Event.delete(iEventID)
  res.sendStatus(200)
})

module.exports = router
