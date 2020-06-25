const Player = require('../../../model/mongoose-models/Player')
const { buildStarterPlayer } = require('../../../model/factories/player-factory')

const validClasses = ['warrior', 'mage', 'archer', 'thief', 'cleric']

const menus = require('../../../menus/menus')

module.exports = async (ctx) => {
    const className = ctx.message.text.split(' ')[1]
    if (className && validClasses.includes(className)) {
        const p = await Player.findOne({ telegramId: ctx.message.from.id })

        if (p)
            return ctx.reply('You are already registered, if you want to change classes you can reborn with /reborn confirm!', menus.mainMenu)

        try {
            if (!ctx.message.from)
                return ctx.reply('Please, setup a Telegram username first!')

            const starterPlayer = buildStarterPlayer(ctx.message.from, className)
            const player = new Player(starterPlayer)
            await player.save()
            
            await ctx.reply(`Welcome to Drachengard, ${starterPlayer.firstName || 'Player'}!`)
            return await ctx.reply('Use the menu to play the game', menus.mainMenu)
        } catch (e) {
            return ctx.reply('Server error, try again latter')
        }
    } else
        return ctx.reply('Use /classes to check all available clases')
}