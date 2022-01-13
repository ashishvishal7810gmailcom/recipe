var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


var User = new Schema({
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true,
      required:true,
      trim:true
    },
    createdReciepes: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe' 
    }]
}, {
  timestamps: true,
  usePushEach: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);