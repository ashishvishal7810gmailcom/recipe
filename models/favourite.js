const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipe: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
},
{
    timestamps: true,
    usePushEach: true
});

var Favourites = mongoose.model('Favourites', favouriteSchema);

module.exports = Favourites;