const express = require('express'),
  router = express.Router()

router.get('/', (req, res) => {
  res.send('ok')
})

router.delete('/', (req, res) => {
  res.send('ok')
})

module.exports = router