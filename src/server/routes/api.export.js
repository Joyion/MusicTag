
const express = require("express");
const router = express.Router();
// REQUIRE TO MAKE EXCEL FILE 
const xl = require("excel4node");
const biCue = require("../models/bi_cue_model");
const composers = require('../models/composer.model');



const sourceAudioHeaders =
    ["xx Main Version xx",
        "Sourceaudio Id",
        "Catalog",
        "Label",
        "Title", 
        "Filename",
        "Master ID",
        "Album",
        "Album Code",
        "Album Description", 
        "Album Genre",
        "Track Number", 
        "Artist",
        "Composer",
        "Publisher", 
        "Genres",
        "Tempos",
        "Cue Types", 
        "BPM", 
        "Release Date", 
        "Description",
        "Mood",
        "Style", 
        "Lyrics",
        "Has Vocal", 
        "Explicit", 
        "Isrc",
        "Iswc", 
    ]




router.get('/bi', (req, res) => {



    biCue.find({}, (err, bicues) => {
        if (!bicues) {
            console.log("Error creating excel");

        }
        else {
            const wb = new xl.Workbook();
            const ws = wb.addWorksheet("BICues");
            const style = wb.createStyle({ font: { color: "#000000", size: 12 } })
            let row = 1;
            let count = 1;
            for(let h = 0; h < sourceAudioHeaders.length; h++){
                ws.cell(row, count).string(sourceAudioHeaders[h]).style(style);
                count++;
            }
            for(let pc = 0; pc < 5; pc++){
                let num = pc + 1;
                ws.cell(row, count).string(`Publisher ${num} Company`).style(style);
                count++;
                ws.cell(row, count).string(`Publisher ${num} Pro Affiliation`).style(style);
                count++;
                ws.cell(row, count).string(`Publisher ${num} CAE/IPI`).style(style);
                count++;
                ws.cell(row, count).string(`Publisher ${num} Ownership Share`).style(style);
                count++;
                ws.cell(row, count).string(`Publisher ${num} Role`).style(style);
                count++;
                ws.cell(row, count).string(`Publisher ${num} Collection Share Percentage`).style(style);
                count++;
                ws.cell(row, count).string(`Publisher ${num} Collection Share Territory`).style(style);
                count++;
                ws.cell(row, count).string(`Writer ${num} First Name`).style(style);
                count++;
                ws.cell(row, count).string(`Writer ${num} Last Name`).style(style);
                count++;
                ws.cell(row, count).string(`Writer ${num} Pro Affiliation`).style(style);
                count++;
                ws.cell(row, count).string(`Writer ${num} CAE/IPI`).style(style);
                count++;
                ws.cell(row, count).string(`Writer ${num} Ownership Share`).style(style);
                count++;
                ws.cell(row, count).string(`Writer ${num} Publisher`).style(style);
                count++;
                ws.cell(row, count).string(`Writer ${num} Role`).style(style);
                count++;
            }
            ws.cell(row, count).string(`Instrumentation`).style(style);
            count++;
            ws.cell(row, count).string(`Pro`).style(style);
            count++;
            ws.cell(row, count).string(`Release`).style(style);
            count++;
            row++;

            /// ADD BICUES DATA LOOOP 

            // for (let count = 0; count < bicues.length; count++) {
            //     ws.cell(row, 1).string(bicues[count].songTitle).style(style);
            //     row++;
            // }
            count = 1;
            for(let cue = 0; cue < bicues.length; cue++){
                let bi = bicues[cue];

                ws.cell(row, count).string(bi.mainVersion).style(style);
                count++;
                // sourceaudio id
                ws.cell(row, count).string("").style(style);
                count++;
                // catalog
                ws.cell(row, count).string("DL Music").style(style);
                count++;
                // label
                ws.cell(row, count).string("DL Music").style(style);
                count++;
                // title
                ws.cell(row, count).string(bi.songTitle).style(style);
                count++;
                // filename
                ws.cell(row, count).string(bi.fileName).style(style);
                count++;
                // Master id
                ws.cell(row, count).string("").style(style);
                count++;
                // Album
                let s = bi.release.split("_");
                let releaseNum = s[0].replace("R","");
                ws.cell(row, count).string(`${bi.genre}, ${bi.style} Vol. ${releaseNum}`).style(style);
                count++;
                // Album Code
                ws.cell(row, count).string("").style(style);
                count++;
                // Album Description
                ws.cell(row, count).string("").style(style);
                count++;
                // Album Genre
                ws.cell(row, count).string(`${bi.genre}(${bi.style})`).style(style);
                count++;
                // Track Number
                ws.cell(row, count).string("").style(style);
                count++;
                // Artist   
                ws.cell(row, count).string("").style(style);
                count++;
                // composers
                ws.cell(row, count).string("").style(style);
                count++;
                // publishers
                ws.cell(row, count).string("").style(style);
                count++
                ws.cell(row, count).string(`${bi.genre}(${bi.style})`).style(style);
                count++;
                // tempos
                ws.cell(row, count).string(`${bi.tempo})`).style(style);
                count++;
                // cue types
                ws.cell(row, count).string("Songs").style(style);
                count++;
                // BPM 
                ws.cell(row, count).string("").style(style);
                count++;
                // release date
                let options = {year: 'numeric', month: 'numeric', day: 'numeric' };
                let thedate = bi.createdDate.toLocaleString("en-US", options);
                let formatDate = thedate.split(", ");
                ws.cell(row, count).string(formatDate[0]).style(style);
                count++;
                // description
                let d = bi.descriptions.toString(", ");
                ws.cell(row, count).string(d).style(style);
                count++;
                // moood 
                ws.cell(row, count).string(d).style(style);
                count++;
                // style 
                ws.cell(row, count).string(bi.style).style(style);
                count++;
                // lyrics
                ws.cell(row, count).string("").style(style);
                count++;
                // Has Vocal
                ws.cell(row, count).string("No").style(style);
                count++;
                // Explicit
                ws.cell(row, count).string("").style(style);
                count++;
                // Isrc
                ws.cell(row, count).string(bi.isrc).style(style);
                count++;
                // iswc
                ws.cell(row, count).string("").style(style);
                count++;
                // instrumentation 
                let instruments = bi.instruments.toString(", ");
                ws.cell(row, count).string(instruments).style(style);
                count++;
                // pro
                ws.cell(row, count).string("").style(style);
                count++;
                // release
                ws.cell(row, count).string(bi.release).style(style);
                
                count = 1;
                row++;
                console.log(row);             
            }

            wb.write("BIMetadata.xlsx");
            res.redirect("/api/export/download");
        }
    })









    // const wb = new xl.Workbook();
    // const ws = wb.addWorksheet("METADATA");
    // const style = wb.createStyle({
    //     font: {
    //         color: '#000000',
    //         size: 12
    //     }
    // })
    // ws.cell(1, 1)
    //     .string("SONG TITLE")
    //     .style(style);

    // ws.cell(1, 2)
    //     .string("ARTIST")
    //     .style(style);

    // ws.cell(1, 3)
    //     .string("MP3")
    //     .style(style);

    // wb.write("MetaDataTest.xlsx");
    // res.redirect("/api/export/download");
})

router.get("/download", function (req, res) {
    res.download("BIMetadata.xlsx", "BIMetadata.xlsx", function (err) {
        if (err) {
            console.log("error");
        }
        else {

        }
    })
})


module.exports = router;