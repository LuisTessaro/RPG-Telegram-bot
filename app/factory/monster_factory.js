function player_factory() { }

player_factory.prototype.getMonster = function (map, bot) {

    let monster_stats = {
        name: '',
        hp: 0,
        sp: 0,
        autoAttackDmg: 0,
        flee: 0,
        accuracy: 0,
        iniciative_bonus: 0,
        occurrence: 0,
        exp: 0
    };

    function solver(map_by_name) {
        var possibleMonsters = map_by_name.getMonsters();
        var i;
        let r = Math.floor(Math.random() * 100);
        if (r < 30) {
            i = 0;
        } else if (r < 60) {
            i = 1;
        } else if (r < 90) {
            i = 2;
        } else if (r < 95) {
            i = 3;
        } else if (r < 100) {
            i = 4;
        }
        monster_stats.name = possibleMonsters[i].name;
        monster_stats.hp = possibleMonsters[i].hp;
        monster_stats.sp = possibleMonsters[i].sp;
        monster_stats.autoAttackDmg = possibleMonsters[i].autoAttackDmg;
        monster_stats.flee = possibleMonsters[i].flee;
        monster_stats.accuracy = possibleMonsters[i].accuracy;
        monster_stats.iniciative_bonus = possibleMonsters[i].iniciative_bonus;
        monster_stats.exp = possibleMonsters[i].exp;
    }
    if (map == 'green_woods') {
        solver(new bot.maps.green_woods());
    }
    return monster_stats;
};

module.exports = function () {
    return player_factory;
};
