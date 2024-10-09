// import { ObjectId } from "mongodb";
// import database from "./database.js";

// // Create Composer and return result with object id
// async function createComposer(composer) {
//     try {
//         if (composer.firstName == "" || composer.lastName == "" || composer.cae == "") {
//             throw new Error("Composer missing required fields")
//         }
//         let result = await database.composers.insertOne({ ...composer, creaedAt: new Date().getTime() })
//         return result.insertedId.toString;

//     } catch (error) {
//         throw new Error(error.message);
//     }
// }



// // Find Composer by object id 
// async function findOneComposer(composerID) {

//     try {
//         const pipeline = [{
//             $lookup: {
//                 from: "artists",
//                 localField: "artistIDs",
//                 foreignField: "_id",
//                 as: "artists"
//             }

//         }]


//         let composer = await database.composers.findOne({ _id: ObjectId.createFromHexString(composerID) })
//         return composer;

//     } catch (error) {
//         throw new Error(error.message)
//     }

// }

// // find all composers matching query 
// async function findAllComposers(query) {
//     try {
//         let composers = database.composers.find(query)
//         let composersData = []
//         for await (let composer of composers) {
//             // console.log(composer);
//             composersData.push(composer);
//         }
//         return composersData;

//     } catch (error) {
//         throw new Error(error.message)
//     }

// }


// // update composer fields by id
// async function updateOneComposer(composerID, updatedFields) {
//     console.log(updatedFields)
//     try {

//         const updateDoc = {
//             $set: {
//                 ...updatedFields,
//                 updatedAt: new Date().getTime()

//             },
//         };

//         let composer = await database.composers.updateOne({ _id: ObjectId.createFromHexString(composerID) },
//             { ...updateDoc, updatedAtDate: new Date().getTime })
//         // console.log(composer);
//         return composer;

//     } catch (error) {
//         throw new Error(error)
//     }

// }

// // Update many composers with same fields
// async function updateManyComposers(composerIDs, updatedFields) {
//     try {
//         const updateDoc = {
//             $set: {
//                 ...updatedFields,
//                 updatedAt: new Date().getTime()

//             },
//         };

//         let result = await database.composers.updateMany({ _id: { $in: composerIDs } }, updateDoc)
//         console.log("Modified " + result.modifiedCount);

//     } catch (error) {
//         console.log(error);
//     }
// }

// // Delete Composer Field and IDs from songs 
// async function deleteComposer(composerID) {
//     try {
//         let result = await database.composers.deleteOne({ _id: ObjectId.createFromHexString(composerID) })
//         console.log("deleted count: " + result.deletedCount);
//         return result;

//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

// export default {
//     createComposer,
//     findOneComposer,
//     findAllComposers,
//     updateOneComposer,
//     updateManyComposers,
//     deleteComposer
// }