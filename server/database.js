
import { MongoClient } from "mongodb";
import 'dotenv/config'


const DATABASE_URL = process.env.DATABASE_URL;
// Names of collections
export const collections = {
    artists: "Artists",
    composers: "Composers",
    publishers: "Publishers",
    songs: "Songs",
}

// Connnect and set up database

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

        // regex to accept only filename with .mp3 or .wav
        const caseInsensitivePattern = /^.+\.(mp3|wav)$/i;


        const myDB = client.db("MusicApp");
        // TODO make filepath unique
        if (!containsDatabase) {
            const songs = await myDB.createCollection("Songs", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Song Object Validator",
                        required: ["title", "filename", "filepath", "batchFolder", "active", "createdAtDate"],
                        additionalProperties: true,
                        properties: {
                            title: {
                                bsonType: "string",
                                description: "The title for the song is required and must be a string."
                            },
                            filename: {
                                bsonType: "string",
                                // pattern: caseInsensitivePattern.toString(),
                                description: "A filename is required and must be .mp3 or .wav"
                            },
                            filepath: {
                                bsonType: "string",
                                description: "A filepath to the song is required."
                            },
                            active: {
                                bsonType: "bool",
                                description: "A boolean indicating whether the song is active is required"
                            },
                            createdAtDate: {
                                bsonType: "date",
                                description: "createdAtDate is required and must be a Date"
                            },
                            batchFolder: {
                                bsonType: "string",
                                description: "A reference to the folder or batch songs that were uploaded"

                            }
                        }
                    }
                }
            })
            await songs.createIndex({ "filepath": 1 }, { unique: true })
            await songs.createIndex({ "composersIDs": 1 });
            await songs.createIndex({ "artistsIDs": 1 });
            await songs.createIndex({ "publishersIDs": 1 });
            console.log("Created Songs collection");

            const composers = await myDB.createCollection("Composers", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Composer Object Validator",
                        required: ["cae_ipi", "firstName", "active"],
                        properties: {
                            cae_ipi: {
                                bsonType: "string",
                                description: "The CAE/IPI is required and must be a string"
                            },
                            firstName: {
                                bsonType: "string",
                                description: "A first name is required and must be a string."
                            },
                            active: {
                                bsonType: "bool",
                                description: "A boolean indicating whether the song is active is required"
                            }
                        }
                    }
                }
            })
            await composers.createIndex({ "lastName": 1, "firstName": 1 });
            console.log("Created Composers collection")

            const publishers = await myDB.createCollection("Publishers", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Publisher Object Validator",
                        required: ["cae_ipi", "name", "active"],
                        properties: {
                            cae_ipi: {
                                bsonType: "string",
                                description: "The CAE/IPI is required and must be a string"
                            },
                            name: {
                                bsonType: "string",
                                description: "A first name is required and must be a string."
                            },
                            active: {
                                bsonType: "bool",
                                description: "A boolean indicating whether the song is active is required"
                            }
                        }
                    }
                }
            });
            publishers.createIndex({ "name": 1 });
            console.log("Created Publishers collection");

            const artists = await myDB.createCollection("Artists", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        title: "Publisher Object Validator",
                        required: ["name", "active"],
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "A name is required and must be a string."
                            },
                            active: {
                                bsonType: "bool",
                                description: "A boolean indicating whether the song is active is required"
                            }
                        }
                    }
                }
            })
            artists.createIndex({ "name": 1 });
            console.log("Created Artists collection");

            //TODO enforce validator for Users fields
            const users = myDB.collection("Users");

            //index fields if newly created database

            // songs.createIndex({ "genres": 1 });



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
        let result = await database.collection(collection).insertOne({ ...object, createdAtDate: new Date() });
        console.log(result.insertedId);
        return result.insertedId.toString();

    } catch (error) {
        console.log(error);
    }
}

export async function createManyObjects(collection, objects) {
    console.log("Add maning");
    if (collection == undefined) {
        throw new Error("Missing collection name");
    }
    try {
        console.log(collection);
        let results = await database.collection(collection).insertMany(objects);
        console.log("Created new records: " + results.insertedCount)
        return results.insertedIds;

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
                updatedAt: new Date()

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
                updatedAt: new Date()

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

