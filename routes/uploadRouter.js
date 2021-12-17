const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

// const imageFileFilter = (req, file, cb) => {
//     if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('You can upload only image files!'), false);
//     }
//     cb(null, true);
// };

var upload = multer({ storage : storage}).single('imageFile');  

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(cors.corsWithOptions, (req, res) => {
    upload(req,res,function(err) {  
        if(err) { 
            console.log(err); 
            return res.end("Error uploading file.");  
        }  
        console.log("success");
        res.end("File is uploaded successfully!");  
    });  
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json(req.file);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;