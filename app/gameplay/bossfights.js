module.exports = function (bot) {
  const partyFuncs = new bot.infra.party_funcs()
  const playerFuncs = new bot.infra.player_funcs()
  const playerFactory = new bot.factory.player_factory()

  //confuse as hell try to improve
  bot.on('/boss_fight', (msg) => {
    playerFuncs.handlePlayerExists(msg, bot)
      .then(() => {
        partyFuncs.handlePartyExists(msg.chat.id, bot)
          .then((resolve) => { // resolve is party if found
            //boss builder instead of this
            const monster = {
              name: 'Wolf',
              hp: 10,
              autoAttackDmg: 1,
              flee: 0,
              accuracy: 100,
              iniciative_bonus: 0,
              occurrence: 0,
              exp: 0
            }

            const party = resolve.players.map(async (player) => {
              playerFuncs.handlePlayerExistsByName(player.name, bot)
                .then((resolve) => {
                  return resolve
                })
                .catch(() => {
                  console.log('invalid party')
                })
            })

            setTimeout(() => {
              party[0].then((p)=> console.log(p))
            }, 5000)
            //bot.sendMessage(msg.chat.id, bossBattle(formedParty, monster))

          })
          .catch((reject) => {
            bot.sendMessage(msg.chat.id, 'Invalid party or no party exists: ' + reject)
          })
      })
      .catch(() => {
        return bot.sendMessage(msg.from.id, 'use /register to set up an account')
      })
  })

  //bad and out of date FIX
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
}

function dice(faces) {
  return Math.floor((Math.random() * faces + 1) + 1)
}