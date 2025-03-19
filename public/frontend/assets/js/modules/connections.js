
/////////////////////// CONNECTIONS ////////////////////////////
let Connections={
    showAll    :   function(e){
        Ajax(Api.Connections.GetAllByUserId(getSession.id).URL,Api.Connections.GetAllByUserId(getSession.id).Method,"",function(){
            e()
        })
    },
    showGroupByChanel    :   function(e){
        Ajax(Api.Connections.GetGroupByChanelByUserid(getSession.id).URL,'GET',"",function(){
            e()
        })
    },
    showGroupNotByChanel    :   function(e){
        Ajax(Api.Connections.GetGroupNotByChanelByUserid(localStorage.getItem('notThisChanel'),getSession.id).URL,'GET',"",function(){
            e()
        })
    },
    GetMineOfChanel    :   function(e){
        Ajax(Api.Connections.GetMineOfChanel(localStorage.getItem('notThisChanel'),getSession.id).URL,'GET',"",function(){
            e()
        })
    },
    showInactive    :   function(e){
        Ajax(Api.Connections.GetInactiveByUserId(getSession.id).URL,Api.Connections.GetInactiveByUserId(getSession.id).Method,"",function(){
            e()
        })
    },
    showAsSourceWorkflows   :   function(e){
        Ajax(Api.Connections.GetAsSourceWorkflows(getSession.id).URL,"GET","",function(){
            e()
        })
    },
    showAsDestinationWorkflows   :   function(e){
        Ajax(Api.Connections.GetAsDestinationWorkflows(getSession.id).URL,"GET","",function(){
            e()
        })
    },
    showCurrentTab(){
        
        switch(localStorage.getItem('tab')){
            case "all":
                Connections.showAll(function(){
                    render('.connections-data',Connections.viewData(),()=>{
                            
                        Connections.handler()
                    })
                })
                break;
            case "source":
                Connections.showAsSourceWorkflows(function(){
                    render('.connections-data',Connections.viewData(),()=>{
                            
                        Connections.handler()
                    })
                })
                break;
            case "destination":
                Connections.showAsDestinationWorkflows(function(){
                    render('.connections-data',Connections.viewData(),()=>{
                            
                        Connections.handler()
                    })
                })
                break;
            case "inactive":
                
                Connections.showInactive(function(){
                    render('.connections-data',Connections.viewData(),()=>{
                            
                        Connections.handler()
                    })
                })
                break;
            default:
                break;
        }
    },
    default:()=>{
        //default
        $('input').val('');
        
        Connections.showAll(function(){
            
            render('.connections-data',Connections.viewData(),()=>{
                            
                Connections.handler()
            })
        })
    },
    viewData   :   ()=>{
        el="";
            
            if(res.data.length > 0){
                $.each(res.data,function(i,e){
                    
                    el+="<div class='col-md-4' style='margin-top:0.5%;'>";
                        el+="<div class='card p-3'>";
                            el+="<div class='d-flex flex-row mb-3'>";
                                el+="<img width='50' height='50' src='/frontend/assets/images/icons/"+e.link_image+"' />"
                                el+="<div class='d-flex flex-column ml-2'><span>"+e.name+"</span><span class='text-black-50'>"+e.label+"</span>";
                                    //el+="<span class='ratings'><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i></span>";
                                    el+=getStatus(e.status);
                                el+="</div>";
                            el+="</div>";
                            el+="<h6><div class='alert alert-info'>Expire Date    : "+e.expire_date.split("T")[0]+"</div></h6>";
                            el+="<div class='d-flex justify-content-between install mt-3'><span>"+getConnectionType(e.connection_type)+"</span>";
                                el+="<div class='dropdown'>";
                                    el+="<button class='btn ' type='button' data-toggle='dropdown'><i class='fa fa-ellipsis-v' aria-hidden='true'></i>";
                                    el+="<span class='caret'></span></button>";
                                    el+="<ul class='dropdown-menu'>";
                                    el+="<li><a href='#' class='btnReconnect' data-id='"+e.id+"' data-label='"+e.label+"' data-chanel='"+e.m_name+"' data-state='"+e.state+"'>Reconnect</a></li>";
                                    if(e.access_token!="waiting" && e.refresh_token!="waiting"){
                                        el+="<li><a href='#' class='btnRefreshToken' data-id='"+e.id+"' data-userid='"+e.userid+"' data-label='"+e.label+"' data-chanel='"+e.m_name+"' data-m_id='"+e.connect_m_id+"' data-tok='"+e.refresh_token+"' data-state='"+e.state+"'>Refresh Token</a></li>";
                                    }
                                    
                                    el+="<li><a href='#' class='btnRenameConnection' data-id='"+e.id+"' data-name='"+e.name+"' data-label='"+e.label+"' >Rename</a></li>";
                                    el+="<li><a href='#' class='btnDeleteConnection'data-id='"+e.id+"' data-label='"+e.label+"'>Delete</a></li>";
                                    el+="</ul>";
                                el+="</div>";
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                    
                })
            }else{
                el+="<div class='col-md-12'>";
                    el+="<div class='error-template'>";
                        el+="<h1>";
                            el+="Oops!</h1>";
                        el+="<h2>";
                            el+="404 Not Found</h2>";
                        el+="<div class='error-details'>";
                            el+="Sorry, Requested data not found!";
                        el+="</div>";
                        el+="<div class='error-actions'>";
                            //el+="<a href='https://app.octopuce.io' class='btn btn-primary btn-lg'><span class='glyphicon glyphicon-home'></span>";
                                //el+="Take Me Home </a><a href='https://app.octopuce.io' class='btn btn-default btn-lg'><span class='glyphicon glyphicon-envelope'></span> Contact Support </a>";
                        el+="</div>";
                    el+="</div>";
                el+="</div>";
                
            }
        return el;
    },
    handler:(element=null)=>{
        $('.nav-link').each(function(i,e){
            $(e).off().on('click',function(){
                let show = $(e).data('show');
                
                localStorage.setItem('tab',show)

                Connections.showCurrentTab()
            })
        })

        $('.btnAddConnections').off().on('click',function(){

            Ajax(Api.ConnectionsMaster.GetActive.URL,Api.ConnectionsMaster.GetActive.Method,req,function(){
    
                if(res.status){
                    let el="";
                    if(res.data.length > 0){
                        
                        $.each(res.data,function(i,e){
                            let contype = getConnectionType(e.connection_type)

                            el+="<div class='col divGallery'>";
                                
                                el+="<div class='gallery galleryConnection' data-id='"+e.id+"' data-name='"+e.name+"' data-label='"+e.label+"' data-link_image='"+e.link_image+"' data-link_url='"+e.link_url+"' data-contype='"+e.connection_type+"' data-status='"+e.status+"'>";
                                    el+="<a  class='conLists' target='#' href='#'>";
                                        el+="<img src='/frontend/assets/images/icons/"+e.link_image+"' alt='Cinque Terre' width='600' height='350'>";
                                    el+="</a>";
                                    el+="<div class='desc'>"+e.label+"<br><span >"+contype+"</span></div>";
                                    
                                el+="</div>";
                            el+="</div>";
                            
                        })
                    }

                    $('#modalAddConnection').modal('show',{backdrop: 'static', keyboard: false});

                    render('#contentConnectionLists',el,()=>{
                        $('.text-modal').text('');
                        $('.img-modal' ).hide()
                        $('.galleryConnection').each((i,e)=>{

                            let connect_id=$(e).data('id');
                            
                            $(e).click(()=>{
                                localStorage.setItem('current_chanel_label',$(e).data('label'))
                               //check first no more than account
                                Ajax(Api.Connections.GetByChanelAndUserId(connect_id,getSession.id).URL,Api.Connections.GetByChanelAndUserId().Method,req,function(){
                                    //max 1 chanel per account user
                                    if(!res.status){
                                        Component.Render(Api.Connections.Components($(e).data('name')),'GET',()=>{
                                            render('#contentConnectionLists',res,()=>{
                                                
                                                $('.img-modal' ).prop("src","/frontend/assets/images/icons/"+$(e).data('link_image')).show()
                                                $('.text-modal').text($(e).data('label'))
                                                $('.btnRetryConnection').off().on('click',function(){
                                                    $('.btnAddConnections').trigger('click')
                                                    return false;
                                                })
                                                var element=e;
                                                Connections.handler(element);
                                            
                                            })
                                        })
                                    }else{
                                        notify("Max number of "+localStorage.getItem('current_chanel_label')+" connections reached for your account. Upgrade here »","warning")
                                    }
                                })
                                
                                return false;

                            })
                        })
                        
                    })
                    
                }else{
                    showAlert('#contentConnectionLists','warning','Empty Record.')
                }
            
            })
            
        })


        $('.btnConnect').off().on('click',function(){
                                                   
            const csrfState = Math.random().toString(36).substring(2);
            let name=$('#txtName').val();
            let chanel=$(element).data('name')
            let url = $(element).data('link_url') !=null?$(element).data('link_url'):"https://app.octopuce.io/"
               
            req={
                "state"         :   csrfState,
                "userid"        :   getSession.id,
                "connect_m_id"  :   $(element).data('id'),
                "access_url"    :   url,
                "access_token"  :   "waiting",
                "refresh_token" :   "waiting",
                "name"          :   typeof name!='undefined'?name:localStorage.getItem('current_chanel_label'),
                "expire_date"   :   formatDate(getDate(7))
            }

            //save to db
            Ajax(Api.Connections.Save.URL,Api.Connections.Save.Method,req,function(){
                
                //auth login page of chanel
                switch (chanel){
                    case "facebook":
                        Connections.login(HOST+chanel+"/"+req.state,function(){})
                    break;
                    default:
                        Connections.authorize(chanel,req.state)
                    break;
                }
            })
            return false;
        })

        $.each($('.btnReconnect'),function(i,e){
            $(e).off().on('click',function(){
                let id=$(e).data('id');
                let chanel=$(e).data('chanel')
                let label=$(e).data('label')
                let state=$(e).data('state')

               
                confirm("Are you sure want to reconnect your <b>"+label+"</b> ?",()=>{
                    
                    if(chanel!="facebook"){
                        Connections.authorize(chanel,state)
                        return false;
                    }

                    //only fb
                    Connections.login(HOST+chanel+"/"+state)
                })
                
            })
        })

        $.each($('.btnRefreshToken'),function(i,e){
            $(e).off().on('click',function(){
                let chanel=$(e).data('chanel')
                let label=$(e).data('label')
                let data={
                    userid          :   $(e).data('userid'),
                    connect_m_id    :   $(e).data('m_id'),
                    refresh_token   :   $(e).data('tok'),
                    state           :   $(e).data('state')
                }

                if(chanel=="facebook"){
                    notify("Facebook is not available for refresh token, please reconnect","error")
                    return false;
                }

                confirm("Are you sure want to refresh token for your <b>"+label+"</b> ?",()=>{
                    Ajax(Api.Connections.chanel_refresh_token(chanel,data.state),"POST",data,function(){
                        let o="info"
                        if(!res.status){
                            o="error"
                        }
                        notify(res.message,o)
                        Connections.showCurrentTab();
                    })
                })
                
            })
        })

        $.each($('.btnRenameConnection'),function(i,e){
            $(e).off().on('click',function(){
                let id=$(e).data('id');
                let name=$(e).data('name')
                let label=$(e).data('label')
        
                $.confirm({
                    title: '<span class="fas fa-link"></span> Rename Connection',
                    animation:'none',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    //'<label>Rename Connection</label>' +
                    '<input type="text" name="txtRenameConnection" id="txtRenameConnection" placeholder="Connection Name" class="name form-control text-field txtRenameConnection" required />' +
                    '</div>' +
                    '</form>',
                    buttons: {
                        formSubmit: {
                            text: 'Submit',
                            btnClass: 'btn-green',
                            action: function () {
                                var name = this.$content.find('.name').val();
                                if(!name){
                                    $.alert('provide a valid name');
                                    return false;
                                }
                                //rename conn
                                Ajax(Api.Connections.chanel_rename(id,name,label),'POST',{id:id,name:name,label:label},function(){
                                    notify(res.message,"info")
                                    Connections.showCurrentTab()
                                })
                            }
                        },
                        cancel: function () {
                            //close
                        },
                    },
                    onContentReady: function () {
                        $('.txtRenameConnection').val(name)
                        // bind to events
                        var jc = this;
                        this.$content.find('form').on('submit', function (e) {
                            // if the user submits the form by pressing enter in the field.
                            e.preventDefault();
                            jc.$$formSubmit.trigger('click'); // reference the button and click it
                        });
                    }
                });
                return false;
            })
        })

        $.each($('.btnDeleteConnection'),function(i,e){
            $(e).off().on('click',function(){
                let id=$(e).data('id');
                let label=$(e).data('label')
                confirm("Are you sure want to delete your connection for <b>"+label+"</b> ?",()=>{
                    Ajax(Api.Connections.Delete.URL,Api.Connections.Delete.Method,{id:id},function(){
                        if(res.status){
                            notify(res.message,"info")
                            Connections.showCurrentTab()
                        
                        }else{
                            notify(res.message,"error")
                        }
                        
                    })
                })

                return false;
            })
        })
    },
    authorize: (chanel,state)=>{
        Component.Render(Api.Connections.chanel_auth(chanel,state),'GET',()=>{
            var height=600,width=800;
            var theTop=((screen.height/2)-(height/2))/2;
            var theLeft=(screen.width/2)-(width/2);
            var features = 'height=550,width=750,top='+theTop+',left='+theLeft+',toolbar=0,Location=0,Directories=0,Status=0,menubar=0,Scrollbars=1,Resizable=0,minimizable=0';
            
            var win = window.open(res, "page_name", features);
            var interval = window.setInterval(function() {
                try {
                    if (win == null || win.closed) {
                        $('#modalAddConnection').modal('hide')
                        Connections.showCurrentTab()

                        window.clearInterval(interval);
                        closeCallback(win);
                        
                    }
                }
                catch (e) {
                }
            }, 1000);
        })
    },
    login: (url,state)=>{
        var height=600,width=800;
        var theTop=((screen.height/2)-(height/2))/2;
        var theLeft=(screen.width/2)-(width/2);
        var features = 'height=550,width=750,top='+theTop+',left='+theLeft+',toolbar=0,Location=0,Directories=0,Status=0,menubar=0,Scrollbars=1,Resizable=0,minimizable=0';
        
        var win = window.open(url, "page_name", features);
        var interval = window.setInterval(function() {
            try {
                if (win == null || win.closed) {
                    $('#modalAddConnection').modal('hide')
                    Connections.showCurrentTab();
                    window.clearInterval(interval);
                    closeCallback(win);
                }
            }
            catch (e) {
            }
        }, 1000);
    },
    init    :  ()=>{
        
        notify("You connect to your chanels","info")
        localStorage.setItem('tab','all')
        Connections.default();

        
        //just test button
        $.each($('.btnChanel'),function(i,e){
            $(e).off().on('click',function(){
                var scope = $(e).data('scope');

                return false;
            })
        })
        
        Connections.handler();
    }
}