const mongoose = require("mongoose");
const composers = require("./composer.model");
const Publisher = require("./publisher.model");

const biCue = new mongoose.Schema(  
    {
        release: {type: String},
        catalogName: {type: String, default: "Background Instrumental"},
        songTitle: {type: String},
        metadataComposer: {type: String, default: "N/A"},
        metadataPublisher: {type: String, default: "N/A"},
        composer: [
            {         
                 fName: {type: String},       
                 mName: {type: String},       
                 lName: {type: String},       
                 suffix: {type: String},       
                 split: {type: String},       
                 cae: {type: String},       
                 pro: {type: String}       
            }
        ],
        publisher: [
            {
                publisherName: {type: String},
                publisherSplit: {type: String},
                publisherIpi: {type: String},
                publisherPro: {type: String}
                
            }
        ],
        genre: {type: String},
        style: {type: String},
        genreStyle: {type: String},
        instruments: {type: Array},
        descriptions: {type: Array},
        tempo: {type: String, default: "N/A"},
        rating: {type: Number, default: 0},
        bands: {type: Array},
        films: {type: Array},
        duration: {type: String, default: "N/A"},
        top: {type: String, default: "None"},
        status: {type: String, default: "Pending"},
        fileName: {type: String},
        createdDate: {type: Date, default: Date.now},
        updateDate: {type: Date, default: null},
        trackID: {type: String},
        isrc: {type: String}
    
})

module.exports = mongoose.model('BIcue', biCue);