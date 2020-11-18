const BaseClass = require('../BaseClass')()
const HealerClass = require('./Healer')

BaseClass.allowedEquipmentTypes = [1, 2, 3]

module.exports = {
  Healer: HealerClass(Object.assign({}, BaseClass)),
}