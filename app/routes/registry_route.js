module.exports = function (bot) {
    var player_funcs = new bot.infra.player_funcs();
    
    bot.on(/^\/class (.+)$/, (msg, props) => {
        let replyMarkup = bot.keyboard([
            ['/explore green_woods'],
            ['/explore dark_forest'],
            ['/explore bat_cave'],
            ['/explore deep_below'],
            ['/stop_exploring', '/exp'],
            ['/level_up', '/me']
        ], { resize: true });
        if (msg.from.username != 'null') {
            player_funcs.handlePlayerExists(msg,bot)
                .then(function (resolve) {
                    return bot.sendMessage(msg.from.id, 'You are already registered', { replyMarkup });
                })
                .catch(function (reject) {
                    const classe = props.match[1];
                    var player_dao = new bot.infra.DAO.player_dao();
                    if (['Warrior', 'Thief', 'Mage', 'Archer', 'Cleric'].includes(classe)) {
                        player_dao.insert(playerBase(msg.from.username, classe));
                        return bot.sendMessage(msg.from.id, 'Use the buttons to explore maps,level up or sell your things.', { replyMarkup });
                    } else {
                        return bot.sendMessage(msg.from.id, 'Invalid class.');
                    }
                });
        } else return bot.sendMessage(msg.from.id, 'You must set up a @ on your telegram account to play this game :c');
    });

    bot.on('/register', function (msg) {
        let replyMarkup = bot.keyboard([
            ['/class Warrior'],
            ['/class Thief'],
            ['/class Mage'],
            ['/class Archer'],
            ['/class Cleric']
        ], { resize: true });
        player_funcs.handlePlayerExists(msg,bot)
            .then(function (resolve) {return bot.sendMessage(msg.from.id, 'You are already registered');})
            .catch(function (reject) {return bot.sendMessage(msg.from.id, 'Use the buttons to pick a class.', { replyMarkup });});
    });

    function playerBase(name, classe) {
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
}