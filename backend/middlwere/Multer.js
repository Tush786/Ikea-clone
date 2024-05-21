// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const destinationFolder = "public/";
//         // Ensure destination folder exists
//         fs.mkdirSync(destinationFolder, { recursive: true });
//         cb(null, destinationFolder);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });


// module.exports = multer({ storage });




const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationFolder = "public/";
        // Ensure destination folder exists
        fs.mkdirSync(destinationFolder, { recursive: true });
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});

const upload = multer({ storage }).array('imagesurl', 10); // Handle multiple files with field name 'images'

module.exports = upload;


