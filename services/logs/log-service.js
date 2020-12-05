const Logs = require('../../models/mongoose-models/Logs')

const writeLog = async (action, date, data) => {
  const log = new Logs({ action, date, data })
  return await log.save()
}

const readLogs = async () => {
  const logs = await Logs.find()
  return logs
}

const deleteLogs = async () => {
  return await Logs.deleteMany()
}

module.exports = {
  writeLog,
  readLogs,
  deleteLogs,
}