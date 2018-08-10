const lvlMultiplyer = 100;
module.exports = function (bot) {
    bot.on(['/start', '/back'], msg => {
        handlePlayerExists(msg)
            .then(function (resolve) {
                console.log(resolve);
                let replyMarkup = bot.keyboard([
                    ['/explore green_woods'],
                    ['/explore dark_forest'],
                    ['/explore bat_cave'],
                    ['/explore deep_below'],
                    ['/stop_exploring', '/exp'],
                    ['/level_up', '/me']
                ], { resize: true });
                return bot.sendMessage(msg.from.id, 'Use the buttons to explore maps,level up or sell your things.', { replyMarkup });
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });
    
    bot.on('/level_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {//resolve is player if found
                let replyMarkup = bot.keyboard([
                    ['/up str'],
                    ['/up dex'],
                    ['/up agi'],
                    ['/up con'],
                    ['/up int'],
                    ['/up wis'],
                    ['/back']
                ], { resize: true });
                return bot.sendMessage(msg.from.id, 'You have: ' + resolve.exp + " exp.", { replyMarkup });
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    bot.on(/^\/up (.+)$/, (msg, props) => {
        handlePlayerExists(msg)
            .then(function (resolve) {
                var PlayerDAO = new bot.infra.DAO.PlayerDAO();
                const statName = props.match[1];
                if (resolve.exp > resolve.level * lvlMultiplyer) {
                    if (statName == 'str') {
                        var att = resolve.attributes.str;
                        att += 1;
                        PlayerDAO.update({
                            name: msg.from.username
                        }, { $set: { "attributes.str": att } });
                    }else if(statName == 'dex'){
                        var att = resolve.attributes.dex;
                        att += 1;
                        PlayerDAO.update({
                            name: msg.from.username
                        }, { $set: { "attributes.dex": att } });
                    }else if(statName == 'agi'){
                        var att = resolve.attributes.agi;
                        att += 1;
                        PlayerDAO.update({
                            name: msg.from.username
                        }, { $set: { "attributes.agi": att } });
                    }else if(statName == 'con'){
                        var att = resolve.attributes.con;
                        att += 1;
                        PlayerDAO.update({
                            name: msg.from.username
                        }, { $set: { "attributes.con": att } });
                    }else if(statName == 'int'){
                        var att = resolve.attributes.int;
                        att += 1;
                        PlayerDAO.update({
                            name: msg.from.username
                        }, { $set: { "attributes.int": att } });
                    }else if(statName == 'wis'){
                        var att = resolve.attributes.wis;
                        att += 1;
                        PlayerDAO.update({
                            name: msg.from.username
                        }, { $set: { "attributes.wis": att } });
                    }else{
                        return bot.sendMessage(msg.from.id, 'Invalid Stat');
                    }
                    playerLevelUp(msg);
                    removeExp(msg, resolve.level * lvlMultiplyer);
                    return bot.sendMessage(msg.from.id, 'Level up!!');
                } else {
                    return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp);
                }
            })
            .catch(function (reject) {
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });

    });

    function playerLevelUp(msg) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                var level = resp[0].level;
                level += 1;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "level": level } });
            });
    }

    bot.on('/me', (msg) => {
        handlePlayerExists(msg)
            .then(function (resolve) {
                let me = "";
                me += `Name: ${resolve.name}\n`;
                me += `Class: ${resolve.classe}\n`;
                me += `Level: ${resolve.level}\n\n`;
                me += `Strength: ${resolve.attributes.str}\n`;
                me += `Dexterity: ${resolve.attributes.dex}\n`;
                me += `Agility: ${resolve.attributes.agi}\n`;
                me += `Constitution: ${resolve.attributes.con}\n`;
                me += `Intelligence: ${resolve.attributes.int}\n`;
                me += `Wisdom: ${resolve.attributes.wis}\n`;
                bot.sendMessage(msg.from.id, me);
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    bot.on('/exp', (msg) => {
        handlePlayerExists(msg)
            .then(function (resolve) {//resolve is player if found
                bot.sendMessage(msg.from.id, 'You have: ' + resolve.exp + " exp.");
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    bot.on('/reborn', (msg) => {
        reborn(msg);
        return bot.sendMessage(msg.from.id, 'Your character has been reset');
    });

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

    function reborn(msg) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.deleteByName(msg.from.username);
    }

    function removeExp(msg, expLosses) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                var exp = resp[0].exp;
                exp -= expLosses;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "exp": exp } });
            });

    }
}