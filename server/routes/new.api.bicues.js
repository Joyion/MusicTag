import express from 'express';
const router = express.Router();
import bi_cue_model from '../models/bi_cue_model';


router.get('/bicues', async (req, res) => {
    let limit = parseInt(req.query.limit) || 25;
    if (limit > 100) {
        limit = 100;
    }
    let filters = {
        status: req.query.status || 'all',
        release: req.query.release || 'all',
        page: parseInt(req.query.page) || 1,
        limit: limit
    }

    try {
        const bicues = await bi_cue_model.getBicues(filters)
        .populate("composers.composer", "name")
        .populate("publishers.publisher", "name")
        .sort({ rating: -1, createdDate: -1 })
        .limit(limit)
        .skip((filters.page - 1) * limit);
        const totalBicues = await bi_cue_model.countDocuments(filters);
        const totalPages = Math.ceil(totalBicues / limit);
        res.status(200).json({bicues, totalBicues, page: filters.page, limit: limit, to});
    } catch (error) {
        console.error('Error fetching bicues:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


router.put('/bicues/:id', async (req, res) => { 
    const { id } = req.params;
    const updateData = req.body;

    try{
        const updatedBiCue = await bi_cue_model.findByIdAndUpdate(id, update,Data, { new: true, runValidators: true })
        if (!updatedBiCue) {
            return res.status(404).json({ error: 'BiCue not found' });
        }
        res.status(200).json(updatedBiCue);
    } catch (error) {
        console.error('Error updating biCue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    
    }

})



