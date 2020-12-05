const mongoose = require('mongoose')

module.exports = mongoose.model('Logs',
  {
    action: String,
    date: Date,
    data: Object,
  }
)