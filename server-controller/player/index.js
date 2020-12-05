const express = require('express'),
  router = express.Router()

const admAccessMiddleware = require('../middleware/adm-access-middleware')
const authorizationMiddleware = require('../middleware/authorization-middleware')

const { getPlayersBasicInfo } = require('../../services/player/api-service')

const { getInfoFull, dropPlayers } = require('./adm')
const { getUserByToken, updateUser, updatePet } = require('./user')

router.get('/', async (req, res) => {
  try {
    return res.json(await getPlayersBasicInfo())
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' })
  }
})

router.get('/user', authorizationMiddleware, getUserByToken)
router.patch('/user', authorizationMiddleware, updateUser)
router.patch('/user/pet', authorizationMiddleware, updatePet)

router.get('/adm', admAccessMiddleware, getInfoFull)
router.delete('/adm', admAccessMiddleware, dropPlayers)

module.exports = router