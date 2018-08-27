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

    switch (map) {
        case 'green_woods':
            solver(new bot.maps.green_woods());
            break;
        case 'dark_forest':
            solver(new bot.maps.dark_forest());
            break;
        case 'bat_cave':
            solver(new bot.maps.bat_cave());
            break;
        case 'deep_below':
            solver(new bot.maps.deep_below());
            break;
        default:
            console.log('something bad happend monstal factory invalid map');
    }
    //let r = Math.floor(Math.random() * 4);
    function solver(map_by_name) {
        let possibleMonsters = map_by_name.getMonsters();
        let intendedRarity = 0;
        let r = Math.floor(Math.random() * 100);

        if (r <= 50) intendedRarity = 0;
        else if (r <= 80) intendedRarity = 1;
        else if (r <= 90) intendedRarity = 2;
        else if (r <= 95) intendedRarity = 3;
        else if (r <= 100) intendedRarity = 4;
        
        switch (intendedRarity) {
            case 0:
                possibleMonsters = possibleMonsters.filter(function (rarity, i) {
                    return possibleMonsters[i].rarity == 'common';
                });
                break;
            case 1:
                possibleMonsters = possibleMonsters.filter(function (rarity, i) {
                    return possibleMonsters[i].rarity == 'uncommon';
                });
                break;
            case 2:
                possibleMonsters = possibleMonsters.filter(function (rarity, i) {
                    return possibleMonsters[i].rarity == 'rare';
                });
                break;
            case 3:
                possibleMonsters = possibleMonsters.filter(function (rarity, i) {
                    return possibleMonsters[i].rarity == 'boss';
                });
                break;
            case 4:
                possibleMonsters = possibleMonsters.filter(function (rarity, i) {
                    return possibleMonsters[i].rarity == 'secret';
                });
                break;
        }

        let i = Math.floor(Math.random() * possibleMonsters.length);
        monster_stats.name = possibleMonsters[i].name;
        monster_stats.hp = possibleMonsters[i].hp;
        monster_stats.sp = possibleMonsters[i].sp;
        monster_stats.autoAttackDmg = possibleMonsters[i].autoAttackDmg;
        monster_stats.flee = possibleMonsters[i].flee;
        monster_stats.accuracy = possibleMonsters[i].accuracy;
        monster_stats.iniciative_bonus = possibleMonsters[i].iniciative_bonus;
        monster_stats.exp = possibleMonsters[i].exp;
    }
    return monster_stats;
};

module.exports = function () {
    return player_factory;
};
