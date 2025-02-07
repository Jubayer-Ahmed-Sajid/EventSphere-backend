const express = require('express');
const mongoose = require('mongoose');
const joi = require('joi')
const eventSchema = require('../Schemas/eventSchema');
const router = express.Router()
const eventSchemaValidation = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    date: joi.date().required(),
    time: joi.string().required(),
    location: joi.string().required(),
    image: joi.string().required(),
    organizer:joi.string().required(),
    organizerEmail:joi.string().email().required(),
    attendees:joi.array(),
    cratedAt: joi.date()

})
const Event = mongoose.model('Event', eventSchema);

// event creation
router.post('/', async (req, res) => {
    const { error } = eventSchemaValidation.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const event = new Event(req.body);
    try{
        await event.save();
        res.status(200).json({message: "Event added to the database", event});
    }
    catch(err){
        res.status(500).json({message: "Error adding event to the database", err});
    }
});

// find event by email
router.get('/:organizerEmail', async (req, res) => {
    const {organizerEmail} = req.params;
    try{
        const event = await Event.find({organizerEmail});
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        res.status(200).json({event});
    }
    catch(err){
        res.status(500).json({message: "Error finding event", err});
    }
});

// find event by id
router.get('/single-event/:_id', async (req, res) => {
    const {_id} = req.params;
    try{
        const event = await Event.findById({_id});
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        res.status(200).json({message:"Event found", event});

    }
    catch(err){
        res.status(500).json({message: "Error finding event", err})
        
    }
});

// update event
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = eventSchemaValidation.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try{
        const event = await Event.findByIdAndUpdate({_id:id}, req.body, {new: true});
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        res.status(200).json({message: "Event updated", event});

    }
    catch(err){
        res.status(500).json({message: "Error updating event", err});
    }
});

// delete event
router.delete('/:id', async (req, res) => {});

module.exports = router;