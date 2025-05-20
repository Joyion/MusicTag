import express from 'express';
import fs from 'node:fs/promises';

// import BiCueModel from '../models/bi_cue_model.js';
import ReleaseIsrcModel from '../models/releaseIsrc.model.js';  

import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const musicFolderPath = path.join(__dirname, "..", "..", "music");

const router = express.Router();

async function readMusicFiles(folderPath, fileType) {
 console.log(folderPath);
 // withFileTypes: true is return an array of objects with the file name and type
// encoding: 'utf-8' is return an array of file names
 const files = await fs.readdir(folderPath, { encoding: 'utf-8', withFileTypes: true });
 const musicData = []
 let fullTrackCount = 0;
 for (const file of files) {     
    console.log(file);    
        if(file.isDirectory()) {
        let versionedTracks = await createDataforTrackVersions(fullTrackCount, folderPath, file, fileType);
        console.log(versionedTracks);
         musicData.push(versionedTracks);
         fullTrackCount += versionedTracks.length;
        } else if(file.name.includes(fileType)) {
            musicData.push({
                fileName: file.name,
                filePath: path.join(folderPath, file.name),
                isrc: createIrscCode(fullTrackCount, file.name),
            });
            fullTrackCount += 1;
        }
    
 }
 console.log("Final data")
 console.log(fullTrackCount)
 console.log(musicData);
 return musicData;
}

async function createDataforTrackVersions(fullTrackCount, folderPath, folder, fileType) {
    const subFolderPath = path.join(folderPath, folder.name);
    const subFiles = await fs.readdir(subFolderPath, {withFileTypes: true});
    console.log(subFiles);
    let mainVersionFile = "";
    let filedata = [];
    let trackCount = fullTrackCount

    for (const subFile of subFiles) {
        if (subFile.name.includes(fileType)) {
            let musicFile = {
                fileName: subFile.name,
                filePath: path.join(subFolderPath, subFile.name),
                isrc: createIrscCode(subFile, trackCount),
            }
            if (subFile.name.includes("v1")) {
                mainVersionFile = subFile;
                musicFile = { ...musicFile, mainVersionFilename: "" };
            } else {
                musicFile = { ...musicFile, mainVersionFilename: mainVersionFile };
            }
            filedata.push(musicFile);
            fullTrackCount++;
        }
    }
    return filedata;
}

function createIrscCode(trackCount) {
    let date = new Date();
    let yearAbreviated = date.getFullYear().toString().slice(-2);
    let isrcTrackId = trackCount.toString().padStart(5, "0");
    console.log("isrcTrackId: " + isrcTrackId);
    return "US-RRD-" + yearAbreviated + "-" + isrcTrackId.toString();
}


router.post("/", async (req, res) => {
    console.log(req.body)
    const release = req.body.release;
    const date = new Date()
    const year = date.getFullYear();
    const fileType = req.body.fileType;
    const folderPath = musicFolderPath;
    try {
        const files = await readMusicFiles(folderPath, ".wav");
        res.json({
            message: "Create release" + release,
            files: files,
        })

    } catch(error) {
        console.log("Error creating folder", error);
        res.status(500).json({
            message: "Error creating folder",
        })
    }

})

export default router;