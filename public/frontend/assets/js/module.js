$(function(){
/////////////////////// ALL PAGE EXCEPT INDEX ////////////////////////////
let GlobalPage={
    init    :   ()=>{
        if(typeof(getSession.name) !=='string'){
            window.location.href=BASE_PAGE;
        }
  
        $('.initial').text(Array.from(getSession.name)[0].toUpperCase())
        $('.title-content-account').text(getSession.name).css('textTransform', 'capitalize');
        $('.account-name').text(getSession.name).css('textTransform', 'capitalize');
        $('.account-email').text(getSession.email)
        $('.account-phone').text(getSession.phone)
        const join_date=getSession.createdat.split(' ');

        $('.join_date').text(join_date[0]+" "+join_date[1]+" "+join_date[2]+" "+join_date[3])
        $('.btnLogout').on('click',function(e){
            removeSession();
            window.location.href=BASE_PAGE;
            return false;
        })

        $.each($('.left_menu'),function(i,e){
            $(e).on('click',function(){
                let page=$(e).data('page');
                
                window.history.pushState("object or string", "Title", "/"+page);
                
                Component.Render(Api.Page(page),'GET',()=>{
                    render('#main',res,()=>{
                        Calendars.init()
                      
                    })
                })
                
                return false;
            })
            
        })

        $('.actLogout').off().on('click',function(){
            confirm("Are you sure want to Logout ?",()=>{
                localStorage.clear();
                window.location.href=HOST;
            
            })
        });

    }
}

/////////////////////// DO EXECUTION ////////////////////////////

if(page=="index"){
    Index.init();
}

if(page=='workflows'){
    Workflows.init();
}

if(page=='connections'){
    Connections.init();
}

if(page=='templates'){
    Templates.init();
}

if(page=='calendars'){
    
    Calendars.init();
}

if(page !='index'){
    GlobalPage.init();
}
    
})