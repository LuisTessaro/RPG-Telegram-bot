module.exports = function (bot) {
  const partyFuncs = new bot.infra.party_funcs()
  const playerFuncs = new bot.infra.player_funcs()

  bot.on('/leave_party', (msg) => {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(() => {
        partyFuncs.handlePartyExists(msg.chat.id, bot)
          .then(() => {
            partyFuncs.removePlayersFromParty(msg.chat.id, msg.from.username, bot)
            return msg.reply.text('You left this party', { asReply: true })
          })
          .catch(() => {
            return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
          })
      })
      .catch(() => {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on('/join_party', (msg) => {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(() => {
        partyFuncs.handlePartyExists(msg.chat.id, bot)
          .then(() => {
            partyFuncs.addPlayerToParty(msg.chat.id, msg.from.username, bot)
            return msg.reply.text('You joined this party', { asReply: true })
          })
          .catch(() => {
            return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
          })
      })
      .catch(() => {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on('/list_members', (msg) => {
    partyFuncs.handlePartyExists(msg.chat.id, bot)
      .then((resolve) => {
        let text = 'Players form party ' + msg.chat.id + ':\n\n'
        resolve.players.map((plays) => {
          text += plays.name + '\n'
        })
        return bot.sendMessage(msg.chat.id, text)
      })
      .catch(() => {
        return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
      })
  })

  bot.on('/new_party', (msg) => {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(() => {
        partyFuncs.handlePartyExists(msg.chat.id, bot)
          .then(() => {
            return bot.sendMessage(msg.chat.id, 'You already have a party setup for this group chat.')
          })
          .catch(() => {
            var party_dao = new bot.infra.DAO.party_dao()
            party_dao.insertParty(formParty(msg.chat.id, msg.from.username, msg.from.id))
            bot.sendMessage(msg.from.id, 'Your party was registered with you as leader.')
            return bot.sendMessage(msg.chat.id, 'Party Registerd for this chat.')
          })
      })
      .catch(() => {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })

  })

  bot.on('/delete_party', (msg) => {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(() => {
        partyFuncs.handlePartyExists(msg.chat.id, bot)
          .then(() => {
            partyFuncs.deleteParty(msg.chat.id, bot)
            return bot.sendMessage(msg.chat.id, 'Party deleted in this chat.')
          })
          .catch(() => {
            return bot.sendMessage(msg.chat.id, 'You dont have a party setup for this group chat.')
          })
      })
      .catch(() => {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
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