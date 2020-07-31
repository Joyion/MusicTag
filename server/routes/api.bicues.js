const express = require("express");
const router = express.Router();
const biCue = require("../models/bi_cue_model");
const composers = require('../models/composer.model');
const Publisher = require("../models/publisher.model");
const path = require("path");
const mp3Path = path.join(__dirname, "..", "..", "public", "mp3");
// read metadata from files
const ffmetadata = require("ffmetadata");

// router.get('/', (req, res) => {
    
//     //    filters = {};
//     //    if(req.params.composer != "All"){
//     //        filters.composer = req.params.composer;
//     //    }
//     //    if(req.params.categoryStyle.length > 0){
//     //       filters.categoryStyle = req.params.categoryStyle;
//     //    }
//     //    if(req.params.instruments != "All"){
//     //        filters.instruments = req.params.instruments;
//     //    }
//     //    if(req.params.description != "All"){
//     //        filters.description = req.params.description;
//     //    }
//     //    if(req.params.tempo != "All"){
//     //     filters.tempo = req.params.tempo;   
//     //    }
//     //    if(req.params.bands != "All"){
//     //         filters.bands = req.params.bands;
//     //    }
//     //    if(req.params.films != "All"){
//     //        filters.films = req.params.films;
//     //    }
//     //    if(req.params.duration != "0"){
//     //        filters.duration = req.params.duration;
//     //    }
//     //    if(req.params.top40 != "All"){
//     //        filters.top40 = req.params.top40;
//     //    }
//     //    if(req.params.status != "All"){
//     //        req.params.status = req.params.status;
//     //    }
    
//        biCue.find().populate("composer").populate("publisher").exec(function(err, cues){
//            if(err){
//                console.log(error)
            
//            }
//            else{
//              let songs = [];
//             //   cues.forEach((cue) =>{
//             //     song = {
//             //         id: cue._id,
//             //         songTitle: cue.songTitle
//             //     }
//             //     songs.push(song);
    
//             //   })
//               songs = JSON.stringify(cues)
//                res.status(200).json(songs);
//            }
//        } )
//     });


// // get selected mp3/cue and attach metadata
//     router.get('/:id', (req, res) => {
//         biCue.findById(req.params.id).populate("composer").populate("publisher").exec(function(err, cue){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 file = mp3Path + "/mp3/" + cue.fileName;
//                 ffmetadata.read(file , function(err, data) {
//                     if (err) {
//                         console.log("Error reading metadata:" + err);
//                     }
//                     else {
//                         console.log("This is the metadata \n" + data);
//                         cue.metadataComposer = data.artist;
//                         cue.metadataPublisher = data.copyright;
//                         console.log(cue.publisher[0]);
//                         cue.save();
//                         console.log(cue);
//                         let listofcomposers = []
//                         let listofpublishers = []
//                         composers.find({}, function(req, composers){
//                             if(err){

//                             }
//                             else{
//                                 listofcomposers = composers;
//                                 Publisher.find({}, function(err, publishers){
//                                     if(err){

//                                     }
//                                     else{
//                                         listofpublishers = publishers
//                                         let data = {cue: cue, composerBank: listofcomposers, publisherBank: listofpublishers}
//                                         res.status(200).json(JSON.stringify(data));
//                                     }
//                                 })
//                             }
//                         })
                        
//                     }
//                 });
//             }
    
//         })
//     })

// // post new info for mp3 
//     router.put("/cue/:id", (req, res) => {
//         update = req.body.cue
//         biCue.findById(req.params.id, function(err, cue){
//             if(err){
//                 res.status(400).json({error: "error"});
//             }
//             else {
//                 cue.categoryStyle = update.categoryStyle;
//                 cue.instruments = update.instruments;
//                 cue.description = update.description;
//                 cue.tempo = update.tempo;
//                 cue.rating = update.rating;
//                 cue.bands = update.bands;
//                 cue.films = update.films;
//                 cue.top40 = update.top40;
//                 cue.status = update.status;
//                 if(update.status == "Pulled"){
//                     cue.updateDate == Date.now();
//                 }
//                 cue.save();
//                 res.status(200).json(JSON.stringify({status: "success"}));
//             }
//         })
    

//     });

// // post new composer 

// router.post("/composer", (req, res) => {
//     console.log("In composer route");
//     let addcomposer = req.body.composer;
//     let cueId = req.body.songId;
//     console.log(addcomposer);
//     let composerIdSplit = [];

//         let fullName = addcomposer.fullName;
//         let firstName = addcomposer.firstName;
//         let middleName = addcomposer.middleName;
//         let lastName = addcomposer.lastName;
//         let cae = addcomposer.cae;
//         let pro = addcomposer.pro;
//         let split = addcomposer.split;
//         composers.findOne({fullName: fullName}, function(err, author){
//             if(err){
//                 console.log("There is an error in Composer")
//                 res.status(400).json({error: "error"});
//             }
//            else if(!author){
//                console.log("In create Composer")
//                 composers.create({
//                     fullName: fullName,
//                     firstName: firstName,
//                     middleName: middleName,
//                     lastName: lastName,
//                     cae: cae,
//                     pro: pro,}, function(err, newcomposer){
//                         if(err){
//                             console.log("There is an error")
//                             res.status(400).json({error: "error"});
//                         }
//                         else{
//                             let composerSplit = {fullName: newcomposer.fullName, split: split}
//                             biCue.findById(cueId, function(err, cue){
//                                 if(err){

//                                 }
//                                 else{
//                                     cue.composer.push(newcomposer);
//                                     cue.composerSplit.push(composerSplit);
//                                     cue.save();
//                                     res.status(200).json(JSON.stringify({status: "success"}));
//                                 }
//                             })
                          
//                         }
//                     })
//            }
//            else {
//             console.log("Composer already exists")
//             let composerSplit = {fullName: author.fullName, split: split}
//             biCue.findById(cueId, function(err, cue){
//                 if(err){

//                 }
//                 else{
//                     cue.composer.push(author);
//                     cue.composerSplit.push(composerSplit);
//                     cue.save();
//                     res.status(200).json(JSON.stringify({status: "success"}));
//                 }
//             })     
        
                             
//            }

//         })

    
// });


// // post new publisher

// router.post("/publisher", (req, res) => {
//     let addpublisher = req.body.publisher;
//     let cueId = req.body.songId;

//         let pro = addpublisher.pro;
//         let ipi = addpublisher.ipi;
//         let name = addpublisher.name;
//         let split = addpublisher.split;

//         Publisher.findOne({name: name}, function(err, publisher){
//             if(err){
//                 console.log("There is an error in Publisher")
//                 res.status(400).json({error: "error"});
//             }
//             else if (!publisher){
//                 console.log("Creating Publisher");
//                 Publisher.create({pro: pro, ipi: ipi, name: name}, function(err, newp){
//                     if(err){
//                         console.log("There is an error")
//                         res.status(400).json({error: "error"});
//                     }
//                     else {
//                         let publisherSplit = {pubName: newp.name, split: split}
//                         biCue.findById(cueId, function(err, cue){
//                             if(err){
//                                 console.log(err);
//                             }
//                             else{
//                                 console.log("saving cue");
//                                 cue.publisher.push(newp);
//                                 cue.publisherSplit.push(publisherSplit)
//                                 cue.save();
//                                 res.status(200).json(JSON.stringify({status: "success"}));
//                             }
//                         })
                       
//                     }
                    
//                 })
//             }
//             else {
//                 console.log("Publishe already exists");
//                 let publisherSplit = {pubName: publisher.name, split: split}
//                 biCue.findById(cueId, function(err, cue){
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         cue.publisher.push(publisher);
//                         cue.publisherSplit.push(publisherSplit);
//                         cue.save();
//                         res.status(200).json(JSON.stringify({status: "success"}));
//                     }
//                 })
    
                      
//             }

//         })
// });

// // delete composer and composer split from BI Cues 

// router.delete("/composer/:id/:compId", (req, res) => {
//     const compId = req.params.compId;
//     const songId = req.params.id;
//     console.log(songId);
//     composers.findById(compId, function(err, composer){
//         if(err){
//             res.status(400).json(JSON.stringify({status: "failure"}));
//         }
//         else{
        
//         biCue.findById(songId, function(err, cue){
//         if(err){
//             res.status(400).json(JSON.stringify({status: "failure"}));
//         }
//         else {
//             console.log(cue);
//             const composerId = cue.composer.filter((x) => {return compId == x});
//             console.log("Delete this composerID: " + composerId);
//             const composerSplit = cue.composerSplit.filter((x) => {return composer.fullName == x.fullName});
//             console.log("Delete this composerSplit: " + composerSplit)

//             const composerIds = cue.composer.filter((x) => {return compId != x});
//             cue.composer = composerIds;
//             const composerSplits = cue.composerSplit.filter((x) => {return composer.fullName != x.fullName});
//             cue.composerSplit = composerSplits;
//             cue.save();
//             res.status(200).json(JSON.stringify({status: "success"}));
//         }
//     })
//         }
//     })
// })
   
// // delete publisher and publisher split from bicues

// router.delete("/publisher/:songId/:pubId", (req,res) => {
//     const pubId = req.params.pubId;
//     const songId = req.params.songId;
//     console.log(songId + " " + pubId);

//     Publisher.findById(pubId, function(err, publisher){
//         if(err){
//             res.status(400).json(JSON.stringify({status: "failure"}));
//         }
//         else{
//             biCue.findById(songId, function(err, cue){
//                 if(err){
//                     res.status(400).json(JSON.stringify({status: "failure"}));
//                 }
//                 else{
//                     console.log(cue);
//                     const publisherId = cue.publisher.filter((x) => {return pubId == x});
//                     const publisherSplit = cue.publisherSplit.filter((x) => {return publisher.name == x.pubName});

//                     const publisherIds = cue.publisher.filter((x) => {return pubId != x})
//                     const publisherSplits = cue.publisherSplit.filter((x) => {return publisher.name != x.pubName})
//                     cue.publisher = publisherIds;
//                     cue.publisherSplit = publisherSplits;
//                     cue.save();
//                     res.status(200).json(JSON.stringify({status: "success"}));
//                 }
//             })
//         }
//     })
// })

/// new stuff

router.get("/getBiCues", (req, res) => {
    let status= req.query.status;
    let page = req.query;
    let data = {
        cues: ["eeney", "meeney", "miney"],
        totalCues: 3400,
        page: 1,
        totalPages: 1250,
        status: status
    }

    // biCue.find(function (err, kittens) {
    //     if (err) return console.error(err);
    //     console.log(kittens);
    //   })

    biCue.countDocuments({status: "Pending"}, function(err, count){
        if(err){

        }
        else{
            data.totalCues = count;
            let division = data.totalCues % 50;
            
            if(division < 1) {
                data.totalPages = 1;
            }
            else{
                data.totalPages = Math.ceil(division);
            }

            biCue.find({}, function(err, cues){
                if(err){
                    res.status(400).json({error: "ERROR"});
                }
                else{
                    data.cues = cues;
                    console.log(data);
                res.status(200).json(JSON.stringify(data));
                }
                
            })
        }
    });

    
})

router.post("/getMetadata", function (req, res){
    console.log("getting metadata");
    console.log(req.body.id);
    const id = req.body.id;
    biCue.findById(id, function(err, cue){
        if(err){
            res.status(400).json({error: "ERROR IN GetMetadata route"});
        }
        else {
            const filename = mp3Path + "/" + cue.release + "/" + cue.fileName;
            console.log(filename);
            ffmetadata.read(filename , function(err, data) {
                if(err){
                    res.status(400).json({error: "ERROR IN GetMetadata route"});
                }
                else{
                    cue.metadataComposer = data.artist;
                    cue.metadataPublisher = data.copyright;
                    biCue.findByIdAndUpdate(id, cue, function(err, cue){
                        if(err){
                            res.status(400).json({error: "ERROR IN GetMetadata route"});
                        }
                        else {
                            console.log(cue);
                            res.status(200).json(JSON.stringify(cue));
                        }
                    })
                }
            })
            
        }
    })
})


    module.exports = router;