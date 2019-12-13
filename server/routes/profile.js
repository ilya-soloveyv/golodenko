const { Router } = require('express')
const router = Router()

const User = require('../../models').user

router.post('/update', async function(req, res, next) {
  const user = req.body.user
  await User.update(
    {
      sUserName: user.sUserName,
      sUserPhone: '7' + user.sUserPhone
    },
    {
      where: {
        iUserID: user.iUserID
      }
    }
  )
  res.json(user)
})

module.exports = router
