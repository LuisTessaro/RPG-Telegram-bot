const Extra = require('telegraf/extra')
const validClasses = require('../../models/classes/ClassObject')

module.exports = async ctx => {
  {
    const at = ctx.message.from.username

    if (!at)
      throw 'Please, setup a Telegram username first!'

    validClasses.forEach(classObj => {
      const extra = buildInline(classObj, ctx.message.from)
      extra.caption = classObj.description
      ctx.replyWithPhoto(classObj.classImage, extra)
    })
  }
}


const separate = specs => {
  const specLen = specs.length
  const parity = specLen % 2 === 0 // true=even false=odd

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

const buildInline = (classObj, { username, first_name, id }) => {
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      separate(classObj.specs).map(specGroup =>
        specGroup.map(spec =>
          m.callbackButton(`${spec.name} ${classObj.className} ${spec.implemented}`, `register_player ${classObj.id} ${spec.id} ${username} ${first_name} ${id}`)))
    )
  )
}