const Weapons = require('./Weapons')
const Body = require('./Body')
const Head = require('./Head')
const Shield = require('./Shield')
const Trinket = require('./Trinket')
const Ring = require('./Ring')

module.exports = {
  ...Weapons,
  ...Body,
  ...Head,
  ...Shield,
  ...Trinket,
  ...Ring,
}