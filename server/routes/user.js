const { Router } = require('express')
const router = Router()
const User = require('../../models').user

router.get('/users', async function (req, res, next) {
  let users = await User.findAll()
  res.json(users)
})

module.exports = router
