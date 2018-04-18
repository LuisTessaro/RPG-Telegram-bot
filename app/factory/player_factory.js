function player_factory() { }

player_factory.prototype.calculateStatsForPlayer = function (player, bot) {
    //insert skills
    let player_stats = {
        name: player.name,
        classe: player.classe,
        attributes : player.attributes,
        skills: [],
        hp: 0,
        sp: 0,
        autoAttackDmg: 0,
        flee: 0,
        accuracy: 0,
        iniciative_bonus: 0
    };
    function solver(class_by_name) {
        player_stats.hp = class_by_name.hpFormula()(player.attributes.con, player.level);
        player_stats.sp = class_by_name.spFormula()(player.attributes.int, player.attributes.wis, player.level);
        player_stats.flee = class_by_name.fleeFormula()(player.attributes.agi, player.level);
        player_stats.iniciative_bonus = 0;
        player_stats.autoAttackDmg = class_by_name.autoAttackFormula()(player.attributes.str, player.attributes.dex, player.attributes.agi, player.level);
        player_stats.accuracy = class_by_name.accuracyFormula()(player.attributes.dex, player.level);

        var player_skills = class_by_name.getSkills();
        var i;
        for (i in player_skills){
            if(player.level >= player_skills[i].level_required)
                player_stats.skills.push(player_skills[i]);
        }
    }
    if (player.classe == 'Warrior') {
        solver(new bot.classes.warrior()); 
    } else if (player.classe == 'Thief') {
        solver(new bot.classes.thief());
    } else if (player.classe == 'Mage') {
        solver(new bot.classes.mage());
    } else if (player.classe == 'Archer') {
        solver(new bot.classes.warrior());
    } else if (player.classe == 'Cleric') {
        solver(new bot.classes.warrior());
    }
    return player_stats;
};

module.exports = function () {
    return player_factory;
};
