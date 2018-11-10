const lvlMultiplyer = 100
module.exports = function (bot) {
  var player_funcs = new bot.infra.player_funcs()
  bot.on('/level_up', function (msg) {
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) { // resolve is player if found
        let replyMarkup = bot.keyboard([
          ['/up str'],
          ['/up dex'],
          ['/up agi'],
          ['/up con'],
          ['/up int'],
          ['/up wis'],
          ['/back']
        ], { resize: true })
        return bot.sendMessage(msg.from.id, 'You have: ' + resolve.exp + ' exp.', { replyMarkup })
      })
      .catch(function (reject) {
        console.log(reject)
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on(/^\/up (.+)$/, (msg, props) => {
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) {
        var PlayerDAO = new bot.infra.DAO.player_dao()
        const statName = props.match[1]
        // improve this
        if (resolve.exp > resolve.level * lvlMultiplyer) {
          if (statName == 'str') {
            var att = resolve.attributes.str
            att += 1
            PlayerDAO.update({
              name: msg.from.username
            }, { $set: { 'attributes.str': att } })
          } else if (statName == 'dex') {
            var att = resolve.attributes.dex
            att += 1
            PlayerDAO.update({
              name: msg.from.username
            }, { $set: { 'attributes.dex': att } })
          } else if (statName == 'agi') {
            var att = resolve.attributes.agi
            att += 1
            PlayerDAO.update({
              name: msg.from.username
            }, { $set: { 'attributes.agi': att } })
          } else if (statName == 'con') {
            var att = resolve.attributes.con
            att += 1
            PlayerDAO.update({
              name: msg.from.username
            }, { $set: { 'attributes.con': att } })
          } else if (statName == 'int') {
            var att = resolve.attributes.int
            att += 1
            PlayerDAO.update({
              name: msg.from.username
            }, { $set: { 'attributes.int': att } })
          } else if (statName == 'wis') {
            var att = resolve.attributes.wis
            att += 1
            PlayerDAO.update({
              name: msg.from.username
            }, { $set: { 'attributes.wis': att } })
          } else {
            return bot.sendMessage(msg.from.id, 'Invalid Stat')
          }
          player_funcs.playerLevelUp(msg, bot)
          player_funcs.removeExp(msg, resolve.level * lvlMultiplyer, bot)
          return bot.sendMessage(msg.from.id, 'Level up!!')
        } else {
          return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp)
        }
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on('/me', (msg) => {
    console.log(msg.from.username + '/me request')
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) {
        let me = ''
        me += `Name: ${resolve.name}\n`
        me += `Class: ${resolve.classe}\n`
        me += `Level: ${resolve.level}\n\n`
        me += `Strength: ${resolve.attributes.str}\n`
        me += `Dexterity: ${resolve.attributes.dex}\n`
        me += `Agility: ${resolve.attributes.agi}\n`
        me += `Constitution: ${resolve.attributes.con}\n`
        me += `Intelligence: ${resolve.attributes.int}\n`
        me += `Wisdom: ${resolve.attributes.wis}\n`
        me += `Telegram id: ${resolve.telegramId}\n`
        bot.sendMessage(msg.from.id, me)
      })
      .catch(function (reject) {
        console.log(reject)
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on('/bags', (msg) => {
    console.log(msg.from.username + '/bags request')
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) {
        let bags
        if (resolve.bag[0]) {
          bags = 'Your itens\n'
          let i
          for (i in resolve.bag) {
            bags += `${resolve.bag[i].item_name} :  ${resolve.bag[i].amount} \n`
          }
        } else bags = 'You dont have anything on your bags'
        bot.sendMessage(msg.from.id, bags)
      })
      .catch(function (reject) {
        console.log(reject)
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on('/equipment', (msg) => {
    console.log(msg.from.username + '/inventory request')
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) {
        let equipment
        if (resolve.equipment[0]) {
          equipment = 'Your equiped itens: \n'
          let i
          for (i in resolve.equipment) {
            equipment += `${resolve.equipment[i].item_name}\n`
          }
        } else equipment = 'You dont have anything equiped'
        bot.sendMessage(msg.from.id, equipment)
      })
      .catch(function (reject) {
        console.log(reject)
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on('/exp', (msg) => {
    player_funcs.handlePlayerExists(msg, bot)
      .then(function (resolve) { // resolve is player if found
        bot.sendMessage(msg.from.id, 'You have: ' + resolve.exp + ' exp.')
      })
      .catch(function (reject) {
        console.log(reject)
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })
}
