const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

function player_dao() { }

player_dao.prototype.insert = (obj) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db('telemmo')
    dbo.collection('players').insertOne(obj, (err, res) => {
      if (err) throw err
      console.log('player inserted')
      db.close()
    })
  })
}

player_dao.prototype.deleteByName = (name) => {
  const MongoClient = require('mongodb').MongoClient
  const url = 'mongodb://localhost:27017/'

  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db('telemmo')
    const myquery = { name: name }
    dbo.collection('players').deleteOne(myquery, (err, obj) => {
      if (err) throw err
      console.log('player deleted')
      db.close()
    })
  })
}

player_dao.prototype.update = (query, newValues) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db('telemmo')
    dbo.collection('players').updateOne(query, newValues, (err, res) => {
      if (err) throw err
      db.close()
    })
  })
}

player_dao.prototype.readAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      const dbo = db.db('telemmo')
      dbo.collection('players').find({}).toArray((err, result) => {
        if (err) throw err
        resolve(result)
      })
      db.close()
    })
  })
}

player_dao.prototype.searchByName = (name) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      const dbo = db.db('telemmo')
      const query = { name: name }
      dbo.collection('players').find(query).toArray((err, result) => {
        if (err) throw err
        resolve(result)
        db.close()
      })
    })
  })
}

module.exports = function () {
  return player_dao
}
