function player_factory() { }

player_factory.prototype.calculateStatsForPlayer = function (player, bot) {
    //do equips bonuses here
    let player_stats = {
        name: player.name,
        classe: player.classe,
        attributes: player.attributes,
        skills: [],
        healingSkills: [],
        hp: 0,
        sp: 0,
        autoAttackDmg: 0,
        flee: 0,
        accuracy: 0,
        iniciative_bonus: 0
    };

    switch (player.classe) {
        case 'Warrior':
            solver(new bot.classes.warrior());
            break;
        case 'Thief':
            solver(new bot.classes.thief());
            break;
        case 'Mage':
            solver(new bot.classes.mage());
            break;
        case 'Archer':
            solver(new bot.classes.archer());
            break;
        case 'Cleric':
            solver(new bot.classes.cleric());
            break;
        default:
            console.log('something bad happend player factory invalid class');
    }

    function solver(class_by_name) {
        player_stats.hp = class_by_name.hpFormula()(player.attributes.con, player.level);
        player_stats.sp = class_by_name.spFormula()(player.attributes.int, player.attributes.wis, player.level);
        player_stats.flee = class_by_name.fleeFormula()(player.attributes.agi, player.level);
        player_stats.iniciative_bonus = 0;
        player_stats.autoAttackDmg = class_by_name.autoAttackFormula()(player.attributes.str, player.attributes.dex, player.attributes.agi, player.level);
        player_stats.accuracy = class_by_name.accuracyFormula()(player.attributes.dex, player.level);

        let equipment = player.equipment;

        let player_skills = class_by_name.getSkills(player.attributes);
        let i;
        for (i in player_skills) {
            if (player.level >= player_skills[i].level_required)
                player_stats.skills.push(player_skills[i]);
        }

        let player_healing_skills = class_by_name.getHealingSkills(player.attributes);
        let q;
        for (q in player_healing_skills) {
            if (player.level >= player_healing_skills[q].level_required)
                player_stats.healingSkills.push(player_healing_skills[q]);
        }
    }

    return player_stats;
};

module.exports = function () {
    return player_factory;
};