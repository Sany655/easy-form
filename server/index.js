const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient } = require('mongodb');
const e = require('express');
const ObjectId = require('mongodb').ObjectId
const app = express()

// middlewares
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('easy form server');
})

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.e2cer.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('mongodb connected');
        const db = client.db(process.env.DB);
        // questions api here
        const questions = db.collection('questions');
        app.post("/add-question", (req, res) => {
            questions.insertOne(req.body)
                .then(result => {
                    res.send(result)
                })
                .catch(error => {
                    res.send(error)
                });
        })

        app.get("/get-question", (req, res) => {
            questions.findOne({ _id: new ObjectId(req.query.id)})
                .then(result => {
                    res.send(result)
                })
                .catch(error => {
                    console.log(error);
                })
        })

        app.delete('/delete-form', async (req, res) => {
            try {
                const result = await questions.findOneAndDelete({ _id:new ObjectId(req.query.id) })
                res.send(result)
            } catch (error) {
                res.send(error);

            }
        })

        app.get("/questions", async (req, res) => {
            try {
                const result = await questions.find({}).toArray();
                res.send(result)
            } catch (error) {
                res.send(error);

            }
        })

    } finally {

    }
}
run().catch(console.dir)
app.listen(port, () => {
    console.log("http://localhost:" + port);
})