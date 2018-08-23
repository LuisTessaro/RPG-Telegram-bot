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
        //this is super bad and needs to be changed
        var i;
        let r = Math.floor(Math.random() * 100);
        if (r < 75) {
            i = 0;
        } else if (r < 80) {
            i = 1;
        } else if (r < 98) {
            i = 2;
        } else if (r < 99) {
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
    } else if (map == 'dark_forest') {
        solver(new bot.maps.dark_forest());
    } else if (map == 'bat_cave') {
        solver(new bot.maps.bat_cave());
    } else if (map == 'deep_below') {
        solver(new bot.maps.deep_below());
    }
    return monster_stats;
};

module.exports = function () {
    return player_factory;
};
