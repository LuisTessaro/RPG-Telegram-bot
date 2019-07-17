const AdventureProgress = require('../model/mongoose-models/AdventureProgress')

module.exports = async (id, map) => {
    const progress = await AdventureProgress.find({ telegramId: id })
    if (progress && progress.length > 0) {
        if (progress[0].map !== map) {
            await AdventureProgress.updateOne(
                { telegramId: id },
                {
                    telegramId: id,
                    map: map,
                    progress: 0
                })
            return await AdventureProgress.find({ telegramId: id })
        }
        return progress[0]
    } else {
        const newProgress = new AdventureProgress({
            telegramId: id,
            map: map,
            progress: 0
        })
        await newProgress.save()
        return newProgress
    }
}