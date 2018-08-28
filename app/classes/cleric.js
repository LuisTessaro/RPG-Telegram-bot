function cleric () { }
cleric.prototype.getSkills = function (att) {
  var skills = []
  return skills
}

cleric.prototype.getHealingSkills = function (att) {
  var healingSkills = [{
    skill_name: 'Heal',
    heal: function () {
      return att.int * 3
    },
    level_required: 1,
    odds: 30,
    cost: 0,
    emoji: '✝️'
  }]

  return healingSkills
}

cleric.prototype.hpFormula = function () {
  let hpFormula = function (att, lvl) {
    return (att.con * 10) + lvl
  }
  return hpFormula
}

cleric.prototype.accuracyFormula = function () {
  let accuracyFormula = function (att, lvl) {
    return (att.dex * 2) + lvl
  }
  return accuracyFormula
}

cleric.prototype.fleeFormula = function () {
  let fleeFormula = function (att, lvl) {
    return att.agi + lvl
  }
  return fleeFormula
}

cleric.prototype.autoAttackFormula = function () {
  let autoAttackFormula = function (att, lvl) {
    return att.tr + att.dex + att.agi + lvl
  }
  return autoAttackFormula
}

module.exports = function () {
  return cleric
}
