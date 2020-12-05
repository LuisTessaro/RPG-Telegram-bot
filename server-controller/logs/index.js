const express = require('express'),
  router = express.Router()

const admAccessMiddleware = require('../middleware/adm-access-middleware')
const { readLogs, deleteLogs } = require('../../services/logs/log-service')

router.get('/', admAccessMiddleware, async (req, res) => {
  try {
    return res.status(200).json(await readLogs())
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' })
  }
})

router.delete('/', admAccessMiddleware, async (req, res) => {
  try {
    return res.status(200).json(await deleteLogs())
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router