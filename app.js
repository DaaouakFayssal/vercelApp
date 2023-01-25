const express = require('express');
const app = express();s
const url = "mongodb://fayssal:jNJpASPqJmYBM3Jq@ac-7f0hale-shard-00-00.8swrbqo.mongodb.net:27017,ac-7f0hale-shard-00-01.8swrbqo.mongodb.net:27017,ac-7f0hale-shard-00-02.8swrbqo.mongodb.net:27017/?ssl=true&replicaSet=atlas-s0j63x-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoose=require("mongoose")
//Databases
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'matiousDB'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    });
    