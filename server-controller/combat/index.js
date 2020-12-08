const express = require('express'),
  router = express.Router()

const Combat = require('../../models/mongoose-models/Combat')

router.get('/', async (req, res) => {
  res.send(await Combat.find())
})

router.delete('/', async (req, res) => {
  res.send(await Combat.deleteMany())
})

module.exports = router