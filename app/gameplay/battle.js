//try place battle() here 
//🔸🎯 7 💢 13 ✨ 16 🔹🎯 18 💢 18 ✨ 2

module.exports = function (bot) {
    bot.on(/^\/roll (.+)$/, (msg, props) => {
        const text = props.match[1];
        return bot.sendMessage(msg.from.id, 'roll: ' + dice(20));
    });
}