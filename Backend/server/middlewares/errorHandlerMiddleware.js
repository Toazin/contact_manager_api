
module.exports = function () {
    return function(err, req, res, next) {
        if(err.type == 404){
            res.status(404).json({message:err.message});
        }else{
            console.error("ERROR DETECTED: ", err.message);
            res.status(500).json({message:err.message});
        }

    }
}
