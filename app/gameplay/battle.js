const Promise = require('bluebird');
var seconds = 10;
const users = {};

module.exports = function (bot) {
    var player_funcs = new bot.infra.player_funcs();

    bot.on(/^\/explore (.+)$/, (msg, props) => {
        let maps = {
            green_woods: function (msg, map) {
                bot.sendMessage(msg.from.id, 'You started exploring the Green Woods');
                exploreWrapper(msg, map);
            },
            dark_forest: function (msg, map) {
                bot.sendMessage(msg.from.id, 'You started exploring the Dark Forest');
                exploreWrapper(msg, map);
            },
            bat_cave: function (msg, map) {
                bot.sendMessage(msg.from.id, 'You started exploring the Bat Cave');
                exploreWrapper(msg, map);
            },
            deep_below: function (msg, map) {
                bot.sendMessage(msg.from.id, 'You started exploring the Deep Below');
                exploreWrapper(msg, map);
            }
        };
        player_funcs.handlePlayerExists(msg, bot)
            .then(function (resolve) {//resolve is player if found
                const map = props.match[1];
                if (!users[msg.from.username]) {//if player is not on users{}
                    users[msg.from.username] = {
                        "WantsToExplore": true,
                        "exploring": false
                    };
                } else {//if player is on users{}
                    if (users[msg.from.username].exploring == true) {
                        return bot.sendMessage(msg.from.id, 'You are already exploring or did not return yet');
                    }
                    users[msg.from.username].WantsToExplore = true;
                }
                if (maps[map]) {
                    maps[map](msg, map);
                } else bot.sendMessage(msg.from.id, 'Invalid map, use /start to see all available maps');
            })
            .catch(function (reject) {
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    //do network version
    bot.on('/stop_exploring', (msg) => {
        player_funcs.handlePlayerExists(msg, bot)
            .then(function (resolve) {//resolve is player if found
                users[msg.from.username].WantsToExplore = false;
                if (users[msg.from.username].exploring == false) {
                    return;
                }
                return bot.sendMessage(msg.from.id, 'You will stop exploring as soon as a battle happens or you die.');
            })
            .catch(function (reject) {
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    function exploreWrapper(msg, map) {
        player_funcs.handlePlayerExists(msg, bot)
            .then(function (resolve) {//resolve is player if found
                let playerFactory = new bot.factory.player_factory();
                let player = playerFactory.calculateStatsForPlayer(resolve, bot);

                let monster_factory = new bot.factory.monster_factory();
                let monster = monster_factory.getMonster(map, bot);

                users[msg.from.username].exploring = true;

                setImmediate(() => Promise.delay(seconds * 1000)
                    .then(() => {
                        bot.sendMessage(msg.from.id, battle(player, monster, msg, map));
                    }));
            });
    }

    function battle(player, monster, msg, map) {
        var startMessage = '', battleLog = '';
        let playerIniciative = dice(20);
        let monsterIniciative = dice(20);
        let playerMaxHp = player.hp;
        let monsterMaxHp = monster.hp;
        battleLog += `🔶${monster.name} rolled a ${monsterIniciative}\n`;
        battleLog += `🔷${player.name} rolled a ${playerIniciative}\n\n`;
        if (playerIniciative > monsterIniciative) battleLog += `${player.name} won the initiative!\n\n`;
        else battleLog += `${monster.name} won the initiative!\n\n`;

        function playerTurn() {
            let player_accuracy = dice(player.accuracy);
            let monster_flee = dice(monster.flee);
            let player_damage = dice(player.autoAttackDmg);
            battleLog += `🔷 🎯${player_accuracy}  💢${player_damage}  ✨${monster_flee}\n`;
            if (player_accuracy >= monster_flee) {
                battleLog += `${player.name} dealt ${player_damage} damage to ${monster.name}\n`;
                monster.hp -= player_damage;
                //skills
                var i;
                for (i in player.skills) {
                    let rand = dice(100);
                    if (rand < player.skills[i].odds) {
                        let skill_damage = player.skills[i].damage();
                        skill_damage += dice(player.skills[i].damage());
                        battleLog += `${player.skills[i].emoji} ${player.skills[i].skill_name} cast for ${skill_damage} damage\n`;
                        monster.hp -= skill_damage;
                    }
                }
                for (i in player.healingSkills) {
                    let rand = dice(100);
                    if (rand < player.healingSkills[i].odds) {
                        let skill_healing = player.healingSkills[i].heal();
                        battleLog += `${player.healingSkills[i].emoji} ${player.healingSkills[i].skill_name} cast for ${skill_healing} healing\n`;
                        if (player.hp + skill_healing >= playerMaxHp) player.hp = playerMaxHp;
                        else player.hp += skill_healing;
                    }
                }
                battleLog += `${monster.name}'s hp: ${monster.hp}/${monsterMaxHp}\n\n`;
                if (monster.hp <= 0) {
                    startMessage += `✔️${player.name} vs. ${monster.name}!\n\n`;
                    battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`;
                    player_funcs.addExp(msg, monster.exp, bot);
                    if (users[msg.from.username].WantsToExplore == true) exploreWrapper(msg, map);
                    else {
                        users[msg.from.username].exploring = false;
                        battleLog += '\n\nYou stoped exploring!';
                    }
                    return {
                        message: startMessage + battleLog
                    }
                }
            } else battleLog += `${player.name} missed the attack\n   miss\n\n`;
        }

        function monsterTurn() {
            let monster_damage = dice(monster.autoAttackDmg);
            let monster_accuracy = dice(monster.accuracy);
            let player_flee = dice(player.flee);
            battleLog += `🔶 🎯${monster_accuracy}  💢${monster_damage}  ✨${player_flee}\n`;
            if (monster_accuracy >= player_flee) {
                battleLog += `${monster.name} dealt ${monster_damage} damage to ${player.name}\n`
                player.hp -= monster_damage;
                battleLog += `${player.name} hp: ${player.hp}/${playerMaxHp}\n\n`
                if (player.hp <= 0) {
                    startMessage += `❌${player.name} vs. ${monster.name}!\n\n`;
                    battleLog += 'You died! Use the buttons to try again';
                    users[msg.from.username].exploring = false;
                    return {
                        message: startMessage + battleLog
                    }
                }
            } else battleLog += `${monster.name} missed the attack\n   miss\n\n`;
        }

        while (monster.hp > 0) {
            if (playerIniciative > monsterIniciative) {
                let got = playerTurn();
                if (got) return got.message;

                got = monsterTurn();
                if (got) return got.message;
            } else {
                let got = monsterTurn();
                if (got) return got.message;

                got = playerTurn();
                if (got) return got.message;
            }
        }
        return startMessage + battleLog;
    }

    function dice(faces) {
        return Math.floor((Math.random() * faces + 1) + 1);
    }

}
