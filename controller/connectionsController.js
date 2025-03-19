const con = require('../config/database')
const {validationResult} = require('express-validator')
const query=require('../repository/model')
const table="connections"

module.exports={
    get:async(req,res)=>{
        let q="SELECT * FROM "+table+" ORDER BY id DESC"
        await query.execQuery(req,res,q);
    },
    getAllByUserId:async (req,res)=>{
        let id=req.params.id
        let q="SELECT a.*,b.name as m_name,b.label as label,b.link_image,b.link_url,b.connection_type FROM connections a LEFT JOIN master_connections b ON a.connect_m_id = b.id WHERE a.userid="+id+" ORDER BY b.name ASC "
        await query.execQuery(req,res,q);
    },
    getInactiveByUserId:async(req,res)=>{
        let id=req.params.id
        let q="SELECT a.*,b.name as m_name,b.label as label,b.link_image,b.link_url,b.connection_type FROM connections a LEFT JOIN master_connections b ON a.connect_m_id = b.id WHERE a.userid="+id+" AND a.status=0 ORDER BY a.id DESC "
        await query.execQuery(req,res,q);

    },
    getChanelAndByUserId:(req,res)=>{
        let chanel_id=req.params.chanel_id
        let user_id=req.params.user_id

        con.query("SELECT * FROM "+table+" where connect_m_id='"+chanel_id+"' AND userid='"+user_id+"' AND access_token = 'waiting' ",function(err,rows){
            if(err){
                return res.status(500).json({
                    status:false,
                    message:err.message
                })
            }else{
                if(rows.length > 0){
                    return res.status(200).json({
                        status:true,
                        message:"Data Ok",
                        data:rows
        
                    })

                }else{
                    return res.status(200).json({
                        status:false,
                        message:"Available for more chanel",
                        data:[]
        
                    })
                }
                
            }
        })
    },
    getMineOfGroup:async(req,res)=>{
        let user_id=req.params.uid

        let q="select a.userid,a.name as conn_name,b.id as m_id,b.name as m_name,b.label as m_label from connections a left join master_connections b ON a.connect_m_id = b.id where a.userid='"+user_id+"' and a.status=1 group by a.connect_m_id "
        await query.execQuery(req,res,q);
        
    },
    getNotMineOfGroup:async(req,res)=>{//except id? master connections
        let chanel_id=req.params.chanel_id
        let user_id=req.params.user_id

        let q="select a.userid,a.name as conn_name,b.id as m_id,b.label as m_label from connections a left join master_connections b ON a.connect_m_id = b.id where a.userid='"+user_id+"' and a.connect_m_id <>'"+chanel_id+"' and a.status=1 group by a.connect_m_id "
        await query.execQuery(req,res,q);
        
    },
    getMineOfChanel:async(req,res)=>{
        let chanel_id=req.params.chanel_id
        let user_id=req.params.user_id

        let q="select a.*,b.name as m_name,b.label,b.link_image from connections a left join master_connections b ON a.connect_m_id = b.id WHERE a.userid='"+user_id+"' AND a.connect_m_id='"+chanel_id+"' and a.status=1 ORDER BY a.name ASC "
        await query.execQuery(req,res,q);
        
    },
    GetAsSourceWorkflows:async(req,res)=>{
        let user_id=req.params.user_id

        let q="select a.source_id,b.id,b.name,b.status,b.expire_date,c.name as m_name,c.label,c.link_image,c.connection_type from workflows a left join connections b ON a.source_id = b.id INNER JOIN master_connections c ON b.connect_m_id = c.id WHERE a.userid ='"+user_id+"' GROUP BY a.source_id; "
        await query.execQuery(req,res,q);
        
    },
    GetAsDestinationWorkflows:async(req,res)=>{
        let user_id=req.params.user_id

        let q="select a.destination_id,b.id,b.name,b.status,b.expire_date,c.name as m_name,c.label,c.link_image,c.connection_type from workflows a INNER JOIN connections b ON a.destination_id = b.id INNER JOIN master_connections c ON b.connect_m_id = c.id WHERE a.userid ='"+user_id+"' GROUP BY a.source_id; "
        await query.execQuery(req,res,q);
        
    },
    save:async(req,res)=>{
        console.log(req.body)
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).json({
                errors:error.array()
            })
        }

        let formData={
            userid : req.body.userid,
            connect_m_id : req.body.connect_m_id,
            name : req.body.name,
            state : req.body.state,
            access_url : req.body.access_url,
            access_token : req.body.access_token,
            refresh_token : req.body.refresh_token,
            expire_date    : req.body.expire_date,
            status    :   req.body.status!=null?req.body.status:0
        }

        q="SELECT * FROM "+table+" WHERE userid='"+req.body.userid+"' AND connect_m_id='"+req.body.connect_m_id+"' AND access_token='waiting' "
        
         con.query(q,function(err,rows){
            if(err){
                return res.status(500).json({
                    status:false,
                    message:err.message
                })
            }else{
                
                if(rows.length > 0){
                    return res.status(200).json({
                        status:false,
                        message:"There is 1 account for this chanel is incompleted",
                        data:rows
        
                    })

                }else{
                     con.query("INSERT INTO "+table+" SET ? ",formData,function(err,rows){
                        if(err){
                            return res.status(500).json({
                                status: false,
                                message: err.message
                            })
                        }else{
                            return res.status(201).json({
                                status:true,
                                message:"New Connection has been created",
                                data:[req.body]
                            })
                        }
                    })
                }
                
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

        con.query(" select * from workflows where source_id='"+req.body.id+"' or destination_id='"+req.body.id+"' ",function(err,rows){

            if(err){
                return res.status(500).json({
                    status: false,
                    message:err.message
                })
            }else{
                if(rows.length > 0){
                    return res.status(401).json({
                        status:false,
                        message:"Delete is not allowed since the Chanel was using by workflows",
                        data:req.body
                    })

                }else{
                    con.query("DELETE FROM "+table+" WHERE id='"+req.body.id+"' ",function(err,rows){
                        if(err){
                            return res.status(500).json({
                                status: false,
                                message:err.message
                            })
                        }else{
                            return res.status(200).json({
                                status:true,
                                message:"Delete Ok",
                                data:req.body
                            })
                        }
                    })
                }
            }
        })
    }
}
