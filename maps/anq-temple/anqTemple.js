const actionFactory = require('../actionsFactory')
module.exports.imgUrl = (index) => `https://raw.githubusercontent.com/LuisTessaro/RPG-Telegram-bot/master/maps/anq-temple/images/anq_temple.${index}.png`
const getImgUrl = (index) => `https://raw.githubusercontent.com/LuisTessaro/RPG-Telegram-bot/master/maps/anq-temple/images/anq_temple.${index}.png`
const aq_templeCompletionImg = `https://raw.githubusercontent.com/LuisTessaro/RPG-Telegram-bot/master/maps/anq-temple/images/anq_temple.0.png`
/**
 * encouterTypes 
 * 
 * explorational
 * combative
 * bossFight
 * trap
 *  */
const q0 = actionFactory.actionsObj(
    'As you venture deeper into the temple you see just how abandoned and ruined it really is, although still gorgeous is utterly ruined beyond repair. You notice a couple of skeletons with bows and arrows scattered across the grounds of the main room, as soon as you get closer to them they immediately standup',
    'explorational',
    getImgUrl(0))

q0.possibleActions['inspect'].message = 'You find an [Old Rag] and some [Torn Priest Clothes].'
q0.possibleActions['inspect'].odds = 15
q0.possibleActions['inspect'].reward = {
    xp: 500,
    loot: ['OldRags', 'TornPriestAttire']
}

const q1 = actionFactory.actionsObj(
    'From a far you can see why this temple as regarded as the biggest in the land, the sheer size of its skull shapped entrance sends chills down your spine, at first glance it looks like it was abandoned a long time ago.',
    'combative',
    getImgUrl(1))
q1.monster = ['SkeletonArcher']

q1.possibleActions['inspect'].message = 'You inspect the skelletons just a bit too close and they atack you'
q1.possibleActions['inspect'].odds = 15
q1.possibleActions['inspect'].after = 'fight'

q1.possibleActions['fight'].message = 'You attack the skeletons.'
q1.possibleActions['fight'].after = 'fight'

q1.possibleActions['bargain'].message = 'You dont seem to be able to bargain with the undead monster (What did you expect).'
q1.possibleActions['bargain'].after = 'fight'

q1.possibleActions['sneak'].message = 'You sneak pass the skeletons on the main hall.'
q1.possibleActions['sneak'].odds = 15
q1.possibleActions['sneak'].after = 'fight'
q1.possibleActions['sneak'].reward = {
    xp: 500,
    loot: []
}

const q2 = actionFactory.actionsObj(
    'You reach deeper into the temple untill you find an altar, unlike the rest of the temple it seems somehow well conserved. There\'s a giant marble angel with no face behind the altar, he is holding what appears to be a sculpture of Earth, but the continents are all wrong.',
    'trap',
    getImgUrl(2))

q2.possibleActions['inspect'].message = 'You inspect the altar and find a [Old battered Ring].'
q2.possibleActions['inspect'].odds = 20
q2.possibleActions['inspect'].reward = {
    xp: 500,
    loot: ['OldBatteredRing']
}

q2.possibleActions['fight'].message = 'You try to attack the angel and a massive bolder falls right on your head, better luck next time.'
q2.possibleActions['fight'].after = 'dead'

const q3 = actionFactory.actionsObj(
    'Maptest',
    'explorational',
    getImgUrl(3))
const q4 = actionFactory.actionsObj(
    'Maptest',
    'explorational',
    getImgUrl(4))
const q5 = actionFactory.actionsObj(
    'Maptest',
    'explorational',
    getImgUrl(5))
const q6 = actionFactory.actionsObj(
    'Maptest',
    'explorational',
    getImgUrl(6))
const q7 = actionFactory.actionsObj(
    'Maptest',
    'explorational',
    getImgUrl(7))
const q8 = actionFactory.actionsObj(
    'Maptest',
    'completion',
    aq_templeCompletionImg)

module.exports.nots = [q0, q1, q2, q3, q4, q5, q6, q7, q8]