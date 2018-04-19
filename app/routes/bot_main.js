const Promise = require('bluebird');
var seconds = 5;


const users = {};
module.exports = function (bot) {
    bot.on(['/start', '/back'], msg => {
        startWrapper(msg);
    });


    bot.on('/register', function (msg) {
        let replyMarkup = bot.keyboard([
            ['/class Warrior'],
            ['/class Thief'],
            ['/class Mage'],
            ['/class Archer'],
            ['/class Cleric']
        ], { resize: true });
        return bot.sendMessage(msg.from.id, 'Use the buttons to pick a class.', { replyMarkup });
    });


    bot.on(/^\/class (.+)$/, (msg, props) => {
        handlePlayerExists(msg)
            .then(function (resolve) {
                bot.sendMessage(msg.from.id, 'You are already registerd');
                startWrapper(msg);
            })
            .catch(function (reject) {
                const classe = props.match[1];
                var PlayerDAO = new bot.infra.DAO.PlayerDAO();
                PlayerDAO.insert(playerCreator(msg.from.username, classe));
                //cant call start wrapper here because it will not wait fix maybe?
                let replyMarkup = bot.keyboard([
                    ['/start'],
                    ['/explore green_woods'],
                    ['/stop_exploring', '/exp']
                ], { resize: true });
                return bot.sendMessage(msg.from.id, 'Use the buttons to explore maps,level up or sell your things.', { replyMarkup });
            });
    });
    //dev tool

    //exploration if the user exists call a wrapper that does battle stuff:
    bot.on(/^\/explore (.+)$/, (msg, props) => {
        const map = props.match[1];
        if (map == 'green_woods') {
            bot.sendMessage(msg.from.id, 'You started exploring the Green Woods');
            exploreWrapper(msg, map);
        }
        else
            bot.sendMessage(msg.from.id, 'Invalid map, use /start to see all available maps');
    });

    bot.on('/stop_exploring', (msg) => {//if existis do something
        //WantsToExplore = false;
        //exploring = false;
        bot.sendMessage(msg.from.id, 'Not implemented!');
    });

    bot.on('/exp', (msg) => {
        handlePlayerExists(msg)
            .then(function (resolve) {//resolve is player if found
                bot.sendMessage(msg.from.id, 'You have: ' + resolve.exp + " exp.");
            })
            .catch(function (reject) {
            });
    });

    bot.on('/reborn', (msg) => {
        reborn(msg);
    });


    function exploreWrapper(msg, map) {
        //searches for the player everytime the battle wrapper is called
        handlePlayerExists(msg)
            .then(function (resolve) {//resolve is player if found
                let playerFactory = new bot.factory.player_factory();
                let player = playerFactory.calculateStatsForPlayer(resolve, bot);

                var monster_factory = new bot.factory.monster_factory();
                var monster = monster_factory.getMonster('green_woods', bot);

                //exploring 
                setImmediate(() => Promise.delay(seconds * 1000)
                    .then(() => {
                        console.log('message sent to: ' + msg.from.username);
                        bot.sendMessage(msg.from.id, battle(player, monster, msg, map));
                    }));
            })
            .catch(function (reject) {
                console.log('something went terribly wrong');
            });
    }
    function battle(player, monster, msg, map) {
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
                    battleLog += `${player.name} delt ${player_damage} damage to ${monster.name}\n`;
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
                        exploreWrapper(msg, map);
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
                    battleLog += `${monster.name} delt ${monster_damage} damage to ${player.name}\n`
                    player.hp -= monster_damage;
                    battleLog += `${player.name} hp: ${player.hp}/${playerMaxHp}\n\n`
                    if (player.hp <= 0) {
                        startMessage += `❌${player.name} vs. ${monster.name}!\n\n`;
                        battleLog += "You died! Use the buttons to try again";
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
                    battleLog += `${monster.name} delt ${monster_damage} damage to ${player.name}\n`
                    player.hp -= monster_damage;
                    battleLog += `${player.name} hp: ${player.hp}/${playerMaxHp}\n\n`
                    if (player.hp <= 0) {
                        startMessage += `❌${player.name} vs. ${monster.name}!\n\n`;
                        battleLog += "You died! Use the buttons to try again";
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
                    battleLog += `${player.name} delt ${player_damage} damage to ${monster.name}\n`;
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
                        exploreWrapper(msg, map);
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
    function startWrapper(msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {
                console.log(resolve);
                let replyMarkup = bot.keyboard([
                    ['/start'],
                    ['/explore green_woods'],
                    ['/stop_exploring', '/exp']
                ], { resize: true });
                return bot.sendMessage(msg.from.id, 'Use the buttons to explore maps,level up or sell your things.', { replyMarkup });
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
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
    function playerCreator(name, classe) {
        return {
            name: name,
            classe: classe,
            level: 1,
            exp: 0,
            attributes: {
                str: 5,
                dex: 5,
                agi: 5,
                con: 5,
                int: 5,
                wis: 5,
                car: 5,
                wil: 5,
                luk: 5
            },
            equipment: [],
            bag: []
        }
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

    function reborn(msg) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.deleteByName(msg.from.username);
    }
}
