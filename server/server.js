// This is my set up for the node server on a music application 

const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors");
const dotenv = require("dotenv").config();
// REQUIRED TO READ FILENAMES
const fs = require('fs');
// for port and serving front end react
const port = 5000;
const publicPath = path.join(__dirname, "..", "public", "dist")

// mongoose for database
const mongoose = require("mongoose");
// dotenv for keys
require("dotenv").config();

// format time date
var moment = require('moment'); // require





app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.static(publicPath));
 
const database = process.env.DATABASE;
// connect to database
mongoose.connect("mongodb://localhost/dl_music",
    {
        dbName: "dl_music", useNewUrlParser: true,
        useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true
    });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function () {
    console.log("Connected to Database");
});


const composers = require('./models/composer.model');
const Publisher = require("./models/publisher.model");
const releaseIsrc = require("./models/releaseIsrc.model");
const biCue = require("./models/bi_cue_model");

// populate publishers
// const publisherArray = [
//     {
//         publisherName: "Derek Luff Music, Inc.",
//         publisherIpi: "337689810",
//         publisherPro: "ASCAP",
//     },
//     {
//         publisherName: "Dewmarc Music",
//         publisherIpi: "355468339",
//         publisherPro: "BMI",
//     },
//     {
//         publisherName: "Ridek Music",
//         publisherIpi: "568242236",
//         publisherPro: "SESAC",
//     }
// ]


// Publisher.create(publisherArray, (err, pubs) => {
//     console.log(pubs);
// })

//routes 
const biCuesRoutes = require("./routes/api.bicues");
// const { resolveAny } = require("dns");
app.use("/api/bicues", biCuesRoutes);
const exportRoutes = require("./routes/api.export")
app.use("/api/export", exportRoutes);

const composerList = require("./composers");

// populate database with old composer info 

// composers.deleteMany({}, (err) => {
//     if(err){
//         console.log(err)
//     }
//     else{
//         composers.create(composerList, (err, docs) => {
//             if(err){
//                 console.log("error")
//             }
//             else {
//                 console.log("composers added")
//             }
//         })

//     }
// })





app.get('/test', (req, res) => {
    console.log(publicPath);
    res.send("This is a test for the server");
});




// to sync mp3 information to database 
app.get('/api/upload', (req, res) => {
    const release = req.query.release.toUpperCase();
    let d = new Date();
    let year = d.getFullYear();
    console.log(release);
    const file = "./public/dist/wav/" + release;
    fs.readdir(file, (err, files) => {
        if (err) {
            console.log("error reading files");
        }
        else {
            console.log(files.length);
            if (files.length > 0) {

                releaseIsrc.findOne(function (err, docs) {
                    console.log("Are there any releases in releaseIsrc? " + docs);
                    if (!docs) {
                        console.log("Initializing ReleaseIsrc Model")
                        let newDoc = new releaseIsrc({
                            releases: [release],
                            currentYear: year,
                            totalTracksThisYear: files.length
                        })

                        newDoc.save(function (err, doc) {
                            startUpdate(release, year, doc.totalTracksThisYear - files.length);
                        })



                    }
                    else {
                        console.log("Adding new release..." + release)
                        if (docs.releases.includes(release)) {
                            let message = "ERROR!! " + release + " already successfully uploaded. Please change rename Release Folder name";
                            console.log("Successfully written to database")
                            let myjson = {
                                error: "true",
                                message: message
                            }

                            const data = JSON.stringify(myjson);
                            res.json(data);
                        }
                        else {
                            docs.releases.push(release);
                            if (docs.currentYear != year) {
                                console.log("I'm not new" + docs.currentYear);
                                docs.currentYear = year;
                                docs.totalTracksThisYear = files.length;
                            }
                            else {
                                docs.totalTracksThisYear += files.length;
                            }
                            docs.save(function (error, docs) {
                                console.log(docs);
                                startUpdate(release, docs.currentYear, (docs.totalTracksThisYear - files.length))
                            });
                        }


                    }
                })

                // release cannont be over 99,000 tracks.
                // startupdate is the function that is called in the  callback above.
                const startUpdate = (r, y, t) => {
                    let mainVersions = [];
                    files.forEach((f, i) => {
                        if (f.includes(" v1 ")) {
                            let songSplit = f.split(" v1 ");
                            mainVersions.push({ songSplit: songSplit[0], fullFile: f });
                            console.log(songSplit[0]);
                            console.log(f);
                        }
                    })
                    let biSongs = [];
                    console.log(files);
                    files.forEach((file, index) => {
                        let songName = file.replace("DLM - ", "");
                        songName = songName.replace(".mp3", "");
                        songName = songName.replace(".wav", "");
                        songName = songName.replace("._", "");
                        file = file.replace("._","");
                        let mv = "N/A";
                        mainVersions.forEach((m, index) => {
                            if (file.includes(m.songSplit) && file != m.fullFile) {
                                mv = m.fullFile;
                                console.log(mv);
                            }

                        })
                        // nt stand for new track. following if else statement turns total track this year into a string with zeros
                        let nt = t + (index + 1);
                        let trackId = nt;
                        if (nt < 10) {
                            trackId = "0000" + nt.toString();
                        }
                        else if (nt >= 10 && nt < 100) {
                            trackId = "000" + nt.toString();

                        }
                        else if (nt >= 100 && nt < 1000) {
                            trackId = "00" + nt.toString();
                        }
                        else if (nt >= 1000 && nt < 10000) {
                            trackId = "0" + nt.toString();
                        }
                        // year abreviated... last 2 digits of the year. example year = 1970, yearAbr = 70;
                        let makeStringofYear = year.toString();
                        let yearAbr = makeStringofYear.slice(-2);
                        let isrc = "US-RRD-" + yearAbr + "-" + trackId;
                        trackId = release + "-" + nt.toString();
                        let trackNum = release.replace("R", "") + nt.toString();
                        let d = moment().format("MM-DD-YYYY")
                        let track = makeStringofYear + trackNum;
                        let song = {
                            songTitle: songName, fileName: file, release: r, isrc: isrc,
                            trackId: trackId, mainVersion: mv, trackNum: trackNum, releaseDate: d, track: track,
                            trackNumInRelease: nt
                        }
                        biSongs.push(song);
                    });

                    biCue.create(biSongs, function (err) {
                        if (err) {
                            console.log("Unable to Save to Database: \n" + error);
                        }
                        else {
                            let message = release + " was successfully uploaded";
                            console.log("Successfully written to database")
                            let myjson = {
                                biCues: biSongs,
                                error: "false",
                                message: message
                            }

                            const data = JSON.stringify(myjson);
                            res.json(data);
                        }
                    });
                }

            }
            else{
                console.log("No files in folder");
            }

            // end of if(files)
        }
        // end of if(err)
    })
})

app.get("*", (req, res) => {

    res.sendFile(path.join(publicPath, "index.html"));
})

app.listen(port, process.env.IP, function () {
    console.log("Server Started");
})

//