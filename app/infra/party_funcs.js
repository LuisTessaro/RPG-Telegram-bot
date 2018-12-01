function party_funcs() { }

party_funcs.prototype.addNewParty = (partyName, bot) => {
  const party_dao = new bot.infra.DAO.party_dao()
  party_dao.searchByName(partyName)
    .then(() => {
      party_dao.update({ name: partyName }, { $push: { players: { $each: [{ name: newMember }] } } })
    })
}

party_funcs.prototype.addPlayerToParty = (partyName, newMember, bot) => {
  const party_dao = new bot.infra.DAO.party_dao()
  party_dao.searchByName(partyName)
    .then(() => {
      party_dao.update({ name: partyName }, { $push: { players: { $each: [{ name: newMember }] } } })
    })
}
party_funcs.prototype.removePlayersFromParty = (partyName, name, bot) => {
  const party_dao = new bot.infra.DAO.party_dao()
  party_dao.searchByName(partyName)
    .then(() => {
      party_dao.update({ name: partyName }, { $pull: { players: { name: name } } })
    })
}

party_funcs.prototype.handlePartyExists = (partyName, bot) => {
  return new Promise((resolve, reject) => {
    const party_dao = new bot.infra.DAO.party_dao()
    party_dao.searchByName(partyName)
      .then((resp) => {
        if (resp[0]) resolve(resp[0])
        else reject('didnt find party')
      })
  })
}

//delete party

party_funcs.prototype.deleteParty = (partyName, bot) => {
  const party_dao = new bot.infra.DAO.party_dao()
  party_dao.deleteByName(partyName)
}

module.exports = function () {
  return party_funcs
}
