const con = require('../config/database')

module.exports.execQuery=(req,res,query)=>{
    try{
        con.query(query,function(err,rows){
            if(err){
                return res.status(500).json({
                    status:false,
                    message:err.message
                })
            }else{
                return res.status(200).json({
                    status:true,
                    message:"Data Ok",
                    data:rows
                })
            }
        })

    }catch(e){
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
    
}