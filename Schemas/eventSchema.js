const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    organizer:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    attendees:{
        type:Array,
       
    },
    cratedAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = eventSchema;