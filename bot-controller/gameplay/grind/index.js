const { startGrind } = require('../../../services/grinding/start-grind-service')

const validMaps = [
    'outskirts_of_town',
    'green_woods',
    'bat_cave',
    'dark_forest',
    'dragons_cave_entrance'
]

const {
    bat_cave,
    dark_forest,
    dragons_cave_entrance,
    green_woods,
    outskirts_of_town,
    snowy_peaks,
} = require('../../../maps/grind-spots')

const mapsObj = {
    bat_cave,
    dark_forest,
    dragons_cave_entrance,
    green_woods,
    outskirts_of_town,
    snowy_peaks,
}

module.exports = async ctx => {
    const map = ctx.message.text.split(' ')[1]

    if (!map || !validMaps.includes(map))
        throw 'Invalid Map'

    await startGrind(ctx.session.userInfo, mapsObj[map], ctx)
    
    return
}