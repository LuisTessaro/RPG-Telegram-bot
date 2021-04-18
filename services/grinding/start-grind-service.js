const moment = require('moment')

const { getPlayer } = require('../../services/player/info-service')
const { mainMenu, petMenu } = require('../../models/menus')

const startGrind = async (mapObj, ctx) => {
  try {
    const player = await getPlayer(ctx.message.from.id)

    if (!player.has_registered_pet)
      return ctx.reply('You must first register a /pet.')

    const { isGrinding, map, lastGrindStarted, rewardsCollected } = player.grindingObj

    const t1 = moment(lastGrindStarted)
    const t2 = moment.now()

    if (isGrinding) {
      const elapsedTime = Math.abs(t1.diff(t2, 'minutes'))

      if (elapsedTime < map.grindTime)
        return ctx.reply(`You are still grinding on map: ${map.name}\n${elapsedTime}/${map.grindTime} minutes until completion`, mainMenu)

      if (!rewardsCollected)
        return ctx.reply(`You /pet is still waiting of you to collect the items fom the last expedition!`, petMenu)
    }

    if (player.pet.level < mapObj.minimumRequiredLevel)
      return ctx.reply(`You are too low level to send your map on this map ${player.level}/${mapObj.minimumRequiredLevel}`)

    player.grindingObj.isGrinding = true
    player.grindingObj.rewardsCollected = false
    player.grindingObj.lastGrindStarted = moment.now()
    player.grindingObj.map = mapObj

    await player.save()

    ctx.reply(`Grinding on ${mapObj.name}\n\nCollect your rewards via the /pet menu or by typing /collect after ${mapObj.grindTime} minutes, you will get some xp and maybe some items!\nYou can do other things while your companion is grinding, like checking your items or going into an adventure.`, mainMenu)
  } catch (err) {
    throw err
  }
}

module.exports = {
  startGrind
}
