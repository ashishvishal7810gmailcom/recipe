const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const Favourites = require('../models/favourite');

const favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
  Favourites.findOne({user: req.user._id})
  .populate('user')
  .populate('recipe')
  .then((favourites) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(favourites);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favourites) => {
      if (favourites !== null) {
        if(favourites.recipe.indexOf(req.body.recipeId) == -1) {
          favourites.recipe.push(req.body.recipeId);
        }

      favourites.save()
        .then((favourite) => {
          favourites.findById(favourite._id)
            .populate('user')
            .populate('recipe')
            .then((favourite) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favourite);
            });
        }, (err => next(err)))
        .catch((err) => next(err));
      }
      else {
        var fav = new Favourites({user: req.user, recipe: []});
        fav.recipe.push(req.body.recipeId);

        Favourites.create(fav)
          .then((favourite) => {
            Favourites.findById(favourite._id)
              .populate('user')
              .populate('recipe')
              .then((favourite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourite);
              });
          }, (err => next(err)))
          .catch((err) => next(err));
      }
    }, (err) => next(err))
    .catch((err) => next(err));

})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /purchased');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
    Favourites.remove({user: req.user.id})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
});






favouriteRouter.route('/:RecipeId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
  Favourites.findOne({user: req.user._id})
  .then((favourites) => {
      if (!favourites) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.json({"exists": false, "favourites": favourites});
      }
      else {
          if (favourites.recipe.indexOf(req.params.RecipeId) < 0) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.json({"exists": false, "favourites": favourites});
          }
          else {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.json({"exists": true, "favourites": favourites});
          }
      }

  }, (err) => next(err))
  .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  Favourites.findOne({user: req.user._id})
  .then((favourites) => {
    if (favourites !== null) {
      if(favourites.recipe.indexOf(req.params.recipeId) == -1) {
        favourites.recipe.push(req.params.recipeId);
      }

    favourites.save()
      .then((favourite) => {
        favourites.findById(favourite._id)
          .populate('user')
          .populate('recipe')
          .then((favourite) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favourite);
          });
      }, (err => next(err)))
      .catch((err) => next(err));
    }
    else {
      var fav = new Favourites({user: req.user, recipe: []});
      fav.recipe.push(req.params.recipeId);

      Favourites.create(fav)
        .then((favourite) => {
          Favourites.findById(favourite._id)
            .populate('user')
            .populate('recipe')
            .then((favourite) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favourite);
            });
        }, (err => next(err)))
        .catch((err) => next(err));
    }
  }, (err) => next(err))
  .catch((err) => next(err));

})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /purchased/RecipeId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.VerifyAdmin, (req, res, next) => {
  Favourites.findOne({user: req.user._id})
  .then((favourites) => {

    var index = favourites.recipe.indexOf(req.params.recipeId)
    if (index > -1) {
      favourites.recipe.splice(index, 1);
    }

    favourites.save()
        .then((favourites) => {
          Favourites.findById(favourites._id)
            .populate('user')
            .populate('recipe')
            .then((favourites) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(favourites);
            });
        }, (err => next(err)))
        .catch((err) => next(err));
  }, (err) => next(err))
  .catch((err) => next(err)); 
});


module.exports = favouriteRouter;