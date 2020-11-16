const { getPet } = require('../../services/player/pet-info-service')
const Pets = require('../../models/pets')

module.exports = async ctx => {
  const pet = await getPet(ctx.session.userInfo)

  const petObj = Pets.find(p => pet.id === p.id)

  let caption = `Name: ${pet.name}`
  caption += `\nYou can /change_pet_name 'New Pet Name'`
  caption += `\n\nLevel: ${pet.level}`
  caption += `\nExp: ${pet.level}`

  return ctx.replyWithPhoto(petObj.petImage, { caption })
}