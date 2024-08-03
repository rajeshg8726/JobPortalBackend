require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // this is use for verifying the cross-origin url means verify the request come from valid url, and only accept defined api for accessing the data.
const adminRouter = require('./routes/backendRoutes');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');



// Create the Express app
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
 
app.use(cors());
// Serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });



// Creating the session
app.use(cookieParser());
 

app.use(session({
  secret: "rajeshg@8726",
  saveUninitialized: true,
  resave: true

}));


  // use that route 
  app.use('/' , adminRouter);
  
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
