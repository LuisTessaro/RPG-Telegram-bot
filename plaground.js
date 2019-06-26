console.log(buildPlayer({
    name: 'luis',
    telegramId: 123,
    classe: 'mage',
    level: 1,
    exp: 0,
    attributes: {
        str: 5,
        dex: 5,
        agi: 5,
        con: 5,
        int: 5,
        wis: 5,
        car: 5,
        wil: 5,
        luk: 5
    },
    equipment: ['FireWhip', 'HylianShield'],
    bag: []
}))

bot.on('text', (ctx) => {
    ctx.session.counter = ctx.session.counter || 0
    ctx.session.counter++
    return ctx.reply(`Message counter:${ctx.session.counter}`)
})

