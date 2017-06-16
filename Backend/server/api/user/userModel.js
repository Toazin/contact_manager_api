var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_PATH);

var model = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:String,
    address:String,
    contacts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'contact'
    }]
});

module.exports = mongoose.model('user', model);
