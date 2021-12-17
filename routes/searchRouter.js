const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');
const Users = require('../models/user');

const searchRouter = express.Router();

searchRouter.use(bodyParser.json());

searchRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    console.log(req.query.searchTerm);
    var name=req.query.searchTerm;
    var skipData= parseInt(req.query.page)*6;
    Users.find({username: { $regex: '.*' + name + '.*' }}).skip(skipData).limit(6)
    .then((searchResult) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(searchResult);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /search');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /search');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /search');    
});

module.exports = searchRouter;