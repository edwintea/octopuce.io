function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function onProcess(o,t){
    $("#"+o).find('button').attr('disabled','disabled').text(t)
}

function endProcess(o,t){
    $("#"+o).find('button').removeAttr('disabled').text(t)
}

const getDateFromString = str => {
    const date = str.split("T")[0];
    const time = str.split(".")[0].split('T')[1];
    str = date+" "+time
    return new Date(str);
}
function ucwords(s){
    var str = s.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

function setSession(){
    localStorage.setItem('id',res.data.id);
    localStorage.setItem('name',res.data.name);
    localStorage.setItem('phone',res.data.phone);
    localStorage.setItem('email',res.data.email);
    localStorage.setItem('createdat',getDateFromString(res.data.CreatedAt));

}

function removeSession(){
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('phone');
    localStorage.removeItem('email');
    localStorage.removeItem('createdat');
}

var getSession={
    "id"    : localStorage.getItem('id'),
    "name"  : localStorage.getItem('name'),
    "phone"  : localStorage.getItem('phone'),
    "email"  : localStorage.getItem('email'),
    "createdat"  : localStorage.getItem('createdat')
}

function getDate(d){
    var date = new Date();
    date.setDate(date.getDate() + parseInt(d))
    return date;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function notify(t,c){
    var name=localStorage.getItem('name')!=null?localStorage.getItem('name'):"";
    $.toast({
        heading: "Hi ..."+name,
        text: t,
        showHideTransition: 'slide',
        icon: c,
        position: 'bottom-right'
    })
}

function render(o,el,f){
    $(o).empty().html(el);
    f()
}

function showAlert(o,t,s){
    $(o).empty().html("<div class='alert alert-"+t+" role='alert'>"+s+"</div>");
}

const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src =FILE_URL;

            scriptEle.addEventListener("load", (ev) => {
                resolve({ status: true });
            });

            scriptEle.addEventListener("error", (ev) => {
                reject({
                    status: false,
                    message: `Failed to load the script ${FILE_URL}`
                });
            });

            document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
};

function getStatus(t){
    let status = "<div style='background-color:#e5eb34;color:#fff;'><center>Inactive</center></div>";
    
    if(t==1){
        status="<div style='background-color:#54AD70;color:#fff;'><center>Active</center></div>";
    }
    return status;
}
function getConnectionType(t){
    let contype=0;

    if(t==1){
        contype="Source"
    }
    if(t==2){
    contype="Destination"
    }
    if(t==3){
        contype="Source / Destination"
    }

    return contype;
}

function confirm(c,f){
    $.confirm({
        title           : 'Confirm!',
        icon            : 'fas fa-user',
        closeIconClass  : 'fa fa-close',
        theme           : 'supervan',
        closeIcon       : 'true',
        content         : c,
        animation       : 'none',
        animationSpeed  : 100,
        buttons: {
            confirm: {
                btnClass: 'btn-green',
                action:function(){
                    f()
                }
            },
            cancel: function(){
                
            }
        }      
    });
}

function alert(c){
    $.alert({
        title: 'Confirm!',
        content: c,
        animation: 'none',
    })
}




  