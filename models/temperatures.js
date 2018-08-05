var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TemperaturesSchema = new Schema({
    location: {type : String, required : true}, 
    temperature: {type : Number, required : true},
    created_date: {type: Date, default: Date.now, required : true}
});

var Temperature = mongoose.model("Temperature", TemperaturesSchema);

module.exports = Temperature;