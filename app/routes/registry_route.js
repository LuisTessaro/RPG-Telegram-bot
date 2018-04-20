module.exports = function (bot) {

    bot.on(/^\/class (.+)$/, (msg, props) => {
        if (msg.from.username != 'null') {
            handlePlayerExists(msg)
                .then(function (resolve) {
                    return bot.sendMessage(msg.from.id, 'You are already registered', { replyMarkup });
                })
                .catch(function (reject) {
                    const classe = props.match[1];
                    var PlayerDAO = new bot.infra.DAO.PlayerDAO();
                    PlayerDAO.insert(playerCreator(msg.from.username, classe));
                });
            let replyMarkup = bot.keyboard([
                ['/start'],
                ['/explore green_woods'],
                ['/stop_exploring', '/exp'],
                ['/level_up', '/me']
            ], { resize: true });
            return bot.sendMessage(msg.from.id, 'Use the buttons to explore maps,level up or sell your things.', { replyMarkup });
        } else bot.sendMessage(msg.from.id, 'You must set up a @ on your telegram account to play this game :c');

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
}
