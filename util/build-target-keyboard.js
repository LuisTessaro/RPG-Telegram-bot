const Telegraf = require('telegraf')

const buildKeyboard = (targetList, spell) => {
  return Telegraf.Extra
    .markdown()
    .markup((m) => m.keyboard(
      [...separate(targetList)
        .map(targets => targets.map(target => `/cast_spell ${spell} on ${target}`)), ['/back_to_action']]
    ))
}

const separate = targets => {
  const specLen = targets.length
  const parity = specLen % 2 === 0 // true=even false=odd

  if (parity) {
    const aux = []
    for (let i = 0; i < specLen; i++) {
      aux.push([targets[i], targets[i + 1]])
      i += 1
    }
    return aux
  } else {
    const aux = []
    for (let i = 0; i < specLen - 1; i++) {
      aux.push([targets[i], targets[i + 1]])
      i += 1
    }
    aux.push([targets[specLen - 1]])
    return aux
  }
}

module.exports = {
  buildKeyboard
}