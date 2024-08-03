const express = require('express');
const adminController = require('../controllers/adminController');
const upload = require('../middleware/index');
const authenticate = require('../middleware/authTokenVerify'); 
const router = express.Router();


router.post('/api/admin/addJob' , upload.single('companyLogo'),  adminController.jobFormSubmit);
router.get('/api/getAllJobs' , adminController.getAllJobs);
router.get('/api/jobById/:id' , adminController.getJobById);
router.post('/api/register', adminController.register);
router.post('/api/login',  adminController.login);
router.post('/api/logout',  adminController.logout);
router.post('/api/contactus', adminController.contactus);
 
module.exports = router;


