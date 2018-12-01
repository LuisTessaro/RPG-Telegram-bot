const Promise = require('bluebird')
const seconds = 2
const users = {}

module.exports = function (bot) {
  const playerFuncs = new bot.infra.player_funcs()
  
  let playerFactory = new bot.factory.player_factory()
  let monsterFactory = new bot.factory.monster_factory()

  bot.on(/^\/explore (.+)$/, (msg, props) => {
    let maps = {
      green_woods: (msg, map, resolve) => {
        bot.sendMessage(msg.from.id, 'You started exploring the Green Woods')
        exploreWrapper(msg, map, resolve)
      },
      dark_forest: (msg, map, resolve) => {
        bot.sendMessage(msg.from.id, 'You started exploring the Dark Forest')
        exploreWrapper(msg, map, resolve)
      },
      bat_cave: (msg, map, resolve) => {
        bot.sendMessage(msg.from.id, 'You started exploring the Bat Cave')
        exploreWrapper(msg, map, resolve)
      },
      deep_below: (msg, map, resolve) => {
        bot.sendMessage(msg.from.id, 'You started exploring the Deep Below')
        exploreWrapper(msg, map, resolve)
      }
    }
    playerFuncs.handlePlayerExists(msg, bot)
      .then((resolve) => { // resolve is player if found
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
          maps[map](msg, map, resolve)
        } else bot.sendMessage(msg.from.id, 'Invalid map, use /start to see all available maps')
      })
      .catch(() => {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  bot.on('/stop_exploring', (msg) => {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(() => {
        users[msg.from.username].WantsToExplore = false
        if (users[msg.from.username].exploring === false) {
          return
        }
        return bot.sendMessage(msg.from.id, 'You will stop exploring as soon as a battle happens or you die.')
      })
      .catch(() => {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  function exploreWrapper(msg, map, resolve) {
    let player = playerFactory.calculateStatsForPlayer(resolve, bot)

    let monster = monsterFactory.getMonster(map, bot)

    users[msg.from.username].exploring = true

    setImmediate(() => Promise.delay(seconds * 1000)
      .then(() => {
        bot.sendMessage(msg.from.id, battle(player, monster, msg, map, resolve))
      }))

  }

  function battle(player, monster, msg, map, resolve) {
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
        player.skills.forEach((skill) => {
          let rand = dice(100)
          if (rand < skill.odds) { 
            let skillDamage = skill.damage() / 2 // half of the damage is always counted
            skillDamage += dice(skill.damage()) / 2
            battleLog += `${skill.emoji} ${skill.skill_name} cast for ${skillDamage} damage\n`
            monster.hp -= skillDamage
          }
        })

        player.healingSkills.forEach((skill)=> {
          let rand = dice(100)
          if (rand < skill.odds) {
            let skillHealing = dice(skill.heal())
            if (skillHealing === 0) skillHealing += 1// if it heals it always heals at least for 1 hp
            battleLog += `${skill.emoji} ${skill.skill_name} cast for ${skillHealing} healing\n`
            if (player.hp + skillHealing >= playerMaxHp) player.hp = playerMaxHp
            else player.hp += skillHealing
          }
        })

        battleLog += `${monster.name}'s hp: ${monster.hp}/${monsterMaxHp}\n\n`
        if (monster.hp <= 0) {
          startMessage += `✔️${player.name} vs. ${monster.name}!\n\n`
          battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`
          playerFuncs.addExp(msg, monster.exp, bot)
          if (users[msg.from.username].WantsToExplore === true) exploreWrapper(msg, map, resolve)
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
}

function dice(faces) {
  return Math.floor((Math.random() * faces + 1) + 1)
}