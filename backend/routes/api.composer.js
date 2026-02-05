import CustomError from "../customError.js";
import composerModel from "../models/composer.model.js";
import Cue from "../models/cue_model.js";
import express from "express";
const router = express.Router();
import { validateRequiredComposerFields, validateEditableComposerFields } from "./api.helper.js";   


// Return list of composer names
router.get("/", async (req, res) => {
    try {
        const composers = await composerModel.find({});
        const composerNames = composers.map(composer => composer.fullName);
        res.status(200).json({composerNames: composerNames});
    } catch (error) {
        res.status(500).json({ message: "Server Error: Error processing request" });
    }
});

// Return all information for a single composer by ID
router.get("/:id", async (req, res) => {
    try {
        const composer = await composerModel.findById({ _id: req.params.id });
        if (!composer) {
            return res.status(404).json({ message: "Composer not found" });
        }
        res.status(200).json(composer);
    } catch (error) {
        res.status(500).json({ message: "Server Error: Error processing request"});
    }
});


// Create a new composer
router.post("/", async (req, res) => { 
    try {
        const validatedRequiredFields = validateRequiredComposerFields(req.body);
        const newComposer = new composerModel({
            ...validatedRequiredFields,
            fullName: [
                validatedRequiredFields.fName,
                validatedRequiredFields.mName,
                validatedRequiredFields.lName,
                validatedRequiredFields.suffix
            ].join(" ").trim()
        });
        const savedComposer = await newComposer.save();
        res.status(201).json(savedComposer);
    } catch (error) {
        res.status(500).json({ message: "Server Error: Error processing request" });
    }
});


// Update a composer's information
router.patch("/:id", async (req, res) => {
    try {
        const composerId = req.params.id;
        const updateData = validateEditableComposerFields(req.body);
        if(composerId === null || composerId.trim() === "") {
            return res.status(400).json({ message: "Composer ID is required" });
        }
        const updatedComposer = await composerModel.findById(composerId).exec();
        if (!updatedComposer) {
            return res.status(404).json({ message: "Composer not found" });
        };
        const name = [
            updateData.fName ?? updatedComposer.fName,
            updateData.mName ?? updatedComposer.mName,
            updateData.lName ?? updatedComposer.lName,
            updateData.suffix ?? updatedComposer.suffix
        ].join(" ").trim();
        updatedComposer.fullName = name;
        await updatedComposer.save();
        
        
        if (!updatedComposer) {
            return res.status(404).json({ message: "Composer not found" });
        }

        // Update metadataComposer in all cues associated with this composer
        await Cue.updateMany(
            { "composers.composer": composerId },
            { $set: { "composers.$.name": updatedComposer.fullName } }
        ).exec();
        

        res.status(200).json({composer: updatedComposer });

    } catch (error) {
        res.status(500).json({ message: "Server Error: Error processing request" });
    }
});




export default router;