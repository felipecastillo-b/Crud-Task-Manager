const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const app = express()
var routes = require("./routes/taskroutes");
const cors = require("cors");
const port = 7000;


const mongodbURL = "mongodb+srv://castillodk:7rgNS0YW0gFwglXA@taskmanager.9av5eil.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(
    mongodbURL,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
);

const connection = mongoose.connection

app.listen(port,()=>{
    console.log("server is running" + port);
});

connection.once("open",()=>{
    console.log("MongoDB connected");
});
app.use(cors());
app.use(bodyParser.json());
app.use(routes);