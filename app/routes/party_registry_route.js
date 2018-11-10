module.exports = function (bot) {
  var player_funcs = new bot.infra.player_funcs()
  var partyFuncs = new bot.infra.party_funcs()

  bot.on(/^\/remove_member (.+)$/, (msg, props) => {
    let message = props.match[1]
    message = message.split(' ')
    let partyName = message[0]
    let playerName = message[1]
    partyFuncs.removePlayersFromParty(partyName, playerName, bot)
    bot.sendMessage(msg.chat.id, playerName + ' removed from: ' + partyName)
  })

  bot.on(/^\/register_new_member (.+)$/, (msg, props) => {
    let message = props.match[1]
    message = message.split(' ')
    let partyName = message[0]
    let playerName = message[1]
    partyFuncs.addPlayerToParty(partyName, playerName, bot)
    bot.sendMessage(msg.chat.id, playerName + ' added to: ' + partyName)
  })

  bot.on(/^\/list_members (.+)$/, (msg, props) => {
    let message = props.match[1]
    let text = 'Players form party ' + message + ':\n\n'
    partyFuncs.handlePartyExists(message, bot)
      .then(function (resolve) {
        resolve.players.map((plays) => {
          text += plays.name + '\n'
        })
        bot.sendMessage(msg.chat.id, text)
      })
  })

  bot.on(/^\/new_party (.+)$/, (msg, props) => {
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