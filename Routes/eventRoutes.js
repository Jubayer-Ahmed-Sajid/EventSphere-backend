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

// find single event
router.get('/', async (req, res) => {});

// find event by email
router.get('/:email', async (req, res) => {});

// find event by id
router.get('/:id', async (req, res) => {});

// update event
router.put('/:id', async (req, res) => {});

// delete event
router.delete('/:id', async (req, res) => {});

module.exports = router;