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
    Favorites.findOne({user: req.user._id})
    .then((favorites) => {
      
      if (favorites !== null) {
        req.body.forEach(element => {
          // console.log(element._id);
          if(favorites.dishes.indexOf(element._id) == -1) {
            favorites.dishes.push(element._id);
          }
        });

        favorites.save()
          .then((favorite) => {
            Favorites.findById(favorite._id)
              .populate('user')
              .populate('dishes')
              .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
              });
          }, (err => next(err)))
          .catch((err) => next(err));

      }
      else {

        var fav = new Favorites({user: req.user, dishes: []});
        req.body.forEach(elem => {
          fav.dishes.push(elem._id);
        });

        Favorites.create(fav)
          .then((favorite) => {
            Favorites.findById(favorite._id)
              .populate('user')
              .populate('dishes')
              .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
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
    Favorites.remove({user: req.user.id})
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
    Course.findById(req.params.RecipeId)
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
            err = new Error('Course ' + req.params.RecipeId + ' not found!');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {

          if (dish == null) {

            err = new Error('Dish ' + req.params.dishId + ' not found!');
            err.status = 404;
            return next(err);

          } else {

            Favorites.findOne({user: req.user.id})
              .then((favorites) => {

                if (favorites != null) {

                  if(favorites.dishes.indexOf({_id: req.params.dishId}) != -1) {
                    // favorites.dishes.push({_id: req.params.dishId});
                    favorites.dishes.concat([req.params.dishId]);
                  }
        
                  favorites.save()
                    .then((favorite) => {
                      Favorites.findById(favorite._id)
                        .populate('user')
                        .populate('dishes')
                        .then((favorite) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json(favorite);
                        });
                    }, (err => next(err)))
                    .catch((err) => next(err));
        
                }
                else {
        
                  Favorites.create({user: req.user, dishes: [{_id: req.params.dishId}]})
                    .then((favorite) => {
                      Favorites.findById(favorite._id)
                        .populate('user')
                        .populate('dishes')
                        .then((favorite) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json(favorite);
                        });
                    }, (err => next(err)))
                    .catch((err) => next(err));
        
                }

              }, (err) => next(err))
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
    Favorites.findOne({user: req.user})
    .then((favorites) => {

      var index = favorites.dishes.indexOf(req.params.dishId)
      if (index > -1) {
        favorites.dishes.splice(index, 1);
      }

      favorites.save()
          .then((favorite) => {
            Favorites.findById(favorite._id)
              .populate('user')
              .populate('dishes')
              .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
              });
          }, (err => next(err)))
          .catch((err) => next(err));

    }, (err) => next(err))
    .catch((err) => next(err));    
});


module.exports = favouriteRouter;