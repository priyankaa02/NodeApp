var mongoose = require('mongoose');
var db = require('../database_config/db_connect');

var keywordSchema = mongoose.Schema({
   keyword : {type: String, required: true},
   data:{type: Array, default: []},
   created_date :{type: Date,default: Date.now}

});
var Keyword = mongoose.model('keyword',keywordSchema);
module.exports = Keyword;
