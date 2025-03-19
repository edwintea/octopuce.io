
const Api={
    Users:  {
        Login       :   {
            URL     :    BASE_API+"users/login",
            Method  :   "POST"
        },
        register       :   {
            URL     :    BASE_API+"users/save",
            Method  :   "POST"
        },
        Forgot       :   {
            URL     :    BASE_API+"users/forgot",
            Method  :   "POST"
        }
    },
    Connections     :  {
        Save        :   {
            URL     :    BASE_API+"connections/save",
            Method  :   "POST"
        },
        Delete      :  {
            URL     :    BASE_API+"connections/delete",
            Method  :   "DELETE"
        },
        GetAll         :   {
            URL     :    BASE_API+"connections",
            Method  :   "GET"
        },
        GetAllByUserId         :  function(id) {
            return {
                URL     :    BASE_API+"connections/user/"+id,
                Method  :   "GET"
            }
            
        },
        GetInactiveByUserId         :  function(id) {
            return {
                URL     :    BASE_API+"connections/user/inactive/"+id,
                Method  :   "GET"
            }
            
        },
        GetByChanelAndUserId         :  function(chanelId=0,userId=0) {
            return {
                URL     :    BASE_API+"connections/chanel/"+chanelId+"/"+userId,
                Method  :   "GET"
            }
        },
        GetGroupByChanelByUserid         :  function(userId=0) {
            return {
                URL     :    BASE_API+"connections/group/"+userId,
                Method  :   "GET"
            }
        },
        GetGroupNotByChanelByUserid         :  function(chanelId=0,userId=0) {
            return {
                URL     :    BASE_API+"connections/groupnot/"+chanelId+"/"+userId,
                Method  :   "GET"
            }
        },
        GetMineOfChanel         :  function(chanelId=0,userId=0) {
            return {
                URL     :    BASE_API+"connections/mine/"+chanelId+"/"+userId,
                Method  :   "GET"
            }
        },
        GetAsSourceWorkflows         :  function(userId=0) {
            return {
                URL     :    BASE_API+"connections/source/"+userId,
                Method  :   "GET"
            }
        },
        GetAsDestinationWorkflows         :  function(userId=0) {
            return {
                URL     :    BASE_API+"connections/destination/"+userId,
                Method  :   "GET"
            }
        },
        Components  : (obj)=>{
            return HOST+"connections/"+obj;
           
        },
        chanel_auth  : (obj,state)=>{
            return HOST+"chanel/oauth/"+obj+"/"+state;
        },
        chanel_token  : (name,code)=>{
            return HOST+"chanel/token/"+name+"/"+code;
        },
        chanel_refresh_token  : (name="tiktok",state="")=>{
            return HOST+"chanel/refresh_token/"+name+"/"+state;
        },
        chanel_update_token  : (state="tiktok")=>{
            return HOST+"chanel/token_update/"+state;
        },
        chanel_rename  : (id=0,name="tiktok")=>{
            return HOST+"chanel/rename/"+id;
        },
    },
    ConnectionsMaster     :  {
        GetAll         :   {
            URL     :    BASE_API+"master_connections/all",
            Method  :   "GET"
        },
        GetActive         :   {
            URL     :    BASE_API+"master_connections/active",
            Method  :   "GET"
        },
        Save        :   {
            URL     :    BASE_API+"master_connections/save",
            Method  :   "POST"
        },
        Delete      :   {
            URL     :    BASE_API+"master_connections/delete",
            Method  :   "DELETE"
        }
    },
    Workflows       :   {
        Get         :   {
            URL     :    BASE_API+"workflows",
            Method  :   "GET"
        },
        Save        :   {
            URL     :    BASE_API+"workflows/save",
            Method  :   "POST"
        },
        Delete       :   {
            URL     :    BASE_API+"workflows/delete",
            Method  :   "DELETE"
        },
        GetAllByUserId         :  function(id) {
            return {
                URL     :    BASE_API+"workflows/user/"+id,
                Method  :   "GET"
            }
            
        },
        GetInactiveByUserId         :  function(id) {
            return {
                URL     :    BASE_API+"workflows/user/inactive/"+id,
                Method  :   "GET"
            }
            
        },
    },
    Templates   :   {
        Save        :   {
            URL     :    BASE_API+"templates/save",
            Method  :   "POST"
        },
        Delete      :  {
            URL     :    BASE_API+"templates/delete",
            Method  :   "DELETE"
        },
        GetAll         :   {
            URL     :    BASE_API+"templates",
            Method  :   "GET"
        },
        GetAllByUserId         :  function(id) {
            return {
                URL     :    BASE_API+"templates/user/"+id,
                Method  :   "GET"
            }
            
        },
        GetSizeByUserId         :  function(id,cat) {
            return {
                URL     :    BASE_API+"templates/user/size/"+id+"/"+cat,
                Method  :   "GET"
            }
            
        },
        template_rename  : (id=0)=>{
            return BASE_API+"templates/rename/"+id;
        },
    },
    Calendars    :   {
        Get         :   {
            URL     :    BASE_API+"calendars",
            Method  :   "GET"
        },
        Save        :   {
            URL     :    BASE_API+"calendars/save",
            Method  :   "POST"
        },
        Delete       :   {
            URL     :    BASE_API+"calendars/delete",
            Method  :   "DELETE"
        }
    },
    Page  : (obj)=>{
        return HOST+obj;
     }
}

const Component={
    'Render'    :   (url,type,e)=>{
        $.ajax({
            headers     : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            xhrFields   :  'withCredentials:true',
            url         :   url,
            crossOrigin :   true,
            type        :   type,
            data        :   {},
            dataType    :   "html",
            success: function(data) {
                console.log(data)
                res=data;
                e();
            },
            error: function(data) {
                console.log(data)
                if(data.status==500){
                    showAlert('#contentConnectionLists','warning','Empty Record.')
                }
                
                e();
            },
            
        })

    }
}

var res=[];
var req={};

function clearRequest(){
    req={}
}

let Ajax=function(url,type,datas,e){
    res=[];
    $.ajax({
        headers     : {
            'Accept'        : 'application/json',
            'Content-Type'  : 'application/json'
        },
        xhrFields   :  'withCredentials:true',
        url         :   url,
        crossOrigin :   true,
        type        :   type,
        data        :   JSON.stringify(datas),
        dataType    :   "json",
        success: function(data) {
            res=data;
            e();
        },
        error: function(data) {
            res=data.responseJSON;
            console.log(res)
            notify(res.message,"error")
        },
        
    })
}