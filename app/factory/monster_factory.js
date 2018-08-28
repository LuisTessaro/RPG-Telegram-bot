function player_factory () { }

player_factory.prototype.getMonster = function (map, bot) {
  let monsterStats = {
    name: '',
    hp: 0,
    sp: 0,
    autoAttackDmg: 0,
    flee: 0,
    accuracy: 0,
    iniciative_bonus: 0,
    occurrence: 0,
    exp: 0
  }

  switch (map) {
    case 'green_woods':
      solver(new bot.maps.green_woods())
      break
    case 'dark_forest':
      solver(new bot.maps.dark_forest())
      break
    case 'bat_cave':
      solver(new bot.maps.bat_cave())
      break
    case 'deep_below':
      solver(new bot.maps.deep_below())
      break
    default:
      console.log('something bad happend monstal factory invalid map')
  }
  // let r = Math.floor(Math.random() * 4);
  function solver (mapName) {
    let possibleMonsters = mapName.getMonsters()
    let intendedRarity
    let r = Math.floor(Math.random() * 100)

    if (r <= 50) intendedRarity = 0
    else if (r <= 80) intendedRarity = 1
    else if (r <= 90) intendedRarity = 2
    else if (r <= 95) intendedRarity = 3
    else if (r <= 100) intendedRarity = 4

    switch (intendedRarity) {
      case 0:
        possibleMonsters = possibleMonsters.filter(function (rarity, i) {
          return possibleMonsters[i].rarity === 'common'
        })
        break
      case 1:
        possibleMonsters = possibleMonsters.filter(function (rarity, i) {
          return possibleMonsters[i].rarity === 'uncommon'
        })
        break
      case 2:
        possibleMonsters = possibleMonsters.filter(function (rarity, i) {
          return possibleMonsters[i].rarity === 'rare'
        })
        break
      case 3:
        possibleMonsters = possibleMonsters.filter(function (rarity, i) {
          return possibleMonsters[i].rarity === 'boss'
        })
        break
      case 4:
        possibleMonsters = possibleMonsters.filter(function (rarity, i) {
          return possibleMonsters[i].rarity === 'secret'
        })
        break
    }

    let i = Math.floor(Math.random() * possibleMonsters.length)
    monsterStats.name = possibleMonsters[i].name
    monsterStats.hp = possibleMonsters[i].hp
    monsterStats.sp = possibleMonsters[i].sp
    monsterStats.autoAttackDmg = possibleMonsters[i].autoAttackDmg
    monsterStats.flee = possibleMonsters[i].flee
    monsterStats.accuracy = possibleMonsters[i].accuracy
    monsterStats.iniciative_bonus = possibleMonsters[i].iniciative_bonus
    monsterStats.exp = possibleMonsters[i].exp
  }
  return monsterStats
}

module.exports = function () {
  return player_factory
}
