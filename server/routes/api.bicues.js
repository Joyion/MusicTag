const express = require("express");
const router = express.Router();
const biCue = require("../models/bi_cue_model");
const composers = require('../models/composer.model');
const Publisher = require("../models/publisher.model");
const path = require("path");
const mp3path = path.join(__dirname, "..", "..", "public", "dist", "mp3");
const wavPath = path.join(__dirname, "..", "..", "public", "dist", "wav")
// read metadata from files
const ffmetadata = require("ffmetadata");
// read metadata from files
const mm = require('music-metadata');
const util = require('util');

// GET A LIST OF BI CUES
router.get("/getBiCues", (req, res) => {
    let status = req.query.status;
    let page = parseInt(req.query.page);
    // dummy info for testinga
    let data = {
        cues: ["eeney", "meeney", "miney"],
        totalCues: 3400,
        page: 1,
        totalPages: 1250,
        status: status
    }
    let pageLimit = 25;
    let skip = pageLimit * (page - 1);
    data.page = page;
    console.log("Status: " + data.status + " page limit: " + pageLimit + " skip: " + skip + " page: " + page);


    biCue.countDocuments({ status: data.status }, function (err, count) {
        if (err) {

        }
        else {
            data.totalCues = count;
            let division = data.totalCues / pageLimit;

            if (division < 1) {
                data.totalPages = 1;
            }
            else {
                data.totalPages = Math.ceil(division);
            }

            biCue.find({ status: data.status }, function (err, cues) {
                if (err) {
                    res.status(400).json({ error: "ERROR" });
                }
                else {
                    //     data.cues = cues;
                    //     console.log(data);
                    // res.status(200).json(JSON.stringify(data));
                }

            }).skip(skip).limit(pageLimit).exec(function (err, docs) {
                data.cues = docs;
                //console.log(data);
                res.status(200).json(JSON.stringify(data));

            })
        }
    });


})


// THIS GETS THE SELECTED SONG AND RETURNS THE SELECTED SONG WITH THE METADATA ADDED

router.post("/getMetadata", function (req, res) {
    console.log("getting metadata for... " + req.body.id + "\n");
   // console.log(req.body.id);
    const id = req.body.id;
    biCue.findById(id, function (err, cue) {
        if (err) {
            res.status(400).json({ error: "ERROR IN GetMetadata route" });
        }
        else {
            if(cue){

                // const filename = mp3Path + "/" + cue.release + "/" + cue.fileName;
                const filename = wavPath + "/" + cue.release + "/" + cue.fileName;
            console.log(filename.toString());
            mm.parseFile(filename)
                .then(metadata => {
                   console.log(util.inspect(metadata, { showHidden: false, depth: null }));

                    // cue.metadataComposer = metadata.common.artists.join("/");
                    // cue.metadataPublisher = metadata.common.copyright;
                     //console.log(metadata.native.exif[0].value)
                    //console.log(metadata.native.exif[9].value)
                    // cue.metadataComposer = metadata.native.exif[9].value;
                    // cue.metadataPublisher = metadata.native.exif[0].value;
                    cue.metadataComposer = metadata.common.artists.toString();
                    cue.metadataPublisher = metadata.native.exif[0].value;
                    cue.save(function(err, cue){
                        console.log("You are getting metadata for that cue")
                        res.status(200).json(JSON.stringify(cue));
                    })
                })
                .catch(err => {
                    console.error(err.message);
                });
            }
            else{
                res.status(400).json({ error: "ERROR IN GetMetadata route" });
            }


        }
    })
})



/// UPDATES THE INFORMATION ON THE CUE AND ALSO CHECKS TO ADD NEW COMPOSER TO COMPOSER LIST IF IT'S NEW 
router.put("/updateCue", function (req, res){
    const id = req.body.id;
    let update = {}
    let composer = null;
   // console.log(req.body);
    if(req.body.name == "genreStyle"){
      let gs = req.body.value.genre.split("/");
      let g = gs[0].trim();
      let s = gs[1].trim();
      let id = req.body.value.genreId;
    update = {[req.body.name]: req.body.value.genre, genre: g, style: s, genreId: id};
   // console.log(update);
     composer = req.body.newComposer;  
    }
    else{
     update = {[req.body.name]: req.body.value};
    composer = req.body.newComposer;   
    }
    
   // res.status(200).json(JSON.stringify(update));


    biCue.findByIdAndUpdate(id, {...update},{new: true}, (err, cue) => {
        if(err){
            const error = {error: true, message: "UPDATE FAILED"}
            res.status(400).json(JSON.stringify(error))
        }
        else {
            if(req.body.isThisNew == true){
                console.log("Is this a new Composer? " + req.body.isThisNew);
                const newComposer = new composers({...composer})
                newComposer.save((err, c) => {

                    composers.find({}, (err, comps)=> {
                        if(err){
                            const error = {error: true, message: "UPDATE FAILED"}
                            res.status(400).json(JSON.stringify(error))
                        }
                        else {
                            let data = {cue: cue, comps: comps}
                            res.status(200).json(JSON.stringify(data));
                        }
                    })


                    
                })


            }
            else {
                composers.find({}, (err, comps)=> {
                    if(err){
                        const error = {error: true, message: "UPDATE FAILED"}
                        res.status(400).json(JSON.stringify(error))
                    }
                    else {
                        let data = {cue: cue, comps: comps}
                        res.status(200).json(JSON.stringify(data));
                    }
                }).sort({fullName: "asc"})

            }
            
            
        }


    })

})

router.get("/allComposers", function (req, res ){

    composers.find({}, (err, comps)=> {
        if(err){
            const error = {error: true, message: "UPDATE FAILED"}
            res.status(400).json(JSON.stringify(error))
        }
        else {
            res.status(200).json(JSON.stringify(comps));
        }
    }).sort({fullName: "asc"})

})


module.exports = router;