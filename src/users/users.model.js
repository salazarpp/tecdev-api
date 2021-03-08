var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    phone: {type: String, required: true, max: 100},
    address: {type: String, required: true, max: 100},
    typeAdmin: {type: Boolean, required: true},
});


// Export the model
module.exports = mongoose.model('User', ProductSchema);