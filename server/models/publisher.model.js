import mongoose from 'mongoose';

const publisher = new mongoose.Schema(  
    {
        publisherName: {type: String},
        publisherIpi: {type: String},
        publisherPro: {type: String}
}, {timestamps: true});

export default mongoose.model('Publisher', publisher);