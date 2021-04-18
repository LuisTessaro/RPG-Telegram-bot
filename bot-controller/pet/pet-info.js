const { getPet } = require('../../services/player/pet-info-service')
const Pets = require('../../models/pets')

module.exports = async ctx => {
  const pet = await getPet(ctx.message.from.id)

  const petObj = Pets.find(p => pet.id === p.id)

  let caption = `Name: ${pet.name} - Level: ${pet.level}`
  caption += `\nExp: ${pet.exp}`
  caption += `\n\nYou can edit your pet on the game's website.`

  return ctx.replyWithPhoto(petObj.petImage, { caption })
}