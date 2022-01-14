const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const recipeSchema = new mongoose.Schema({//to user middleware in mongoose
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    ingredients: [{
        type: String
    }],
    description: String,
    image: {
        type: String
    },
    steps: String
},{
    timestamps:true
})

var Recipe = mongoose.model('Recipe',recipeSchema)

module.exports = Recipe