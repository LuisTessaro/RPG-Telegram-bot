const lvlMultiplyer = 100;
module.exports = function (bot) {
    bot.on(['/start', '/back'], msg => {
        handlePlayerExists(msg)
            .then(function (resolve) {
                console.log(resolve);
                let replyMarkup = bot.keyboard([
                    ['/start'],
                    ['/explore green_woods'],
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
    /*
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
    }*/

    bot.on('/level_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {//resolve is player if found
                let replyMarkup = bot.keyboard([
                    ['/str_up'],
                    ['/dex_up'],
                    ['/agi_up'],
                    ['/con_up'],
                    ['/int_up'],
                    ['/wis_up'],
                    ['/back']
                ], { resize: true });
                return bot.sendMessage(msg.from.id, 'You have: ' + resolve.exp + " exp.", { replyMarkup });
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    bot.on('/str_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {
                if (resolve.exp > resolve.level * lvlMultiplyer) {
                    str_up(msg, 1);
                    removeExp(msg, resolve.level * lvlMultiplyer);
                    return bot.sendMessage(msg.from.id, 'Level up!!');
                } else {
                    return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp);
                }
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });
    bot.on('/dex_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {
                if (resolve.exp > resolve.level * lvlMultiplyer) {
                    dex_up(msg, 1);
                    removeExp(msg, resolve.level * lvlMultiplyer);
                    return bot.sendMessage(msg.from.id, 'Level up!!');
                } else {
                    return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp);
                }
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });
    bot.on('/agi_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {
                if (resolve.exp > resolve.level * lvlMultiplyer) {
                    agi_up(msg, 1);
                    removeExp(msg, resolve.level * lvlMultiplyer);
                    return bot.sendMessage(msg.from.id, 'Level up!!');
                } else {
                    return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp);
                }
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });
    bot.on('/con_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {
                if (resolve.exp > resolve.level * lvlMultiplyer) {
                    con_up(msg, 1);
                    removeExp(msg, resolve.level * lvlMultiplyer);
                    return bot.sendMessage(msg.from.id, 'Level up!!');
                } else {
                    return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp);
                }
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });
    bot.on('/int_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {
                if (resolve.exp > resolve.level * lvlMultiplyer) {
                    int_up(msg, 1);
                    removeExp(msg, resolve.level * lvlMultiplyer);
                    return bot.sendMessage(msg.from.id, 'Level up!!');
                } else {
                    return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp);
                }
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });
    bot.on('/wis_up', function (msg) {
        handlePlayerExists(msg)
            .then(function (resolve) {
                if (resolve.exp > resolve.level * lvlMultiplyer) {
                    wis_up(msg, 1);
                    removeExp(msg, resolve.level * lvlMultiplyer);
                    return bot.sendMessage(msg.from.id, 'Level up!!');
                } else {
                    return bot.sendMessage(msg.from.id, 'Not enought exp to level up  (' + resolve.level * lvlMultiplyer + ' per level) you have: ' + resolve.exp);
                }
            })
            .catch(function (reject) {
                console.log(reject);
                return bot.sendMessage(msg.from.id, 'use /register to set up an account');
            });
    });

    //swap to addAtribute
    function str_up(msg, howManyPoints) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                playerLevelUp(msg);
                var att = resp[0].attributes.str;
                att += howManyPoints;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "attributes.str": att } });
            });
    }
    function dex_up(msg, howManyPoints) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                playerLevelUp(msg);
                var att = resp[0].attributes.dex;
                att += howManyPoints;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "attributes.dex": att } });
            });
    } 
    function agi_up(msg, howManyPoints) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                playerLevelUp(msg);
                var att = resp[0].attributes.agi;
                att += howManyPoints;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "attributes.agi": att } });
            });
    } 
    function con_up(msg, howManyPoints) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                playerLevelUp(msg);
                var att = resp[0].attributes.con;
                att += howManyPoints;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "attributes.con": att } });
            });
    } 
    function int_up(msg, howManyPoints) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                playerLevelUp(msg);
                var att = resp[0].attributes.int;
                att += howManyPoints;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "attributes.int": att } });
            });
    }
    function wis_up(msg, howManyPoints) {
        var PlayerDAO = new bot.infra.DAO.PlayerDAO();
        PlayerDAO.searchByName(msg.from.username)
            .then(function (resp) {
                playerLevelUp(msg);
                var att = resp[0].attributes.wis;
                att += howManyPoints;
                PlayerDAO.update({
                    name: msg.from.username
                }, { $set: { "attributes.wis": att } });
            });
    }

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