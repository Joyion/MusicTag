import mongoose from "mongoose";


const Release = new mongoose.Schema(
    {
        release:{type: String},
        year: {type: Number},
        createdAt: {type: Date, default: Date.now()},
        updatedAt: {type: Date}
    }
)

export default mongoose.model("Release", Release);