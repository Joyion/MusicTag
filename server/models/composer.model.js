import mongoose from 'mongoose';

const composers = new mongoose.Schema(  
    {
        fullName: {type: String}, 
        firstName: {type: String},       
        middleName: {type: String},       
        lastName: {type: String},       
        suffix: {type: String},       
        split: {type: String},       
        cae: {type: String},       
        pro: {type: String}    
    
})
export default mongoose.model('Composer', composers);