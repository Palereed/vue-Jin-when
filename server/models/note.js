var mongoose = require('mongoose')
var noteSchema = require('../schemas/note')
module.exports = mongoose.model('note' , noteSchema)