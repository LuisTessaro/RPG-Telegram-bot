const Player = require('../../models/mongoose-models/Player')
const { buildStarterPlayer } = require('../../models/factories/player-factory')

const registerPlayer = async (selectedClassName, telegramId, data) => {
    const p = await Player.findOne({ telegramId })

    if (p)
        return { err: 'You are already registered, if you want to change classes you can reborn with /reborn' }

    try {
        const starterPlayer = buildStarterPlayer(data, selectedClassName)

        const player = new Player(starterPlayer)
        await player.save()

        return { message: `Welcome to Drachengard, ${starterPlayer.firstName || 'Player'}!\n\nUse the menu to play the game` }
    } catch (e) {
        return { err: 'Server error, try again later' }
    }
}

module.exports = {
    registerPlayer
}