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


// Add Column Headers for corresponding export
const exportHeaders =
    [ 
        "provider filename",
        "provider track id",
        "title",
        "version",
        "primary track",
        "catalog",
        "instrumental",
        "vocals",
        "genre",
        "keywords",
        "mood",
        "description",
        "era",
        "sounds-like/influences",
        "instruments",
        "bpm",
        "lyrics",
        "restrictions",
        "original/cover",
        "one-stop licensing",
        "cd title / ref #",
        "release date",
        "track no",
        "iswc",
        "isrc",
        "tier",
        "ARTIST",
        "COMPOSER 1 NAME",
        "COMPOSER 1 PRO",
        "COMPOSER 1 PRO NUMBER",
        "COMPOSER 1 SPLIT",
        "COMPOSER 2 NAME",
        "COMPOSER 2 PRO",
        "COMPOSER 2 PRO NUMBER",
        "COMPOSER 2 SPLIT",
        "COMPOSER 3 NAME",
        "COMPOSER 3 PRO",
        "COMPOSER 3 PRO NUMBER",
        "COMPOSER 3 SPLIT",
        "COMPOSER 4 NAME",
        "COMPOSER 4 PRO",
        "COMPOSER 4 PRO NUMBER",
        "COMPOSER 4 SPLIT",
        "COMPOSER 5 NAME",
        "COMPOSER 5 PRO",
        "COMPOSER 5 PRO NUMBER",
        "COMPOSER 5 SPLIT",
        "COMPOSER 6 NAME",
        "COMPOSER 6 PRO",
        "COMPOSER 6 PRO NUMBER",
        "COMPOSER 6 SPLIT",
        "PUBLISHER 1 NAME",
        "PUBLISHER 1 PRO",
        "PUBLISHER 1 PRO NUMBER",
        "PUBLISHER 1 SPLIT",
        "PUBLISHER 2 NAME",
        "PUBLISHER 2 PRO",
        "PUBLISHER 2 PRO NUMBER",
        "PUBLISHER 2 SPLIT",
        "PUBLISHER 3 NAME",
        "PUBLISHER 3 PRO",
        "PUBLISHER 3 PRO NUMBER",
        "PUBLISHER 3 SPLIT",
        "PUBLISHER 4 NAME",
        "PUBLISHER 4 PRO",
        "PUBLISHER 4 PRO NUMBER",
        "PUBLISHER 4 SPLIT",
        "PUBLISHER 5 NAME",
        "PUBLISHER 5 PRO",
        "PUBLISHER 5 PRO NUMBER",
        "PUBLISHER 5 SPLIT",
        "PUBLISHER 6 NAME",
        "PUBLISHER 6 PRO",
        "PUBLISHER 6 PRO NUMBER",
        "PUBLISHER 6 SPLIT",

    ]


let globalRelease = "";
let excelFileName = "";
router.get('/bi', (req, res) => {

globalRelease = "Protunes-" + req.query.status + "-" + req.query.release;
excelFileName = globalRelease + ".xlsx";
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
            for (let h = 0; h < exportHeaders.length; h++) {
                ws.cell(row, count).string(exportHeaders[h]).style(style);
                count++;
            }
            row++;



            bicues.forEach((cue, cueIndex) => {
                let genreId ;

                if(cue.rating >= 6){

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
               // trackfilepath 
                let newFilePath = cue.fileName.replace(" - ", "_");
                newFilePath = newFilePath.replace(" ", "_");
                // provider filename
                ws.cell(row,count).string(newFilePath).style(style);
                count++;
                // provider track id
                ws.cell(row,count).string(cue.trackId).style(style);
                count++;
                // title
                ws.cell(row,count).string(cue.songTitle).style(style);
                count++;
                // version
                count++;
                // primary track
                if(cue.mainVersion){
                    let mainVersion = cue.mainVersion.replace("DLM - ", "");
                    mainVersion = mainVersion.replace(".wav", "");
                    ws.cell(row,count).string(mainVersion).style(style);
                    count++;
                }
                else{
                    count++;
                }
              // catalog 
                ws.cell(row,count).string("DL Music").style(style);
                count++;
                // instrumental
                ws.cell(row,count).string("Yes").style(style);
                count++;
                // vocals
                count++;
                // genre
                ws.cell(row,count).string(cue.genre + ", " + cue.style).style(style);
                count++;
                // keywords
                ws.cell(row,count).string(cue.descriptions.join(", ")).style(style);
                count++;
                // mood
                ws.cell(row,count).string(cue.descriptions.join(", ")).style(style);
                count++;
                // description
                ws.cell(row,count).string(cue.descriptions.join(", ")).style(style);
                count++;
                // era
                count++;
                // sound like 
                count++;
                //instrunents
                ws.cell(row,count).string(cue.instruments.join(", ")).style(style);
                count++;
                // bpm 
                count++;
                // lyrics
                count++;
                // restrictions
                count++;
                // original 
                ws.cell(row,count).string("Original").style(style);
                count++;
                // one stop licensing
                ws.cell(row,count).string("Yes").style(style);
                count++;
                // cd title 
                ws.cell(row,count).string(cue.genre + ", " + cue.style + " Vol. " + cue.release).style(style);
                count++;
                // release date
                ws.cell(row,count).string(cue.releaseDate).style(style);
                count++;
                // track no
                ws.cell(row,count).string(String(cueIndex)).style(style);
                count++;
                // iswc
                count++
                // isrc
                ws.cell(row,count).string(cue.isrc).style(style);
                count++;
                // tier
                ws.cell(row,count).string("1").style(style);
                count++;
                // artist
                count++;

                for (let ploop = 0; ploop < 6; ploop++) {

                    if (ploop < cue.composers.length) {
                        cp = cue.composers[ploop];
                        let firstAndMiddleName = cp.composer.fName;
                        if(cp.composer.mName.length > 0){
                            firstAndMiddleName = cp.composer.fName + " " + cp.composer.mName;
                          
                        }
                        
                        ws.cell(row,count).string(cp.composer.fullName).style(style);
                        count++;
                        ws.cell(row, count).string(cp.composer.pro).style(style);
                        count++;
                        ws.cell(row, count).string(cp.composer.cae).style(style);
                        count++;
                        ws.cell(row, count).string(String(cp.split)).style(style);
                        count++;

                        
                    }
                    else {
                    
                        count = count + 4;

                    }
                }

                for (let cloop = 0; cloop < 6; cloop++) {

                    if (cloop < cue.publishers.length) {
                      //  console.log("In Publisher Export");
                        pp = cue.publishers[cloop].publisher;
                        
                
                        let splitPub = String(cue.publishers[cloop].split);
                        
                        ws.cell(row,count).string(pp.publisherName);
                        count++;
                        ws.cell(row,count).string(pp.publisherPro);
                        count++
                        ws.cell(row,count).string(pp.publisherIpi);
                        count++
                        ws.cell(row,count).string(splitPub);
                        count++;                   
                    }
                    else{
                        count = count + 4;
                    }    

                }
                // move to next cue and row
                row++;

                }
            })

           





            wb.write("public/" + excelFileName, () => {
                if(err){
                    console.log(err)
                }
                else{
                // res.redirect("/api/export/download");
                   res.download("public/" + excelFileName, excelFileName, function (err) {
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
    
   

    res.download("public/" + excelFileName,function (err) {
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