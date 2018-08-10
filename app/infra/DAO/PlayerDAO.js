var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function PlayerDAO() { }

PlayerDAO.prototype.insert = function (obj) {
    new MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("telemmo");
        dbo.collection("players").insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log("player inserted");
            db.close();
        });
    });
};

PlayerDAO.prototype.deleteByName = function (name) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("telemmo");
        var myquery = { name: name };
        dbo.collection("players").deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("player deleted");
            db.close();
        });
    });
};

PlayerDAO.prototype.update = function (query, new_values) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("telemmo");
        dbo.collection("players").updateOne(query, new_values, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
};

PlayerDAO.prototype.readAll = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("telemmo");
            dbo.collection("players").find({}).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
            });
            db.close();
        });
    });
};

PlayerDAO.prototype.searchByName = function (name) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("telemmo");
            var query = { name: name };
            dbo.collection("players").find(query).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                db.close();
            });
        });
    });
};


module.exports = function () {
    return PlayerDAO;
}
