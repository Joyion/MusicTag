
import database from "./database.js"



// Find songs based on fields
async function findSongs() {
    try {

        console.log(await database.composers.countDocuments());
        let results = database.songs.find();
        for await (const doc of results) {
            console.log(doc);
        }

        let pipeline = [{
            $lookup: {
                from: "Composers",
                localField: "composers",
                foreignField: "composerID",
                as: "composer_mapping"
            }
        }]

        pipeline.push({
            $lookup: {
                from: "Artists",
                localField: "artists",
                foreignField: "artistID",
                as: "artist_mapping"
            }
        })

        const aggregationResult = database.songs.aggregate(pipeline);
        let songsData = [];
        for await (const doc of aggregationResult) {
            console.log(doc);
            songsData.push({ ...doc, _id: doc._id.toString() })

        }
        return songsData;

    } catch (error) {
        console.log(error);
    }
}



// Update fields on Songs








// Delete Song






// Create song 




export default { findSongs }