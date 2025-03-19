const con = require('../config/database')
const {validationResult} = require('express-validator')
const table="calendars"

module.exports={
    get:(req,res)=>{
        con.query("SELECT * FROM "+table+" ORDER BY id DESC ",function(err,rows){
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
            res.status(422).json({
                errors:error.array()
            })
        }

        let formData={
            userid : req.body.userid,
            event_id : req.body.event_id,
            notes : req.body.notes,
            link : req.body.link,
            start_date    : req.body.start_date,
            end_time    :   req.body.start_time,
            end_date    : req.body.end_date,
            end_time    :   req.body.end_time
        }

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
                    data:req.body
                })
            }
        })

    },
    delete:(req,res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            res.status(422).json({
                errors:error.array()
            })
        }

        con.query("DELETE FROM "+table+" WHERE id='"+req.body.id+"'  ",function(err,rows){
            if(err){
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            }else{
                res.status(200).json({
                    status:true,
                    message:"Delete Ok",
                    data:rows[0]
                })
            }
        })
    }
}