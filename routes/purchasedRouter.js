const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const User = require('../models/user');
const Course = require('../models/course');
const Topic = require('../models/topic');



const purchasedRouter = express.Router();
purchasedRouter.use(bodyParser.json());

purchasedRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    User.findById(req.user._id)
    .populate('boughtCourses')
    .then((course) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course.boughtCourses);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /purchased');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /purchased');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /purchased');
});






purchasedRouter.route('/:courseId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Course.findById(req.params.courseId)
    .populate('author')
    .populate('topics')
    .then((course) => {
        if(course != null){
            User.findById(req.user._id)
            .then((user) => {
                if(user != null){
                    if(user.boughtCourses != null) {
                        if(user.boughtCourses.indexOf(course._id) != -1) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(course);
                        }
                        else {
                            err = new Error('Unauthorized Acces');
                            err.status = 401;
                            return next(err);
                        }
                    }
                    else {
                        err = new Error('Unauthorized Acces');
                        err.status = 401;
                        return next(err);
                    }
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
            err = new Error('Course ' + req.params.courseId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /purchased/courseId');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /purchased/courseId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /purchased/courseId');
});



purchasedRouter.route('/:courseId/:topicId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Course.findById(req.params.courseId)
    .then((course) => {
        if(course != null){
            if(course.topics.indexOf(req.params.topicId) != -1){
                User.findById(req.user._id)
                .then((user) => {
                    if(user != null){
                        if(user.boughtCourses != null) {
                            if(user.boughtCourses.indexOf(course._id) != -1) {
                                Topic.findById(req.params.topicId)
                                .populate('author')
                                .then((topic) => {
                                    if(topic != null){
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(topic);
                                    }
                                    else {
                                        err = new Error('Topic ' + req.params.topicId + ' not found!');
                                        err.status = 404;
                                        return next(err);
                                    }
                                    
                                }, (err) => next(err))
                                .catch((err) => next(err));
                            }
                            else {
                                err = new Error('Unauthorized Acces');
                                err.status = 401;
                                return next(err);
                            }
                        }
                        else {
                            err = new Error('Unauthorized Acces');
                            err.status = 401;
                            return next(err);
                        }
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
    res.end('DELETE operation not supported on /purchased/courseId/topicId');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /purchased/courseId/topicId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /purchased/courseId/topicId');
});


module.exports = purchasedRouter;