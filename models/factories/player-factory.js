const {
  Cleric,
  Mage,
  Warrior,
} = require('../classes')

const { compoundAttributes } = require('../../services/player/inventory-service')

const { Healer } = Cleric
const { Fire } = Mage
const { Protection } = Warrior

const SpecsObj = {
  Healer,
  Fire,
  Protection,
}

const buildStarterPlayer = (classId, specId, username, first_name, id) => {
  return {
    firstName: first_name,
    username: username,
    telegramId: id,
    classId: classId,
    specId: specId,
    attributes: {
      str: 1,
      dex: 1,
      agi: 1,
      con: 1,
      int: 1,
      wis: 1,
      wil: 1,
      luk: 1,
      defense: 1
    },
  }
}

const setCooldowns = skill => {
  return {
    ...skill,
    currentCooldown: skill.cooldown
  }
}

const buildPlayer = async player => {
  const { compoundedFullNoNegativesBonus } = await compoundAttributes(player)
  const classObject = getClassObject(player)

  const avlDamageSkills = classObject.damageSkills.filter(skill => player.level >= skill.level)
  const avlHealingSkills = classObject.healingSkills.filter(skill => player.level >= skill.level)
  const avlProtectionSkills = classObject.protectionSkills.filter(skill => player.level >= skill.level)

  return {
    id: player.telegramId,
    targetId: player.telegramId,
    isPlayer: true,
    playerDbObj: player,
    level: player.level,

    allowedEquipmentTypes: classObject.allowedEquipmentTypes,
    protected: true,
    protection: {
      turns: -1,
      factor: 10,
    },
    damageSkills: avlDamageSkills.map(setCooldowns),
    healingSkills: avlHealingSkills.map(setCooldowns),
    protectionSkills: avlProtectionSkills.map(setCooldowns),

    hp: classObject.hpFormula(compoundedFullNoNegativesBonus, player.level),
    maxHp: classObject.hpFormula(compoundedFullNoNegativesBonus, player.level),

    accuracy: classObject.accuracy(compoundedFullNoNegativesBonus, player.level),
    flee: classObject.flee(compoundedFullNoNegativesBonus, player.level),
    compoundedDefense: classObject.defense(compoundedFullNoNegativesBonus, player.level),
    autoAttack: classObject.autoAttack(compoundedFullNoNegativesBonus, player.level),

    compoundedAttributes: compoundedFullNoNegativesBonus,

    baseAgro: classObject.baseAgro(compoundedFullNoNegativesBonus, player.level),
    agroModifier: {
      values: {
        con: 1,
      },
      duration: 1,
    },

    buffs: [
      {
        values: {
          con: 15,
          str: 1,
          agi: 1,
          int: 10,
          defense: 1,
        },
        duration: 3,
      },
      {
        values: {
          con: 1,
          str: 1,
          agi: 1,
          defense: 1,
        },
        duration: 3,
      },
    ],
    debuffs: [
      {
        values: {
          con: -1,
          str: -1,
          agi: -1,
          defense: -15,
        },
        duration: 3,
      },
    ],
  }
}

const getClassObject = ({ specId }) => {
  switch (specId) {
    case (0):
      return SpecsObj['Protection']
    case (3):
      return SpecsObj['Fire']
    case (11):
      return SpecsObj['Healer']
  }

  throw false
}

module.exports = {
  buildStarterPlayer,
  buildPlayer
}