import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import 'dotenv/config';

// Required to read filenames
import * as fs from "fs";
//Set up the path to the public folder 
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "..", "public", "dist")




const app = express();
const port = process.env.PORT || 9000;

app.use(cors({
    origin: "http://localhost:3000",
}))

// Needed to serve static files through express
app.use(express.static(publicPath));
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    dbName: "musicTag",
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})




// // import schemas 


// Composer.create({
//     fullName: "John Doe",
//     fName: "John",
//     mName: "M",
//     lName: "Doe",
//     suffix: "Jr.",
//     split: "50/50",
//     cae: "123456789",
//     pro: "BMI"
// }).then(() => {
//     console.log("Composer created");
// }).catch((err) => {
//     console.log("Error creating composer", err);
// })

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

// Set Up Routes
import uploadRoutes from "./routes/api.upload.js";

app.use("/api/upload", uploadRoutes);

// Serve webpack bundle
app.get("*", (req, res) => {
    
    res.json({
        message: "Hello from the server"
    })

    // res.sendFile(path.join(publicPath, "index.html"));
})

app.listen(port, process.env.IP, function () {
    console.log("Server Started");
})