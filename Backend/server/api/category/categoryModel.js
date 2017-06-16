var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_PATH);


var model = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:String
})

module.exports = mongoose.model('category', model);
