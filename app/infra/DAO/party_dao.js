var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

function party_dao() { }

party_dao.prototype.insertParty = function (obj) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err
    var dbo = db.db('telemmo')
    dbo.collection('party').insertOne(obj, function (err, res) {
      if (err) throw err
      console.log('party inserted')
      db.close()
    })
  })
}

party_dao.prototype.deleteByName = function (name) {
  var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://localhost:27017/'

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err
    var dbo = db.db('telemmo')
    var myquery = { name: name }
    dbo.collection('party').deleteOne(myquery, function (err, obj) {
      if (err) throw err
      console.log('party deleted')
      db.close()
    })
  })
}

party_dao.prototype.update = function (query, newValues) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err
    var dbo = db.db('telemmo')
    dbo.collection('party').updateOne(query, newValues, function (err, res) {
      if (err) throw err
      db.close()
    })
  })
}

party_dao.prototype.readAll = function () {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err
      var dbo = db.db('telemmo')
      dbo.collection('party').find({}).toArray(function (err, result) {
        if (err) throw err
        resolve(result)
      })
      db.close()
    })
  })
}

party_dao.prototype.searchByName = function (name) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err
      var dbo = db.db('telemmo')
      var query = { name: name }
      dbo.collection('party').find(query).toArray(function (err, result) {
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
