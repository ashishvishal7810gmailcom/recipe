const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');
const Users = require('../models/user');
const Recipe = require('../models/recipe');

const searchRouter = express.Router();

searchRouter.use(bodyParser.json());

searchRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    var name=req.query.searchTerm;
    Recipe.find({title: new RegExp(name, 'i')}).limit(18)
    .populate('author')
    .then((suggestions) => {
        console.log(suggestions);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(suggestions);
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