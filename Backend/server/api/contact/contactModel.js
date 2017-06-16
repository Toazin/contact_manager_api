var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_PATH);


var model = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:Number,
    address:String,
    category:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'category'
    }]
})

module.exports = mongoose.model('contact', model);
