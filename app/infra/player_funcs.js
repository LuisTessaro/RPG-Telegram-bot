function player_funcs() { }

player_funcs.prototype.addItemToBag = (msg, item, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(() => {
      PlayerDAO.update({ name: msg.from.username }, { $push: { bag: { $each: [{ item_id: item.item_id, item_name: item.item_name, amount: item.amount }] } } })
    })
}
player_funcs.prototype.removeItemFromBag = (msg, id, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(() => {
      PlayerDAO.update({ name: msg.from.username }, { $pull: { bag: { item_id: id } } })
    })
}
player_funcs.prototype.addItemToEquipment = (msg, item, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(() => {
      PlayerDAO.update({ name: msg.from.username }, { $push: { equipment: { $each: [{ item_id: item.item_id, item_name: item.item_name }] } } })
    })
}
player_funcs.prototype.removeItemFromEquipment = (msg, id, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then(() => {
      PlayerDAO.update({ name: msg.from.username }, { $pull: { equipment: { item_id: id } } })
    })
}

player_funcs.prototype.addExp = (msg, expGains, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then((resp) => {
      let exp = resp[0].exp
      exp += expGains
      PlayerDAO.update({
        name: msg.from.username
      }, { $set: { 'exp': exp } })
    })
}
player_funcs.prototype.handlePlayerExists = (msg, bot) => {
  return new Promise((resolve, reject) => {
    const PlayerDAO = new bot.infra.DAO.player_dao()
    PlayerDAO.searchByName(msg.from.username)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('didnt find player')
      })
  })
}

player_funcs.prototype.handlePlayerExistsByName = (name, bot) => {
  return new Promise((resolve, reject) => {
    const PlayerDAO = new bot.infra.DAO.player_dao()
    PlayerDAO.searchByName(name)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('didnt find player')
      })
  })
}

player_funcs.prototype.reborn = (msg, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.deleteByName(msg.from.username)
}

player_funcs.prototype.removeExp = (msg, expLosses, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then((resp) => {
      const exp = resp[0].exp
      exp -= expLosses
      PlayerDAO.update({
        name: msg.from.username
      }, { $set: { 'exp': exp } })
    })
}

player_funcs.prototype.playerLevelUp = (msg, bot) => {
  const PlayerDAO = new bot.infra.DAO.player_dao()
  PlayerDAO.searchByName(msg.from.username)
    .then((resp) => {
      const level = resp[0].level
      level += 1
      PlayerDAO.update({
        name: msg.from.username
      }, { $set: { 'level': level } })
    })
}

module.exports = function () {
  return player_funcs
}
