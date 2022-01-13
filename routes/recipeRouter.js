const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
var Recipe = require('../models/recipe');

const recipeRouter = express.Router();
recipeRouter.use(bodyParser.json());


recipeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    var skipData= parseInt(req.query.page)*18;
    Recipe.find({}).skip(skipData).limit(18)
    .populate('author')
    .then((recipe) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipe');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipe');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /recipe');
});



recipeRouter.route('/:recipeId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Recipe.findById(req.params.recipeId)
    .populate('author')
    .then((recipe) => {
        if(recipe != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(recipe);
        }
        else {
            err = new Error('Recipe ' + req.params.recipeId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /recipe/'+req.params.recipeId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipe/'+req.params.recipeId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /recipe/'+req.params.recipeId);
});

module.exports = recipeRouter;