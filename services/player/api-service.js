const Player = require('../../models/mongoose-models/Player')

const ClassObject = require('../../models/classes/ClassObject')

const PetObject = require('../../models/pets')

const getPlayersBasicInfo = async () => {
  const players = await Player.find()
  return players.map(player => {
    const classInstance = ClassObject.find(classE => classE.id === player.classId)
    const { className } = classInstance
    const specName = classInstance.specs.find(spec => spec.id === player.specId).name

    return {
      equipment: player.equipment,
      level: player.level,
      has_registered_pet: player.has_registered_pet,
      pet: {
        name: player.pet.name,
        level: player.pet.level,
        exp: player.pet.exp,
        type: player.pet.id,
        petImage: PetObject.find(e => e.id === player.pet.id).petImage,
      },
      characterName: player.characterName,
      username: player.username,
      classId: player.classId,
      className: className,
      specName: specName,
      classImage: ClassObject.find(e => e.id === player.classId).classImage,
    }
  })
}

const getPlayersFull = async () => {
  const players = await Player.find()
  return players
}

const dropPlayersFull = async () => {
  return await Player.deleteMany()
}

module.exports = {
  getPlayersBasicInfo,
  getPlayersFull,
  dropPlayersFull,
}