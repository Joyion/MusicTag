
import express from "express";
const router = express.Router();
import Cue from "../models/cue_model.js";
import fs from "fs";
import path from "path";
import CustomError from "../customError.js";
import Release from "../models/release.model.js";
const __dirname = path.resolve();


/**
 * Recursive function to read music files from a directory
 * @param {*} musicFilePath - string path to the folder with music files
 * @param {*} release - string name of the folder with music files. the folder name should be the release name and it should be unique.
 * @param {*} mainVersions - array that will contain music filenames that are indicated as the main version of a song with multilpe variations
 * @param {*} songs - array that that will be populated with objects containing metadata for each track 
 */
function readFileMetadata(musicFilePath, release, mainVersions, songs) {
    const filesAndrDirectories = fs.readdirSync(musicFilePath, { withFileTypes: true })
    console.log(filesAndrDirectories);

    for (let fileOrDirectory of filesAndrDirectories) {
        console.log(fileOrDirectory.name);
        if (fileOrDirectory.isDirectory()) {
            let innerDirectoryPath = path.join(__dirname, "..", "..", "..", "music_data", release, fileOrDirectory.name);
            readFileMetadata(innerDirectoryPath, release, mainVersions, songs);
        } else if (fileOrDirectory.isFile() && (path.extname(fileOrDirectory.name) == ".mp3" || path.extname(fileOrDirectory.name) == ".wav")) {
            let filename = fileOrDirectory.name;
            let songTitle = fileOrDirectory.name.replace(/DLM - |\.mp3|\.wav|._/g, "");
            //TODO create function to read metadata
            if (songTitle.includes(" v1 ")) {
                let songSplit = songTitle.split(" v1 ");
                mainVersions.push({ songSplit: songSplit[0], fullFile: fileOrDirectory.name });
                console.log("Found main version: " + songSplit[0]);
            }
            let song = {
                songTitle: songTitle, fileName: filename, release: release,
            }
            songs.push(song);
        }
    }

    if (songs.length == 0) {
        throw new CustomError("No music files found in release folder", 400);
    }
}

// TODO update release to be id of release document
function createCues(mainVersions, songs, date, totalTracksAddedThisYear, catalogName) {
    const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
    const releaseDate = formattedDate.replace(/\//g, '-');;
    songs = songs.map((song, index) => {
        const trackIdNum = totalTracksAddedThisYear + (index + 1);
        const trackIdStr = trackIdNum.toString().padStart(5, '0');
        const yearAbr = date.getFullYear().toString().slice(-2);
        const isrc = "US-RRD-" + yearAbr + "-" + trackIdStr;
        const trackId = song.release + "-" + trackIdNum.toString();
        const trackAlbumNumber = song.release.replace("R", "") + trackIdNum.toString();
        const trackAltId = date.getFullYear().toString() + trackNum;
        mainVersions.forEach((main, index) => {
            if (song.fileName.includes(main.songSplit) && song.fileName != main.fullFile) {
                song.mainVersion = main.fullFile;
                console.log("Assigned main version " + main.fullFile + " to " + song.fileName);
            }
        });
        return {
            ...song,
            catalogName: catalogName,
            isrc: isrc,
            trackId: trackId,
            trackAlbumNumber: trackAlbumNumber,
            releaseDate: releaseDate,
            trackAltId: trackAltId,
            trackNumInRelease: trackIdNum
        }

    });
}


router.post('/', async (req, res) => {
    try {
        const catalogName = req.body.catalogName;
        if (!catalogName || catalogName.trim() === "") { throw new CustomError("Catalog name is required", 400) };
        if (!req.body.release || req.body.release.trim() === "") { throw new CustomError("Release name is required", 400) };
        const release = req.body.release.toUpperCase();
        const regExp = new RegExp(release, 'i')
        const releases = await Release.find({ release: { $regex: regExp } });
        if (releases.length > 0) {
            throw new CustomError("Release already exists in database", 400);
        }
        let date = new Date();
        let mainVersions = [];
        let songs = [];
        let musicFilePath = path.join(__dirname, "..", "music", release);
        readFileMetadata(musicFilePath, release, mainVersions, songs)
        const newRelease = await Release({ release: release, year: date.getFullYear() });
        newRelease.save();
        createCues(mainVersions, songs, date, catalogName);
        await Cue.insertMany(songs);
        console.log("Cues added to database");
        let message = {
            cues: songs,
            releaseDoc: newRelease
        }
        res.status(200).json(message);
    } catch (error) {
        if (error instanceof CustomError) {
            console.log("Custom error: " + error.message);
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log("Error processing files: " + error);
        res.status(500).json(error.message);
    }

})

export default router;
