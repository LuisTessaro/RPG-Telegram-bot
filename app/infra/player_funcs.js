function player_funcs () { }

player_funcs.prototype.addItemToBag = function (msg, item, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(function (resp) {
      PlayerDAO.update({ name: msg.from.username }, { $push: { bag: { $each: [{ item_id: item.item_id, item_name: item.item_name, amount: item.amount }] } } })
    })
}
player_funcs.prototype.removeItemFromBag = function (msg, id, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(function (resp) {
      PlayerDAO.update({ name: msg.from.username }, { $pull: { bag: { item_id: id } } })
    })
}
player_funcs.prototype.addItemToEquipment = function (msg, item, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(function (resp) {
      PlayerDAO.update({ name: msg.from.username }, { $push: { equipment: { $each: [{ item_id: item.item_id, item_name: item.item_name }] } } })
    })
}
player_funcs.prototype.removeItemFromEquipment = function (msg, id, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(function (resp) {
      PlayerDAO.update({ name: msg.from.username }, { $pull: { equipment: { item_id: id } } })
    })
}

player_funcs.prototype.addExp = function (msg, expGains, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(function (resp) {
      var exp = resp[0].exp
      exp += expGains
      PlayerDAO.update({
        name: msg.from.username
      }, { $set: { 'exp': exp } })
    })
}
player_funcs.prototype.handlePlayerExists = function (msg, bot) {
  return new Promise(function (resolve, reject) {
    var PlayerDAO = new bot.infra.DAO.player_dao()
    PlayerDAO.searchByName(msg.from.username)
      .then(function (resp) {
        if (resp[0]) resolve(resp[0])
        else reject('didnt find player')
      })
  })
}

player_funcs.prototype.reborn = function (msg, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.deleteByName(msg.from.username)
}

player_funcs.prototype.removeExp = function (msg, expLosses, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(function (resp) {
      var exp = resp[0].exp
      exp -= expLosses
      PlayerDAO.update({
        name: msg.from.username
      }, { $set: { 'exp': exp } })
    })
}

player_funcs.prototype.playerLevelUp = function (msg, bot) {
  var PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(function (resp) {
      var level = resp[0].level
      level += 1
      PlayerDAO.update({
        name: msg.from.username
      }, { $set: { 'level': level } })
    })
}

module.exports = function () {
  return player_funcs
}
