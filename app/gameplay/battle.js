//try place battle() here 
//🔸🎯 7 💢 13 ✨ 16 🔹🎯 18 💢 18 ✨ 2

module.exports = function (bot) {
    bot.on(/^\/roll (.+)$/, (msg, props) => {
        const text = props.match[1];
        return bot.sendMessage(msg.from.id, 'roll: ' + dice(20));
    });

    //work on this
    function playerTurn(player, monster) {
        let battleLog = "", player_accuracy = dice(player.accuracy), monster_flee = dice(monster.flee), player_damage = dice(player.autoAttackDmg);
        battleLog += `🔷 🎯${player_accuracy}  💢${player_damage}  ✨${monster_flee}\n`;
        if (player_accuracy >= monster_flee) {
            battleLog += `${player.name} dealt ${player_damage} damage to ${monster.name}\n`;
            monster.hp -= player_damage;

            for (var i in player.skills) {
                let rand = dice(100);
                if (rand < player.skills[i].odds) {
                    let skill_damage = player.skills[i].damage() / 2;
                    skill_damage += dice(player.skills[i].damage() / 2);
                    battleLog += `${player.skills[i].emoji} ${player.skills[i].skill_name} cast for ${skill_damage} damage\n`;
                    monster.hp -= skill_damage;
                }
            }

            battleLog += `${monster.name}'s hp: ${monster.hp}/${monsterMaxHp}\n\n`;
            if (monster.hp <= 0) {
                let startMessage = "";
                startMessage += `✔️${player.name} vs. ${monster.name}!\n\n`;
                battleLog += `🆙 Experience: ${monster.exp} \n🎲 Loot: \n🎩 Equip:`;
                addExp(msg, monster.exp);
                if (wants == true) exploreWrapper(msg, map);
                else battleLog += '\n\nYou stoped exploring!';

                return {
                    startMessage: startMessage,
                    battleLog: battleLog
                };
            }
        } else battleLog += `${player.name} missed the attack\n   miss\n\n`;
        return battleLog;
    }
}