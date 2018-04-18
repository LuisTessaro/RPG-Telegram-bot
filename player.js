var template_player = {
    name: "",
    class: "",
    level: 1,
    exp: 0,
    atributes: {
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
    skills: [
        {
            skill_name: "Backstab",
            damage: "1d6",
            skill_id: 1,
            level_required: 2,
            emoji: "🔪"
        },
        {
            skill_name: "Cross slash",
            damage: "2d20",
            skill_id: 1,
            level_required: 10,
            emoji: "⚔️"
        },
        {
            skill_name: "Poison Bomb",
            damage: "2d20",
            skill_id: 1,
            level_required: 10,
            emoji: "☠️"
        }
    ],
    equipment: [
        {
            item_name: "Simple knife",
            damage: "+2",
            bonus: {
                str: 0,
                dex: 0,
                agi: 2,
                con: 0,
                int: 0,
                wis: 0,
                car: 0,
                wil: 0,
                luk: 0,
            },
            debuff: {
                str: 0,
                dex: 0,
                agi: 0,
                con: 0,
                int: 0,
                wis: 0,
                car: 0,
                wil: 0,
                luk: 0,
            }
        }
    ],
    bag: [
        {
            loot_name: "Shell",
            price: 3,
            amount: 13
        },
        {
            loot_name: "Smile goo",
            price: 1,
            amount: 87
        }
    ]
};

const Promise = require('bluebird');
//all current users are here
const users = {};
module.exports = function (bot) {
    bot.on(['/start', '/back'], msg => {
        //if user doesent exist in game create user 
        //if he does do nothing
        if (!users[msg.from.username]) {
            const playerAux = {
                name: "luis",
                lvl: 1,
                hp: 50,
                sp: 50,
                _hp: 50,
                _sp: 50,
                str: 25,
                agi: 10,
                defense: 0,
                magic: 1,
                exp: 0
            };

            //creates user in the list
            users[msg.from.username] = {
                "name": msg.from.username,
                //player : goes here
                "playerObj": playerAux,
                //can he explore a map or want to?
                "WantsToExplore": true,
                //is he currenty exploring a map?
                "exploring": false
            };
        }

        // /start and /back MUST always return a keyboard
        let replyMarkup = bot.keyboard([
            ['/start'],
            ['/explore_green_woods'],
            ['/stop_exploring', '/exp']
        ], { resize: true });
        return bot.sendMessage(msg.from.id, 'Use the buttons to explore maps or sell your things.', { replyMarkup });
    });

    //dev tool
    bot.on('/list_players', function (msg) {
        bot.sendMessage(msg.from.id, `All users: ${JSON.stringify(users)}`)
    });

    bot.on(/^\/roll (.+)$/, (msg, props) => {
        const text = props.match[1];
        return bot.sendMessage(msg.from.id, 'roll: ' + dice(20));
    });

    //exploration if the user existis call a wrapper that does battle stuff:
    bot.on('/explore_green_woods', function (msg) {
        if (users[msg.from.username]) {
            users[msg.from.username].WantsToExplore = true;
            //if he is already exploring dont let him explore again
            if (users[msg.from.username].exploring == false) {
                bot.sendMessage(msg.from.id, 'You started exploring green woods');
                users[msg.from.username].exploring = true;
                //does battle each x seconds
                exploreWrapper(msg);
            } else bot.sendMessage(msg.from.id, 'You are already exploring');
        } else bot.sendMessage(msg.from.id, 'Use /start first');
    });

    bot.on('/stop_exploring', (msg) => {//if existis do something
        if (users[msg.from.username]) {
            users[msg.from.username].WantsToExplore = false;
            users[msg.from.username].exploring = false;
            bot.sendMessage(msg.from.id, 'You will stop exploring as soon as a battle occurs or you die');
        } else bot.sendMessage(msg.from.id, 'Use /start first');
    });

    function exploreWrapper(msg) {
        var monster = {
            name: "Wolf",
            lvl: 1,
            hp: 50,
            sp: 50,
            str: 16,
            agi: 10,
            defense: 2,
            magic: 10,
            exp: 75
        };

        //reset mana and hp??????
        //why does .hp gets changed
        users[msg.from.username].playerObj.hp = users[msg.from.username].playerObj._hp;
        users[msg.from.username].playerObj.sp = users[msg.from.username].playerObj._sp;
        //synch would be here!
        var seconds = 180;
        setImmediate(() => Promise.delay(seconds * 1000)
            .then(() => bot.sendMessage(msg.from.id, `${battle(users[msg.from.username].playerObj, monster, msg)}`)));
    }

    function battle(player, monster, msg) {
        let battleLog = "";
        while (monster.hp > 0) {
            //do something with this
            playerIniciative = dice(player.agi) + dice(20);
            monsterIniciative = dice(monster.agi + dice(20));
            battleLog += `🔷${player.name} iniciative: ${playerIniciative}\n`
            battleLog += `🔶${monster.name} iniciative: ${monsterIniciative}\n\n`
            if (playerIniciative > monsterIniciative) {
                var got = playerTurn(player, monster, msg);
                if (got.endMessage) {
                    battleLog += got.log;
                    return got.endMessage + battleLog;
                } else {
                    battleLog += got.log;
                }

                var got = monsterTurn(player, monster, msg);
                if (got.endMessage) {
                    battleLog += got.log;
                    return got.endMessage + battleLog;
                } else {
                    battleLog += got.log;
                }
            } else {
                var got = monsterTurn(player, monster, msg);
                if (got.endMessage) {
                    battleLog += got.log;
                    return got.endMessage + battleLog;
                } else {
                    battleLog += got.log;
                }

                var got = playerTurn(player, monster, msg);
                if (got.endMessage) {
                    battleLog += got.log;
                    return got.endMessage + battleLog;
                } else {
                    battleLog += got.log;
                }
            }
        }
    }

    function playerTurn(player, monster, msg) {
        var endMessage = "", battleLog = "";
        damage = player.str + (player.lvl * dice(6));
        battleLog += `😤${player.name} delt ${damage} damage to 😈${monster.name}'s:  ${monster.hp} hp and got reduced by ${monster.defense} defense\n`;
        ((damage - monster.defense) > 0) ? monster.hp -= (damage - monster.defense) : monster.hp = monster.hp;
        battleLog += `😈${monster.name}'s: ${monster.hp}  hp\n\n`;
        if (monster.hp <= 0) {
            endMessage += '✅You won!\n\n';
            battleLog += `\nYou defeated: 😈${monster.name}`;
            battleLog += `\n🎲Loot:\n`;
            battleLog += `🆙Exp: ${monster.exp}\n`;
            addExp(msg, monster.exp);
            //console.log('won call wrapper again');
            users[msg.from.username].WantsToExplore == true ? exploreWrapper(msg) : endMessage = 'You stopped exploring!\n\n';
            return {
                endMessage: endMessage,
                log: battleLog,
            }
        }
        return {
            log: battleLog
        };
    }

    function monsterTurn(player, monster, msg) {
        var endMessage = "", battleLog = "";
        var end = 0;
        damage = monster.str + (monster.lvl * dice(6));
        battleLog += `😈${monster.name} delt ${damage} damage to 😤${player.name}'s:  ${player.hp} hp and got reduced by ${player.defense} defense\n`;
        ((damage - player.defense) > 0) ? player.hp -= (damage - player.defense) : player.hp = player.hp;
        battleLog += `😤${player.name}'s: ${player.hp}  hp\n\n`;
        if (player.hp <= 0) {
            endMessage += '❌You were defeated!\n\n';
            battleLog += `\nYou died to: 😈${monster.name} /explore_map_name to try again`;
            users[msg.from.username].exploring = false;
            return {
                endMessage: endMessage,
                log: battleLog,
            }
        }
        return {
            log: battleLog
        };
    }

    function addExp(msg, amount) {
        //add some exp to player
    }

    //synch users[msg.from.username].playerObj to player from db
    function synchPlayer() {
    }

    function dice(faces) {
        return Math.floor((Math.random() * faces + 1) + 1);
    }
}
