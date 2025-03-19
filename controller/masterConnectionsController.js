const con = require('../config/database')
const {validationResult} = require('express-validator')
const table="master_connections"

module.exports={
    getAll:(req,res)=>{
        con.query("SELECT * FROM "+table+"  ORDER BY name",function(err,rows){
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
    },
    getActive:(req,res)=>{
        con.query("SELECT * FROM "+table+" WHERE status=1 ORDER BY name",function(err,rows){
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
    },
    save:(req,res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).json({
                errors:error.array()
            })
        }

        let formData={
            name    : req.body.name,
            label   : req.body.label,
            link_image    : req.body.link_image,
            connection_type    : req.body.connection_type,
            status  : req.body.status

        }

        con.query("INSERT INTO "+table+" SET ? ",formData,function(err,rows){
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message
                })
            }else{
                return res.status(201).json({
                    result:true,
                    message:"Insert Ok",
                    data:req.body
                })
            }
        })

    },
    delete:(req,res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).json({
                errors:error.array()
            })
        }

        con.query("DELETE FROM "+table+" WHERE id='"+req.body.id+"' ",function(err,rows){
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message
                })
            }else{
                return res.status(200).json({
                    result:true,
                    message:"Delete Ok",
                    data:rows[0]
                })
            }
        })

    }
}