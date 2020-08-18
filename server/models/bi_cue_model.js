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
        composers: [
            {        
                 fullName: {type: String}, 
                 fName: {type: String},       
                 mName: {type: String},       
                 lName: {type: String},       
                 suffix: {type: String},       
                 split: {type: String},       
                 cae: {type: String},       
                 pro: {type: String}       
            }
        ],
        publishers: [
            {
                publisherName: {type: String},
                publisherSplit: {type: String},
                publisherIpi: {type: String},
                publisherPro: {type: String}
                
            }
        ],
        genre: {type: String, default: "N/A"},
        style: {type: String, default: "N/A"},
        genreStyle: {type: String, default: "N/A"},
        instruments: {type: Array},
        descriptions: {type: Array},
        tempo: {type: String, default: "N/A"},
        rating: {type: Number, default: 0},
        bands: {type: Array},
        films: {type: Array},
        duration: {type: String, default: "N/A"},
        top: {type: String, default: "N/A"},
        status: {type: String, default: "Pending"},
        fileName: {type: String, default: "N/A"},
        releaseDate: {type: String},
        createdDate: {type: Date, default: Date.now},
        updateDate: {type: Date, default: null},
        trackId: {type: String},
        trackNum: {type: String},
        isrc: {type: String},
        mainVersion: {type: String, default: ""} 
    
})

module.exports = mongoose.model('BIcue', biCue);