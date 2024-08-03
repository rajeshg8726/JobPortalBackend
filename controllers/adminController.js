
const Job = require('../models/jobFormModel');
const User = require('../models/userModel');
const authController = require('./authController');
const session = require('express-session');
const contactUs = require('../models/contactModel');

const register = async (req, res) => {


  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({email});

    if (existingUser) {
      res.status(200).json({message: "User already exits!"});
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();
    // const token =  authController.generateAuthToken(newUser);
    // req.session.user = token;
    // req.session.save();
    res.status(201).send({ newUser });
  }
  catch (error) {
    res.status(400).json({ message: 'Error While user creation' });

  }
}

const login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(200).json({ message: "User Not found. Please Register yourself!" });
  }


  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });

  }
  
  const token =  authController.generateAuthToken(user);
  return res.status(201).json({token});

}

const logout = (req, res) => {

  try {
    const s = req.session.user;
    res.status(200).json({s});
  } catch (error) {
    res.status(400).send("Database Error!");
  }

}

const jobFormSubmit = async (req, res) => {

  const { title, role, batches, pay, location, description, joblink, jobtype } = req.body;

  if (!req.file) {
    throw new Error('No file uploaded');
  }

  const image = req.file.filename;
  const newJob = new Job({
    title,
    role,
    batches,
    pay,
    location,
    description,
    joblink,
    jobtype,
    image
  });

  try {
    await newJob.save();
    // res.status(201).send(alert('Job added successfully'));

    res.status(200).send({ newJob });
  } catch (error) {
    res.status(400).send('Error saving job');
  }


}

const getAllJobs = async (req, res) => {

  try {
    const allJobs = await Job.find();
    res.send({ allJobs });

  } catch (error) {
    res.status(400).send("Database Error");
  }

}

const getJobById = async (req, res) => {

  try {
    const jobId = req.params.id;
    const result = await Job.findById(jobId);
    // console.log(result);
    res.status(200).send({ result });

  } catch (error) {
    res.status(400).send("Record not found!");
  }
  
}


const contactus = async (req, res) => {
try {
  const {name , email , message} = req.body;

  const newcontact = new contactUs({
    name,
    email, 
    message
  });
  
  await newcontact.save();

  res.status(200).json({newcontact, message: "Message Send Successfully!"});

} catch (error) {
  res.status(401).send("Message Not Send!");
}
}



module.exports = {
  jobFormSubmit,
  getAllJobs,
  getJobById,
  register,
  login,
  logout,
  contactus,
 
}