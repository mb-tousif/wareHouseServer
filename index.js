const express = require('express');
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@neuro.fjskv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try{
        await client.connect();
        const instrumentsCollection = client.db("NeruInstruments").collection("instruments");
        app.get('/instruments', async(req,res)=>{
            const query = {};
            const cursor = instrumentsCollection.find(query);
            const instruments = await cursor.toArray();
            res.send(instruments);
        })
        app.get('/instrument/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const instrument = await instrumentsCollection.findOne(query);;
            res.send(instrument);
        });
        // POST:
        app.post('/instruments', async (req, res)=>{
            const newInstrument = req.body;
            const result = await instrumentsCollection.insertOne(newInstrument);
            res.send(result);
        })
        //    app.put("/instrument/:id", async (req, res) => {
        //     const id = req.params.id;
        //     const updatedStock = req.body;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };

        //     const updateDoc = {
        //         $set: {
        //             quantity: updatedStock.quantity,
        //         },
        //     };
        //     const instrument = await productCollection.updateOne(filter, updateDoc, options);
        //     res.send(instrument);
        // });

        app.delete("/instrument/:id", async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const instrument = await instrumentsCollection.deleteOne(query);
          res.send(instrument);
        });

    } finally{

    //    await client.close();
    }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send("Happy Coding")
})

app.listen(port, ()=>{
    console.log("Hello Server!!");
})