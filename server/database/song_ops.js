
// import database from "./database.js"



// // Find song by Id
// async function findOneSong(songID) {
//     try {
//         let song = database.songs.findOne({ _id: songID })
//         return song;

//     } catch (error) {
//         console.log(error)
//     }
// }



// // Find all songs based on query
// async function findSongs(query) {
//     try {

//         console.log(await database.composers.countDocuments());
//         let results = database.songs.find();
//         for await (const doc of results) {
//             console.log(doc);
//         }

//         let pipeline = [{
//             $lookup: {
//                 from: "Composers",
//                 localField: "composers",
//                 foreignField: "composerID",
//                 as: "composers"
//             }
//         }]

//         pipeline.push({
//             $lookup: {
//                 from: "Artists",
//                 localField: "artists",
//                 foreignField: "artistID",
//                 as: "artists"
//             }
//         })

//         const aggregationResult = database.songs.aggregate(pipeline);
//         let songsData = [];
//         for await (const doc of aggregationResult) {
//             console.log(doc);
//             songsData.push({ ...doc, _id: doc._id.toString() })

//         }
//         console.log("got songs");
//         console.log(songsData);
//         return songsData;

//     } catch (error) {
//         console.log(error);
//     }
// }



// // Update a song or batch songs with fields
// // With Authorization








// // Delete a song or batch of songs
// // With Authorization



// // Load songs from folder into database
// async function batchLoadSongs(folderName) {
//     try {

//     } catch {

//     }
// }




// export default {
//     findOneSong,
//     findSongs,
//     batchLoadSongs
// }