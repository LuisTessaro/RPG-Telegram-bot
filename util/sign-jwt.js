const jwt = require('jsonwebtoken')

module.exports = (data) => {
  if (typeof (data) !== 'object')
    throw 'Please provide an object'

  return jwt.sign(data, process.env.SECRET)
}