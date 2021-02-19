const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Admin = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

}, {
    versionKey: false
});

const AdminList = mongoose.model("Admin", Admin);
module.exports = AdminList;