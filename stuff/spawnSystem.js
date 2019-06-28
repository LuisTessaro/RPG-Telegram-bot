const monsters = [
    {
        name: 'wolf',
        rarity: 'common'
    },
    {
        name: 'direWolf',
        rarity: 'common'
    },
    {
        name: 'direWolfWhite',
        rarity: 'common'
    },
    {
        name: 'wolfLeader',
        rarity: 'common'
    }]


const spawnMonster = (monsters) => {
    const monsterRarity = rarity()

    const validRarities = monsters.reduce((validRarities, monster) => {
        if (!validRarities.includes(monster.rarity))
            validRarities.push(monster.rarity)
        return validRarities
    }, [])

    if (validRarities.includes(monsterRarity))
        return pickAMonster(monsters, monsterRarity)
    else
        return pickAMonster(monsters, stepDownRarity(validRarities))

}

const pickAMonster = (monsters, monsterRarity) => {
    const validMonsters = monsters.filter(monster => monster.rarity === monsterRarity)
    return validMonsters[Math.floor(Math.random() * validMonsters.length)]
}

const stepDownRarity = (validRarities) => {
    const rarities = {
        legendary: 5,
        epic: 4,
        ultra: 3,
        rare: 2,
        uncommon: 1,
        common: 0
    }
    const numToRarity = ['common', 'uncommon', 'rare', 'ultra', 'epic', 'legendary']
    const rarityToSortedNumns = validRarities.map(rarity => rarities[rarity]).sort()
    return numToRarity[rarityToSortedNumns[rarityToSortedNumns.length - 1]]
}

const rarity = () => {
    const maxConstant = 1000
    const r = Math.floor(Math.random() * maxConstant)
    if (r > 998) return 'legendary'
    if (r > 990) return 'epic'
    if (r > 940) return 'ultra'
    if (r > 700) return 'rare'
    if (r > 500) return 'uncommon'
    return 'common'
}

console.log(spawnMonster(monsters))


// const counter = {
// }
// for (let i = 0; i < 100; i++) {
//     const rarityForI = rarity()
//     if (!counter[rarityForI])
//         counter[rarityForI] = 1
//     else
//         counter[rarityForI]++
// }

// console.log(counter)