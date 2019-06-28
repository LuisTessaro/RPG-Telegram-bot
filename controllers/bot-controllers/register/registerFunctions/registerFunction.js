const Player = require('../../../../model/mongoose-models/Player')
const { buildStarterPlayer } = require('../../../../model/factories/player-factory')
const validClasses = ['warrior', 'mage', 'archer', 'thief', 'cleric']
const menus = require('../../../../menus/menus')

module.exports = async (ctx) => {
    const classe = ctx.message.text.split(' ')[1]
    if (classe && validClasses.includes(classe)) {
        const p = await Player.find({ telegramId: ctx.message.from.id })
        if (p && p.length > 0) {
            return ctx.reply('You are already registered, if you want to change classes you can reborn with /reborn confirm!', menus.mainMenu)
        }
        const starterPlayer = buildStarterPlayer(ctx.message.from, classe)
        const player = await new Player(starterPlayer)
        try {
            await player.save()
            await ctx.reply('Welcome to Drachengard, ' + starterPlayer.classe.charAt(0).toUpperCase() + starterPlayer.classe.slice(1) + ' ' + starterPlayer.firstName + '!')
            return await ctx.reply('Use the menu to play the game', menus.mainMenu)
        } catch {
            return ctx.reply('Please, setup a Telegram username first!')
        }
    } else {
        return ctx.reply('Use /classes to check all available clases')
    }
}