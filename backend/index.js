var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://mongo:27017';

// Database Name
const dbName = 'zipdata';

// Create a new MongoClient
const client = new MongoClient(url);
const db = client.db(dbName);

app.get('/', function (req, res) {
   res.send('It is working');
})

app.get('/api/zip', function (req, res) {
   const collection = db.collection('visits');
   
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
   res.send(docs);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Backend app is listening at http://%s:%s", host, port)
})
