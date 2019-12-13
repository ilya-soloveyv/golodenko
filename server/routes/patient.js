const { Router } = require('express')
const router = Router()

const Patient = require('../../models').patient

router.post('/list', async function(req, res, next) {
  const page = req.body.page ? req.body.page : 1
  const limit = req.body.limit ? req.body.limit : 15
  const patients = await Patient.paginate({
    paginate: limit,
    page
  })
  res.json(patients)
})

module.exports = router
