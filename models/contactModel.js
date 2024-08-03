const { name } = require('ejs');
const mongoose = require('mongoose');

const contact = new mongoose.Schema({
        name: String,
        email: String,
        message: String
});


const contactUs = mongoose.model('contact', contact);
module.exports = contactUs;
