const { getPlayer } = require('../../../services/player/info-service')
const { compoundAttributes } = require('../../../services/player/inventory-service')

const ClassObj = require('../../../models/classes/ClassObject')

module.exports = async (ctx) => {
    try {
        const player = await getPlayer(ctx.session.userInfo)
        const playerClass = ClassObj.find(classE => classE.id === player.classId)
        const spec = playerClass.specs.find(spec => spec.id === player.specId)

        const { equipmentNames, compoundedFullNoNegativesBonus } = await compoundAttributes(ctx.session.userInfo)
        // await compoundAttributes(ctx.session.userInfo)

        const { username, exp, level } = player
        const { className } = playerClass
        const specName = spec.name


        let message = `${username}: ${specName} ${className}\n\nLevel ${level}\nExperience: ${exp}`
        message += `\nEquipments:${equipmentNames}`
        message += `\n\nStats:`
        message += `\nStrength: ${compoundedFullNoNegativesBonus.str}`
        message += `\nDexterity: ${compoundedFullNoNegativesBonus.dex}`
        message += `\nAgility: ${compoundedFullNoNegativesBonus.agi}`
        message += `\nConstitution: ${compoundedFullNoNegativesBonus.con}`
        message += `\nIntelligence: ${compoundedFullNoNegativesBonus.int}`
        message += `\nWisdom: ${compoundedFullNoNegativesBonus.wis}`
        message += `\nWill: ${compoundedFullNoNegativesBonus.wil}`
        message += `\nLuck: ${compoundedFullNoNegativesBonus.luk}`
        message += `\nDefense: ${compoundedFullNoNegativesBonus.defense}`

        return ctx.replyWithPhoto(playerClass.classImage, { caption: message })
    } catch (err) {
        console.log(err)
    }
}