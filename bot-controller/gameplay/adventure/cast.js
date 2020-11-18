const { buildKeyboard } = require('../../../util/build-target-keyboard')

module.exports = async ctx => {
  try {
    const skillName = ctx.message.text.replace(/\/cast /g, '').split('(')[0].trim()

    const targetKeyboard = buildKeyboard(['Luis', 'Buné'], skillName)

    ctx.reply('Pick a target', targetKeyboard)
  } catch (err) {
    console.log(err)
  }
}