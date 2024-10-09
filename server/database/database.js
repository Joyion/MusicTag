
import { Collection, MongoClient, ObjectId } from "mongodb";
import 'dotenv/config'
import testData from "../test-data/test-db-data.js";


const DATABASE_URL = process.env.DATABASE_URL;
// Names of collections
export const collections = {
    artists: "Artists",
    composers: "Composers",
    publishers: "Publishers",
    songs: "Songs",
}

// Connnect and set up database

// TODO enforce validator for non-null on schema/collections
async function connectToDB() {
    try {
        const client = new MongoClient(DATABASE_URL);
        const admin = client.db().admin();
        const dbInfo = await admin.listDatabases();
        let containsDatabase = false;
        for (const db of dbInfo.databases) {
            // console.log(db.name);
            if (db.name == "MusicApp") {
                containsDatabase = true;
            }
        }

        const myDB = client.db("MusicApp");
        const songs = myDB.collection("Songs")
        const composers = myDB.collection("Composers");
        const publishers = myDB.collection("Publishers");
        const artists = myDB.collection("Artists");
        const users = myDB.collection("Users");

        //index fields if newly created database
        if (!containsDatabase) {
            songs.createIndex({ "genres": 1 });
            songs.createIndex({ "composersIDs": 1 });
            songs.createIndex({ "artistsIDs": 1 });
            songs.createIndex({ "publishersIDs": 1 });
            composers.createIndex({ "lastName": 1, "firstName": 1 });
            artists.createIndex({ "name": 1 });
            publishers.createIndex({ "name": 1 });

            // console.log("Database did not exist!");
            // songs.insertMany(testData.songs);
            // composers.insertMany(testData.composers);
            // publishers.insertMany(testData.publishers);
            // artists.insertMany(testData.artists);

        }

        return myDB;

    } catch (error) {
        console.log(error);
        return null;
    }
}


export const database = await connectToDB();



// lookup to join Composers with Artists
export const composerPipeline = [{
    $lookup: {
        from: "artists",
        localField: "artistIDs",
        foreignField: "_id",
        as: "associatedArtists"
    }

}]

// lookup to join Songs with other collections
export const songPipeline = [
    {
        $lookup: {
            from: "composers",
            localField: "composerIDs",
            foreignField: "_id",
            as: "composers"
        }
    },
    {
        $lookup: {
            from: "publishers",
            localField: "publisherIDs",
            foreignField: "_id",
            as: "publishers"
        }
    },
    {
        $lookup: {
            from: "artists",
            localField: "artistIDs",
            foreignField: "_id",
            as: "artists"
        }
    },

    {
        $lookup: {
            from: "artists",
            localField: "featuredArtistIDs",
            foreignField: "_id",
            as: "featuredArtists"
        }
    }
]


// Create a new entry in a collection
export async function createObject(collection, object) {
    if (collection == undefined) {
        throw new Error("Missing collection name");
    }

    try {
        let result = await database.collection(collection).insertOne({ ...object, createdAtDate: new Date().getTime });
        console.log(result.insertedId);
        return result.insertedId.toString();

    } catch (error) {
        console.log(error);
    }
}

export async function findOneObject(collection, objectId) {
    try {
        let result = await database.collection(collection).findOne({ _id: objectId });
        return result;

    } catch (error) {
        console.log(error);
    }
}


export async function findObjectByAggregation(collection, pipeline) {
    try {
        let results = await database.collection(collection).aggregate(pipeline).toArray();
        console.log(results);
        return results;

    } catch (error) {
        console.log(error);
    }
}

export async function updateOne(collection, objectId, updatedFields) {
    try {
        const updatedDoc = {
            $set: {
                ...updatedFields,
                updatedAt: new Date().getTime()

            },
        };
        let result = await database.collection(collection).updateOne({ _id: objectId }, updateManyObjects)

    } catch (error) {
        console.log(error);
    }
}

export async function updateManyObjects(collection, objectIDs, updatedFields) {
    try {
        const updatedDoc = {
            $set: {
                ...updatedFields,
                updatedAt: new Date().getTime()

            },
        };

        let result = await database.collection(collection).updateMany({ _id: { $in: objectIDs } }, updatedDoc)
        console.log("Modified " + result.modifiedCount);

    } catch (error) {
        console.log(error);
    }
}

export async function deleteObject(collection, objectIDs) {
    try {
        let result = await database.collection(collection).deleteMany({ _id: { $in: objectIDs } })
        if (result.deletedCount == objectIDs.length) {
            console.log("Deleted all ids");
        } else {
            console.log("mismatch");
        }

    } catch (error) {
        console.log(error);
    }
}










