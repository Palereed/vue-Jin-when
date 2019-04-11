var mongoose = require('mongoose')
var messageSchema = require('../schemas/message')
module.exports = mongoose.model('message' , messageSchema)