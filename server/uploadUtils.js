import fs from 'node:fs/promises';
import { parseFile } from 'music-metadata';
import path from "path"
// Methods to handle reading of audio files and extracting metadata

export async function readMusicFiles(folderPath, fileType, fullTrackCount) {
    console.log(folderPath);
    // withFileTypes: true is return an array of objects with the file name and type
    // encoding: 'utf-8' is return an array of file names
    const files = await fs.readdir(folderPath, { encoding: 'utf-8', withFileTypes: true });
    let musicData = []
    for (const file of files) {
        if (file.isDirectory()) {
            let versionedTracks = await createDataforTrackVersions(fullTrackCount, folderPath, file, fileType);
            musicData.push(...versionedTracks);
            fullTrackCount += versionedTracks.length;
        } else if (file.name.includes(fileType)) {
            const metadata = await parseFile(path.join(folderPath, file.name));
            musicData.push({
                fileName: file.name,
                filePath: path.join(folderPath, file.name),
                isrc: createIrscCode(fullTrackCount, file.name),
                metadata: JSON.stringify(metadata),
                metadataComposer: metadata.common.artists.toString() || "N/A",
            });
            fullTrackCount += 1;
        }
    }
    console.log(musicData.length + " files found in folder: " + folderPath);
    console.log(musicData);
    return musicData;
}
// creates data for track in a folder with multiple versions
async function createDataforTrackVersions(fullTrackCount, folderPath, folder, fileType) {
    const subFolderPath = path.join(folderPath, folder.name);
    const subFiles = await fs.readdir(subFolderPath, { withFileTypes: true });
    // console.log(subFiles);
    let mainVersionFile = "";
    let musicFiles = [];
    let trackCount = fullTrackCount
    for (const subFile of subFiles) {
        if (subFile.name.includes(fileType)) {
            let metadata = await parseFile(path.join(subFolderPath, subFile.name));
            let musicFile = {
                fileName: subFile.name,
                filePath: path.join(subFolderPath, subFile.name),
                isrc: createIrscCode(trackCount),
                metadata: JSON.stringify(metadata),
                metadataComposer: metadata.common.artists.toString() || "N/A",
            }
            if (subFile.name.includes("v1")) {
                mainVersionFile = subFile.name;
                musicFile = { ...musicFile, mainVersionFilename: "" };
            } else {
                musicFile = { ...musicFile, mainVersionFilename: mainVersionFile };
            }
            musicFiles.push(musicFile);
            fullTrackCount++;
        }
    }
    return musicFiles;
}

// creates irsc code based on the current year and track count
// the track count is padded to 5 digits
function createIrscCode(trackCount) {
    let date = new Date();
    let yearAbreviated = date.getFullYear().toString().slice(-2);
    let isrcTrackId = trackCount.toString().padStart(5, "0");
    // console.log("isrcTrackId: " + isrcTrackId);
    return "US-RRD-" + yearAbreviated + "-" + isrcTrackId.toString();
}

