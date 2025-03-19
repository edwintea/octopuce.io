const con = require('../config/database')
const constanta = require('../utility/const')
const util = require('../utility/util')
const axios = require('axios')
var auth_header=""

module.exports={
    get:(req,res)=>{
        res.status(200).send("ok")
    },
    auth:(req,res)=>{
        let chanel=req.params.chanel
        let state=req.params.state
        
        switch (chanel){
            case "tiktok":
                var CLIENT_KEY = constanta.tiktok.ClientKey
                var csrfState = state==null?Math.random().toString(36).substring(2):state;
                res.cookie('csrfState', csrfState, { maxAge: 60000 });

                var url = constanta.tiktok.url.authorization;
                // the following params need to be in `application/x-www-form-urlencoded` format.
                url += `?client_key=${CLIENT_KEY}`;
                url += `&scope=${constanta.tiktok.scopes}`;
                url += `&response_type=code`;
                url += `&redirect_uri=${constanta.tiktok.redirectUrl}`;
                url += `&code_verifier=${csrfState}`;
                url += `&state=${csrfState}`;
                console.log(url)
                res.status(200).send(url)
                break;
            case "pinterest":
                var CLIENT_KEY = constanta.pinterest.AppId
                var csrfState = state==null?Math.random().toString(36).substring(2):state;
                res.cookie('csrfState', csrfState, { maxAge: 60000 });
                var url = constanta.pinterest.url.authorization;


                // the following params need to be in `application/x-www-form-urlencoded` format.
                url += `?client_id=${CLIENT_KEY}`;
                url += `&redirect_uri=${constanta.pinterest.redirectUrl}`;
                url += `&response_type=code`;
                url += `&scope=${constanta.pinterest.scopes}`;
                url += `&state=${csrfState}`;
                
                res.status(200).send(url)
                break;
            case "dropbox":
                var CLIENT_KEY = constanta.dropbox.App_key
                var csrfState = state==null?Math.random().toString(36).substring(2):state;
                res.cookie('csrfState', csrfState, { maxAge: 60000 });
                var url = constanta.dropbox.url.authorization;


                // the following params need to be in `application/x-www-form-urlencoded` format.
                url += `?client_id=${CLIENT_KEY}`;
                url += `&response_type=code`;
                url += `&token_access_type=offline`;
                url += `&redirect_uri=${constanta.dropbox.redirectUrl}`;
                url += `&state=${csrfState}`;
                
                res.status(200).send(url)
                break;
            case "linkedin":
                    var CLIENT_KEY = constanta.linkedin.ClientId
                    var csrfState = state==null?Math.random().toString(36).substring(2):state;
                    res.cookie('csrfState', csrfState, { maxAge: 60000 });
                    var url = constanta.linkedin.url.authorization;
    
    
                    // the following params need to be in `application/x-www-form-urlencoded` format.
                    url += `?client_id=${CLIENT_KEY}`;
                    url += `&redirect_uri=${constanta.linkedin.redirectUrl}`;
                    url += `&response_type=code`;
                    url += `&scope=${constanta.linkedin.scopes}`;
                    url += `&state=${csrfState}`;
                    
                    res.status(200).send(url)
                    break;
            case "instagram":
                    var CLIENT_KEY = constanta.instagram.app_id
                    var csrfState = state==null?Math.random().toString(36).substring(2):state;
                    res.cookie('csrfState', csrfState, { maxAge: 60000 });
                    var url = constanta.instagram.url.authorization;
    
    
                    // the following params need to be in `application/x-www-form-urlencoded` format.
                    url += `?client_id=${CLIENT_KEY}`;
                    url += `&redirect_uri=${constanta.instagram.redirectUrl}`;
                    url += `&response_type=code`;
                    url += `&scope=${constanta.instagram.scopes}`;
                    url += `&state=${csrfState}`;
                    
                    console.log(url)
                    res.status(200).send(url)
                    break;
            default:
                res.status(200).send("https://my.repurpose.io/")
            break;
        }

        
    },
    refresh_token:(req,res)=>{
        let chanel=req.params.chanel
        let state=req.params.state
        let userid=req.body.userid
        let connect_m_id=req.body.connect_m_id
        let token=req.body.refresh_token
        
        switch (chanel){
            case "tiktok":
                
                res.status(200).send("ok")
                break;
            case "pinterest":
                auth_header="Basic "+Buffer.from(constanta.pinterest.AppId+":"+constanta.pinterest.AppKey).toString('base64')
                
                try{
                    
                    axios({
                        url     : constanta.pinterest.url.token,
                        headers :   {
                            "Authorization"   :   auth_header,
                            "Content-Type"    :   'application/x-www-form-urlencoded'
                        },
                        data    :{
                            "grant_type"    :   constanta.pinterest.grant_type.refresh_token,
                            "refresh_token" :   token,
                            "scope"         :   constanta.pinterest.scopes
                        },
                        method      : 'post',
                        responseType: 'json'
                        }).then(function(response){
                            console.log(response.data)
                            con.query("UPDATE connections SET access_token='"+response.data.access_token+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"'  ",function(err,rows){
                                if(err){
                                    
                                    return res.status(500).json({
                                        status:false,
                                        message:err.message
                                    })
                                }else{
                                    return res.status(200).json({
                                        status:true,
                                        message:"Token was updated",
                                        data:response.data
                                    })
                                }
                            })
                            
                            
                        }).catch(function (error) {
                            // handle error
                            console.log(error.response);
                        })
                        .finally(function () {
                            // always executed
                        });

                    
                }catch(e){
                    throw e;
                }
                
                
                break;
                case "dropbox":
                   
                    try{
                        
                        axios({
                            url     : constanta.dropbox.url.token,
                            headers :   {
                                "Content-Type"    :   'application/x-www-form-urlencoded'
                            },
                            data    :{
                                "grant_type"        :   constanta.dropbox.grant_type.refresh_token,
                                "refresh_token"     :   token,
                                "client_id"         :   constanta.dropbox.App_key,
                                "client_secret"     :   constanta.dropbox.App_secret
                            },
                            method      : 'post',
                            responseType: 'json'
                            }).then(function(response){
                                console.log(response.data)
                                con.query("UPDATE connections SET access_token='"+response.data.access_token+"',expire_date='"+util.convertTimeStampToDate(response.data.expires_in)+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"'  ",function(err,rows){
                                    if(err){
                                        
                                        return res.status(500).json({
                                            status:false,
                                            message:err.message
                                        })
                                    }else{
                                        return res.status(200).json({
                                            status:true,
                                            message:"Token was updated",
                                            data:response.data
                                        })
                                    }
                                })
                                
                                
                            }).catch(function (error) {
                                // handle error
                                console.log(error.response);
                            })
                            .finally(function () {
                                // always executed
                            });
    
                        
                    }catch(e){
                        throw e;
                    }
                    
                    
                break;
                case "linkedin":
                   
                    try{
                        
                        axios({
                            url     : constanta.linkedin.url.token,
                            headers :   {
                                "Content-Type"    :   'application/x-www-form-urlencoded'
                            },
                            data    :{
                                "grant_type"        :   constanta.linkedin.grant_type.refresh_token,
                                "refresh_token"     :   token,
                                "client_id"         :   constanta.linkedin.ClientId,
                                "client_secret"     :   constanta.linkedin.ClientSecret
                            },
                            method      : 'post',
                            responseType: 'json'
                            }).then(function(response){
                                console.log(response.data)
                                con.query("UPDATE connections SET access_token='"+response.data.access_token+"',expire_date='"+util.convertTimeStampToDate(response.data.expires_in)+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"'  ",function(err,rows){
                                    if(err){
                                        
                                        return res.status(500).json({
                                            status:false,
                                            message:err.message
                                        })
                                    }else{
                                        return res.status(200).json({
                                            status:true,
                                            message:"Token was updated",
                                            data:response.data
                                        })
                                    }
                                })
                                
                                
                            }).catch(function (error) {
                                // handle error
                                console.log(error.response);
                                return res.status(500).json({
                                    status:false,
                                    message:error.response.data.error_description
                                })

                            })
                            .finally(function () {
                                // always executed
                            });
    
                        
                    }catch(e){
                        throw e;
                    }
                    
                    
                break;
            default:
                res.status(200).send("https://app.octopuce.io/")
            break;
        }
    },
    token_update:(req,res)=>{
        let state=req.params.state
        let chanel_id=req.body.chanel_id //ex.facebook : id user on that chanel, not all have
        let token=req.body.access_token
        let refresh_token=req.body.refresh_token
        let expire_date=util.convertTimeStampToDate(req.body.expire_date)
        let remark=req.body.remark

        con.query("UPDATE connections SET chanel_id='"+chanel_id+"', access_token='"+token+"',refresh_token='"+refresh_token+"',expire_date='"+expire_date+"',remark='"+remark+"',status=1 WHERE state='"+state+"'  ",function(err,rows){
            if(err){
                console.log(err)
                return res.status(500).json({
                    status:false,
                    message:err.message
                })
            }else{
                return res.status(200).json({
                    status:true,
                    message:"Token was updated",
                    data:rows[0]
                })
            }
        })
    },
    chanel_rename:(req,res)=>{
        let id=req.params.id
        let name=req.body.name
        let label=req.body.label
        
        con.query("UPDATE connections SET name='"+name+"' WHERE id='"+id+"'  ",function(err,rows){
            if(err){
                console.log(err)
                return res.status(500).json({
                    status:false,
                    message:err.message
                })
            }else{
                return res.status(200).json({
                    status:true,
                    message:"Your "+label+" was renamed to "+name,
                    data:rows[0]
                })
            }
        })
    },
    callback:(req,res)=>{
        var chanel=req.params.chanel
        var code=req.query.code
        var state=req.query.state
        var scopes=req.query.scopes

        
        switch (chanel){
            case "tiktok":
                
                try{

                    axios({
                        url     : constanta.tiktok.url.token,
                        headers :{
                            "Content-Type"    :   'application/x-www-form-urlencoded'
                        },
                        data    :{
                            "client_key"    :   constanta.tiktok.ClientKey,
                            "client_secret" :   constanta.tiktok.ClientSecret,
                            "grant_type"    :   constanta.tiktok.grant_type.auth,
                            "code"          :   code,
                            "redirect_uri"  :   constanta.tiktok.redirectUrl,
                            
                        },
                        method      : 'post',
                        responseType: 'json'
                        }).then(function(response){
                            console.log(response.data)
                            con.query("UPDATE connections SET access_token='"+response.data.access_token+"',refresh_token='"+response.data.refresh_token+"',expire_date='"+util.convertTimeStampToDate(response.data.expires_in)+"',expire_date_refresh_token='"+util.convertTimeStampToDate(response.data.refresh_token_expires_in)+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"' ",function(err,rows){
                                if(err){
                                    
                                    return res.status(500).json({
                                        status:false,
                                        message:err.message
                                    })
                                }else{
                                    
                                    res.render('chanel/pinterest', {message:'Yeah !!! Your Pinterest was connected.'});
                                }
                            })
                        }).catch(function (error) {
                            // handle error
                            console.log(error.response);
                            res.render('chanel/pinterest', {message:error.response});
                        })
                        .finally(function () {
                            
                        });


                }catch(e){
                    throw e;
                }
                
                
                break
            case "pinterest":
                auth_header="Basic "+Buffer.from(constanta.pinterest.AppId+":"+constanta.pinterest.AppKey).toString('base64')
                
                try{

                    axios({
                        url     : constanta.pinterest.url.token,
                        headers :{
                            "Authorization"   :   auth_header,
                            "Content-Type"    :   'application/x-www-form-urlencoded'
                        },
                        data    :{
                            "grant_type"    :   constanta.pinterest.grant_type.auth,
                            "code"          :   code,
                            "redirect_uri"  :   constanta.pinterest.redirectUrl,
                            "client_id"     :   constanta.pinterest.AppId
                        },
                        method      : 'post',
                        responseType: 'json'
                        }).then(function(response){
                            console.log(response.data)
                            con.query("UPDATE connections SET access_token='"+response.data.access_token+"',refresh_token='"+response.data.refresh_token+"',expire_date='"+util.convertTimeStampToDate(response.data.expires_in)+"',expire_date_refresh_token='"+util.convertTimeStampToDate(response.data.refresh_token_expires_in)+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"' ",function(err,rows){
                                if(err){
                                    
                                    return res.status(500).json({
                                        status:false,
                                        message:err.message
                                    })
                                }else{
                                    
                                    res.render('chanel/pinterest', {message:'Yeah !!! Your Pinterest was connected.'});
                                }
                            })
                        }).catch(function (error) {
                            // handle error
                            console.log(error.response);
                            res.render('chanel/pinterest', {message:error.response});
                        })
                        .finally(function () {
                            
                        });


                }catch(e){
                    throw e;
                }
                    
                break
            case "instagram":
                    
                    try{
    
                        axios({
                            url                     : constanta.instagram.url.token,
                            headers                 :{
                                "Content-Type"      :   'application/x-www-form-urlencoded'
                            },
                            data    :{
                                "grant_type"    :   constanta.instagram.grant_type.auth,
                                "code"          :   code,
                                "redirect_uri"  :   constanta.instagram.redirectUrl,
                                "client_id"     :   constanta.instagram.app_id,
                                "client_secret" :   constanta.instagram.app_secret
                            },
                            method      : 'post',
                            responseType: 'json'
                            }).then(function(response){
                                
                                con.query("UPDATE connections SET access_token='"+response.data.access_token+"',chanel_id='"+response.data.user_id+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"' ",function(err,rows){
                                    if(err){
                                        res.status(500).json({
                                            status:false,
                                            message:err.message
                                        })
                                    }else{
                                        
                                        res.render('chanel/instagram', {message:'Yeah !!! Your Instagram was connected.'});
                                    }
                                })
                            }).catch(function (error) {
                                // handle error
                                console.log(error.response);
                                res.render('chanel/errors/instagram', {message:error.response.message});
                            })
                            .finally(function () {
                                
                            });
    
    
                    }catch(e){
                        throw e;
                    }
                        
                break
                case "linkedin":
                    var data    ={
                        "grant_type"    :   constanta.linkedin.grant_type.auth,
                        "code"          :   code,
                        "client_id"     :   constanta.linkedin.ClientId,
                        "client_secret" :   constanta.linkedin.ClientSecret,
                        "redirect_uri"  :   constanta.linkedin.redirectUrl
                        
                    }

                    try{
                        
                        axios({
                            url     : constanta.linkedin.url.token,
                            headers :{
                                "Content-Type"    :   'application/x-www-form-urlencoded'
                            },
                            data        :  data,
                            method      : 'post',
                            responseType: 'json'
                            }).then(function(response){
                                console.log(response.data)
                                
                                con.query("UPDATE connections SET access_token='"+response.data.access_token+"',refresh_token='"+response.data.id_token+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"' ",function(err,rows){
                                    if(err){
                                        res.status(500).json({
                                            status:false,
                                            message:err.message
                                        })
                                    }else{
                                        
                                        return res.render('chanel/linkedin', {message:'Yeah !!! Your LinkedIn was connected.'});
                                    }
                                })
    
                            }).catch(function (error) {
                               // handle error
                               console.log(error.response);
                               res.render('chanel/linkedin', {message:error.response.message});
                                
                            })
                            .finally(function () {
                                
                            });
    
                    }catch(e){
                        throw e;
                    }
                    break;
                    case "dropbox":
                        var data    ={
                            "code"          :   code,
                            "grant_type"    :   constanta.dropbox.grant_type.auth,
                            "redirect_uri"  :   constanta.dropbox.redirectUrl,
                            "client_id"     :   constanta.dropbox.App_key,
                            "client_secret" :   constanta.dropbox.App_secret
                        }
    
                        try{
                            
                            axios({
                                url     : constanta.dropbox.url.token,
                                headers :{
                                    "Content-Type"    :   'application/x-www-form-urlencoded'
                                },
                                data        :  data,
                                method      : 'post',
                                responseType: 'json'
                                }).then(function(response){
                                    console.log(response.data)
                                    
                                    con.query("UPDATE connections SET access_token='"+response.data.access_token+"',refresh_token='"+response.data.refresh_token+"',chanel_id='"+response.data.uid+"',remark='"+JSON.stringify(response.data)+"',status=1 WHERE state='"+state+"' ",function(err,rows){
                                        if(err){
                                            res.status(500).json({
                                                status:false,
                                                message:err.message
                                            })
                                        }else{
                                            
                                            return res.render('chanel/dropbox', {message:'Yeah !!! Your Dropbox was connected.'});
                                        }
                                    })
        
                                }).catch(function (error) {
                                   // handle error
                                   console.log(error.response);
                                   res.render('chanel/dropbox', {message:error.response.message});
                                    
                                })
                                .finally(function () {
                                    
                                });
        
                        }catch(e){
                            throw e;
                        }
                        break;
            default:
                    res.status(200).send(chanel)
                break;
        }

    }
}