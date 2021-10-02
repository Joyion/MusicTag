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



const sourceAudioHeaders =
    [
"Work Title",
"Submitter Work ID",
"ISWC",
"ISRC",
"Work Title Duration (HHMMSS)",
"Alt Title 1",
"Alt Title 2",
"Alt Title 3",
"Alt Title 4",
"Alt Title 5",
"Alt Title 6",
"Alt Title 7",
"Alt Title 8",
"Alt Title 9",
"Alt Title 10",
"Artist LN 1",
"Artist FN 1",
"Artist LN 2",
"Artist FN 2",
"Artist LN 3",
"Artist FN 3",
"Artist LN 4",
"Artist FN 4",
"Artist LN 5",
"Artist FN 5",
"Artist LN 6",
"Artist FN 6",
"Artist LN 7",
"Artist FN 7",
"Artist LN 8",
"Artist FN 8",
"Artist LN 9",
"Artist FN 9",
"Artist LN 10",
"Artist FN 10",
"Intended Purpose",
"Production Title",
"Library",
"CD Identifier",
"Work Title CD Cut#",
"Arrangement of PD Work (Y/N)",
"Original PD Title",
"Original PD Writer LN 1",
"Original PD Writer FN 1",
"Original PD Writer LN 2",
"Original PD Writer FN 2",
"Writer LN 1",
"Writer FN 1",
"Writer Role Code 1",
"Writer PR Affiliation 1",
"Writer Share 1",
"Writer Internal ID 1",
"Writer IPI Name# 1",
"1st Controlled Pub IPI Name# or Internal ID for Writer 1",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 1",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 1",
"4th Controlled Pub IPI Name# or Internal ID for Writer 1",
"5th Controlled Pub IPI Name# or Internal ID for Writer 1",
"Writer LN 2",
"Writer FN 2",
"Writer Role Code 2",
"Writer PR Affiliation 2",
"Writer Share 2",
"Writer Internal ID 2",
"Writer IPI Name# 2",
"1st Controlled Pub IPI Name# or Internal ID for Writer 2",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 2",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 2",
"4th Controlled Pub IPI Name# or Internal ID for Writer 2",
"5th Controlled Pub IPI Name# or Internal ID for Writer 2",
"Writer LN 3",
"Writer FN 3",
"Writer Role Code 3",
"Writer PR Affiliation 3",
"Writer Share 3",
"Writer Internal ID 3",
"Writer IPI Name# 3",
"1st Controlled Pub IPI Name# or Internal ID for Writer 3",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 3",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 3",
"4th Controlled Pub IPI Name# or Internal ID for Writer 3",
"5th Controlled Pub IPI Name# or Internal ID for Writer 3",
"Writer LN 4",
"Writer FN 4",
"Writer Role Code 4",
"Writer PR Affiliation 4",
"Writer Share 4",
"Writer Internal ID 4",
"Writer IPI Name# 4",
"1st Controlled Pub IPI Name# or Internal ID for Writer 4",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 4",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 4",
"4th Controlled Pub IPI Name# or Internal ID for Writer 4",
"5th Controlled Pub IPI Name# or Internal ID for Writer 4",
"Writer LN 5",
"Writer FN 5",
"Writer Role Code 5",
"Writer PR Affiliation 5",
"Writer Share 5",
"Writer Internal ID 5",
"Writer IPI Name# 5",
"1st Controlled Pub IPI Name# or Internal ID for Writer 5",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 5",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 5",
"4th Controlled Pub IPI Name# or Internal ID for Writer 5",
"5th Controlled Pub IPI Name# or Internal ID for Writer 5",
"Writer LN 6",
"Writer FN 6",
"Writer Role Code 6",
"Writer PR Affiliation 6",
"Writer Share 6",
"Writer Internal ID 6",
"Writer IPI Name# 6",
"1st Controlled Pub IPI Name# or Internal ID for Writer 6",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 6",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 6",
"4th Controlled Pub IPI Name# or Internal ID for Writer 6",
"5th Controlled Pub IPI Name# or Internal ID for Writer 6",
"Writer LN 7",
"Writer FN 7",
"Writer Role Code 7",
"Writer PR Affiliation 7",
"Writer Share 7",
"Writer Internal ID 7",
"Writer IPI Name# 7",
"1st Controlled Pub IPI Name# or Internal ID for Writer 7",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 7",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 7",
"4th Controlled Pub IPI Name# or Internal ID for Writer 7",
"5th Controlled Pub IPI Name# or Internal ID for Writer 7",
"Writer LN 8",
"Writer FN 8",
"Writer Role Code 8",
"Writer PR Affiliation 8",
"Writer Share 8",
"Writer Internal ID 8",
"Writer IPI Name# 8",
"1st Controlled Pub IPI Name# or Internal ID for Writer 8",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 8",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 8",
"4th Controlled Pub IPI Name# or Internal ID for Writer 8",
"5th Controlled Pub IPI Name# or Internal ID for Writer 8",
"Writer LN 9",
"Writer FN 9",
"Writer Role Code 9",
"Writer PR Affiliation 9",
"Writer Share 9",
"Writer Internal ID 9",
"Writer IPI Name# 9",
"1st Controlled Pub IPI Name# or Internal ID for Writer 9",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 9",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 9",
"4th Controlled Pub IPI Name# or Internal ID for Writer 9",
"5th Controlled Pub IPI Name# or Internal ID for Writer 9",
"Writer LN 10",
"Writer FN 10",
"Writer Role Code 10",
"Writer PR Affiliation 10",
"Writer Share 10",
"Writer Internal ID 10",
"Writer IPI Name# 10",
"1st Controlled Pub IPI Name# or Internal ID for Writer 10",
"2nd Controlled Pub IPI Name# or Internal ID for Writer 10",
"3rd Controlled Pub IPI Name# or Internal ID for Writer 10",
"4th Controlled Pub IPI Name# or Internal ID for Writer 10",
"5th Controlled Pub IPI Name# or Internal ID for Writer 10",
"Original Pub Name 1",
"Original Pub PR Affiliation 1",
"Original Pub World Own Share 1",
"Original Pub Internal ID 1",
"Original Pub IPI Name# 1",
"Original Pub Controlled (Y/N) 1",
"1st AM/Sub Pub Name 1",
"1st AM/Sub Pub Role Code 1",
"1st AM/Sub Pub PR Affiliation 1",
"1st AM/Sub Pub Territory Code 1",
"1st AM/Sub Pub Collect Share 1",
"1st AM/Sub Pub Internal ID 1",
"1st AM/Sub Pub IPI Name# 1",
"2nd AM/Sub Pub Name 1",
"2nd AM/Sub Pub Role Code 1",
"2nd AM/Sub Pub PR Affiliation 1",
"2nd AM/Sub Pub Territory Code 1",
"2nd AM/Sub Pub Collect Share 1",
"2nd AM/Sub Pub Internal ID 1",
"2nd AM/Sub Pub IPI Name# 1",
"3rd AM/Sub Pub Name 1",
"3rd AM/Sub Pub Role Code 1",
"3rd AM/Sub Pub PR Affiliation 1",
"3rd AM/Sub Pub Territory Code 1",
"3rd AM/Sub Pub Collect Share 1",
"3rd AM/Sub Pub Internal ID 1",
"3rd AM/Sub Pub IPI Name# 1",
"4th AM/Sub Pub Name 1",
"4th AM/Sub Pub Role Code 1",
"4th AM/Sub Pub PR Affiliation 1",
"4th AM/Sub Pub Territory Code 1",
"4th AM/Sub Pub Collect Share 1",
"4th AM/Sub Pub Internal ID 1",
"4th AM/Sub Pub IPI Name# 1",
"5th AM/Sub Pub Name 1",
"5th AM/Sub Pub Role Code 1",
"5th AM/Sub Pub PR Affiliation 1",
"5th AM/Sub Pub Territory Code 1",
"5th AM/Sub Pub Collect Share 1",
"5th AM/Sub Pub Internal ID 1",
"5th AM/Sub Pub IPI Name# 1",
"6th AM/Sub Pub Name 1",
"6th AM/Sub Pub Role Code 1",
"6th AM/Sub Pub PR Affiliation 1",
"6th AM/Sub Pub Territory Code 1",
"6th AM/Sub Pub Collect Share 1",
"6th AM/Sub Pub Internal ID 1",
"6th AM/Sub Pub IPI Name# 1",
"Original Pub Name 2",
"Original Pub PR Affiliation 2",
"Original Pub World Own Share 2",
"Original Pub Internal ID 2",
"Original Pub IPI Name# 2",
"Original Pub Controlled (Y/N) 2",
"1st AM/Sub Pub Name 2",
"1st AM/Sub Pub Role Code 2",
"1st AM/Sub Pub PR Affiliation 2",
"1st AM/Sub Pub Territory Code 2",
"1st AM/Sub Pub Collect Share 2",
"1st AM/Sub Pub Internal ID 2",
"1st AM/Sub Pub IPI Name# 2",
"2nd AM/Sub Pub Name 2",
"2nd AM/Sub Pub Role Code 2",
"2nd AM/Sub Pub PR Affiliation 2",
"2nd AM/Sub Pub Territory Code 2",
"2nd AM/Sub Pub Collect Share 2",
"2nd AM/Sub Pub Internal ID 2",
"2nd AM/Sub Pub IPI Name# 2",
"3rd AM/Sub Pub Name 2",
"3rd AM/Sub Pub Role Code 2",
"3rd AM/Sub Pub PR Affiliation 2",
"3rd AM/Sub Pub Territory Code 2",
"3rd AM/Sub Pub Collect Share 2",
"3rd AM/Sub Pub Internal ID 2",
"3rd AM/Sub Pub IPI Name# 2",
"4th AM/Sub Pub Name 2",
"4th AM/Sub Pub Role Code 2",
"4th AM/Sub Pub PR Affiliation 2",
"4th AM/Sub Pub Territory Code 2",
"4th AM/Sub Pub Collect Share 2",
"4th AM/Sub Pub Internal ID 2",
"4th AM/Sub Pub IPI Name# 2",
"5th AM/Sub Pub Name 2",
"5th AM/Sub Pub Role Code 2",
"5th AM/Sub Pub PR Affiliation 2",
"5th AM/Sub Pub Territory Code 2",
"5th AM/Sub Pub Collect Share 2",
"5th AM/Sub Pub Internal ID 2",
"5th AM/Sub Pub IPI Name# 2",
"6th AM/Sub Pub Name 2",

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
                for(i = 0; i < arrayGenres.length; i++){
                    if(cue.genreStyle == arrayGenres[i].genre){
                        genreId = arrayGenres.genreId;
                    }
                }
         
                let trackGenreId = 100 + parseInt(cue.genreId);

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

               for(let pCount = 0; pCount < 5; pCount++){
                   if(pCount < cue.publishers.length){
                       publishernames += cue.publishers[pCount].publisher.publisherName;
                   }
                   if(pCount < (cue.publishers.length - 1)){
                       publishernames += " / ";
                   }
               }

               let IDcode = cue.release.replace("R", "");
               IDcode = IDcode.replace("_", "");
               let numId = cueIndex.toString();
               console.log(cueIndex);
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
                count += 41;
           

                for (let ploop = 0; ploop < 10; ploop++) {

                    if (ploop < cue.composers.length) {
                        cp = cue.composers[ploop];
                    
                    ws.cell(row, count).string()
                        
                        ws.cell(row,count).string(cp.lName).style(style);
                        count++;
                        ws.cell(row,count).string(cp.fName).style(style);
                        count++;
                        ws.cell(row, count).string("CA - Composer/Author").style(style);
                        count++;

                        if(cp.pro == "ASCAP"){
                            ws.cell(row,count).string("10 - ASCAP");
                            count++;
                        }
                        else if(cp.pro == "BMI"){
                            ws.cell(row, count).string("21 - BMI");
                            count++
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
                            ws.cell(row,count).string(cp.pro);
                            count++;
                        }
                        ws.cell(row,count).string(cp.cae);
                        count++;
                        ws.cell(row,count).string(cp.cae);
                        count++;
                        count += 6;
                        
                    }
                    else {
              

                    }

                    if (ploop < cue.composers.length) {
                        let cc = cue.composers[ploop]

                  
                    }
                    else {

                      
              

                    }
                }
                // instruments
        
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
    console.log("in download")
    
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
            console.log(r.releases);
            res.status(200).json(JSON.stringify(r));
        }
    })
})

module.exports = router;


// for(let bicount = 0; bicount < b.length; bicount++){
//     let cellcount = 0;

//     console.log("preparing excel");
//     let x = b[bicount];

//     let mainVersion = " ";
//     ws.cell(row, cellcount).string("what");
//     cellcount++;

//     // const sourceAudioId = "";
//     // ws.cell(row, cellcount).string(sourceAudioId).style(style);
//     // cellcount++;

//     // const catalog = "DL Music";
//     // ws.cell(row, cellcount).string(catalog).style(style);
//     // cellcount++; 

//     // const label = "DL Music";
//     // ws.cell(row, cellcount).string(label).style(style);
//     // cellcount++; 


//     // const title = x.songTitle;
//     // const filename = x.filename;
//     // const masterId = "";
//     // const releaseNum = x.release.replace("R", "");
//     // const album = x.genre + ", " + x.style + " Vol." + releaseNum;
//     // const albumCode = "";
//     // const albumDesc = x.genreStyle;
//     // const genre = x.genreStyle;
//     // const trackNumber = x.trackId;
//     // const a = x.composers.map((c) => {return c.fullName});
//     // const artists = a.toString(" / ");
//     // const composers = a.toString(" / ");
//     // const p = x.publishers.map((p) => {return p.publisherName});
//     // const publishers = p.toString(" / ")
//     // const tempo = x.tempo;
//     // const cueType = "Songs";
//     // const bpm = "";
//     // const releaseDate = x.createdDate;
//     // const description = x.descriptions.toString(", ");
//     // const mood = x.descriptions.toString(", ");
//     // const styleRow = "";
//     // const styleOf = "";
//     // const lyrics = "";
//     // const vocals = "No";
//     // const explicit = "";
//     // const isrc = x.isrc;
//     // const iswc = "";



// //    for (let loop = 0; loop < 5; loop++){

// //     if(x.publishers[loop]){
// //         let s = x.publishers[loop];
// //         console.log(s.publisherName + " " +
// //         s.publisherSplit + " " + 
// //         s.publisherIpi + " " + 
// //         s.publisherPro);
// //     }
// //     else {
// //         console.log(loop + " Publisher Doesn't exist for Row" + count);
// //     }


// //    }

// //    for (let loop = 0; loop < 5; loop++){

// //     if(x.composers[loop]){
// //         let t = x.composers[loop];
// //         console.log(t.fName + " " +
// //         t.mName + " " + 
// //         t.lName + " " + 
// //         t.suffix + " " +
// //         t.cae + " " +
// //         t.pro + " " +
// //         t.split + " ");
// //     }
// //     else {
// //         console.log(loop + " Composer Doesn't exist for Row" + count);
// //     }


// //    }








//     row++
// }