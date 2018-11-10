module.exports = function (bot) {
  var player_funcs = new bot.infra.player_funcs()

  bot.on(/^\/newParty (.+)$/, (msg, props) => {
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) {
        //register
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })
}
