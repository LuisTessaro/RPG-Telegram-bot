const { getPlayer } = require('../../../services/player/info-service')
const { editName } = require('../../../services/player/edit-player-service')
const { changePetName } = require('../../../services/player/edit-pet-service')

const getUserByToken = async (req, res) => {
  const player = await getPlayer(res.locals)

  if (!player)
    return res.status(404).json({ message: 'Player deleted, please re-register using the bot and get a new token using /site_login' })

  try {
    // return setTimeout(() => res.status(200).json(player), 5000)
    return res.status(200).json(player)
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' })
  }
}

const updateUser = async (req, res) => {
  const { name } = req.body
  try {
    if (!name || !(name.length >= 3 && name.length <= 30))
      return res.status(400).json({ message: 'Name must have 3 - 30 characters' })

    // return setTimeout(async () => { res.status(200).json(await editName(res.locals, name)) }, 10000)
    return res.status(200).json(await editName(res.locals, name))
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Server Error ' + err })
  }
}

const updatePet = async (req, res) => {
  const { name } = req.body
  try {
    if (!name || !(name.length >= 3 && name.length <= 30))
      return res.status(400).json({ message: 'Name must have 3 - 30 characters' })

    return res.status(200).json(await changePetName(res.locals, name)
    )
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Server Error ' + err })
  }
}

module.exports = {
  getUserByToken,
  updateUser,
  updatePet,
}