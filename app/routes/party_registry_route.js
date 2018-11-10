module.exports = function (bot) {
  var partyFuncs = new bot.infra.party_funcs()

  bot.on('/leave_party', (msg) => {
    partyFuncs.handlePartyExists(msg.chat.id, bot)
      .then(function (resolve) {
        partyFuncs.removePlayersFromParty(msg.chat.id, msg.from.username, bot)
        return msg.reply.text('You left this party', { asReply: true })
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
      })
  })

  bot.on('/join_party', (msg) => {
    partyFuncs.handlePartyExists(msg.chat.id, bot)
      .then(function (resolve) {
        partyFuncs.addPlayerToParty(msg.chat.id, msg.from.username, bot)
        return msg.reply.text('You joined this party', { asReply: true })
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
      })
  })

  bot.on('/list_members', (msg) => {
    partyFuncs.handlePartyExists(msg.chat.id, bot)
      .then(function (resolve) {
        let text = 'Players form party ' + msg.chat.id + ':\n\n'
        resolve.players.map((plays) => {
          text += plays.name + '\n'
        })
        return bot.sendMessage(msg.chat.id, text)
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
      })
  })

  bot.on('/new_party', (msg) => {
    partyFuncs.handlePartyExists(msg.chat.id, bot)
      .then(function (resolve) {
        return bot.sendMessage(msg.chat.id, 'You already have a party setup for this group chat.')
      })
      .catch(function (reject) {
        var party_dao = new bot.infra.DAO.party_dao()
        party_dao.insertParty(formParty(msg.chat.id, msg.from.username, msg.from.id))
        bot.sendMessage(msg.from.id, 'Your party was registered with you as leader.')
        return bot.sendMessage(msg.chat.id, 'Party Registerd for this chat.')
      })
  })

  bot.on('/delete_party', (msg) => {
    partyFuncs.handlePartyExists(msg.chat.id, bot)
      .then(function (resolve) {
        partyFuncs.deleteParty(msg.chat.id, bot)
        return bot.sendMessage(msg.chat.id, 'Party deleted in this chat.')
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
      })
  })
}

function formParty(name, leader, id) {
  return {
    name: name,
    leader: leader,
    id: id,
    players: [{
      name: leader
    }],
  }
}