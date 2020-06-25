module.exports = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`Response time ${ms}ms`, )
}