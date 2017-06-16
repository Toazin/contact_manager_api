var _ = require('lodash');
var model = require('./categoryModel.js');

exports.param = function (req,res,next,id) {
    model.findById(id)
        .then((item)=>{
            if(item){
                req.category = item;
                next();
            }else{
                res.status(400).json({message:"Category not found"});
            }
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.get = function (req,res,next) {
    model.find({})
        .then((item)=>{
            res.status(200).json(item);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.getOne = function (req,res,next) {
    res.status(200).json(req.category);
}

exports.post = function (req,res,next) {
    var category = req.body;
    model.create(category)
        .then((item)=>{
            res.status(200).json(item);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.delete = function (req,res,next) {
    var category = req.category;
    category.remove()
        .then((removed)=>{
            res.status(200).json(removed);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.put = function (req,res,next) {
    var newCategory = req.body;
    var oldCategory = req.category;
    oldCategory = _.merge(oldCategory,newCategory);
    oldCategory.save()
        .then((saved)=>{
            res.status(200).json({message:saved});
        })
        .catch((err)=>{
            res.status(500).json({message:"Cannot save category"})
        })
}
