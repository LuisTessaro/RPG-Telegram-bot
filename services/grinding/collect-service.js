const moment = require('moment')

const { getPlayer } = require('../../services/player/info-service')
const { mainMenu, petMenu } = require('../../models/menus')


const { addExp } = require('../../services/player/exp-service')
const { addEquipment } = require('../../services/player/inventory-service')
const dice = require('../../util/dice')

const grindDrop = async (telegramId, possibleRewards, trash, odds, expGained) => {
  const lootRoll = dice(100 * process.env.DROP_MULTIPLIER)

  if (lootRoll < odds) {
    const reward = possibleRewards[Math.floor(Math.random() * possibleRewards.length)]
    const name = await addEquipment(telegramId, reward)
    return `✅ gained: ${expGained}exp\n🎲 ${name}`
  }
  else {
    // const tra = trash[Math.floor(Math.random() * trash.length)]
    return `✅ gained: ${expGained}exp\n🎲 no drops`
  }
}

const collectItemsFromGriding = async (ctx) => {
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

      if (rewardsCollected)
        return ctx.reply(`You already collect the items fom the last expedition!`, petMenu)

      const { odds } = player.grindingObj
      const expGained = Math.floor((map.possibleExp / 2) + dice(map.possibleExp / 2))

      await addExp(ctx.message.from.id, expGained)

      const rewardMessage = await grindDrop(ctx.message.from.id, map.possibleRewards, map.trash, odds, expGained)

      player.grindingObj.isGrinding = false
      player.grindingObj.rewardsCollected = true
      player.grindingObj.lastGrindStarted = moment.now()
      await player.save()

      return ctx.reply(`Finished Griding on ${map.name}: ${rewardMessage}`)
    }

    return ctx.reply(`You must send your pet in a expedition first! /pet_expedition ⏱️`, petMenu)
  } catch (err) {
    throw err
  }
}

module.exports = {
  collectItemsFromGriding
}
