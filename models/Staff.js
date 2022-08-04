const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["client", "staff", "manager", "admin"],
        default: "staff" 
    }
}, {timestamps:true})

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;