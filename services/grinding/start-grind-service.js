const moment = require('moment')

const Player = require('../../models/mongoose-models/Player')
const { addExp } = require('../player/exp-service')
const { addEquipment } = require('../player/inventory-service')

const { mainMenu } = require('../../menus')

const startGrind = async ({ telegramId }, mapObj, ctx) => {
  try {
    const player = await Player.findOne({ telegramId })
    const { isGrinding, map, lastGrindStarted } = player.grindingObj

    const t1 = moment(lastGrindStarted)
    const t2 = moment.now()

    if (isGrinding) {
      const elapsedTime = Math.abs(t1.diff(t2, 'minutes'))

      if (elapsedTime < map.grindTime)
        return ctx.reply(`You are still grinding on map: ${map.name}\n${elapsedTime}/${map.grindTime} minutes until completion`)
    }

    if (player.level < mapObj.minimumRequiredLevel)
      return ctx.reply(`You are too low level to send your map on this map ${player.level}/${mapObj.minimumRequiredLevel}`)

    player.grindingObj.isGrinding = true
    player.grindingObj.lastGrindStarted = moment.now()
    player.grindingObj.map = mapObj

    await player.save()

    ctx.reply(`Grinding on ${mapObj.name} will take about ${mapObj.grindTime} minutes, you will get some xp and maybe some items!\nYou can do other things while your companion is grinding, like checking your items or going into an adventure.`, mainMenu)

    setTimeout(async () => {
      player.grindingObj.isGrinding = false
      await player.save()

      const exp = Math.floor((dice(map.possibleExp) / 2) + (map.possibleExp / 2))
      await addExp(ctx.session.userInfo, exp)

      const grindDrop = async (possibleRewards, trash, odds) => {
        const lootRoll = dice(100)

        if (lootRoll < odds) {
          const reward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)]
          const name = await addEquipment(ctx.session.userInfo, reward)
          return `✅ gained: ${exp}exp\n🎲 ${name}`
        }
        else {
          // const tra = trash[Math.floor(Math.random() * trash.length)]
          return `✅ gained: ${exp}exp\n🎲 no drops`
        }
      }

      return ctx.reply(`Your companion finished grinding on ${map.name}\n\n${await grindDrop(map.possibleRewards, map.trash, map.odds)}`)
    }, map.grindTime * 60 * 10)
  } catch (err) {
    throw err
  }
}

const dice = (faces) => {
  return Math.floor((Math.random() * faces + 1) + 1)
}

module.exports = {
  startGrind
}
