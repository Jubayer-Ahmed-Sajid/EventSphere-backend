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
    attendee:joi.array().default()

})
const Event = mongoose.model('Event', eventSchema);

// event creation
router.post('/', async (req, res) => {});

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