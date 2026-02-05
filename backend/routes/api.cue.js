import express from "express";
const router = express.Router();
import Cue from "../models/cue_model.js";
// read metadata from files
// const ffmetadata = require("ffmetadata");
// read metadata from files
// const mm = require('music-metadata');
// const util = require('util');
// const e = require("express");

/**
 * Get basic information about cues based on query parameters
 */
router.get("/", async (req, res) => {
    const status = req.query.status ? req.query.status : "";
    const catalogName = req.query.catalogName ? req.query.catalogName : "";
    const release = req.query.release ? req.query.release : "";
    const composerIds = req.query.composerIds ? req.query.composerIds.split(",") : [];
    const publisherIds = req.query.publisherIds ? req.query.publisherIds.split(",") : [];
    const genres = req.query.genres ? req.query.genres.split(",") : [];
    const page = req.query.page ? parseInt(req.query.page) : 1;
    let pageLimit = parseInt(req.query.pageLimit) ? parseInt(req.query.pageLimit) : 25;
    //  limit pageLimit to max 100
    pageLimit = (pageLimit > 100 || pageLimit < 1 ) ? 100 : pageLimit;;

    try {
        let filters = {};
        (req.query.status && req.query.status != "All") ? filters.status = status : null;
        (req.query.release && req.query.release != "All") ? filters.release = release : null;
        (composerIds.length > 0) ? filters["composers.composer"] = { $in: composerIds } : null;
        (publisherIds.length > 0) ? filters["publishers.publisher"] = { $in: publisherIds } : null;
        (genres.length > 0) ? filters.genre = { $in: genres } : null;
        (req.query.catalogName && req.query.catalogName != "All") ? filters.catalogName = catalogName : null;

        console.log("Filter applied: ");
        console.log(filters);
      
        const count = await Cue.countDocuments(filters);
        const totalPages = Math.ceil(count / pageLimit) || 1;
        if(page > totalPages){
            page = totalPages;
        }
        const pageSkip = pageLimit * (page - 1);
        const cues =  await Cue.find(filters)
            .sort({ songTitle: "asc", rating: "desc" })
            .skip(pageSkip)
            .limit(pageLimit)
            .exec();

        let cueData = cues.map((cue) => {
            return {
                _id: cue._id,
                release: cue.release,
                releaseDate: cue.releaseDate,
                status: cue.status,
                catalogName: cue.catalogName,
                songTitle: cue.songTitle,
                genre: cue.genre,
                style: cue.style,
                descriptions: cue.descriptions,
                tempo: cue.tempo,
                duration: cue.duration,
                mainVersion: cue.mainVersion,
                rating: cue.rating,
            }
        })

        res.status(200).json({
            cues: cueData,
            totalCues: count,
            page: page,
            totalPages: totalPages
        });
        // res.status(200).json(data); --- IGNORE ---
    } catch (error) {
        console.log("Error retrieving cues: " + error);
        res.status(500).json({ error: "Error retrieving cues" });
    }
});

/**
 * Get detailed info about a specific cue by its ID
 */

router.get("/:id", async (req, res) => {
    try {
        const cue = await Cue.findById({_id: req.params.id})
            .populate({ path: 'composers.composer', model: "Composer" })
            .populate({ path: "publishers.publisher", model: "Publisher" })
            .exec();
        if (!cue) {
            return res.status(404).json({ message: "Cue not found" });
        }
        res.status(200).json(cue);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cue" });
    }
});



router.patch("/:id", async (req, res) => { 
    const cueId = req.params.id;
    const updatedCueFields = getEditableCueFields(req.body);
    try {
         let updatedCue = await Cue.findOneAndUpdate(
                { _id: cueId },
                { $set: updatedCueFields },
                { new: true }
            ).exec();

        if (!updatedCue) {
            return res.status(404).json({ message: "Cue not found" });
        }
        res.status(200).json(updatedCue);
    } catch (error) {
        console.log("Error updating cue: " + error);
        res.status(500).json({ message: "Error updating cue" });
    }
});

/**
 * Update the composers split for a specific cue
 *
 */
router.patch("/:id/composers", async (req, res) => { 
    try {
    const cueId = req.params.id;
    const { composers } = req.body; // expect array of { composer: composerId, split: number }
    if (!Array.isArray(composers)) {
        return res.status(400).json({ message: "Invalid composers format" });
    }
    const total = composers.reduce((sum, item) => sum + (item.split || 0), 0);
    if (total !== 100) {
        return res.status(400).json({ message: "Total split between all composers must equal 100%" });
    }

  
        const updatedCue = await Cue.findOneAndUpdate(
            { _id: cueId },
            { $set: { composers: composers } },
            { new: true }
        ).exec();

        if (!updatedCue) {
            return res.status(404).json({ message: "Cue not found" });
        }
        res.status(200).json(updatedCue);
    } catch (error) {
        res.status(500).json({ message: "Error updating composers" });
    }
});

/**
 * Update the publishers split for a specific cue
 */
router.patch("/:id/publishers", async (req, res) => { 
    try {
    const cueId = req.params.id;
    const { publishers } = req.body; // expect array of { publisher: publisherId, split: number }
    if(!publishers || !Array.isArray(publishers)){
        return  res.status(400).json({ message: "Invalid publishers data" });
    }
    const total = publishers.reduce((sum, item) => sum + (item.split || 0), 0);
    if (total !== 100) {
        return res.status(400).json({ message: "Total split between all publishers must equal 100%" });
    }

 
        const updatedCue = await Cue.findOneAndUpdate(
            { _id: cueId },
            { $set: { publishers: publishers } },
            { new: true }
        ).exec();

        if (!updatedCue) {
            return res.status(404).json({ message: "Cue not found" });
        }
        res.status(200).json(updatedCue);
    } catch (error) {
        res.status(500).json({ message: "Error updating publishers" });
    }  
});




export default router;