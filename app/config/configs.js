var load = require('consign');
const TeleBot = require('telebot');

module.exports = function () {
    var bot = new TeleBot('api-bot-key');

    load({ cwd: 'app' })
        .include('infra')
        .then('factory')
        .then('classes')
        .then('maps')
        .then('gameplay')
        .then('routes')
        .into(bot);

    return bot;
}