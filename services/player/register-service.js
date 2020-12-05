const Player = require('../../models/mongoose-models/Player')
const { buildStarterPlayer } = require('../../models/factories/player-factory')

const registerPlayer = async ({ classId, specId, username, id }) => {
    const p = await Player.findOne({ telegramId: id })

    if (p)
        return { err: 'You are already registered, if you want to change classes you can reborn with /reborn' }

    try {
        const starterPlayer = buildStarterPlayer(classId, specId, username, id)

        const player = new Player(starterPlayer)
        await player.save()

        return { message: `Welcome to Drachengard!\n\nUse the menu to play the game` }
    } catch (e) {
        return { err: 'Server error, try again later' }
    }
}

module.exports = {
    registerPlayer
}