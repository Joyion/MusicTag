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
"6th AM/Sub Pub Role Code 2",
"6th AM/Sub Pub PR Affiliation 2",
"6th AM/Sub Pub Territory Code 2",
"6th AM/Sub Pub Collect Share 2",
"6th AM/Sub Pub Internal ID 2",
"6th AM/Sub Pub IPI Name# 2",
"Original Pub Name 3",
"Original Pub PR Affiliation 3",
"Original Pub World Own Share 3",
"Original Pub Internal ID 3",
"Original Pub IPI Name# 3",
"Original Pub Controlled (Y/N) 3",
"1st AM/Sub Pub Name 3",
"1st AM/Sub Pub Role Code 3",
"1st AM/Sub Pub PR Affiliation 3",
"1st AM/Sub Pub Territory Code 3",
"1st AM/Sub Pub Collect Share 3",
"1st AM/Sub Pub Internal ID 3",
"1st AM/Sub Pub IPI Name# 3",
"2nd AM/Sub Pub Name 3",
"2nd AM/Sub Pub Role Code 3",
"2nd AM/Sub Pub PR Affiliation 3",
"2nd AM/Sub Pub Territory Code 3",
"2nd AM/Sub Pub Collect Share 3",
"2nd AM/Sub Pub Internal ID 3",
"2nd AM/Sub Pub IPI Name# 3",
"3rd AM/Sub Pub Name 3",
"3rd AM/Sub Pub Role Code 3",
"3rd AM/Sub Pub PR Affiliation 3",
"3rd AM/Sub Pub Territory Code 3",
"3rd AM/Sub Pub Collect Share 3",
"3rd AM/Sub Pub Internal ID 3",
"3rd AM/Sub Pub IPI Name# 3",
"4th AM/Sub Pub Name 3",
"4th AM/Sub Pub Role Code 3",
"4th AM/Sub Pub PR Affiliation 3",
"4th AM/Sub Pub Territory Code 3",
"4th AM/Sub Pub Collect Share 3",
"4th AM/Sub Pub Internal ID 3",
"4th AM/Sub Pub IPI Name# 3",
"5th AM/Sub Pub Name 3",
"5th AM/Sub Pub Role Code 3",
"5th AM/Sub Pub PR Affiliation 3",
"5th AM/Sub Pub Territory Code 3",
"5th AM/Sub Pub Collect Share 3",
"5th AM/Sub Pub Internal ID 3",
"5th AM/Sub Pub IPI Name# 3",
"6th AM/Sub Pub Name 3",
"6th AM/Sub Pub Role Code 3",
"6th AM/Sub Pub PR Affiliation 3",
"6th AM/Sub Pub Territory Code 3",
"6th AM/Sub Pub Collect Share 3",
"6th AM/Sub Pub Internal ID 3",
"6th AM/Sub Pub IPI Name# 3",

    ]


let globalRelease = "";
let excelFileName = "";
router.get('/bi', (req, res) => {

    globalRelease = "MusikMark-" + req.query.status + "-" + req.query.release;
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

                let trackGenreId;
                if(cue.genreId){
                    let trackGenreId = 100 + parseInt(cue.genreId);
                }
                else{
                    trackGenreId = cue.genreId;
                }
         
                

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

