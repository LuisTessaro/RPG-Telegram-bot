const Player = require('../../models/mongoose-models/Player')
const Combat = require('../../models/mongoose-models/Combat')
const { v4: uuidv4 } = require('uuid')

const { SlimeObj, BuildSlime } = require('../../models/monsters/outskirts-of-town/Slime')
const { buildMonster } = require('../../models/factories/monster-factory')
const { buildPlayer } = require('../../models/factories/player-factory')


const startAdventure = async (playerIds, monsterIds) => {
  const dbPlayers = await Promise.all(playerIds.map(telegramId => Player.findOne({ telegramId })))
  const isMP = playerIds.length > 1

  if (dbPlayers.find(player => player[isMP ? 'isParticipatingInMPCombat' : 'isParticipatingInSPCombat']))
    throw `Player already parting in ${isMP ? 'multiplayer' : 'singleplayer'} combat`

  const builtPlayers = await Promise.all(dbPlayers.map(dbPlayer => buildPlayer(dbPlayer)))

  console.log(builtPlayers.map(player => player.playerDbObj.username))

  //build this better start
  const builtMonster1 = buildMonster(BuildSlime(1), SlimeObj, uuidv4())
  const builtMonster2 = buildMonster(BuildSlime(2), SlimeObj, uuidv4())
  //build this better end

  const saver = dbPlayers.map(dbPlayer => {
    dbPlayer[isMP ? 'isParticipatingInMPCombat' : 'isParticipatingInSPCombat'] = true
    return dbPlayer.save()
  })

  const combatObj = new Combat({
    participants: playerIds,
    playerObjects: builtPlayers,
    monsterObjects: [builtMonster1, builtMonster2],
    areaBuffsPlayers: [],
    areaBuffsMonsters: [],
    areaDebuffsPlayers: [],
    areaDebuffsMonsters: [],
    playerTurn: playerIds[0],
    monsterTurn: '',
  })

  await Promise.all([...saver, combatObj.save()])
}


module.exports = {
  startAdventure,
}