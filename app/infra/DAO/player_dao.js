var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

function player_dao () { }

player_dao.prototype.insert = function (obj) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('telemmo')
    dbo.collection('players').insertOne(obj, function (err, res) {
      if (err) throw err
      console.log('player inserted')
      db.close()
    })
  })
}

player_dao.prototype.deleteByName = function (name) {
  var MongoClient = require('mongodb').MongoClient
  var url = 'mongodb://localhost:27017/'

  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('telemmo')
    var myquery = { name: name }
    dbo.collection('players').deleteOne(myquery, function (err, obj) {
      if (err) throw err
      console.log('player deleted')
      db.close()
    })
  })
}

player_dao.prototype.update = function (query, newValues) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('telemmo')
    dbo.collection('players').updateOne(query, newValues, function (err, res) {
      if (err) throw err
      db.close()
    })
  })
}

player_dao.prototype.readAll = function () {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db('telemmo')
      dbo.collection('players').find({}).toArray(function (err, result) {
        if (err) throw err
        resolve(result)
      })
      db.close()
    })
  })
}

player_dao.prototype.searchByName = function (name) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db('telemmo')
      var query = { name: name }
      dbo.collection('players').find(query).toArray(function (err, result) {
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
