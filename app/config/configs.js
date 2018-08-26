var load = require('consign');
const TeleBot = require('telebot');

module.exports = function () {
    var bot = new TeleBot('token-token');

    load({ cwd: 'app' })
        .include('infra')
        .then('factory')
        .then('classes')
        .then('maps')
        .then('gameplay')
        .then('routes')
        .then('itens')
        .into(bot);

    return bot;
}