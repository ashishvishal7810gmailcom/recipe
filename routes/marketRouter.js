const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
var Course = require('../models/course');
const Topic = require('../models/topic');

const marketRouter = express.Router();
marketRouter.use(bodyParser.json());


marketRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Course.find({})
    .populate('author')
    .then((course) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /market');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /market');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /market');
});



marketRouter.route('/:courseId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Course.findById(req.params.courseId)
    .populate('author')
    .populate('topics')
    .then((course) => {
        if(course != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(course);
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
    res.end('PUT operation not supported on /market');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /market');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /market');
});



marketRouter.route('/:courseId/:topicId')
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
                    if(topic != null){
                        if(topic.author._id.toString() == course.author._id.toString()) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(topic);
                        }
                        else {
                            err = new Error('Error Acces');
                            err.status = 400;
                            return next(err);
                        }
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
    res.end('DELETE operation not supported on /market/courseId/topicId');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /market/courseId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /market/courseId');
});

module.exports = marketRouter;