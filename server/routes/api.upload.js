import express from 'express';
import fs from 'node:fs/promises';
import { parseFile } from 'music-metadata';
import bi_cue_model from '../models/bi_cue_model.js';
import release_isrc_model from '../models/releaseIsrc.model.js';  
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const musicFolderPath = path.join(__dirname, "..", "..", "music");
const router = express.Router();
import { readMusicFiles } from '../UploadUtils.js';



router.post("/", async (req, res) => {
    console.log(req.body)
    const release = req.body.release;
    const date = new Date()
    const year = date.getFullYear();
    const fileType = req.body.fileType;
    const folderPath = musicFolderPath;
    try {
        let releaseIsrc = await release_isrc_model.findOne({ year: year });
        if (!releaseIsrc) {
            console.log("No release ISRC found for the current year, creating a new one");
            const newReleaseIsrc = new release_isrc_model({
                releases: [],
                currentYear: year,
                totalTracksThisYear: 0,
            });
            releaseIsrc = await newReleaseIsrc.save();
        } else {
            if(releaseIsrc.releases.includes(release)) {
                console.log("Release already exists for this year");
                return res.status(400).json({
                    message: "Release already exists for this year",
                });
            }
        }
        let musicData = await readMusicFiles(folderPath, ".wav", releaseIsrc.totalTracksThisYear);
        let bi_cues = await bi_cue_model.create(musicData);
        releaseIsrc.releases.push(release);
        releaseIsrc.totalTracksThisYear += musicData.length;
        await releaseIsrc.save();
        res.json({
            message: "Create release" + release,
            bi_cues: bi_cues,
        })

    } catch(error) {
        console.log("Error creating folder", error);
        res.status(500).json({
            message: "Error creating folder",
        })
    }

})

export default router;