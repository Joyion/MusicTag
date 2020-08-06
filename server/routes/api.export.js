
const express = require("express");
const router = express.Router();
// REQUIRE TO MAKE EXCEL FILE 
const xl = require("excel4node");
const biCue = require("../models/bi_cue_model");
const composers = require('../models/composer.model');



router.get('/bi', (req, res) => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("METADATA");
    const style = wb.createStyle({
        font: {
            color: '#000000',
            size: 12
        }
    })
    ws.cell(1, 1)
        .string("SONG TITLE")
        .style(style);

    ws.cell(1, 2)
        .string("ARTIST")
        .style(style);

    ws.cell(1, 3)
        .string("MP3")
        .style(style);

    wb.write("MetaDataTest.xlsx");
    res.redirect("/api/export/download");
})

router.get("/download", function (req, res) {
    res.download("MetaDataTest.xlsx", "metadata.xlsx", function (err) {
        if (err) {
            console.log("error");
        }
        else {

        }
    })
})


module.exports = router;