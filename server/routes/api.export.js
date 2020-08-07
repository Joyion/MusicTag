
const express = require("express");
const router = express.Router();
// REQUIRE TO MAKE EXCEL FILE 
const xl = require("excel4node");
const biCue = require("../models/bi_cue_model");
const composers = require('../models/composer.model');



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
            for (let count = 0; count < bicues.length; count++) {
                ws.cell(row, 1).string(bicues[count].songTitle).style(style);
                row++;

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