const mongoose = require("mongoose");
const composers = require("./composer.model");
const Publisher = require("./publisher.model");

const biCue = new mongoose.Schema(  
    {
        catalogName: {type: String, default: "Background Instrumental"},
        songTitle: {type: String},
        metadataComposer: {type: String, default: "N/A"},
        metadataPublisher: {type: String, default: "N/A"},
        composer: [
            {         
                type: mongoose.Schema.Types.ObjectId,
                ref: "Composer"         
            }
        ],
        composerSplit: [
            {
                fullName: {type: String},
                split: {type: Number}
            }
        ],
        publisher: [
            {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Publisher"
                
            }
        ],
        publisherSplit: [
            {
                pubName: {type: String},
                split: {type: Number}
            }
        ],
        categoryStyle: {type: String, default: "N/A"},
        instruments: {type: Array},
        description: {type: Array},
        tempo: {type: String, default: "N/A"},
        rating: {type: Number, default: 0},
        bands: {type: Array},
        films: {type: Array},
        duration: {type: String, default: "N/A"},
        top40: {type: String, default: "None"},
        status: {type: String, default: "Pending"},
        fileName: {type: String},
        createdDate: {type: Date, default: Date.now},
        updateDate: {type: Date, default: null}
    
})

module.exports = mongoose.model('BIcue', biCue);