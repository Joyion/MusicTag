const mongoose = require("mongoose");


const composers = new mongoose.Schema(  
    {
       fullName: {type: String},
       firstName: {type: String},
       middleName: {type: String},
       lastName: {type: String}, 
       cae: {type: String},
       pro: {type: String},
    
})

module.exports = mongoose.model('Composer', composers);