const moment = require('moment')

const { addExp } = require('../../services/player/exp-service')
const { addEquipment } = require('../../services/player/inventory-service')
const dice = require('../../util/dice')

const { getPlayer } = require('../../services/player/info-service')

module.exports = async ctx => {
  try {
    const player = await getPlayer(ctx.session.userInfo)
    const { isGrinding, map, lastGrindStarted, rewardsCollected } = player.grindingObj

    const t1 = moment(lastGrindStarted)
    const t2 = moment.now()

    if (isGrinding) {
      const elapsedTime = Math.abs(t1.diff(t2, 'minutes'))

      if (elapsedTime < map.grindTime)
        return ctx.reply(`You are still grinding on map: ${map.name}\n${elapsedTime}/${map.grindTime} minutes until completion`)
    }

    if (rewardsCollected)
      return ctx.reply(`You are already collected the rewards from your last expedition. You can go on another /pet_expedition`)


    // const exp = Math.floor((dice(map.possibleExp) / 2) + (map.possibleExp / 2))

    // player.grindingObj.isGrinding = false
    // player.grindingObj.rewardsCollected = true

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

    // await addExp(ctx.session.userInfo, exp)
    await player.save()
    // return ctx.reply(`Your companion finished grinding on ${map.name}\n\n`)
    // return ctx.reply(`Your companion finished grinding on ${map.name}\n\n${await grindDrop(map.possibleRewards, map.trash, map.odds)}`)

  } catch (err) {
    console.log(err)
  }
}