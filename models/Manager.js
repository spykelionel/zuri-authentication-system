const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
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
        default: "manager" 
    }
}, {timestamps:true})

const Manager = mongoose.model("Manager", managerSchema);
module.exports = Manager;