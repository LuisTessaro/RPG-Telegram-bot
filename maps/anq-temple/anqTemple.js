module.exports.imgUrl = (index) => `https://raw.githubusercontent.com/LuisTessaro/RPG-Telegram-bot/master/maps/anq-temple/images/anq_temple.${index}.png`
const getImgUrl = (index) => `https://raw.githubusercontent.com/LuisTessaro/RPG-Telegram-bot/master/maps/anq-temple/images/anq_temple.${index}.png`

/**
 * encouterTypes 
 * 
 * explorational
 * combative
 * bossFight
 * trap
 * sanctuary
 *  */

const q0 = require('./knots/anq_temple.0')
const q1 = require('./knots/anq_temple.1')
const q2 = require('./knots/anq_temple.2')
const q3 = require('./knots/anq_temple.3')
const q4 = require('./knots/anq_temple.4')
const q5 = require('./knots/anq_temple.5')
const q6 = require('./knots/anq_temple.6')
const q7 = require('./knots/anq_temple.7')

module.exports.knots = [
    q0(getImgUrl(0), 'explorational'),
    q1(getImgUrl(1), 'combative'),
    q2(getImgUrl(2), 'trap'),
    q3(getImgUrl(3), 'combative'),
    q4(getImgUrl(4), 'explorational'),
    q5(getImgUrl(5), 'combative'),
    q6(getImgUrl(6), 'explorational'),
    q7(getImgUrl(7), 'bossFight'),
]

module.exports.limit = 7
module.exports.endReply = 'Thank you for testing my game, be sure to try griding some too and sending me any bugs!'