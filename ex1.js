const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://fayssal:jNJpASPqJmYBM3Jq@ac-7f0hale-shard-00-00.8swrbqo.mongodb.net:27017,ac-7f0hale-shard-00-01.8swrbqo.mongodb.net:27017,ac-7f0hale-shard-00-02.8swrbqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-s0j63x-shard-0&authSource=admin&retryWrites=true&w=majority";

app.get('/api/revenue-by-category', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    const db = client.db();
    // Group by Product Line and calculate total revenue
    db.collection('mycollection').aggregate([
      { $group: { _id: '$Product Line', totalRevenue: { $sum: '$Gross Volume' } } },
    ]).toArray((aggErr, result) => {
      if (aggErr) throw aggErr;
      res.json(result);
      client.close();
    });
  });
});

app.get('/api/total-purchases-by-customer-type', (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    const db = client.db();
    // Group by customer type and calculate total purchases
    db.collection('mycollection').aggregate([
      { $group: { _id: '$Customer Type', totalPurchases: { $sum: 1 } }
    },
]).toArray((aggErr, result) => {
if (aggErr) throw aggErr;
res.json(result);
client.close();
});
});
});

app.get('/api/average-rating-by-gender', (req, res) => {
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
if (err) throw err;
const db = client.db();
// Group by Gender and calculate average rating
db.collection('mycollection').aggregate([
{ $group: { _id: '$Gender', avgRating: { $avg: '$Rating' } } },
]).toArray((aggErr, result) => {
if (aggErr) throw aggErr;
res.json(result);
client.close();
});
});
});

app.listen(3000, () => {
console.log('Server listening on port 3000');
});

