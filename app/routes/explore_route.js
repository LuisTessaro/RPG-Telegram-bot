const Promise = require('bluebird');
var seconds = 10;

const users = {};

module.exports = function (bot) {
    //exploration if the user exists call a wrapper that does battle stuff:
    bot.on(/^\/explore (.+)$/, (msg, props) => {
        handlePlayerExists(msg)
            .then(function (resolve) {//resolve is player if found
                const map = props.match[1];
                if (!users[msg.from.username]) {
                    users[msg.from.username] = {
                        "WantsToExplore": true,
                        "exploring": false
                    };
                } else users[msg.from.username].WantsToExplore = true;

                if(users[msg.from.username].exploring == false){
                    if (map == 'green_woods') {
                        bot.sendMessage(msg.from.id, 'You started exploring the Green Woods');
                        exploreWrapper(msg, map);
                    }else bot.sendMessage(msg.from.id, 'Invalid map, use /start to see all available maps');
                }else bot.sendMessage(msg.from.id, 'You are already exloring');
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    bot.on('/stop_exploring', (msg) => {//if existis do something
        if (!users[msg.from.username]) {
            users[msg.from.username] = {
                "WantsToExplore": false,
                "exploring": false
            };
        }else {
            users[msg.from.username].WantsToExplore = false;
            users[msg.from.username].exploring = false;
        }
        //
        return bot.sendMessage(msg.from.id, 'You will stop exploring ass soon as a battle happens or you die.');
    });

    function exploreWrapper(msg, map) {
        //searches for the player everytime the battle wrapper is called
        handlePlayerExists(msg)
            .then(function (resolve) {//resolve is player if found
                let playerFactory = new bot.factory.player_factory();
                let player = playerFactory.calculateStatsForPlayer(resolve, bot);

                var monster_factory = new bot.factory.monster_factory();
                var monster = monster_factory.getMonster(map, bot);

                users[msg.from.username].exploring = true;
                //exploring 
                setImmediate(() => Promise.delay(seconds * 1000)
                    .then(() => {
                        console.log('message sent to: ' + msg.from.username);
                        bot.sendMessage(msg.from.id, battle(player, monster, msg, map, users[msg.from.username].WantsToExplore));
                    }));
            })
            .catch(function (reject) {
                console.log('something went terribly wrong');
            });
    }
    function battle(player, monster, msg, map, wants) {
        var startMessage = '', battleLog = '';
        playerIniciative = dice(20);
        monsterIniciative = dice(20);
        let playerMaxHp = player.hp;
        let monsterMaxHp = monster.hp;
        battleLog += `🔶${monster.name} rolled a ${monsterIniciative}\n`;
        battleLog += `🔷${player.name} rolled a ${playerIniciative}\n\n`;
        if (playerIniciative > monsterIniciative) battleLog += `${player.name} won the initiative!\n\n`;
        else battleLog += `${monster.name} won the initiative!\n\n`;

        while (monster.hp > 0) {
            if (playerIniciative > monsterIniciative) {
                //player turn
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
                            let skill_damage = dice(player.skills[i].damage);
                            battleLog += `${player.skills[i].emoji} ${player.skills[i].skill_name} cast for ${skill_damage} damage\n`;
                            monster.hp -= skill_damage;
                        }
                    }
                    battleLog += `${monster.name}'s hp: ${monster.hp}/${monsterMaxHp}\n\n`;
                    if (monster.hp <= 0) {
                        startMessage += `✔️${player.name} vs. ${monster.name}!\n\n`;
                        battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`;
                        addExp(msg, monster.exp);
                        if (wants == true) exploreWrapper(msg, map);
                        else battleLog += '\n\nYou stoped exploring!';

                        return startMessage + battleLog;
                    }
                } else {
                    battleLog += `${player.name} missed the attack\n   miss\n\n`;
                }
                //monster turn
                let monster_accuracy = dice(monster.accuracy);
                let player_flee = dice(player.flee);
                let monster_damage = dice(monster.autoAttackDmg);
                battleLog += `🔶 🎯${monster_accuracy}  💢${monster_damage}  ✨${player_flee}\n`;
                if (monster_accuracy >= player_flee) {
                    battleLog += `${monster.name} dealt ${monster_damage} damage to ${player.name}\n`
                    player.hp -= monster_damage;
                    battleLog += `${player.name} hp: ${player.hp}/${playerMaxHp}\n\n`
                    if (player.hp <= 0) {
                        startMessage += `❌${player.name} vs. ${monster.name}!\n\n`;
                        battleLog += "You died! Use the buttons to try again";
                        users[msg.from.username].exploring = false;
                        return startMessage + battleLog;
                    }
                } else {
                    battleLog += `${monster.name} missed the attack\n   miss\n\n`;
                }
            } else {
                //monster turn
                let monster_accuracy = dice(monster.accuracy);
                let player_flee = dice(player.flee);
                let monster_damage = dice(monster.autoAttackDmg);
                battleLog += `🔶 🎯${monster_accuracy}  💢${monster_damage}  ✨${player_flee}\n`;
                if (monster_accuracy >= player_flee) {
                    battleLog += `${monster.name} dealt ${monster_damage} damage to ${player.name}\n`
                    player.hp -= monster_damage;
                    battleLog += `${player.name} hp: ${player.hp}/${playerMaxHp}\n\n`
                    if (player.hp <= 0) {
                        startMessage += `❌${player.name} vs. ${monster.name}!\n\n`;
                        battleLog += "You died! Use the buttons to try again";
                        users[msg.from.username].exploring = false;
                        return startMessage + battleLog;
                    }
                } else {
                    battleLog += `${monster.name} missed the attack\n   miss\n\n`;
                }

                //player turn
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
                            let skill_damage = dice(player.skills[i].damage);
                            battleLog += `${player.skills[i].emoji} ${player.skills[i].skill_name} cast for ${skill_damage} damage\n`;
                            monster.hp -= skill_damage;
                        }
                    }
                    battleLog += `${monster.name}'s hp: ${monster.hp}/${monsterMaxHp}\n\n`;
                    if (monster.hp <= 0) {
                        startMessage += `✔️${player.name} vs. ${monster.name}!\n\n`;
                        battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`;
                        addExp(msg, monster.exp);
                        if (wants == true) exploreWrapper(msg, map);
                        else battleLog += '\n\nYou stoped exploring!';
                        return startMessage + battleLog;
                    }
                } else {
                    battleLog += `${player.name} missed the attack\n   miss\n\n`;
                }
            }

        }

        return startMessage + battleLog;
    }
    function dice(faces) {
        return Math.floor((Math.random() * faces + 1) + 1);
    }
    function handlePlayerExists(msg) {
        return new Promise(function (resolve, reject) {
            var PlayerDAO = new bot.infra.DAO.PlayerDAO();
            PlayerDAO.searchByName(msg.from.username)
                .then(function (resp) {
                    if (resp[0]) resolve(resp[0]);
                    else reject('didnt find player');
                });
        });
    }
    
    function addExp(msg, expGains) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                var exp = resp[0].exp;
                exp += expGains;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "exp": exp } });
            });

    }
    
}
