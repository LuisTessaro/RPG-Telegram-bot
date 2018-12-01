const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

function party_dao() { }

party_dao.prototype.insertParty = (obj) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db('telemmo')
    dbo.collection('party').insertOne(obj, (err, res) => {
      if (err) throw err
      console.log('party inserted')
      db.close()
    })
  })
}

party_dao.prototype.deleteByName = (name) => {
  const MongoClient = require('mongodb').MongoClient
  const url = 'mongodb://localhost:27017/'

  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db('telemmo')
    const myquery = { name: name }
    dbo.collection('party').deleteOne(myquery, (err, obj) => {
      if (err) throw err
      console.log('party deleted')
      db.close()
    })
  })
}

party_dao.prototype.update = (query, newValues) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err
    const dbo = db.db('telemmo')
    dbo.collection('party').updateOne(query, newValues, (err, res) => {
      if (err) throw err
      db.close()
    })
  })
}

party_dao.prototype.readAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      const dbo = db.db('telemmo')
      dbo.collection('party').find({}).toArray((err, result) => {
        if (err) throw err
        resolve(result)
      })
      db.close()
    })
  })
}

party_dao.prototype.searchByName = (name) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      if (err) throw err
      const dbo = db.db('telemmo')
      const query = { name: name }
      dbo.collection('party').find(query).toArray((err, result) => {
        if (err) throw err
        resolve(result)
        db.close()
      })
    })
  })
}

module.exports = function () {
  return party_dao
}
