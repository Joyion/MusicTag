const mongoose = require("mongoose");
const IAcomposers = require("./ia_composer.model");
const IAPublishers = require("./ia_publisher.model");
const Schema = mongoose.Schema;

const IACue = new mongoose.Schema(
    {
        release: { type: String },
        catalogName: { type: String, default: "Background Instrumental" },
        songTitle: { type: String },
        metadataComposer: { type: String, default: "N/A" },
        metadataPublisher: { type: String, default: "N/A" },
        artist: {type: String, default: "N/A"},
        composers: [
            {
                composer: {type: Schema.Types.ObjectId, ref: "IAComposer" },
                split: { type: Number }
            }
        ],
        publishers: [
            {
                publisher: {type: Schema.Types.ObjectId, ref: "IAPublisher"},
                split: {type: Number}

            }
        ],
        genre: { type: String, default: "N/A" },
        style: { type: String, default: "N/A" },
        genreStyle: { type: String, default: "N/A" },
        genreId: { type: String },
        instruments: { type: Array },
        descriptions: { type: Array },
        tempo: { type: String, default: "N/A" },
        rating: { type: Number, default: 0 },
        bands: { type: Array },
        films: { type: Array },
        duration: { type: String, default: "N/A" },
        top: { type: String, default: "N/A" },
        status: { type: String, default: "Pending" },
        fileName: { type: String, default: "N/A" },
        releaseDate: { type: String },
        createdDate: { type: Date, default: Date.now },
        updateDate: { type: Date, default: null },
        track: { type: String },
        trackId: { type: String },
        trackNum: { type: String },
        trackNumInRelease: { type: Number },
        isrc: { type: String },
        mainVersion: { type: String, default: "N/A" },
        hidden: {type: Array}

    })

module.exports = mongoose.model('IAcue', IACue);