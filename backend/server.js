const express = require('express')
const dotenv= require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser= require('body-parser');
const cors= require('cors');

// const url = process.env.MONGO_URI;

dotenv.config()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()

console.log(process.env.MONGO_URI)
const port = 3000
app.use(bodyparser.json());
app.use(cors());
 
client.connect();


//get the passwords
app.get('/', async(req, res) => {
  const db= client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({ a: 3 }).toArray();
  // res.send('Hello World!')
  console.log(res);
  res.json(findResult)
  
})

//save the passwords
app.post('/insert', async(req, res) => {
  const password= req.body;
  const db= client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true, result: findResult});
})

//delete the password
app.delete('/', async(req,res)=>{
  const password = req.body;
  const db = client.db(dbName); 
  const collection = db.collection('passwords'); 
  const findResult = await collection.deleteOne(password);
  res.send({success: true, result: findResult});
})

 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
}) 