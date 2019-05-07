var mongoose = require('mongoose')
var messageSchema = require('../schemas/classify')
module.exports = mongoose.model('classify' , messageSchema)