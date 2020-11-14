const { registerPlayer } = require('../../services/player/register-service')

const validClasses = ['warrior', 'mage', 'archer', 'thief', 'cleric']

const { classMenu, mainMenu } = require('../../menus')

module.exports = (bot) => {
    bot.command('register', async (ctx) => {
        const selectedClassName = ctx.message.text.split(' ')[1]

        const telegramId = ctx.message.from.id

        const at = ctx.message.from.username

        const data = {
            username: at,
            first_name: ctx.message.from.first_name,
            id: telegramId,
        }

        if (!at)
            throw 'Please, setup a Telegram username first!'

        if (!selectedClassName || !validClasses.includes(selectedClassName)) {
            throw 'Please use the inline keyboard (/classes) to choose your class'
        }

        const { message, err } = await registerPlayer(selectedClassName, telegramId, data)

        if (err)
            throw err

        return ctx.reply(message, mainMenu)
    })

    bot.command('classes', (ctx) => {
        ctx.reply('Pick a class using the popup menu:', classMenu)
    })
}