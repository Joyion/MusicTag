import * as fs from 'fs';
import 'dotenv/config'

// parse metadata from files
import { parseFile } from 'music-metadata';

import { collections, composerPipeline, createManyObjects, createObject, database, findObjectByAggregation, findOneObject, songPipeline, updateManyObjects, updateOne, } from "../database.js";

export const resolvers = {
    Query: {
        song: async (parent, args) => {
            let song = await findOneObject(collections.songs, new Object(args.id));
            return song;
        },
        songs: async (parent, args) => {
            let songs = await findObjectByAggregation(collections.songs, songPipeline);
            return songs;
        },
        composers: async (parent, args) => {
            let composers = await findObjectByAggregation(collections.composers, composerPipeline);
            return composers;
        },
        artists: async (parent, args) => {
            let artists = await findObjectByAggregation(collections.artists, []);
            return artists;
        },
        publishers: async (parent, args) => {
            let publishers = await findObjectByAggregation(collections.publishers, []);
            return publishers;
        },

    },
    Mutation: {
        insertSong: async (parent, args) => {
            let id = await createObject(collections.songs, args.song);
            return id;
        },
        insertPublisher: async (parent, args) => {
            let id = await createObject(collections.publishers, args.publisher);
            return id;
        },
        insertComposer: async (parent, args) => {
            let id = await createObject(collections.composers, args.composer);
            return id;
        },
        insertArtist: async (parent, args) => {
            let id = await createObject(collections.artists, args.artist);
            return id;
        },
        updateSong: async (parent, args) => {
            let id = await updateOne(collections.songs, new Object(args.id), args.updatedFields);
            return id;
        },
        updateBatchOfSongs: async (parent, args) => {
            let IDs = args.IDs.map(id => new Object(id));
            let id = await updateManyObjects(collections.songs, IDs, args.updatedFields);
            return id;
        },
        updatePublisher: async (parent, args) => {
            let id = await updateOne(collections.publishers, new Object(args.id), args.updatedFields);
            return id;
        },
        updateComposer: async (parent, args) => {
            let id = await updateOne(collections.composers, new Object(args.id), args.updatedFields);
            return id;
        },
        updateArtist: async (parent, args) => {
            let id = await updateOne(collections.artists, new Object(args.id), args.updatedFields);
            return id;
        },
        loadSongs: async (parent, args) => {
            console.log(args.folderPath);
            let musicFiles = await readFilesFromFolder(args.folderPath);
            console.log(musicFiles);
            let ids = await createManyObjects(collections.songs, musicFiles)
            return [];
        }


    }
}



// Parses files into structure for database
// Nested file structure for automatic nesting of multipe versions of a track requires a subfolder with the main track 
// and a subfolder named alternates including the alternative song files to be nested
// For album file structure, Batch folder contains subfolders  
// and the name of the subfolder is used as the album title

const readFilesFromFolder = async (batchFolder, recommendedFileStructure = true) => {
    try {

        // Console log current directory
        // const __filename = fileURLToPath(import.meta.url);
        // const __dirname = dirname(__filename);
        // console.log(__dirname);
        // console.log(__filename);

        let musicFiles = [];
        let batchFolderPath = process.env.MUSIC_FILE_HOST_PATH + batchFolder;
        // Use Subdirectories as albums
        const subdirectories = fs.readdirSync(batchFolderPath);
        console.log(subdirectories)
        for (const fileOrFolder of subdirectories) {
            console.log(fileOrFolder)
            console.log(fs.statSync(`${batchFolderPath}/${fileOrFolder}`).isDirectory())
            await getTracksFromSubFolders(fileOrFolder, `${batchFolderPath}/${fileOrFolder}`, musicFiles, batchFolder)
        }

        return musicFiles;

    } catch (error) {
        console.log(error);
    }
}

const getTracksFromSubFolders = async (fileOrFolderName, fileOrFolderPath, musicFiles, batchFolder) => {
    try {
        // If it's a directory, it should contain a song with alternate versions 
        console.log("This is the path" + fileOrFolderPath);
        if (fs.statSync(fileOrFolderPath).isDirectory()) {
            let groupedTrackedVersions = fs.readdirSync(fileOrFolderPath).filter(f => f.endsWith(".mp3") || f.endsWith(".wav"));
            // Use the first song when sorted as the main version
            groupedTrackedVersions.sort();
            groupedTrackedVersions.forEach(async (trackVersion, index) => {
                let versionPath = `${fileOrFolderPath}/${trackVersion}`;
                let mainVersion = index != 0 ? groupedTrackedVersions[0] : "";
                await createMusicFileData(trackVersion, versionPath, musicFiles, batchFolder, mainVersion, groupedTrackedVersions.length - 1);
            })
        } else {
            console.log("file is not a directory or nested file structure is not required");
            await createMusicFileData(fileOrFolderName, fileOrFolderPath, musicFiles, batchFolder);
        }

    } catch (error) {
        console.log(error);
        console.log("File is not a directory");
    }

}

const createMusicFileData = async (file, filepath, musicFileArray, batchFolder, mainVersion = "", countofAltVersions = 0,) => {
    if (!file.endsWith(".mp3") && !file.endsWith(".wav")) {
        return;
    }
    // Retrieve metadata attached to file
    const metadata = await parseFile(filepath);
    let title = file.replace(".mp3", "").replace(".wav", "");
    console.log(file);
    musicFileArray.push({ createdAtDate: new Date(), filepath: filepath, filename: file, batchFolder: batchFolder, title: title, active: false, mainVersion: mainVersion, countOfAltVersions: countofAltVersions });
    // console.log(musicFileArray);
    console.log("Added file");
}


// export const resolvers = {
//     Query: {
//         users: () => { return users },
//         user: (parent, args, contextValue) => {
//             console.log("get user");
//             if (!contextValue.user) {
//                 res.clearCookie("token");
//                 console.log("throwing an error");
//                 throw new GraphQLError('You are not authorized to perform this action: GET USER', {
//                     extensions: {
//                         code: 'FORBIDDEN',
//                     },
//                 });


//             };
//             console.log(contextValue.user.userID);
//             const u = users.find((u) => { return contextValue.user.userID === u.username });
//             console.log("This is the user: " + u);
//             return u;
//         },
//         songs: async () => await songDB.findSongs(),
//         composers: () => composers,
//         artists: () => artists
//     },
//     Mutation: {
//         register: async (parent, { email, password, username }, { req, res }) => {
//             res.clearCookie("token");
//             // check if user exists
//             const foundUser = users.find(u => u.username === username);
//             if (foundUser) {
//                 return null;
//             }
//             // encrypt passsword
//             console.log(password);
//             const hash = await bcrypt.hash(password, 10);

//             // create user in database with password
//             users.push({ email: email, password: hash, username: username })

//             const token = jwt.sign({ userID: username }, "LetMeBeYourAngel", { expiresIn: "2h" })

//             res.cookie("token", token, {
//                 httpOnly: true,
//                 maxAge: 900000
//             })

//             console.log(users.slice(-1));

//             return { user: users[users.length - 1], message: "Authenticated" }


//         },
//         login: async (parent, { username, password }, { req, res }) => {
//             res.clearCookie("token");
//             // if user exists 
//             const foundUser = users.find(u => u.username === username);
//             // decrypt password in bcyrpt
//             let isEqual = await bcrypt.compare(password, foundUser.hash);
//             if (b) {
//                 const token = jwt.sign({ userID: username }, "LetMeBeYourAngel", { expiresIn: "2h" })
//                 res.cookie("token", token, {
//                     httpOnly: true,
//                     maxAge: 900000
//                 })
//                 return null;
//             }
//             return { user: foundUser, message: "Authenticated" }
//         },
//         logout: (parent, args, { req, res }) => {
//             res.clearCookie("token");
//             return { user: null, message: "Not_Authenticated" }
//         }
//     }

// }