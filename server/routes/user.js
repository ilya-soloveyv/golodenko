const { Router } = require('express')
const router = Router()
const User = require('../../models').user

router.get('/users', async function(req, res, next) {
  const users = await User.findAll()
  res.json(users)
})

router.post('/list', async function(req, res, next) {
  const users = await User.findAll()
  res.json(users)
})

router.post('/item', async function(req, res, next) {
  const iUserID = req.body.id
  let user = await User.findByPk(iUserID)
  user = user || {}
  res.json(user)
})

router.post('/update', async function(req, res, next) {
  const response = {}
  const iUserID = req.body.iUserID
  const sUserName = req.body.sUserName
  const sUserPhone = '7' + req.body.sUserPhone
  const iUserAdmin = req.body.iUserAdmin
  if (iUserID) {
    response.update = await User.update(
      {
        sUserName,
        iUserAdmin
      },
      {
        where: {
          iUserID
        }
      }
    )
  } else {
    const randomstring = require('randomstring')
    const md5 = require('md5')
    const axios = require('axios')
    const urlencode = require('urlencode')
    const sUserPassword = randomstring.generate({
      length: 6,
      charset: 'alphanumeric'
    })
    const iUserKey = randomstring.generate({
      length: 3,
      charset: 'numeric'
    })
    const text = urlencode('Ваш пароль от CRM: ' + sUserPassword)
    const sUserPasswordHash = md5(sUserPassword + iUserKey)
    await axios.get(process.env.SMS_HOST + '?user=' + process.env.SMS_USER + '&pwd=' + process.env.SMS_PASS + '&dadr=' + sUserPhone + '&text=' + text + '&sadr=TESTSMS')
    response.create = await User.create({
      sUserName,
      sUserPhone,
      iUserAdmin,
      sUserPassword: sUserPasswordHash,
      iUserKey
    })
  }
  res.json(response)
})

module.exports = router
