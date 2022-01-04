const express = require("express");
const router = express.Router();
// REQUIRE TO MAKE EXCEL FILE 
const xl = require("excel4node");
const biCue = require("../models/bi_cue_model");
const composers = require('../models/composer.model');
const releaseIsrc = require("../models/releaseIsrc.model");
const sourceAudioGenre = require("../sourceAudioGenre");
const getSourceAudioGenre = require("../sourceAudioGenre");
const releaseIsrcModel = require("../models/releaseIsrc.model");
const arrayGenres = require("../../src/components/genreStyle");


// Add Column Headers
const sourceAudioHeaders =
    [
        "TrackDisplayTitle",
"Library",
"SubLibrary",
"InternalID",
"CatNo",
"CDTitle",
"TrackNo",
"TrackSubNo",
"TrackTitle",
"TrackAlternateTitle",
"Mixout",
"Version",
"Length",
"GEN:1:Genre",
"GEN:1:SubGenre",
"GEN:2:Genre",
"GEN:2:SubGenre",
"GEN:3:Genre",
"GEN:3:SubGenre",
"BPM",
"Tempo",
"Mood",
"Keywords",
"Instrumentation",
"TrackDescription",
"CDDescription",
"ReleaseDate",
"Lyrics",
"COM:1:NamesBeforeKeyName",
"COM:1:KeyName",
"COM:1:Society",
"COM:1:IPI",
"COM:1:PerformanceShare",
"COM:2:NamesBeforeKeyName",
"COM:2:KeyName",
"COM:2:Society",
"COM:2:IPI",
"COM:2:PerformanceShare",
"COM:3:NamesBeforeKeyName",
"COM:3:KeyName",
"COM:3:Society",
"COM:3:IPI",
"COM:3:PerformanceShare",
"COM:4:NamesBeforeKeyName",
"COM:4:KeyName",
"COM:4:Society",
"COM:4:IPI",
"COM:4:PerformanceShare",
"COM:5:NamesBeforeKeyName",
"COM:5:KeyName",
"COM:5:Society",
"COM:5:IPI",
"COM:5:PerformanceShare",
"ARR:1:NamesBeforeKeyName",
"ARR:1:KeyName",
"ARR:1:Society",
"ARR:1:IPI",
"ARR:1:PerformanceShare",
"ARR:2:NamesBeforeKeyName",
"ARR:2:KeyName",
"ARR:2:Society",
"ARR:2:IPI",
"ARR:2:PerformanceShare",
"PUB:1:KeyName",
"PUB:1:Society",
"PUB:1:IPI",
"PUB:1:PerformanceShare",
"PUB:2:KeyName",
"PUB:2:Society",
"PUB:2:IPI",
"PUB:2:PerformanceShare",
"PUB:3:KeyName",
"PUB:3:Society",
"PUB:3:IPI",
"PUB:3:PerformanceShare",
"SUB:1:KeyName",
"SUB:1:Society",
"SUB:1:IPI",
"SUB:1:PerformanceShare",
"CODE:ISRC",
"CODE:ISWC",
"CODE:PRSTuneCode",
"CODE:GEMA",
"CODE:SACEM",
"CODE:SUISA",
"CODE:UPC",
"CODE:BUMASTEMRA",
"CODE:SABAM",
"CODE:APRA",
"CODE:SGAE",
"CODE:EAN",
"CODE:ASCAP",
"CODE:BMI",
"CODE:IMRO",
"CODE:JASRAC",
"CODE:KODA",
"CODE:KOMCA",
"CODE:NORM",
"CODE:SAMRO",
"CODE:SESAC",
"CODE:SIAE",
"CODE:SOCAN",
"CODE:STIM",
"CODE:TONO",
"CODE:TEOSTO",
"ATT:Artistname",
"ATT:AlbumArtistname",
"ATT:AlbumDiscs",
"ATT:AlbumDiscNumber"

    ]


let globalRelease = ""

router.get('/bi', (req, res) => {

globalRelease = req.query.release;

// console.log("Inside Excel");
// console.log("params " + req.query.release);
let releasefilter = {}
if(req.query.release != "All" || req.query.status != "All"){

    if(req.query.release != "All"){
        if(req.query.status != "All"){
            releasefilter = {release: req.query.release, status: req.query.status}
        }
        else{
            releasefilter = {release: req.query.release}
        }     
    }
    else {
        if(req.query.status != "All"){
            releasefilter = {status: req.query.status}
        }
        else{
        
        }
    }
   

}


    biCue.find(releasefilter)
    .populate({path: 'composers.composer', model: "Composer"})
    .populate({ path: "publishers.publisher", model: "Publisher" })
    .exec((err, bicues) => {
        if (!bicues) {
            console.log("Error creating excel");

        }
        else {

          //  bicues = getSourceAudioGenre(bicues);
            //  console.log(bicues);

            const wb = new xl.Workbook();
            const ws = wb.addWorksheet("BICues");
            const style = wb.createStyle({ font: { color: "#000000", size: 12 } })
            let row = 1;
            let count = 1;
            for (let h = 0; h < sourceAudioHeaders.length; h++) {
                ws.cell(row, count).string(sourceAudioHeaders[h]).style(style);
                count++;
            }
            row++;



            bicues.forEach((cue, cueIndex) => {
                let genreId ;

                // formula to generata a genre id
                
                for(i = 0; i < arrayGenres.length; i++){
                    if(cue.genreStyle == arrayGenres[i].genre){
                        genreId = arrayGenres.genreId;
                    }
                }
         
                let trackGenreId = 100 + parseInt(cue.genreId);

                //  create list of composers with hyphen 

               let artists = "";
               for(let aCount = 0; aCount < 5; aCount++){
                   if(aCount < cue.composers.length){
                       artists += cue.composers[aCount].composer.fullName;
                   }
                   if(aCount < (cue.composers.length - 1)){
                       artists += " / ";
                   }
               }

               let publishernames = "";

               // create list of publishers with hyphen

               for(let pCount = 0; pCount < 5; pCount++){
                   if(pCount < cue.publishers.length){
                       publishernames += cue.publishers[pCount].publisher.publisherName;
                   }
                   if(pCount < (cue.publishers.length - 1)){
                       publishernames += " / ";
                   }
               }

               // formulate to genrate id code 
               let IDcode = cue.release.replace("R", "");
               IDcode = IDcode.replace("_", "");
               let numId = cueIndex.toString();
              // console.log(cueIndex);
                numId = numId.padStart(4, "0");
               IDcode = "DLMBI" + IDcode + numId;
                count = 1;
                //console.log("track " + count);
                // main version
                ws.cell(row, count).string(cue.songTitle).style(style);
                count++;
                ws.cell(row, count).string(IDcode).style(style);
                count++;
                ws.cell(row, count).string("");
                count++;
                ws.cell(row, count).string(cue.isrc);
                count++;
                count += 42;
           

                for (let ploop = 0; ploop < 10; ploop++) {

                    if (ploop < cue.composers.length) {
                        cp = cue.composers[ploop];
                    
                    ws.cell(row, count).string()
                        
                        ws.cell(row,count).string(cp.composer.lName).style(style);
                        count++;
                        ws.cell(row,count).string(cp.composer.fName).style(style);
                        count++;
                        ws.cell(row, count).string("CA - Composer/Author").style(style);
                        count++;

                        let publisherIpi = cue.publishers[0].publisher.cae;

                        if(cp.pro == "ASCAP"){
                            ws.cell(row,count).string("10 - ASCAP");
                            publisherIpi = "337689810";
                            count++;
                        }
                        else if(cp.pro == "BMI"){
                            ws.cell(row, count).string("21 - BMI");
                            publisherIpi = "355468339";
                            count++
                        }
                        else if(cp.pro == "SESAC"){
                            ws.cell(row,count).string("71 - SESAC");
                            publisherIpi = "568242236"
                            count++;
                        }
                        else if (cp.pro == "SOCAN"){
                            ws.cell(row,count).string("101 - SOCAN");
                            
                            count++;
                        }
                  
                        else if(cp.pro == "APRA"){
                            ws.cell(row,count).string("8 - APRA");
                            count++;
                        }
                        else if(cp.pro = "SIAE"){
                            ws.cell(row,count).string("74 - SIAE");
                            count++;
                        }
                        else if(cp.pro = "SICAM"){
                            ws.cell(row,count).string("86 - SICAM");
                            count++;
                        }
                        else{
                            ws.cell(row,count).string(cp.composer.pro);
                            count++;
                        }





                       // console.log(cp.split + "This is composer split");
                        let cpSplitString = String(cp.split);
                        ws.cell(row,count).string(cpSplitString);
                        count++;
                        ws.cell(row,count).string(cp.composer.cae);
                        count++;
                        ws.cell(row,count).string(cp.composer.cae);
                        count++;
                        ws.cell(row,count).string(publisherIpi);
                        count += 5;
                        
                    }
                    else {
                        for(let ecount = 0; ecount < 12; ecount++){
                            ws.cell(row,count).string("");
                            count++;
                        }

                    }
                }

                for (let cloop = 0; cloop < 10; cloop++) {

                    if (cloop < cue.publishers.length) {
                      //  console.log("In Publisher Export");
                        pp = cue.publishers[cloop].publisher;
                        
                
                        let splitPub = String(cue.publishers[cloop].split);
                        
                        ws.cell(row,count).string(pp.publisherName);
                        count++;
                        ws.cell(row,count).string(splitPub);
                        count++;
                        switch(pp.publisherPro){
                            case "ASCAP":
                                ws.cell(row,count).string("10 - ASCAP");
                                count++;
                                break;
                            case "BMI":
                                ws.cell(row,count).string("21 - BMI");
                                count++;
                                break;
                            case "SESAC":
                                ws.cell(row,count).string("71 - SESAC");
                                count++;
                                break;
                            default:
                                ws.cell(row,count).string(pp.publisherPro);
                                count++;
                                break;

                        }
                        ws.cell(row,count).string(pp.publisherIpi);
                        count++;
                        ws.cell(row,count).string(pp.publisherIpi);
                        count++;
                        ws.cell(row, count).string("Y");
                        count++;                     
                    }
                    else{
                        count = count + 6;
                    }

                    
                    count = count + 42;
                    

                }
                // instruments
                row++;
            })

           





            wb.write("public/BISourceAudio.xlsx", () => {
                if(err){
                    console.log(err)
                }
                else{
                // res.redirect("/api/export/download");
                   res.download("public/BISourceAudio.xlsx", "BISourceAudio.xlsx", function (err) {
                    if (err) {
                        console.log("error");
                    }
                    else {
                        console.log("sent");
                    }
                })
                }
            });
            
            // end of bicue.find()

        }
        })




    // end of router.get
})




router.get("/download", function (req, res) {
    console.log("in download for export")
    
    let excelFileName = "public/MusicMark_" + globalRelease + ".xlsx";

    res.download(excelFileName,function (err) {
        if (err) {
            console.log("error");
        }
        else {

        }
    })
})


router.get("/releases", function(req, res){
    releaseIsrc.find({}, (err, r) => {
        if(err){
        

        }
        else{
            console.log("Release: " + r.releases);
            res.status(200).json(JSON.stringify(r));
        }      
    })
})

module.exports = router;