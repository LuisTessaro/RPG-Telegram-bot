const { Telegraf } = require('telegraf')

module.exports = token => new Telegraf(token)