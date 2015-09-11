/**
 * Person
 *
 * @module      :: Model
 * @description :: Represent data model for the Person's
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Person = new Schema({

  firstname:    {
    type    : String
  },
  lastname:    {
    type    : String
  },
  id:    {
    type    : String,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('Person', Person);