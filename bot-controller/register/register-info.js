const { Markup } = require('telegraf')
const validClasses = require('../../models/classes/ClassObject')

module.exports = async ctx => {
  {
    const at = ctx.message.from.username

    if (!at)
      return ctx.reply('Please, setup a Telegram username first!')

    validClasses.forEach(classObj => {
      const extra = buildInline(classObj, ctx.message.from)
      extra.caption = classObj.description
      ctx.replyWithPhoto(classObj.classImage, extra)
    })
  }
}


const separate = specs => {
  const specLen = specs.length
  const parity = specLen % 2 === 0

  if (parity) {
    const aux = []
    for (let i = 0; i < specLen; i++) {
      aux.push([specs[i], specs[i + 1]])
      i += 1
    }
    return aux
  } else {
    const aux = []
    for (let i = 0; i < specLen - 1; i++) {
      aux.push([specs[i], specs[i + 1]])
      i += 1
    }
    aux.push([specs[specLen - 1]])
    return aux
  }
}

const buildInline = (classObj, { username, id }) => {
  return Markup.inlineKeyboard(
    separate(classObj.specs).map(specGroup =>
      specGroup.map(spec =>
        Markup.button.callback(
          `${spec.name} ${classObj.className} ${spec.implemented}`,
          `register_player ${classObj.id} ${spec.id} ${username} ${id}`
        )
      )
    )
  )
}