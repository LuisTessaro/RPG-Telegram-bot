function player_factory () { }

player_factory.prototype.calculateStatsForPlayer = function (player, bot) {
  if (player.equipment[0]) { // if theres any equiped stuff
    let i
    for (i in player.equipment) { // player.equipment[i] is all things equiped
      console.log(player.equipment[i].item_id)
    }
  }

  let playerStats = {
    name: player.name,
    classe: player.classe,
    attributes: player.attributes,
    skills: [],
    healingSkills: [],
    hp: 0,
    autoAttackDmg: 0,
    flee: 0,
    accuracy: 0,
    iniciative_bonus: 0
  }

  switch (player.classe) {
    case 'Warrior':
      solver(new bot.classes.warrior())
      break
    case 'Thief':
      solver(new bot.classes.thief())
      break
    case 'Mage':
      solver(new bot.classes.mage())
      break
    case 'Archer':
      solver(new bot.classes.archer())
      break
    case 'Cleric':
      solver(new bot.classes.cleric())
      break
    default:
      console.log('something bad happend player factory invalid class')
  }

  function solver (className) {
    playerStats.hp = className.hpFormula()(player.attributes, player.level)
    playerStats.flee = className.fleeFormula()(player.attributes, player.level)
    playerStats.iniciative_bonus = 0
    playerStats.autoAttackDmg = className.autoAttackFormula()(player.attributes, player.level)
    playerStats.accuracy = className.accuracyFormula()(player.attributes, player.level)
    let playerSkills = className.getSkills(player.attributes)
    let i
    for (i in playerSkills) {
      if (player.level >= playerSkills[i].level_required) { playerStats.skills.push(playerSkills[i]) }
    }
    let playerHealingSkills = className.getHealingSkills(player.attributes)
    let q
    for (q in playerHealingSkills) {
      if (player.level >= playerHealingSkills[q].level_required) { playerStats.healingSkills.push(playerHealingSkills[q]) }
    }
  }
  return playerStats
}

module.exports = function () {
  return player_factory
}
