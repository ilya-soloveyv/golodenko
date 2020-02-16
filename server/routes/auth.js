const { Router } = require('express')
const router = Router()
const jsonwebtoken = require('jsonwebtoken')
const md5 = require('md5')

const User = require('../../models').user

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      sUserPhone: req.body.phone
    }
  })

  if (user && user.sUserPassword === md5(req.body.password + user.iUserKey)) {
    const accessToken = jsonwebtoken.sign(
      {
        iUserID: user.iUserID,
        sUserName: user.sUserName,
        sUserPhone: user.sUserPhone,
        iUserAdmin: user.iUserAdmin,
        iPatientLimit: user.iPatientLimit
      },
      'dummy'
    )
    res.json({
      token: {
        accessToken
      }
    })
  } else {
    res.status(401).json({ message: 'Bad credentials' })
  }
})

router.post('/logout', (req, res, next) => {
  res.sendStatus(200)
})

router.get('/user', async (req, res, next) => {
  const user = await User.findByPk(req.user.iUserID)
  res.json({ user })
})

module.exports = router
