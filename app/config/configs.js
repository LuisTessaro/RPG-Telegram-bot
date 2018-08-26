var load = require('consign');
var fs = require('fs');
var token = fs.readFileSync('C:/data/token.txt', 'utf8');
const TeleBot = require('telebot');

module.exports = function () {
    var bot = new TeleBot(token);

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