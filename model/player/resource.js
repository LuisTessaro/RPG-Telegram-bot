const Player = require('../mongoose-models/Player')

const removeResource = async (id, amount, prev) => {
  try {
    const newR = prev - amount
    await Player.findByIdAndUpdate(id, { resource: newR })
    return newR
  } catch (e) {
    console.log('Some SERIOUS shit went down!')
  }
}

const rest = async (id) => {
  try {
    await Player.findByIdAndUpdate(id, { resource: 100 })
  } catch (e) {
    console.log('Some SERIOUS shit went down!')
  }
}

module.exports = {
  removeResource,
  rest,
}