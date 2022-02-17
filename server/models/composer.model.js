const mongoose = require("mongoose");


const composers = new mongoose.Schema(  
    {
        fullName: {type: String}, 
        fName: {type: String},       
        mName: {type: String},       
        lName: {type: String},       
        suffix: {type: String},       
        split: {type: String},       
        cae: {type: String},       
        pro: {type: String}    
    
})

module.exports = mongoose.model('Composer', composers);