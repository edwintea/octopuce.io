
/////////////////////// Templates ////////////////////////////
let Templates={
    showAll    :   function(e){
        Ajax(Api.Templates.GetAllByUserId(getSession.id).URL,Api.Templates.GetAllByUserId(getSession.id).Method,"",function(){
            e()
        })
    },
    showBySize    :   function(t,e){
        Ajax(Api.Templates.GetSizeByUserId(getSession.id,t).URL,"GET","",function(){
            e()
        })
    },
    showCurrentTab(){
        
        switch(localStorage.getItem('tab')){
            case "all":
                Templates.default();
                break;
            case "horizontal":
                Templates.showBySize('horizontal',function(){
                    render('.templates',Templates.viewData(),()=>{
                        Templates.handler()
                    })
                })
                break;
            case "vertical":
                Templates.showBySize('vertical',function(){
                    render('.templates',Templates.viewData(),()=>{
                        Templates.handler()
                    })
                })
                break;
            case "square":
                Templates.showBySize('square',function(){
                    render('.templates',Templates.viewData(),()=>{
                        Templates.handler()
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
        Templates.showAll(function(){
            render('.templates',Templates.viewData(),()=>{
                Templates.handler()
            })
        })
    },
    viewData   :   ()=>{
        el="";
            if(res.data.length > 0){
                $.each(res.data,function(i,e){
                    var size="";
                    if(e.size=="vertical"){
                        size=e.size+" (9:16)"
                    }
                    if(e.size=="horizontal"){
                        size=e.size+" (9:16)"
                    }
                    if(e.size=="vertical"){
                        size=e.size+" (16:9)"
                    }
                    if(e.size=="square"){
                        size=e.size+" (1:1)"
                    }

                    el+="<div class='col-md-4' style='margin-top:0.5%;'>";
                        el+="<div class='card p-3'>";
                            el+="<div class='d-flex flex-row mb-3'>";
                                el+="<img src='assets/images/img_cover_video.png' width='100%'>";
                                //el+="<div class='d-flex flex-column ml-2'><span>Stripe</span><span class='text-black-50'>Payment Services</span><span class='ratings'>";
                                //el+="<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i></span></div>";
                            el+="</div>";
                            el+="<h6>"+e.name+"</h6>";
                            el+="<h4>"+size+"</h4>";
                            el+="<div class='d-flex justify-content-between install mt-3'><span>"+e.category+"</span>";
                            el+="<div class='dropdown'>";
                                el+="<button class='btn' type='button' data-toggle='dropdown'><i class='fa fa-ellipsis-v' aria-hidden='true'></i>";
                                el+="<span class='caret'></span></button>";
                                el+="<ul class='dropdown-menu'>";
                                    el+="<li><a href='#' class='btnRenameTemplates' data-id='"+e.id+"' data-name='"+e.name+"'>Rename</a></li>";
                                    el+="<li><a href='#' class='btnDuplicateTemplates' data-id='"+e.id+"' data-name='"+e.name+"'>Duplicate</a></li>";
                                    el+="<li><a href='#' class='btnDeleteTemplates' data-id='"+e.id+"' data-name='"+e.name+"'>Delete</a></li>";
                                el+="</ul>";
                            el+="</div>";
                            
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                })
            }else{
                el+="<div class='col-md-12'><div class='alert alert-warning'>Empty Records</div></div>";
            }
        return el;
    },
    handler:()=>{
        $('.nav-link').each(function(i,e){
            $(e).off().on('click',function(){
                let show = $(e).data('show');
                localStorage.setItem('tab',show)
                Templates.showCurrentTab()
            })
        })

        $.each($('.btnRenameTemplates'),function(i,e){
            $(e).off().on('click',function(){
                let id=$(e).data('id');
                let name=$(e).data('name')
        
                $.confirm({
                    title: '<span class="fas fa-link"></span> Rename Templates',
                    animation:'none',
                    content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
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
                                
                                Ajax(Api.Templates.template_rename(id),'POST',{name:name},function(){
                                    notify(res.message,"info")
                                    Templates.showCurrentTab()
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

        $.each($('.btnDeleteTemplates'),function(i,e){
            $(e).on('click',function(){
                let id=$(e).data('id');
                let label=$(e).data('name')
                confirm("Are you sure want to delete your Templates for <b>"+label+"</b> ?",()=>{
                    Ajax(Api.Templates.Delete.URL,Api.Templates.Delete.Method,{id:id},function(){
                        notify(res.message,"info")
                        Templates.showCurrentTab()
                    })
                })
                return false;
            })
        })
    },
    init    :  ()=>{
        
        Templates.default();

        $('.btnAddTemplates').on('click',function(){

            $.confirm({
                title: '<span class="fas fa-tag"></span> Add Templates',
                animation:'none',
                columnClass: 'medium',
                content: '' +
                '<form action="" class="formName">' +
                    '<div class="form-group">' +
                        '<input type="text" name="txtNameTemplates" id="txtNameTemplates" placeholder="Templates Name" class="name form-control text-field txtNameTemplates" required />' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<select id="txtTypeTemplates" name="txtTypeTemplates" class="type form-control text-field category" required />'+
                            '<option value="">-- Choose Type --</option>'+
                            '<option value="Video To Video">Video to Video</option>'+
                            '<option value="Video To Audio">Video to Audio</option>'+
                        '</select>'+
                    '</div>' +
                    '<div class="form-group">' +
                        '<select id="txtTypeTemplates" name="txtTypeTemplates" class="type form-control text-field size" required />'+
                            '<option value="">-- Choose Size --</option>'+
                            '<option value="square">Square (1:1)</option>'+
                            '<option value="vertical">Vertical (9:16)</option>'+
                            '<option value="horizontal">Horizontal (16:9)</option>'+
                        '</select>'+
                    '</div>' +
                '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Save',
                        btnClass: 'btn-green',
                        action: function () {
                            var name = this.$content.find('.name').val();
                            var category = this.$content.find('.category').find(':selected').val();
                            var size = this.$content.find('.size').find(':selected').val();

                            if(!name){
                                notify("Please provide valid name","error")
                                return false;
                            }

                            if(!category){
                                notify("Please provide valid Category","error")
                                return false;
                            }
                            if(!size){
                                notify("Please provide valid size","error")
                                return false;
                            }
                            
                            Ajax(Api.Templates.Save.URL,'POST',{userid:localStorage.getItem('id'),name:name,category:category,size:size},function(){
                                notify(res.message,"info")
                                Templates.showCurrentTab()
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
    }
}