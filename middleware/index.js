const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads') // Specify the destination directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Specify the filename for uploaded files
    }
    

});

const upload = multer({ storage: storage });


module.exports = upload;
