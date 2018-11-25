const puppeteer = require('puppeteer');
var express = require('express');
var app = express();

const MongoClient = require('mongodb').MongoClient;



// Connection URL
const url = 'mongodb://mongo:27017';


MongoClient.connect(url, function(err, db) {
  if(err) {
      console.log('database is not connected')
  }
  else {
      console.log('connected!!')
  }
});

// Database Name
const dbName = 'zipdata';

// Create a new MongoClient
const client = new MongoClient(url);
const db = client.db(dbName);

app.get('/', function (req, res) {
   res.send('It is working');
})

app.get('/api/scrape-zip', function(req, res) {
 (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //goto page
  await page.goto('https://zip.nfz.gov.pl/ap-zipmed/user/med/med@default');


  //get the user data
  await page.evaluate(() => {
    $('a:contains("Użytkownik wersji demonstracyjnej - DEMO")').click()
  });

 //click log in
 await page.evaluate(() => {
    $('.auth-button .button_big')[0].click()
  });

  // get the data after login
 const dataRes = await page.evaluate(() => {
    return $('tr.data').toArray()
  });

 const collection = db.collection('visits');
  // Insert some documents
  collection.insertMany(dataRes, function(err, result) {
    console.log("Inserted documents into the collection");
    callback(result);
  });

  console.log('Results:', dataRes);

  await browser.close();
 })();
})

app.get('/api/zip', function (req, res) {
   const collection = db.collection('ziphistory');
   
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    res.send(docs);
  });
   
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Backend app is listening at http://%s:%s", host, port)
})


//use zipdata
//db.ziphistory.insertOne( { date: Date.now()-30, place: "PORADNIE SPECJALISTYCZNE GABINET DERMATOLOGICZNY ul. ŚREDNIA 3 60-123 POZNAŃ", type:"Ambulatoryjne", cost:16.00})


