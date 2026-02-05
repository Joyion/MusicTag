// const mongoose = require("mongoose");
import mongoose from "mongoose";


const publisher = new mongoose.Schema(  
    {
        name: {type: String},
        ipi: {type: String},
        pro: {type: String},
        status: {type: String, default: "active"},
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date}
    }   
);

export default mongoose.model("Publisher", publisher);