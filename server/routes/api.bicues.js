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
const e = require("express");

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

            biCue.find({ status: data.status }).populate({ path: "composers", populate: { path: "composer", model: "Composer" } })
                .sort({ songTitle: "asc" }).skip(skip).limit(pageLimit).exec(function (err, docs) {
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
    biCue.findById(id)
        .populate({ path: 'composers.composer', model: "Composer" })
        .populate({ path: "publishers.publisher", model: "Publisher" })
        .exec(function (err, cue) {
            if (err) {
                res.status(400).json({ error: "ERROR IN GetMetadata route" });
            }
            else {
                if (cue) {

                    // const filename = mp3Path + "/" + cue.release + "/" + cue.fileName;
                    const filename = wavPath + "/" + cue.release + "/" + cue.fileName;
                    console.log(filename.toString());
                    mm.parseFile(filename)
                        .then(metadata => {
                            //   console.log(util.inspect(metadata, { showHidden: false, depth: null }));

                            // cue.metadataComposer = metadata.common.artists.join("/");
                            // cue.metadataPublisher = metadata.common.copyright;
                            //console.log(metadata.native.exif[0].value)
                            //console.log(metadata.native.exif[9].value)
                            // cue.metadataComposer = metadata.native.exif[9].value;
                            // cue.metadataPublisher = metadata.native.exif[0].value;
                            cue.metadataComposer = metadata.common.artists.toString();
                            cue.metadataPublisher = metadata.native.exif[0].value;
                            cue.save(function (err, cue) {
                                console.log("You are getting metadata for that cue")
                                console.log(cue.composers);
                                res.status(200).json(JSON.stringify(cue));
                            })
                        })
                        .catch(err => {
                            console.error(err.message);
                        });
                }
                else {
                    res.status(400).json({ error: "ERROR IN GetMetadata route" });
                }


            }
        })
})


/// COPY UPDATE CUE 

router.put("/copyCue", (req, res) => {
    const selectCue = req.body.cue;
    const mv = req.body.mainVersion;
    console.log("This is the id" + req.body.id)
    biCue.findOne({ fileName: mv }, (err, cue) => {
        if (err) {
            const error = { error: true, message: "UPDATE FAILED" }
            res.status(400).json(JSON.stringify(error))

        }
        else {
            console.log("THIs is the cue" + cue);
            console.log(cue.composers);

            biCue.findByIdAndUpdate(req.body.id, {
                ...selectCue,
                composers: cue.composers,
                publishers: cue.publishers,
                genre: cue.genre,
                style: cue.style,
                genreStyle: cue.genreStyle,
                genreId: cue.genreId,
                descriptions: cue.descriptions,
                tempo: cue.tempo,
                rating: cue.rating,
                bands: cue.bands,
                films: cue.films,
                top: cue.top,

            }, { new: true }, (err, newCue) => {
                if (err) {
                    const error = { error: true, message: "UPDATE FAILED" }
                    res.status(400).json(JSON.stringify(error))
                }
                else {
                    biCue.findById(req.body.id)
                        .populate({ path: 'composers.composer', model: "Composer" })
                        .populate({ path: "publishers.publisher", model: "Publisher" })
                        .exec((err, cpop) => {
                            composers.find({}, (err, comps) => {
                                if (err) {
                                    const error = { error: true, message: "UPDATE FAILED" }
                                    res.status(400).json(JSON.stringify(error))
                                }
                                else {
                                    Publisher.find({}, (err, pubs) =>{
                                        console.log("copying data")
                                        console.log(cpop)
                                        let data = { cue: cpop, comps: comps, pubs: pubs}
                                        res.status(200).json(JSON.stringify(data));
                                    })


                                   
                                }
                            }).sort({fullName: "asc"})
                        })           

                }
            })
        }

    })

})




/// UPDATES THE INFORMATION ON THE CUE AND ALSO CHECKS TO ADD NEW COMPOSER TO COMPOSER LIST IF IT'S NEW 
router.put("/updateCue", function (req, res) {
    const id = req.body.id;

    const name = req.body.name;
    let update = {}
    let composer = null;
    // console.log(req.body);
    if (req.body.name == "genreStyle") {
        let gs = req.body.value.genre.split("/");
        let g = gs[0].trim();
        let s = gs[1].trim();
        let id = req.body.value.genreId;
        update = { [req.body.name]: req.body.value.genre, genre: g, style: s, genreId: id };
        // console.log(update);
        composer = req.body.newComposer;
    }
    else {
        update = { [req.body.name]: req.body.value };
        composer = req.body.newComposer;
    }


    if (name == "addComposer") {
        console.log("Cue ID " + id)
        const cid = req.body.value.c._id;
        const value = req.body.value.split;
        console.log(value);
        composers.findById(cid, (err, comp) => {
            if (err) {

            }
            else {
                biCue.findById(id, (err, cue) => {
                    if (err) {

                    }
                    else {
                        cue.composers.push({ composer: comp._id, split: value });
                        cue.save((err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                biCue.findById(id)
                                    .populate({ path: 'composers.composer', model: "Composer" })
                                    .populate({path: "publishers.publisher", model: "Publisher"})
                                    .exec((err, pcue) => {
                                        composers.find({}, (err, comps) => {
                                            if (err) {

                                            }
                                            else {
                                                Publisher.find({}, (err, mypubs) => {
                                                    if (err) {
        
                                                    } else {
                                                        console.log(pcue)
                                                        let data = { cue: pcue, comps: comps, pubs: mypubs }
                                                        res.status(200).json(JSON.stringify(data));
                                                    }
                                                })
                                            }
                                        }).sort({fullName: "asc"})
                                    })
                            }

                        })
                    }
                })

            }
        })
    }

    else if (name == "addNewComposer") {
        let c = new composers({ ...req.body.value.c })
        console.log(c);
        c.save((err, newComp) => {
            biCue.findById(id, (err, cue) => {
                if (err) {

                }
                else {
                    cue.composers.push({ composer: newComp._id, split: req.body.value.split })
                    cue.save((err) => {
                        if (err) {

                        }
                        else {
                            biCue.findById(id)
                                .populate({ path: 'composers.composer', model: "Composer" })
                                .populate({path: "publishers.publisher", model: "Publisher"})
                                .exec((err, pcue) => {
                                    if (err) {

                                    }
                                    else {
                                        composers.find({}, (err, comps) => {
                                            if (err) {

                                            }
                                            else {
                                                Publisher.find({}, (err, mypubs) => {
                                                    if (err) {
        
                                                    } else {
                                                        console.log(pcue)
                                                        let data = { cue: pcue, comps: comps, pubs: mypubs }
                                                        res.status(200).json(JSON.stringify(data));
                                                    }
                                                })

                                            }
                                        }).sort({fullName: "asc"})

                                    }
                                })

                        }
                    })
                }
            })
        })

    }




    else if (name == "removeComposer") {
        console.log(req.body.value)
        biCue.findById(id)
            .populate({ path: 'composers.composer', model: "Composer" })
            .populate({path: "publishers.publisher", model: "Publisher"})
            .exec((err, cue) => {
                if (err) {

                }
                else {
                    let c = cue.composers.filter((comp) => { return comp._id != req.body.value });
                    console.log(c);
                    cue.composers = c;
                    cue.save((err, pcue) => {
                        composers.find({}, (err, comps) => {
                            if (err) {

                            }
                            else {
                                Publisher.find({}, (err, mypubs) => {
                                    if (err) {

                                    } else {
                                        console.log(pcue)
                                        let data = { cue: pcue, comps: comps, pubs: mypubs }
                                        res.status(200).json(JSON.stringify(data));
                                    }
                                })

                            }
                        }).sort({fullName: "asc"})

                    })

                }
            })

    }

    else if (name == "updatePublishers") {

        biCue.findById(id, (err, cue) => {
            if (err) {

            }
            else {
                cue.publishers.push({ publisher: req.body.value.publisher, split: req.body.value.split })
                cue.save((err) => {
                    biCue.findById(id)
                        .populate({ path: "publishers.publisher", model: "Publisher" })
                        .populate({ path: "composers.composer", model: "Composer" })
                        .exec((err, pcue) => {
                            if (err) {

                            }
                            else {
                                composers.find({}, (err, comps) => {
                                    if (err) {

                                    }
                                    else {
                                        Publisher.find({}, (err, mypubs) => {
                                            if (err) {

                                            } else {
                                                console.log(pcue)
                                                let data = { cue: pcue, comps: comps, pubs: mypubs }
                                                res.status(200).json(JSON.stringify(data));
                                            }
                                        })
                                    }
                                }).sort({fullName: "asc"})
                            }
                        })
                })
            }
        })


    }

    else if (name == "removePublishers") {
        console.log("removing pub");
        biCue.findById(id)
            .populate({ path: "publishers.publisher", model: "Publisher" })
            .populate({ path: "composers.composer", model: "Composer" })
            .exec((err, cue) => {
                if (err) {

                }
                else {
                    let p = cue.publishers.filter((pub) => { return pub._id != req.body.value })
                    cue.publishers = p;

                    cue.save((err, pcue) => {

                        composers.find({}, (err, comps) => {
                            if (err) {

                            }
                            else {

                                Publisher.find({}, (err, mypubs) => {
                                    if (err) {

                                    } else {
                                        console.log(pcue)
                                        let data = { cue: pcue, comps: comps, pubs: mypubs }
                                        res.status(200).json(JSON.stringify(data));
                                    }
                                })



                            }
                        }).sort({fullName: "asc"})


                    })
                }
            })

    }




    else {

        biCue.findByIdAndUpdate(id, { ...update }, { new: true }, (err, cue) => {
            if (err) {
                const error = { error: true, message: "UPDATE FAILED" }
                res.status(400).json(JSON.stringify(error))
            }
            else {
                biCue.findById(id)
                .populate({ path: "publishers.publisher", model: "Publisher" })
                .populate({ path: "composers.composer", model: "Composer" })
                .sort({"Composers.composer.fullName": 1})
                .exec((err, pcue) => {
                    composers.find({}, (err, comps) => {
                        if (err) {

                        }
                        else {
                            Publisher.find({}, (err, mypubs) => {
                                if (err) {

                                } else {
                                    console.log(pcue)
                                    let data = { cue: pcue, comps: comps, pubs: mypubs }
                                    res.status(200).json(JSON.stringify(data));
                                }
                            })
                        }
                    }).sort({fullName: "asc"})

                })



            }


        })
        // end of else
    }
})

router.get("/allComposers", function (req, res) {

    composers.find({}, (err, comps) => {
        if (err) {
            const error = { error: true, message: "UPDATE FAILED" }
            res.status(400).json(JSON.stringify(error))
        }
        else {

            Publisher.find({}, (err, pubs) => {
                if (err) {

                }
                else {
                    console.log("this is a the composer" + comps[0])
                    res.status(200).json(JSON.stringify({ composers: comps, pubs: pubs }));
                }
            })

        }
    }).sort({ fullName: "asc" })

})


module.exports = router;