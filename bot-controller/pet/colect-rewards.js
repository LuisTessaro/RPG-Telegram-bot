const { collectItemsFromGriding } = require('../../services/grinding/collect-service')

module.exports = async ctx => {
  await collectItemsFromGriding(ctx)
}