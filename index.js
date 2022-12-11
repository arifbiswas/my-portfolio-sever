const express = require('express')
require("dotenv").config()
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()

app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;

const uri = process.env.SECRET_URI;

const Client = new MongoClient(uri);

async function run(){
    
    try {
        const ProjectsCollection = Client.db("Portfolio").collection("Projects");

        app.post("/api/v1/projects",(req, res) =>{
            ProjectsCollection.insertOne(req.body)
               res.send({message : "success" , status : 200});
        })
        app.get("/api/v1/projects",async(req, res) =>{
        try {
            const result = await ProjectsCollection.find().toArray()
            res.send({message : "success", status : 200, data : result});
        } catch (error) {
            console.log(error);
        }
        })
        app.get("/api/v1/projects/:id",async(req, res) =>{
        try {
            const id = req.params.id;
            const query ={_id : ObjectId(id)}
            const result = await ProjectsCollection.findOne(query)
            res.send({message : "success", status : 200, data : result});
        } catch (error) {
            console.log(error);
        }
        })

    } catch (error) {
        console.log(error);
    }
    
}
run().catch(error => {
    console.log(error);
});

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Portfolio ${port}!`))