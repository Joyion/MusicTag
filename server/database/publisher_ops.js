// import database from "./database.js";

// // Insert publisher 
// async function createPublisher(publisher) {
//     try {
//         let publisher = database.publishers.insertOne({ ...publisher, createdAtDate: new Date().getTime() })

//     } catch (error) {
//         console.log(error);
//     }
// }

// // Find Publisher by id
// async function findOnePublisher(publisherID) {
//     try {

//         let publisher = database.publishers.findOne({ _id: publisherID });
//         return publisher
//     } catch (error) {

//     }
// }


// find all publishers by query
// async function findAllPublishers(query) {
//     try {
//         let publisher = database.publishers.find(query);
//         return publisher
//     } catch (error) {

//     }
// }


// // update one publisher
// async function updatePublisher(publihserID, fields) {
//     try {
//         let publisher = database.publishers.findOneAndUpdate({ _id: publihserID }, { $set: fields })
//         return publisher
//     } catch (error) {

//     }
// }

// export default {
//     findOnePublisher,
//     findAllPublishers,
//     updatePublisher
// }

