const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const parse = require('csv-parse');

// Connection URL
const url = "mongodb://fayssal:jNJpASPqJmYBM3Jq@ac-7f0hale-shard-00-00.8swrbqo.mongodb.net:27017,ac-7f0hale-shard-00-01.8swrbqo.mongodb.net:27017,ac-7f0hale-shard-00-02.8swrbqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-s0j63x-shard-0&authSource=admin&retryWrites=true&w=majority";

// Database Name
const dbName = 'matiousDB';

// Collection Name
const collectionName = 'matiousC';

// File path of CSV
const filePath = 'supermarket_sales - Sheet1.csv';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected to MongoDB');

  const db = client.db(dbName);

  // Read CSV file
  fs.createReadStream(filePath)
    .pipe(parse({ columns: true }))
    .on('data', (csvRow) => {
      // Insert each row of CSV into MongoDB
      db.collection(collectionName).insertOne(csvRow, (insertErr, result) => {
        if (insertErr) throw insertErr;
        console.log(`Inserted ${result.insertedCount} row(s)`);
      });
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      client.close();
    });
});
