const Player = require('../../models/mongoose-models/Player')

const registerPet = async (petId, playerId) => {
    const p = await Player.findById(playerId)

    if (p.has_registered_pet)
        return { err: 'You are already registered a pet.' }

    try {
        p.has_registered_pet = true
        p.pet.name = 'No name'
        p.pet.id = petId
        p.pet.level = 1
        p.pet.exp = 0

        await p.save()
        return { message: '' }
    } catch (e) {
        console.log(e)
        return { err: 'Server error, try again later' }
    }
}

module.exports = {
    registerPet
}