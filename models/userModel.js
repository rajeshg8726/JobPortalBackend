const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
});

const User = mongoose.model('User' , Userschema);
module.exports = User;