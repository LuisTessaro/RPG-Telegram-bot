function player_factory() { }

player_factory.prototype.calculateStatsForPlayer = (player, bot) => {
  const actions = {
    Warrior: () => {
      return solver(new bot.classes.warrior(), player)
    },
    Thief: () => {
      return solver(new bot.classes.thief(), player)
    },
    Mage: () => {
      return solver(new bot.classes.mage(), player)
    },
    Archer: () => {
      return solver(new bot.classes.archer(), player)
    },
    Cleric: () => {
      return solver(new bot.classes.cleric(), player)
    },
  }

  if (actions[player.classe]) {
    const buildedPlayer = actions[player.classe]()
    if (buildedPlayer)
      return buildedPlayer
    else console.log('some doo doo happened when trying to create a player')
  }
  else console.log('some doo doo happened at the player factory')

  function solver(classObj, player) {
    const builtPlayer = {
      name: player.name,
      classe: player.classe,
      attributes: player.attributes,
      skills: classObj.getSkills(player.attributes).filter((skill) => {
        if (player.level >= skill.level_required)
          return skill
      }),
      healingSkills: classObj.getHealingSkills(player.attributes).filter((skill) => {
        if (player.level >= skill.level_required)
          return skill
      }),
      hp: classObj.hpFormula()(player.attributes, player.level),
      maxHp: classObj.hpFormula()(player.attributes, player.level),
      autoAttackDmg: classObj.autoAttackFormula()(player.attributes, player.level),
      flee: classObj.fleeFormula()(player.attributes, player.level),
      accuracy: classObj.accuracyFormula()(player.attributes, player.level),
      iniciative_bonus: 0
    }
    return builtPlayer
  }

}

module.exports = function () {
  return player_factory
}
