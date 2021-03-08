var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    description: {type: String},
    make: {type: String},
    model: {type: String},
    estimatedate: {type: String},
    id: {type: String},
    km: {type: String},
    image: {type: String}
});


// Export the model
module.exports = mongoose.model('Car', CarSchema);