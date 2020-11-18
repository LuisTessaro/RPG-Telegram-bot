const Telegraf = require('telegraf')

const buildKeyboard = skillList => {
  return Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard(
      [...separate(skillList)
        .map(skillGroups => skillGroups.map(skill => `/cast ${skill.name} (${skill.cooldown} turn CD)`)), ['/back_to_action']]
    ))
}

const separate = skills => {
  const specLen = skills.length
  const parity = specLen % 2 === 0 // true=even false=odd

  if (parity) {
    const aux = []
    for (let i = 0; i < specLen; i++) {
      aux.push([skills[i], skills[i + 1]])
      i += 1
    }
    return aux
  } else {
    const aux = []
    for (let i = 0; i < specLen - 1; i++) {
      aux.push([skills[i], skills[i + 1]])
      i += 1
    }
    aux.push([skills[specLen - 1]])
    return aux
  }
}

module.exports = {
  buildKeyboard
}