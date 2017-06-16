var _ = require('lodash');
var model = require('./userModel.js');

exports.param = function (req,res,next,id) {
    model.findById(id)
        .populate('category')
        .exec()
        .then((item)=>{
            if(item){
                req.user = item;
                next();
            }else{
                res.status(400).json({message:"Model not found"});
            }
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.get = function (req,res,next) {
    model.find({})
        .populate('category')
        .exec()
        .then((item)=>{
            res.status(200).json(item);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.getOne = function (req,res,next) {
    res.status(200).json(req.user);
}

exports.post = function (req,res,next) {
    var user = req.body;
    model.create(user)
        .then((item)=>{
            res.status(200).json(item);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.delete = function (req,res,next) {
    var user = req.user;
    user.remove()
        .then((removed)=>{
            res.status(200).json(removed);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.put = function (req,res,next) {
    var newUser = req.body;
    var oldUser = req.user;
    oldUser = _.merge(oldUser,newUser);
    oldUser.save()
        .then((saved)=>{
            res.status(200).json({message:saved});
        })
        .catch((err)=>{
            res.status(500).json({message:"Cannot save user"})
        })
}

exports.addContact = function (req,res,next) {

}

exports.removeContact = function(req,res,next){

}
