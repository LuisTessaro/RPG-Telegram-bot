const Player = require('../../../../model/mongoose-models/Player')
const { buildStarterPlayer } = require('../../../../model/factories/player-factory')
const validClasses = ['warrior', 'mage', 'archer', 'thief', 'cleric']

module.exports = async (ctx) => {
    const classe = ctx.message.text.split(' ')[1]
    if (classe && validClasses.includes(classe)) {
        const starterPlayer = buildStarterPlayer(ctx.message.from, classe)
        const player = await new Player(starterPlayer)
        try {
            await player.save()
            ctx.reply('Welcome to Drachengard, ' + starterPlayer.classe.charAt(0).toUpperCase() + starterPlayer.classe.slice(1) + ' ' + starterPlayer.firstName + '!')
        }catch {
            ctx.reply('Please, setup a Telegram username first!')
        }
    } else {
        ctx.reply('Invalid class! Use /classes to check all available clases')
    }
}