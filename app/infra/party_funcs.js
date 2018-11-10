function party_funcs () { }

party_funcs.prototype.addNewParty = function (partyName, bot) {
  var party_dao = new bot.infra.DAO.party_dao()
  party_dao.searchByName(partyName)
    .then(function (resp) {
      party_dao.update({ name: partyName }, { $push: { players: { $each: [{ name: newMember}] } } })
    })
}

party_funcs.prototype.addPlayerToParty = function (partyName, newMember, bot) {
  var party_dao = new bot.infra.DAO.party_dao()
  party_dao.searchByName(partyName)
    .then(function (resp) {
      party_dao.update({ name: partyName }, { $push: { players: { $each: [{ name: newMember}] } } })
    })
}
party_funcs.prototype.removePlayersFromParty = function (partyName, name, bot) {
  var party_dao = new bot.infra.DAO.party_dao()
  party_dao.searchByName(partyName)
    .then(function (resp) {
      party_dao.update({ name: partyName }, { $pull: { players: { name: name } } })
    })
}

party_funcs.prototype.handlePartyExists = function (partyName, bot) {
  return new Promise(function (resolve, reject) {
    var party_dao = new bot.infra.DAO.party_dao()
    party_dao.searchByName(partyName)
      .then(function (resp) {
        if (resp[0]) resolve(resp[0])
        else reject('didnt find party')
      })
  })
}

//delete party

party_funcs.prototype.deleteParty = function (partyName, bot) {
  var party_dao = new bot.infra.DAO.party_dao()
  party_dao.deleteByName(partyName)
}

module.exports = function () {
  return party_funcs
}
