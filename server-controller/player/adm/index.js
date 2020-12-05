const { getPlayersFull, dropPlayersFull } = require('../../../services/player/api-service')

const getInfoFull = async (req, res) => {
  try {
    return res.status(200).json(await getPlayersFull())
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' })
  }
}

const dropPlayers = async (req, res) => {
  try {
    return res.status(200).json(await dropPlayersFull())
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = {
  getInfoFull,
  dropPlayers,
}