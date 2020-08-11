const mongoose = require("mongoose");


const publisher = new mongoose.Schema(  
    {
        publisherName: {type: String},
        publisherSplit: {type: String},
        publisherIpi: {type: String},
        publisherPro: {type: String}
    
})

module.exports = mongoose.model('Publisher', publisher);