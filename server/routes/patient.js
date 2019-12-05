const { Router } = require('express')
const router = Router()

const Patient = require('../../models').patient

router.post('/list', async function (req, res, next) {
  let page = (req.body.page) ? req.body.page : 1
  let limit = (req.body.limit) ? req.body.limit : 15
  let patients = await Patient.paginate({
    paginate: limit,
    page: page
  })
  res.json(patients)
})

module.exports = router
