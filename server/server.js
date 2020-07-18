const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors");
// REQUIRED TO READ FILENAMES
const fs = require('fs');
// REQUIRED TO MAKE EXCEL FILE
const xl = require("excel4node"); 
// for port and serving front end react
const port = 5000;
const publicPath = path.join(__dirname, "..", "public", "dist")

// mongoose for database
const mongoose = require("mongoose");
// dotenv for keys
require("dotenv").config();




app.use(express.json());
app.use(cors({origin: "http://localhost:8080"}));
app.use(express.static(publicPath));

const database = process.env.DATABASE;
// connect to database
mongoose.connect("mongodb://localhost/dl_music", 
    {dbName: "dl_music", useNewUrlParser: true, 
    useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(){
        console.log("Connected to Database");
    });

const biCue = require("./models/bi_cue_model");
const composers = require('./models/composer.model');
const Publisher = require("./models/publisher.model");

//routes 
const biCuesRoutes = require("./routes/api.bicues");
const { resolveAny } = require("dns");
app.use("/api/bicues", biCuesRoutes);



app.get('/test', (req, res) =>{
    console.log(publicPath);
    res.send("This is a test for the server");
});

// to sync mp3 information to database 
app.get('/api/filename', (req, res) =>{
    let count = 0;
    
    // REMOVE 
    const release = req.query.release || "R40";
    console.log(release);
    const file = "./public/mp3/" + release;
    fs.readdir(file, (err, files) => {
        if(err){
            console.log("error reading files");
        }
        else{
           let biSongs = [];
           files.forEach((file, index) =>{
               count = count + 1;
               let d = new Date();
                let y = d.getFullYear().toString();
               let trackid = release + y + count;
               let songName = file.replace("DLM - ", "");
                songName = songName.replace(".mp3", "")
               let song = {songTitle: songName, fileName: file, status: "Pending", trackID: trackid};
                biSongs.push(song);
           });
           biCue.deleteMany(function(err){
               if(err){
                   console.log("error deleting data");
               }
               else{
                biCue.create(biSongs, function(err, docs){
               if(err){
                   console.log("Unable to Save to Database: \n" + error);
               }
               else {
                   console.log("Successfully written to database")
                   const data = JSON.stringify(biSongs);
                   res.json(data);
               }
           })
               }
           })       
        }     
    })
})




app.get('/api/excel', (req, res) => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("METADATA");
    const style = wb.createStyle({
        font: {
            color: '#000000',
            size: 12
        }
    })
    ws.cell(1,1)
        .string("SONG TITLE")
        .style(style);

    ws.cell(1, 2)
        .string("ARTIST")
        .style(style);

    ws.cell(1, 3)
        .string("MP3")
        .style(style);  
    
    wb.write("MetaDataTest.xlsx");
    res.redirect("/api/downloadExcel");
})

app.get("/api/downloadExcel", function (req, res){
    res.download("MetaDataTest.xlsx", "metadata.xlsx", function(err){
        if(err){
            console.log("error");
        }
        else {
            
        }
    })
})


// to sync mp3 information to database 
app.get('/api/upload', (req, res) =>{
    const release = req.query.release;
    console.log(release);
    const file = "./public/mp3/" + release;
    fs.readdir(file, (err, files) => {
        if(err){
            console.log("error reading files");
        }
        else{
           let biSongs = [];
           files.forEach((file) =>{
               let songName = file.replace("DLM - ", "");
                songName = songName.replace(".mp3", "")
               let song = {songTitle: songName, fileName: file}
                biSongs.push(song);
           });
           biCue.deleteMany(function(err){
               if(err){
                   console.log("error deleting data");
               }
               else{
                biCue.create(biSongs, function(err){
               if(err){
                   console.log("Unable to Save to Database: \n" + error);
               }
               else {
                   console.log("Successfully written to database")
                   const data = JSON.stringify(biSongs);
                   res.json(data);
               }
           })
               }
           })       
        }     
    })
})



//  app.get("*", (req, res) => {
//           res.sendFile(path.join(publicPath, "index.html"));
// })

app.listen(port,"localhost", function(){
    console.log("Server Started");
})