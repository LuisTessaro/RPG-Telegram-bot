module.exports = () => {
  const props = {}

  props.damageSkills = []
  props.healingSkills = []
  props.protectionSkills = []

  props.allowedEquipmentTypes = []

  props.hpFormula = (att, lvl) => {
    return (att.con * 10) + lvl
  }

  props.accuracy = (att, lvl) => {
    return att.dex + lvl
  }

  props.flee = (att, lvl) => {
    return att.agi + lvl
  }

  props.defense = (att, lvl) => {
    return att.defense + lvl
  }

  props.autoAttack = (att, lvl) => {
    return att.str + (att.dex / 2) + lvl
  }

  return props
}