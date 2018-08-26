

function equipment() { }

let equip = [
    {
        item_id: 1,
        item_name: 'FireWhip',
        bonuses: {
            str: 5,
            dex: 0,
            agi: 0,
            con: 0,
            int: 10000,
            wis: 0,
            car: 0,
            wil: 0,
            luk: 0
        }
    },
    {
        item_id: 2,
        item_name: 'Morning Star',
        bonuses: {
            str: 10,
            dex: 0,
            agi: 0,
            con: 0,
            int: 0,
            wis: 0,
            car: 0,
            wil: 0,
            luk: 0
        }
    },
    {
        item_id: 3,
        item_name: 'Simple wand',
        bonuses: {
            str: 0,
            dex: 0,
            agi: 0,
            con: 0,
            int: 3,
            wis: 1,
            car: 0,
            wil: 0,
            luk: 0
        }
    },
    {
        item_id: 4,
        item_name: 'Staff of ages',
        bonuses: {
            str: 5,
            dex: 0,
            agi: 0,
            con: 0,
            int: 10,
            wis: 5,
            car: 0,
            wil: 0,
            luk: 0
        }
    }
];

equipment.prototype.getStatusFrom = function (item) {
    return equip[item];
};

module.exports = function () {
    return equipment;
};
