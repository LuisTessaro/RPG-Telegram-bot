const weightedRandom = itemSet => {
  const reducedSet = itemSet.reduce((set, item) => {
    return [...set, ...fillArray(item, item.odds)]
  }, [])
  return reducedSet[Math.floor(Math.random() * (reducedSet.length - 1))]
}

const fillArray = (item, len) => {
  if (len == 0) return []
  const itemList = []

  for (let i = 0; i < len; i++)
    itemList.push(item)

  return itemList
}

module.exports = {
  weightedRandom
}