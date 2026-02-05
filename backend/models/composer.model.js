// const mongoose = require("mongoose");
import mongoose from "mongoose";

const composers = new mongoose.Schema(  
    {
        fullName: {type: String}, 
        fName: {type: String},       
        mName: {type: String},       
        lName: {type: String},       
        suffix: {type: String},             
        cae: {type: String},       
        pro: {type: String},
        active: {type: Boolean, default: true},
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date}
    }  
);

export default mongoose.model("Composer", composers);