const Promise = require('bluebird')
const seconds = 5
const users = {}

module.exports = function (bot) {
  var playerFuncs = new bot.infra.player_funcs()
  var partyFuncs = new bot.infra.party_funcs()

  bot.on('/boss_fight', (msg) => {
    partyFuncs.handlePartyExists(msg.chat.id, bot)
      .then(function (resolve) { // resolve is party if found
        let monster = {
          name: 'Wolf',
          hp: 10,
          autoAttackDmg: 1,
          flee: 0,
          accuracy: 100,
          iniciative_bonus: 0,
          occurrence: 0,
          exp: 0
        }
        let comparative = resolve.players.length
        let party = []
        let playerFactory = new bot.factory.player_factory()
        resolve.players.map((player) => {
          playerFuncs.handlePlayerExistsByName(player.name, bot)
            .then(function (resolve) { // resolve is player if found
              party.push(playerFactory.calculateStatsForPlayer(resolve, bot))
              if (comparative === party.length) {
                console.log('comparative ' + comparative)
                console.log('party lenght ' + party.length)
                console.log(party)
                bot.sendMessage(msg.chat.id, bossBattle(party, monster))
              }
            })
            .catch(function (reject) {
              console.log('invalid party')
            })
        })

      })
      .catch(function (reject) {
        bot.sendMessage(msg.chat.id, 'Invalid party or no party exists: ' + reject)
      })
  })

  bot.on(/^\/explore (.+)$/, (msg, props) => {
    let maps = {
      green_woods: function (msg, map) {
        bot.sendMessage(msg.from.id, 'You started exploring the Green Woods')
        exploreWrapper(msg, map)
      },
      dark_forest: function (msg, map) {
        bot.sendMessage(msg.from.id, 'You started exploring the Dark Forest')
        exploreWrapper(msg, map)
      },
      bat_cave: function (msg, map) {
        bot.sendMessage(msg.from.id, 'You started exploring the Bat Cave')
        exploreWrapper(msg, map)
      },
      deep_below: function (msg, map) {
        bot.sendMessage(msg.from.id, 'You started exploring the Deep Below')
        exploreWrapper(msg, map)
      }
    }
    playerFuncs.handlePlayerExists(msg, bot)
      .then(function (resolve) { // resolve is player if found
        const map = props.match[1]
        if (!users[msg.from.username]) { // if player is not on users{}
          users[msg.from.username] = {
            'WantsToExplore': true,
            'exploring': false
          }
        } else { // if player is on users{}
          if (users[msg.from.username].exploring === true) {
            return bot.sendMessage(msg.from.id, 'You are already exploring or did not return yet')
          }
          users[msg.from.username].WantsToExplore = true
        }
        if (maps[map]) {
          maps[map](msg, map)
        } else bot.sendMessage(msg.from.id, 'Invalid map, use /start to see all available maps')
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  // do network version
  bot.on('/stop_exploring', (msg) => {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(function (resolve) { // resolve is player if found
        users[msg.from.username].WantsToExplore = false
        if (users[msg.from.username].exploring === false) {
          return
        }
        return bot.sendMessage(msg.from.id, 'You will stop exploring as soon as a battle happens or you die.')
      })
      .catch(function (reject) {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  function exploreWrapper(msg, map) {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(function (resolve) { // resolve is player if found
        let playerFactory = new bot.factory.player_factory()
        let player = playerFactory.calculateStatsForPlayer(resolve, bot)

        let monsterFactory = new bot.factory.monster_factory()
        let monster = monsterFactory.getMonster(map, bot)

        users[msg.from.username].exploring = true

        setImmediate(() => Promise.delay(seconds * 1000)
          .then(() => {
            bot.sendMessage(msg.from.id, battle(player, monster, msg, map))
          }))
      })
  }

  function battle(player, monster, msg, map) {
    console.log('battle ' + player.name)
    var startMessage = ''; var battleLog = ''
    let playerIniciative = dice(20)
    let monsterIniciative = dice(20)
    let playerMaxHp = player.hp
    let monsterMaxHp = monster.hp
    battleLog += `🔶${monster.name} rolled a ${monsterIniciative}\n`
    battleLog += `🔷${player.name} rolled a ${playerIniciative}\n\n`
    if (playerIniciative > monsterIniciative) battleLog += `${player.name} won the initiative!\n\n`
    else battleLog += `${monster.name} won the initiative!\n\n`

    function playerTurn() {
      let playerAccuracy = dice(player.accuracy)
      let monsterFlee = dice(monster.flee)
      let playerDamage = dice(player.autoAttackDmg)
      battleLog += `🔷 🎯${playerAccuracy}  💢${playerDamage}  ✨${monsterFlee}\n`
      if (playerAccuracy >= monsterFlee) {
        battleLog += `${player.name} dealt ${playerDamage} damage to ${monster.name}\n`
        monster.hp -= playerDamage
        // skills
        let i
        for (i in player.skills) {
          let rand = dice(100)
          if (rand < player.skills[i].odds) { // half of the damage is always counted
            let skillDamage = player.skills[i].damage() / 2
            skillDamage += dice(player.skills[i].damage()) / 2
            battleLog += `${player.skills[i].emoji} ${player.skills[i].skill_name} cast for ${skillDamage} damage\n`
            monster.hp -= skillDamage
          }
        }
        for (i in player.healingSkills) {
          let rand = dice(100)
          if (rand < player.healingSkills[i].odds) {
            let skillHealing = dice(player.healingSkills[i].heal())
            if (skillHealing === 0) skillHealing += 1// if it heals it always heals at least for 1 hp
            battleLog += `${player.healingSkills[i].emoji} ${player.healingSkills[i].skill_name} cast for ${skillHealing} healing\n`
            if (player.hp + skillHealing >= playerMaxHp) player.hp = playerMaxHp
            else player.hp += skillHealing
          }
        }
        battleLog += `${monster.name}'s hp: ${monster.hp}/${monsterMaxHp}\n\n`
        if (monster.hp <= 0) {
          startMessage += `✔️${player.name} vs. ${monster.name}!\n\n`
          battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`
          playerFuncs.addExp(msg, monster.exp, bot)
          if (users[msg.from.username].WantsToExplore === true) exploreWrapper(msg, map)
          else {
            users[msg.from.username].exploring = false
            battleLog += '\n\nYou stoped exploring!'
          }
          return {
            message: startMessage + battleLog
          }
        }
      } else battleLog += `${player.name} missed the attack\n   miss\n\n`
    }

    function monsterTurn() {
      let monsterDamage = dice(monster.autoAttackDmg)
      let monsterAccuracy = dice(monster.accuracy)
      let playerFlee = dice(player.flee)
      battleLog += `🔶 🎯${monsterAccuracy}  💢${monsterDamage}  ✨${playerFlee}\n`
      if (monsterAccuracy >= playerFlee) {
        battleLog += `${monster.name} dealt ${monsterDamage} damage to ${player.name}\n`
        player.hp -= monsterDamage
        battleLog += `${player.name} hp: ${player.hp}/${playerMaxHp}\n\n`
        if (player.hp <= 0) {
          startMessage += `❌${player.name} vs. ${monster.name}!\n\n`
          battleLog += 'You died! Use the buttons to try again'
          users[msg.from.username].exploring = false
          return {
            message: startMessage + battleLog
          }
        }
      } else battleLog += `${monster.name} missed the attack\n   miss\n\n`
    }

    while (monster.hp > 0) {
      if (playerIniciative > monsterIniciative) {
        let got = playerTurn()
        if (got) return got.message

        got = monsterTurn()
        if (got) return got.message
      } else {
        let got = monsterTurn()
        if (got) return got.message

        got = playerTurn()
        if (got) return got.message
      }
    }
    return startMessage + battleLog
  }

  function bossBattle(players, monster) {
    var startMessage = ''; var battleLog = ''
    let partyIniciative = dice(20)
    let monsterIniciative = dice(20)
    let monsterMaxHp = monster.hp
    battleLog += `🔶${monster.name} rolled a ${monsterIniciative}\n`
    battleLog += `🔷The party rolled a ${partyIniciative}\n\n`
    if (partyIniciative > monsterIniciative) battleLog += `The party won the initiative!\n\n`
    else battleLog += `${monster.name} won the initiative!\n\n`

    function partyTurn() {
      players.map((key) => {
        if (monster.hp <= 0)
          return
        let playerAccuracy = dice(key.accuracy)
        let monsterFlee = dice(monster.flee)
        let playerDamage = dice(key.autoAttackDmg)
        battleLog += `🔷 🎯${playerAccuracy}  💢${playerDamage}  ✨${monsterFlee}\n`
        if (playerAccuracy >= monsterFlee) {
          battleLog += `${key.name} dealt ${playerDamage} damage to ${monster.name}\n`
          monster.hp -= playerDamage
          // skills ON
          let i
          for (i in key.skills) {
            let rand = dice(100)
            if (rand < key.skills[i].odds) { // half of the damage is always counted
              let skillDamage = key.skills[i].damage() / 2
              skillDamage += dice(key.skills[i].damage()) / 2
              battleLog += `${key.skills[i].emoji} ${key.skills[i].skill_name} cast for ${skillDamage} damage\n`
              monster.hp -= skillDamage
            }
          }
          for (i in key.healingSkills) {
            let rand = dice(100)
            if (rand < key.healingSkills[i].odds) {
              let skillHealing = dice(key.healingSkills[i].heal())
              if (skillHealing === 0) skillHealing += 1// if it heals it always heals at least for 1 hp
              battleLog += `${key.healingSkills[i].emoji} ${key.healingSkills[i].skill_name} cast for ${skillHealing} healing\n`
              if (key.hp + skillHealing >= key.maxHp) key.hp = key.maxHp
              else key.hp += skillHealing
            }
          }
          battleLog += `${monster.name}'s hp: ${monster.hp}/${monsterMaxHp}\n\n`
          if (monster.hp <= 0) {
            startMessage += `✔️Party vs. ${monster.name}!\n\n`
            battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`
            return {
              message: startMessage + battleLog
            }
          }
        } else battleLog += `${key.name} missed the attack\n   miss\n\n`
      })
    }

    function monsterTurn() {
      if (monster.hp <= 0)
        return
      const playerNumber = Math.floor((Math.random() * players.length))
      let monsterDamage = dice(monster.autoAttackDmg)
      let monsterAccuracy = dice(monster.accuracy)
      let targetPlayer = players[playerNumber]
      let playerFlee = dice(targetPlayer.flee)
      battleLog += `🔶 🎯${monsterAccuracy}  💢${monsterDamage}  ✨${playerFlee}\n`

      if (monsterAccuracy >= playerFlee) {
        battleLog += `${monster.name} dealt ${monsterDamage} damage to ${targetPlayer.name}\n`
        targetPlayer.hp -= monsterDamage
        battleLog += `${targetPlayer.name} hp: ${targetPlayer.hp}/${targetPlayer.maxHp}\n\n`
        if (targetPlayer.hp <= 0) {
          battleLog += targetPlayer.name + ' died!\n\n'
          players.splice(playerNumber, 1)
          if (players.length == 0) {
            startMessage += `❌${monster.name} bested your party!\n\n`
            battleLog += 'Everyone died :C\n\n'
            return {
              message: startMessage + battleLog
            }
          }
        }
      } else battleLog += `${monster.name} missed the attack\n   miss\n\n`
    }

    while (monster.hp > 0) {
      if (partyIniciative > monsterIniciative) {
        let got = partyTurn()
        if (got) return got.message

        got = monsterTurn()
        if (got) return got.message
      } else {
        let got = monsterTurn()
        if (got) return got.message

        got = partyTurn()
        if (got) return got.message
      }
    }
    return startMessage + battleLog
  }

  function dice(faces) {
    return Math.floor((Math.random() * faces + 1) + 1)
  }
}
