var mongoose = require('mongoose')
var travelSchema = require('../schemas/travel')
module.exports = mongoose.model('travel' , travelSchema)