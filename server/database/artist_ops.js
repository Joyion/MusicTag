// import database from "./database.js"

// // Add a new Artist
// async function createArtist(artist) {
//     try {
//         let newArtist = await database.composers.insertOne({ ...artist, createdAtDate: new Date().getTime() });
//         return newArtist;
//     } catch (error) {
//         console.log(error);
//     }
// }

// // Find Artist By ID
// async function findOneArtist(artistID) {
//     try {
//         let artist = await database.artists.findOne({ _id: artistID });
//         return artist;

//     } catch (error) {
//         console.log(error);
//     }
// }

// // Find All Artists matching query
// async function findAllArtists(query) {
//     try {
//         let artists = database.artists.find(query);
//         return artists;
//     } catch (error) {
//         console.log(error);

//     }
// }

// // Update One Artist
// async function updateOneArtist(artistID, fields) {
//     try {
//         let artists = await database.artists.updateOne({ _id: artistID }, { ...fields, lastUpdateDate: new Date().getTime() }));

//     } catch (error) {
//         console.log(error);
//     }
// }

// // Batch update artists
// async function updateManyArtists(artistIDs, fields) {
//     try {
//         const result = await collection.updateMany(
//             { _id: { $in: artistIDs } },
//             { $set: { ...fields, lastUpdateDate: new Date().getTime() } }
//         );


//     } catch {
//         console.log(error);
//     }
// }


// // Delete Artists but only if songs have been removed
// async function deleteArtist(artistID) {
//     try {
//         let result = await database.artists.deleteOne({ _id: artistID });
//         if (result.deletedCount != 1) {
//             throw new Error($`No document for Artist ID: ${artistID}. Unable to delete`)
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }

// export default {
//     createArtist,
//     findOneArtist,
//     findAllArtists,
//     updateOneArtist,
//     updateManyArtists,
//     deleteArtist,
// }

