// const mongoose = require("mongoose");
// const composers = require("./composer.model");
// const Publisher = require("./publisher.model");
import mongoose from "mongoose";
const { Schema } = mongoose;

const Cue = new mongoose.Schema(
    {
        release: { type: String, index: true, required: true },
        catalogName: { type: String, default: "N/A", index: true, required: true },
        songTitle: { type: String, required: true },
        metadataComposer: { type: String },
        metadataPublisher: { type: String },
        composers: [
            {
                composer: {type: Schema.Types.ObjectId, ref: "Composer" , index: true},
                split: { type: Number},
                name: { type: String, index: true }
            }
        ],
        publishers: [
            {
                publisher: {type: Schema.Types.ObjectId, ref: "Publisher", index: true},
                split: {type: Number},
                name: { type: String, index: true }
            }
        ],
        genre: { type: String, default: "N/A", index: true},
        style: { type: String, default: "N/A", index: true },
        genreId: { type: String },
        instruments: { type: Array},
        descriptions: { type: Array},
        tempo: { type: String, default: "N/A" },
        rating: { type: Number, default: 0 },
        bands: { type: Array },
        films: { type: Array },
        duration: { type: Number },
        top: { type: String, default: "N/A" },
        status: { type: String, default: "Pending", index: true }, // Pending, Approved, Rejected 
        fileName: { type: String, required: true },
        releaseDate: { type: Date }, // release data to public (ie not the date added to catalog)
        createdDate: { type: Date, default: Date.now },
        updatedDate: { type: Date, default: null },
        trackAltId: { type: String }, 
        trackId: { type: String }, // unique track identifier
        trackAlbumNumber: { type: String }, // original track number from metadata (ie album track number)
        trackNumInRelease: { type: Number }, // track number within Catalog's release
        isrc: { type: String },
        mainVersion: { type: String },
        hidden: {type: Array} // hidden descriptions from clients to affect search results

    })

export default mongoose.model("Cue", Cue);