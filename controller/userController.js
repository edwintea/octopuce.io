const con = require('../config/database')
const util = require('../utility/util')
const {validationResult} = require('express-validator')
const table="users"

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
    forgot:(req,res)=>{
        
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).json({
                errors:error.array()
            })
        }

        var q="SELECT * FROM "+table+" WHERE email='"+req.body.email+"' ";
        con.query(q,function(err,rows){
            
            if (rows.length == 0){
                return res.status(401).json({
                    status  : false,
                    message : "Email was not found",
                    data    :   []
                })
            }else{
                return res.status(200).json({
                    status:true,
                    message:"Reset password has been sent to your email : "+req.body.email,
                    data:[{name:rows[0].name,email:rows[0].email}]
                })
            }
        })
    },
    login: (req,res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).json({
                errors:error.array()
            })
        }

        var q="SELECT * FROM "+table+" WHERE email='"+req.body.email+"' AND password ='"+util.encrypt(req.body.password)+"' ";
        
        con.query(q,function(err,rows){
            if(err){
                console.log(err.message)

                return res.status(500).json({
                    status  : false,
                    message : err.message,
                    data    :   []
                })
            }

            try{
                if(rows.length==0){
                    return res.status(401).json({
                        status  : false,
                        message : "Wrong Account or Internal server error",
                        data    :   []
                    })
                }else{
                    return res.status(200).json({
                        status:true,
                        message:"Login Ok",
                        data:rows[0]
                    })
                }
            }catch(e){
                return res.status(200).json({
                    status:false,
                    message:"Invalid Account!",
                    data:[]
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
            name : req.body.name,
            phone : req.body.phone,
            email    : req.body.email,
            password    :   util.encrypt(req.body.password)
        }

        con.query("SELECT * FROM "+table+" WHERE email='"+req.body.email+"' ",function(err,rows){
            
            if(rows.length==0){

                con.query("INSERT INTO "+table+" SET ? ",formData,function(err,rows){
                    if(err){
                        return res.status(500).json({
                            status: false,
                            message: err.message,
                            data:[]
                        })
                    }else{
                        
                        return res.status(201).json({
                            status:true,
                            message:"Insert Ok",
                            data:[{name:req.body.name,email:req.body.email}]
                        })
                    }
                })

            }else{
                return res.status(400).json({
                    status: false,
                    message:    "Email was registered",
                    data:[]
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
                    status:true,
                    message:"Delete Ok",
                    data:rows[0]
                })
            }
        })
    }
}