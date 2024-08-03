// Define Job schema and model

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    role: String,
    batches: String,
    pay: String,
    location: String,
    description: String,
    joblink: String,
    jobtype: String,
    image : String

  });
  
  const Job = mongoose.model('Job', jobSchema);
  module.exports = Job