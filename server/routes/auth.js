const { Router } = require('express')
const router = Router()
const jsonwebtoken = require('jsonwebtoken')

const User = require('../../models').user

router.post('/login', async (req, res, next) => {
  var user = await User.findOne({
    where: {
      sUserPhone: req.body.phone
    }
  })

  if (user) {
    const accessToken = jsonwebtoken.sign(
      {
        iUserID: user.iUserID,
        sUserName: user.sUserName,
        sUserPhone: user.sUserPhone,
        iUserAdmin: user.iUserAdmin
      },
      'dummy'
    )
    res.json({
      token: {
        accessToken
      }
    })
  }
  else {
    res.status(401).json({ message: 'Bad credentials' })
  }
})

router.post('/logout', (req, res, next) => {
  res.sendStatus(200)
})

router.get('/user', (req, res, next) => {
  res.json({ user: req.user })
})

module.exports = router
