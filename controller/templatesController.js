const con = require('../config/database')
const {validationResult} = require('express-validator')
const table="templates"

module.exports={
    get:(req,res)=>{
        con.query("SELECT * FROM "+table+" ORDER BY id",function(err,rows){
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
    getAllByUserId:(req,res)=>{
        let id=req.params.id
        con.query("SELECT * FROM "+table+" WHERE userid="+id+" ORDER BY id DESC",function(err,rows){
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
    GetSizeByUserId:(req,res)=>{
        let id=req.params.id
        let size=req.params.size

        con.query("SELECT * FROM "+table+" WHERE userid='"+id+"' AND size='"+size+"' ORDER BY id DESC",function(err,rows){
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
    rename:(req,res)=>{
        let id=req.params.id
        let name=req.body.name
        
        con.query("UPDATE "+table+" SET name='"+name+"' WHERE id='"+id+"'  ",function(err,rows){
            if(err){
                console.log(err)
                return res.status(500).json({
                    status:false,
                    message:err.message
                })
            }else{
                return res.status(200).json({
                    status:true,
                    message:"Chanel name was updated",
                    data:rows[0]
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
            userid  : req.body.userid,
            name    : req.body.name,
            category: req.body.category,
            size    : req.body.size

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
                    message:"New Templates has been created",
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