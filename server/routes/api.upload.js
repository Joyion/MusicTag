import express from 'express';
import fs from 'node:fs/promises';

// import BiCueModel from '../models/bi_cue_model.js';
import ReleaseIsrcModel from '../models/releaseIsrc.model.js';  

import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const musicFolderPath = path.join(__dirname, "..", "..", "music", "100 Racks");

const router = express.Router();

async function readMusicFiles(folderPath) {
 console.log(folderPath);
 // withFileTypes: true is return an array of objects with the file name and type
// encoding: 'utf-8' is return an array of file names
 const files = await fs.readdir(folderPath, { encoding: 'utf-8', withFileTypes: true });
 const musicData = []
 let fullTrackCount = 0;
 for (const file of files) {     
    console.log(file);    
    if(!file.name.includes(".DS_Store")) {
        if(file.isDirectory()) {
         musicData.push(createDataforTrackVersions(fullTrackCount, folderPath, file));
         fullTrackCount = fullTrackCount + musicData.length;
        } else {
            musicData.push({
                fileName: file.name,
                filePath: path.join(folderPath, file.name),
                isrc: createIrscCode(file, fullTrackCount),
            });
            fullTrackCount++;
        }
    }
 }
 console.log(fullTrackCount)
 console.log(musicData);
 return musicData;
}

async function createDataforTrackVersions(fullTrackCount, folderPath, folder) {
    const subFolderPath = path.join(folderPath, folder.name);
    const subFiles = await fs.readdir(subFolderPath);
    console.log(subFiles);
    let mainVersionFile = "";
    let filedata = []
    for (const subFile of subFiles) {
        if (!subFile.includes(".DS_Store")) {
            return;
        } else {
            let musicFile ={
                fileName: subFile,
                filePath: path.join(subFolderPath, subFile),
                isrc: createIrscCode(subFile, fullTrackCount),
            }
            if (subFile.includes("v1")) {
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

async function createIrscCode(trackCount) {
    let date = new Date();
    let yearAbreviated = date.getFullYear().toString().slice(-2);
    let zeroesToPad = 5 - (trackCount.toString().length);
    let isrcTrackId = String(trackCount).padStart(zeroesToPad, "0");
    return "US-RRD-" + yearAbreviated + "-" + isrcTrackId;
}


router.post("/", (req, res) => {
    console.log(req.body)
    const release = req.body.release;
    const date = new Date()
    const year = date.getFullYear();
    const fileType = req.body.fileType;
    const folderPath = musicFolderPath;
    try {
        const files = readMusicFiles(folderPath);
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