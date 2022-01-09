const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
const Course = require('../models/course');
const Topic = require('../models/topic');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        console.log(file.originalname);
        var position = file.originalname.lastIndexOf('.')
        var fileName = file.originalname.slice(0,position)
        var extension = file.originalname.slice(position)
        cb(null, fileName+'-' + Date.now()+extension)
    }
});
var upload = multer({ storage : storage}).single('courseImage');  




const sellRouter = express.Router();
sellRouter.use(bodyParser.json());

sellRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    User.findById(req.user._id)
    .populate('createdCourses')
    .then((course) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course.createdCourses);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    upload(req,res,function(err) {  
        if(err) { 
            res.statusCode=500;
            res.end({errMess:"error while uploading"});
        }
        else {
            var tags = req.body.category.split(",");
            console.log(tags);

            var course = new Course({
                author: req.user._id,
                title: req.body.title,
                price: req.body.price,
                category: tags,
                image: 'images/'+req.file.filename,
                description: req.body.description
            })
            course.save()
            .then((course) => {
                User.findOne({_id:req.user._id})
                .then((user) => {
                    if(user.createdCourses.indexOf(course._id) == -1) {
                        user.createdCourses.push(course._id);
                        user.save();
                    }
                }/*,err => next(err)*/)
                // .catch(next(err));
                // console.log(res.statusCode);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(course);
                res.end();
            }/*, (err => next(err)))
            .catch((err) => next(err)*/);
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /sell');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /sell');
});






sellRouter.route('/:courseId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Course.findById(req.params.courseId)
    .populate('author')
    .populate('topics')
    .then((course) => {
        if(course.author._id.toString() == req.user._id.toString()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(course);
        }
        else {
            err = new Error('Unauthorized Acces');
            err.status = 401;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Course.findById(req.params.courseId)
    .populate('author')
    .then((course) => {
        if(course != null) {
            if(course.author._id.toString() != req.user._id.toString()){
                err = new Error('Unauthorized Acces');
                err.status = 401;
                return next(err);
            }
            else {
                upload(req,res,function(err) {  
                    if(err) { 
                        res.statusCode=500;
                        res.end({errMess:"error while uploading"});
                    }
                    else {
                        var topic = new Topic({
                            author: req.user._id,
                            title: req.body.title,
                            theory: req.body.theory
                        })
                        topic.save()
                        .then((topic) => {
                            console.log(req.params.courseId);
                            Course.findOne({_id:req.params.courseId})
                            .then((course) => {
                                course.topics.push(topic._id);
                                course.save();
                            }/*,err => next(err)*/)
                            // .catch(next(err));
                            // console.log(res.statusCode);
            
                        Course.findById(req.params.courseId)
                            .populate('author')
                            .populate('topics')
                            .then((course) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(course.topics);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        }/*, (err => next(err)))
                        .catch((err) => next(err)*/);
                    }
                });        
            }
        }
        else {
            err = new Error('Course ' + req.params.courseId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Course.findById(req.params.courseId)
    .populate('author')
    .then((course) => {
        if(course != null){
            if(course.author._id.toString() != req.user._id.toString()){
                err = new Error('Unauthorized Acces');
                err.status = 401;
                return next(err);
            }
            else {
                upload(req,res,function(err) {  
                    if(err) { 
                        res.statusCode=500;
                        res.end({errMess:"error while uploading"});
                    }
                    else {
                        var tags = req.body.category.split(",");
                        if(typeof req.file != 'undefined') {
                            var updatedCourse = {
                                author: req.user._id,
                                title: req.body.title,
                                price: req.body.price,
                                category: tags,
                                image: 'images/'+req.file.filename,
                                description: req.body.description
                            }
                
                            Course.findByIdAndUpdate(req.params.courseId, {
                                $set: updatedCourse
                            })
                            .then((course) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(course);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        }
                        else {
                            var updatedCourse = {
                                author: req.user._id,
                                title: req.body.title,
                                price: req.body.price,
                                category: tags,
                                description: req.body.description
                            }
                            Course.findByIdAndUpdate(req.params.courseId, {
                                $set: updatedCourse
                            })
                            .then((course) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(course);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        }
                    }
                });
            }
        }
        else {
            err = new Error('Course ' + req.params.courseId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /sell/courseId');
});



sellRouter.route('/:courseId/:topicId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {

    Course.findById(req.params.courseId)
    .populate('author')
    .then((course) => {
        if(course != null){
            if(course.topics.indexOf(req.params.topicId) != -1){
                Topic.findById(req.params.topicId)
                .populate('author')
                .then((topic) => {
                    if(topic.author._id.toString() == course.author._id.toString() && course.author._id.toString() == req.user._id.toString()) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(topic);
                    }
                    else {
                        err = new Error('Unauthorized Acces');
                        err.status = 401;
                        return next(err);
                    }
                }, (err) => next(err))
                .catch((err) => next(err));

            }
            else {
                err = new Error('Topic ' + req.params.topicId + ' not found!');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('Course ' + req.params.courseId + ' not found!');
            err.status = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /sell/courseId/topicId');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Course.findById(req.params.courseId)
    .populate('author')
    .then((course) => {
        if(course != null){
            if(course.topics.indexOf(req.params.topicId) != -1){
                Topic.findById(req.params.topicId)
                .populate('author')
                .then((topic) => {
                    if(topic.author._id.toString() == course.author._id.toString() && course.author._id.toString() == req.user._id.toString()) {
                        upload(req,res,function(err) {  
                            if(err) { 
                                res.statusCode=500;
                                res.end({errMess:"error while uploading"});
                            }
                            else {
                    
                                var updatedTopic = {
                                    author: req.user._id,
                                    title: req.body.title,
                                    theory: req.body.theory
                                }
                    
                                Topic.findByIdAndUpdate(req.params.topicId, {
                                    $set: updatedTopic
                                })
                                .then((topic) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(topic);
                                }, (err) => next(err))
                                .catch((err) => next(err));
                            }
                        });
                    }
                    else {
                        err = new Error('Unauthorized Acces');
                        err.status = 401;
                        return next(err);
                    }
                }, (err) => next(err))
                .catch((err) => next(err));

            }
            else {
                err = new Error('Topic ' + req.params.topicId + ' not found!');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('Course ' + req.params.courseId + ' not found!');
            err.status = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /sell/courseId');
});


module.exports = sellRouter;