const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
var User = require('../models/user');
const Recipe = require('../models/recipe');

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
var upload = multer({ storage : storage}).single('Image');  




const createRouter = express.Router();
createRouter.use(bodyParser.json());

createRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    User.findById(req.user._id)
    .populate('createdReciepes')
    .then((recipe) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe.createdReciepes);
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

            var recipe = new Recipe({
                author: req.user._id,
                title: req.body.title,
                ingredients: req.body.ingredients,
                description: req.body.description,
                image: 'images/'+req.file.filename,
                steps: req.body.steps
            })
            recipe.save()
            .then((recipe) => {
                User.findOne({_id:req.user._id})
                .then((user) => {
                    if(user.createdReciepes.indexOf(recipe._id) == -1) {
                        user.createdReciepes.push(recipe._id);
                        user.save();
                    }
                }/*,err => next(err)*/)
                // .catch(next(err));
                // console.log(res.statusCode);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(recipe);
                res.end();
            }/*, (err => next(err)))
            .catch((err) => next(err)*/);
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /create');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /create');
});



createRouter.route('/:recipeId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Recipe.findById(req.params.recipeId)
    .populate('author')
    .then((recipe) => {
        if(recipe.author._id.toString() == req.user._id.toString()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(recipe);
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
    res.statusCode = 403;
    res.end('POST operation not supported on /create');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .populate('author')
    .then((recipe) => {
        if(recipe != null){
            if(recipe.author._id.toString() != req.user._id.toString()){
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
                        if(typeof req.file != 'undefined') {
                            var updatedRecipe = {
                                author: req.user._id,
                                title: req.body.title,
                                ingredients: req.body.ingredients,
                                description: req.body.description,
                                image: 'images/'+req.file.filename,
                                steps: req.body.steps
                            }
                
                            Recipe.findByIdAndUpdate(req.params.recipeId, {
                                $set: updatedRecipe
                            })
                            .then((recipe) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(recipe);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        }
                        else {
                            var updatedRecipe = {
                                author: req.user._id,
                                title: req.body.title,
                                ingredients: req.body.ingredients,
                                description: req.body.description,
                                steps: req.body.steps
                            }
                            Recipe.findByIdAndUpdate(req.params.recipeId, {
                                $set: updatedRecipe
                            })
                            .then((recipe) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(recipe);
                            }, (err) => next(err))
                            .catch((err) => next(err));
                        }
                    }
                });
            }
        }
        else {
            err = new Error('Recipe ' + req.params.recipeId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /create/recipeId');
});



module.exports = createRouter;