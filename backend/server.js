// This is my set up for the node server on a music application 

// const express = require("express");
// const app = express();
// const path = require("path")
// const cors = require("cors");

import express from "express";
const app = express();
import cors from "cors";

// REQUIRED TO READ FILENAMES
import fs from 'fs';
// const fs = require('fs');
// for port and serving front end react
const port = 9000;
import path from 'node:path';
import { fileURLToPath } from 'url';

console.log("I'm here");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "..", "public", "dist")

// mongoose for database
// const mongoose = require("mongoose");
import mongoose from "mongoose";
// dotenv for keys
import 'dotenv/config'
// const dotenv = require("dotenv").config();


// format time date
// var moment = require('moment'); 


// console.log("IPaddress " + process.env.IP);


app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.static(publicPath));
 

console.log(process.env.DATABASE_URL);
console.log("Port: " + process.env.PORT);
console.log("IP: " + process.env.IP);
// const database = process.env.DATABASE;
// connect to database
async function connectDB(DB_STRING) {
    console.log("Attempting to connect to database at URL: " + DB_STRING);
    await mongoose.connect(DB_STRING);
    console.log("Connected to Database");
}

await connectDB(process.env.DATABASE_URL).catch(err => console.log(err));


// mongoose.connect("mongodb://localhost/dl_music",
//     {
//         dbName: "dl_music", useNewUrlParser: true,
//         useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true
//     });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, "connection error"));
// db.once('open', function () {
//     console.log("Connected to Database");
// });


// const composers = require('./models/composer.model');
// const Publisher = require("./models/publisher.model");
// const releaseIsrc = require("./models/releaseIsrc.model");
// const biCue = require("./models/bi_cue_model");

import Composer from './models/composer.model.js';
import Publisher from "./models/publisher.model.js";
// import ReleaseIsrc from "./models/releaseIsrc.model.js";
import Release from "./models/release.model.js";
import Cue from "./models/cue_model.js";

//populate publishers
const publisherArray = [
    {
        publisherName: "Derek Luff Music, Inc.",
        publisherIpi: "337689810",
        publisherPro: "ASCAP",
    },
    {
        publisherName: "Dewmarc Music",
        publisherIpi: "355468339",
        publisherPro: "BMI",
    },
    {
        publisherName: "Ridek Music",
        publisherIpi: "568242236",
        publisherPro: "SESAC",
    }
]

async function populatePublishers(){
    await Publisher.deleteMany({});
    console.log("Old publishers deleted");
    await Publisher.insertMany(publisherArray);
    console.log("Publishers added");
}


//routes 
import cueRoutes from "./routes/api.cue.js";
import composerRoutes from "./routes/api.composer.js";
import publisherRoutes from "./routes/api.publisher.js";
import uploadRoutes from "./routes/api.upload.js";

app.use("/api/composer", composerRoutes);
app.use("/api/publisher", publisherRoutes);
app.use("/api/cue", cueRoutes);
app.use("/api/upload", uploadRoutes);
// const biCuesRoutes = require("./routes/api.bicues");
// // const { resolveAny } = require("dns");
// app.use("/api/bicues", biCuesRoutes);
// const exportRoutes = require("./routes/api.export")
// app.use("/api/export", exportRoutes);

// const exportMusicMark = require('./routes/api.export.musicMark');
// app.use('/api/musicMark', exportMusicMark);

// const exportBmat = require('./routes/bmat.export')
// app.use('/api/bmat', exportBmat);

// const exportProtunes = require("./routes/api.export.protunes");
// app.use('/api/protunes', exportProtunes);

// const exportRussiaWarner = require("./routes/api.export.russiaWarner");
// app.use("/api/russiawarner", exportRussiaWarner);

    // const composerList = require("./composers");
import composerList from "./composers.js";
import CustomError from "./customError.js";
//populate database with old composer info 

async function populateComposers(){
        await Composer.deleteMany({});
        console.log("Old composers deleted");
        await Composer.insertMany(composerList);
        console.log("Composers added");
}

// async function createInitialISRC(){
//     const doc = await ReleaseIsrc.findOne();
//     if(doc) {
//         console.log("ISRC document already exists");
//         return;
//     }
//     let d = new Date();
//     let year = d.getFullYear();
//     let newDoc = new ReleaseIsrc({
//         releases: [],
//         currentYear: year,
//         totalTracksThisYear: 0
//     })
//     await newDoc.save();
//     console.log("Initial ISRC document created");
// }

// ReleaseIsrc.findOne(function(err, docs){
//     if(!docs){
//         console.log("Initializing release irsc");
//         let d = new Date();
//         let year = d.getFullYear();
//         let newDoc = new releaseIsrc({
//             releaes: [],
//             currentYear: year,
//             totalTracksThisYear: 0
//         })
//     }
//     else{
//         console.log("Irsc already initialized");
//     }
// })

try {
    await populatePublishers();
    await populateComposers();

} catch (error) {
    console.log(error);
}




// test route
app.get('/test', (req, res) => {
    console.log(publicPath);
    res.send("This is a test for the server");
});






// app.get("*", (req, res) => {
//     res.sendFile(path.join(publicPath, "index.html"));
// })

app.listen(port, process.env.IP, function () {
    console.log("Server Started");
})
