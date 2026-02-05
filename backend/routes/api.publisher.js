import publisherModel from "../models/publisher.model.js";
import Cue from "../models/cue_model.js";
import express from "express";
import CustomError from "../customError.js";
const router = express.Router();    

router.get("/", async (req, res) => {
    try {
        const publishers = await publisherModel.find({});
        res.status(200).json(publishers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving publishers"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const publisher = await publisherModel.findById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: "Publisher not found" });
        }
        res.status(200).json(publisher);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving publisher"});
    }
}); 

const validateRequiredNewPublisherfields = (body) => {
    const {name, ipi, pro} = req.body;
   if(!name || !ipi || !pro) {  
        throw new CustomError("Missing required Publisher Name, IPI and/or PRO", 400);
   }
    return {name, ipi, pro};
}

const validateEditablePublisherFields = (body) => {
    const {name, ipi, pro} = req.body;
    const updateData = {};
    if(name) {updateData.name = name;};
    if(ipi) {updateData.ipi = ipi;};
    if(pro) {updateData.pro = pro;}
    return updateData;
}

router.post("/", async (req, res) => { 
    try {
        const { name, ipi, pro } = validateRequiredNewPublisherfields(req.body);
        const newPublisher = new publisherModel({
            name,
            ipi,
            pro,
        });
        const savedPublisher = await newPublisher.save();
        res.status(201).json(savedPublisher);
    } catch (error) {
        res.status(500).json({ message: "Error creating publisher"});
    }
});


router.patch("/:id",  async (req,  res) => { 
    try {
        const publisherId = req.params.id;
        const { name, ipi, pro, active } = req.body;
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (ipi !== undefined) updateData.ipi = ipi;
        if (pro !== undefined) updateData.pro = pro;
        if (active !== undefined) updateData.active = active;

        const updatedPublisher = await publisherModel.findOneAndUpdate(
            { _id: publisherId },
            { $set: updateData },
            { new: true }
        ).exec();

        if (!updatedPublisher) {
            return res.status(404).json({ message: "Publisher not found" });
        }

        Cue.updateMany(
            { "publishers.publisher": publisherId },
            { $set: { "publishers.$.publisherName": updatedPublisher.name } }
        ).exec();

        res.status(200).json({publisher: updatedPublisher });
    } catch (error) {
        res.status(500).json({ message: "Error updating publisher"});
    }
});

export default router;