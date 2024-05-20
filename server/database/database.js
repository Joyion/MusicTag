
import { MongoClient } from "mongodb";
import 'dotenv/config'
import testData from "../test-data/test-db-data.js";


const DATABASE_URL = process.env.DATABASE_URL;


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
        composers.createIndex({ cae_ipi: 1 }, { unique: true })
        const publishers = myDB.collection("Publishers");
        publishers.createIndex({ cae_ipi: 1 }, { unique: true })
        const artists = myDB.collection("Artists");


        if (!containsDatabase) {
            console.log("Database did not exist!");
            songs.insertMany(testData.songs);
            composers.insertMany(testData.composers);
            publishers.insertMany(testData.publishers);
            artists.insertMany(testData.artists);

        }

        return { songs: songs, composers: composers, artists: artists }

    } catch (error) {
        console.log(error);
        return null;
    }
}


let db = await connectToDB();

export default db;