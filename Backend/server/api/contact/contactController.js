var _ = require('lodash');
var model = require('./contactModel.js');

exports.param = function (req,res,next,id) {
    model.findById(id)
        .populate('category')
        .exec()
        .then((item)=>{
            if(item){
                req.contact = item;
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
    res.status(200).json(req.contact);
}

exports.post = function (req,res,next) {
    var contact = req.body;
    model.create(contact)
        .then((item)=>{
            res.status(200).json(item);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.delete = function (req,res,next) {
    var contact = req.contact;
    contact.remove()
        .then((removed)=>{
            res.status(200).json(removed);
        })
        .catch((err)=>{
            next({message:err.message,type:404});
        })
}

exports.put = function (req,res,next) {
    var newContact = req.body;
    var oldContact = req.contact;
    oldContact = _.merge(oldContact,newContact);
    oldContact.save()
        .then((saved)=>{
            res.status(200).json({message:saved});
        })
        .catch((err)=>{
            res.status(500).json({message:"Cannot save contact"})
        })
}

exports.addCategory = function (req,res,next) {
    var oldContact = req.contact;
    var newContactId = req.query.categoryId;
    if(!newContactId){
        res.status(400).json({message:"Please supply a categoryId in query parameters"})
    }else{
        var found = _.find(oldContact.category, function (n) {
            return n._id == newContactId;
        })

        if(found){
            res.status(400).json({message:"category already in Contact"});
        }else{
            oldContact.category.push(newContactId);
            oldContact.save()
                .then((saved)=>{
                    res.status(200).json({message:saved});
                })
                .catch((err)=>{
                    res.status(500).json({message:"Cannot save contact"})
                })
        }

    }
}

exports.removeCategory = function(req,res,next){
    var oldContact = req.contact;
    var categoryIdToRemove = req.query.categoryId;
    if(!newContactId){
        res.status(400).json({message:"Please supply a categoryId in query parameters"})
    }else{
        var found = _.find(oldContact.category, function (n) {
            return n._id == categoryIdToRemove;
        })

        if(!found){
            res.status(400).json({message:"category not found"});
        }else{
            _.remove(oldContact.category, function(n) {
              return n._id == categoryIdToRemove;
            });
            oldContact.save()
                .then((saved)=>{
                    res.status(200).json({message:saved});
                })
                .catch((err)=>{
                    res.status(500).json({message:"Cannot save contact"})
                })
        }


    }
}
