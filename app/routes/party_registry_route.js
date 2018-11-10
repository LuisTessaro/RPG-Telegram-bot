module.exports = function (bot) {
  var player_funcs = new bot.infra.player_funcs()

  bot.on(/^\/newParty (.+)$/, (msg, props) => {
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) {
        const partyName = props.match[1]
        var party_dao = new bot.infra.DAO.party_dao()
        party_dao.insertParty(formParty(partyName, resolve.name))
        return bot.sendMessage(msg.from.id, 'Party Registerd.')
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })
}

function formParty(name, leader) {
  return {
    name: name,
    leader: leader,
    players: [{
      name: leader
    }],
  }
}