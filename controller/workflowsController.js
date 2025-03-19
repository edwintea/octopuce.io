const con = require('../config/database')
const {validationResult} = require('express-validator')
const WK = require('../utility/const')
const { sendMessage } = require('../utility/io');
const query=require('../repository/model')

const table="workflows"

module.exports={
    get:async(req,res)=>{
        try{
            await query.execQuery(req,res,"SELECT * FROM "+table+" ORDER BY id DESC");
        }catch(e){
            return res.status(404).json({
                status:false,
                message:"Notfound",
                data:[]
            })
        }
        
    },
    getAllByUserId:async (req,res)=>{
        let userid=req.params.id
        try{
            let q="select a.*,b.id as sourceid,c.id as destinationid,d.link_image as source_image,d.label as source_label,d.connection_type as source_type,e.link_image as destination_image,e.label as destination_label,e.connection_type as destination_type FROM workflows a INNER JOIN connections b ON a.source_id = b.id INNER JOIN connections c ON a.destination_id = c.id INNER JOIN master_connections d ON b.connect_m_id = d.id INNER JOIN master_connections e ON c.connect_m_id = e.id WHERE a.userid='"+userid+"' ORDER BY a.id DESC "
            await query.execQuery(req,res,q);

        }catch(e){
            return res.status(404).json({
                status:false,
                message:"Notfound",
                data:[]
            })
            
        }
    },
    getInactiveByUserId:async (req,res)=>{
        let id=req.params.id
        try{
            let q="SELECT a.*,b.name as m_name,b.label as label,b.link_image,b.link_url,b.connection_type FROM connections a LEFT JOIN master_connections b ON a.connect_m_id = b.id WHERE a.userid="+id+" AND a.status=0 ORDER BY a.id DESC "
            await query.execQuery(req,res,q);

        }catch(e){
            return res.status(404).json({
                status:false,
                message:"Notfound",
                data:[]
            })   
        }
    },
    save:(req,res)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(422).json({
                errors:error.array()
            })
        }

        let formData={
            userid                  :   req.body.userid,
            name                    :   req.body.name,
            publish_mode            :   req.body.publish_mode,
            status                  :   req.body.status,
            source_id               :   req.body.source_id,
            source_type             :   req.body.source_type,
            source_media_type       :   req.body.source_media_type,
            source_connection       :   req.body.source_connection,
            source_playlist         :   req.body.source_playlist,
            source_video_type       :   req.body.source_video_type,
            source_folder           :   req.body.source_folder,
            source_action           :   req.body.source_action,
            destination_id          :   req.body.destination_id,
            destination_connection  :   req.body.destination_connection,
            destination_playlist    :   req.body.destination_playlist,
            destination_folder      :   req.body.destination_folder
        }

        con.query("INSERT INTO "+table+" SET ? ",formData,function(err,rows){
            if(err){
                console.log(err)
                return res.status(500).json({
                    status: false,
                    message:err.message
                })
            }else{
                //just for test
                //sendMessage('client', {name:'',message:'save workflows Ok'});

                return res.status(201).json({
                    status:true,
                    message:"Data saved succesfully",
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
                    status:true,
                    message:"Delete Ok",
                    data:req.body
                })
            }
        })
        
    }

}
