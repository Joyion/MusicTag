const mongoose = require("mongoose");


const IAPublishers = new mongoose.Schema(  
    {
        publisherName: {type: String},
        publisherIpi: {type: String},
        publisherPro: {type: String}
})

module.exports = mongoose.model('IAPublisher', IAPublishers);