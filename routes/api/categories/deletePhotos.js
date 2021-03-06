let Category = require('../../../models/Category')
let Photos = require('../../../models/Photos')
var ObjectId = require("mongoose").Types.ObjectId;


function deleteOnePhotos(id){
    let error = false
    Photos.findOneAndDelete({_id:id},function (err,doc){
        if(err){
            res.status(402).json({
                message: err
            })
            error = true
        }
        else {
            fs.unlinkSync('Img/' + id, function (err) {

            });
        }
    })
    return error
}

module.exports=function (req,res){
    if (req.body.arrayId === undefined || req.body.arrayId.length === 0 || !req.body.arrayId.every(i => ObjectId.isValid(i)) ){
        res.status(402).json({
            message: {message: 'Error please precise a correct array of id'}
        })
    }
    else{
        for (let i = 0 ; i<req.body.arrayId.length ; i++){
            if(deleteOnePhotos(req.body.arrayId[i])){
                return
            }
        }
        res.status(200).json({
            message: {message: 'Success'}
        })
    }
}