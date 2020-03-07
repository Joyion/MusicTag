const mongoose = require("mongoose");


const publisher = new mongoose.Schema(  
    {
       pro: {type: String},
       ipi: {type: String},
       name: {type: String}, 
    
})

module.exports = mongoose.model('Publisher', publisher);