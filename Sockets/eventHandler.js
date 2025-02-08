const eventSchema = require('../Schemas/eventSchema');
const mongoose = require('mongoose');
const Event = mongoose.model('Event', eventSchema);

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        // Handle user joining an event
        socket.on('joinEvent', async ({ eventId, user }) => {
            try {
                const event = await Event.findById(eventId);
                if (event) {
                    event.attendees.push(user);
                    await event.save();
                    io.emit('attendeesUpdated', event.attendees);
                }
            } catch (err) {
                console.error('Error joining event:', err);
            }
        });

        // Handle user leaving an event
        socket.on('leaveEvent', async ({ eventId, user }) => {
            try {
                const event = await Event.findById(eventId);
                if (event) {
                    event.attendees = event.attendees.filter(attendee => attendee.email !== user.email);
                    await event.save();
                    io.emit('attendeesUpdated', event.attendees);
                }
            } catch (err) {
                console.error('Error leaving event:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};