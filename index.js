const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_USERPASSWORD}@neuro.fjskv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try{
        await client.connect();
        const collection = client.db("NeruInstruments").collection("instruments");

    } finally{


    }
}

app.get('/',(req,res)=>{
    res.send("Happy Coding")
})

app.listen(port, ()=>{
    console.log("Hello Server!!");
})