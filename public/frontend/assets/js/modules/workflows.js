/////////////////////// WORKFLOWS ////////////////////////////

let Workflows={
    source :   {
        id      :   "",//refer to id connections
        token   :   "",
        name    :   "",
        label   :   "",
        icon    :   "",
        type    :   "",
        action  :   ""
        
    },
    destination :   {
        id      :   "",//refer to id connections
        token   :   "",
        name    :   "",
        label   :   "",
        icon    :   "",
        type    :   ""
    },
    params:    {
        "userid"            :   localStorage.getItem('id'),
        "name"              :   "",
        "publish_mode"      :   "1",
        "status"            :   "1",
        "source_id"         :   "0",
        "source_type"       :   "default",
        "source_media_ype"  :   "default",
        "source_connection" :   "default",
        "source_playlist"   :   "default",
        "source_video_type" :   "default",
        "source_folder"     :   "default",
        "source_action"     :   "default",
        "destination_id"            :   "0",
        "destination_type"          :   "default",
        "destination_media_ype"     :   "default",
        "destination_connection"    :   "default",
        "destination_playlist"      :   "default",
        "destination_video_type"    :   "default",
        "destination_folder"        :   "default",
        "destination_action"        :   "default"
    },
    showAll    :   function(e){
        Ajax(Api.Workflows.GetAllByUserId(getSession.id).URL,"GET","",function(){
            e()
        })
    },
    default:()=>{
        //default
        $('input').val('');
        $('.btnAddWorkflow').show()
        $('.workflow_data').show()
        $("#wizard").hide()
        $('#smartwizard').smartWizard("reset");

        Workflows.showAll(function(){
            render('.workflow_data',Workflows.viewData('card'),()=>{
                Workflows.handler()
            })
        })

    },
    viewData   :   (type)=>{
        el="";
            if(res.data.length > 0){
                $.each(res.data,function(i,e){
                    
                    el+="<div class='col-xs-12 col-sm-6 col-md-4'>";
                        el+="<div class='image-flip' >";
                            el+="<div class='mainflip flip-0'>";
                                el+="<div class='frontside'>";
                                    el+="<div class='card'>";
                                        el+="<div class='card-body text-center'>";
                                            el+="<p>";
                                                el+="<img class='img-fluid' style='width:20%;height:20%;' src='/frontend/assets/images/icons/"+e.source_image+"' />";
                                                el+=" <img  style='width:15%;height:15%;' src='/assets/images/elements/double_arrow.png' /> ";
                                                el+="<img class='img-fluid' style='width:20%;height:20%;' src='/frontend/assets/images/icons/"+e.destination_image+"' />";
                                            
                                            el+="</p>";
                                            el+="<p><img  src='/assets/images/icons/logo.png' alt='card image'></p>";
                                            el+="<h4 class='card-title'>"+e.name+"</h4>";
                                            el+="<p class='card-text'>This is basic card with image on top, title, description and button.</p>";
                                            el+="<a href='https://www.fiverr.com/share/qb8D02' class='btn btn-primary btn-sm'><i class='fa fa-plus'></i></a>";
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";
                                el+="<div class='backside'>";
                                    el+="<div class='card'>";
                                        el+="<div class='card-body text-center mt-4'>";
                                            el+="<h4 class='card-title'>"+e.name+"</h4>";
                                            el+="<p class='card-text'>This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.</p>";
                                            el+="<ul class='list-inline'>";
                                                el+="<li class='list-inline-item'>";
                                                    el+="<a class='social-icon text-xs-center' target='_blank' href='https://www.fiverr.com/share/qb8D02'>";
                                                        el+="<i class='fa fa-facebook'></i>";
                                                    el+="</a>";
                                                el+="</li>";
                                                el+="<li class='list-inline-item'>";
                                                    el+="<a class='social-icon text-xs-center' target='_blank' href='https://www.fiverr.com/share/qb8D02'>";
                                                        el+="<i class='fa fa-twitter'></i>";
                                                    el+="</a>";
                                                el+="</li>";
                                                el+="<li class='list-inline-item'>";
                                                    el+="<a class='social-icon text-xs-center' target='_blank' href='https://www.fiverr.com/share/qb8D02'>";
                                                        el+="<i class='fa fa-skype'></i>";
                                                    el+="</a>";
                                                el+="</li>";
                                                el+="<li class='list-inline-item'>";
                                                    el+="<a class='social-icon text-xs-center' target='_blank' href='https://www.fiverr.com/share/qb8D02'>";
                                                        el+="<i class='fa fa-google'></i>";
                                                    el+="</a>";
                                                el+="</li>";
                                            el+="</ul>";
                                        el+="</div>";
                                    el+="</div>";
                                el+="</div>";
                            el+="</div>";
                        el+="</div>";
                    el+="</div>";
                })
            }else{
                el+="<div class='col-md-12' >";
                    el+="<div class='alert alert-warning'>Empty Records</div>";
                el+="</div>";
            }
        return el;
    },
    handler:(element=null)=>{
        $('.nav-link').each(function(i,e){
            $(e).off().on('click',function(){
                let show = $(e).data('show');
                
                localStorage.setItem('tab',show)

            })
        })

        $('.btnAddWorkflow').off().on('click',function(){
            $(this).hide();
            $('.workflow_data').hide();
            $('#wizard').show();
            $('.title_name').text(localStorage.getItem('name'))

            /*
            tinymce.init({
                selector:'textarea#description',
                setup: function (editor) {
                    editor.on('keyup', function (e) {
                        console.debug('Editor contents was modified. Contents: ' + editor.getContent({
                            format: 'text'
                        }));
                    });
                }
            });

            */

            
            
            Connections.showGroupByChanel(function(){
                var el="<option value=''>-- Choose Your Source Type --</option>";
                if(res.data.length > 0){
                    $.each(res.data,function(i,e){
                        el+="<option value='"+e.m_id+"'>"+e.m_label+"</option>";
                    })
                    
                }

                render('#optFormWorkflowSourceType',el,()=>{
                    Workflows.handler()
                })

            })

            // Toolbar extra buttons
            var btnFinish = $('<button></button>')
                .text('Finish')
                .addClass('btn btn-info btn-finish')
                .on('click', function(){
                    if( !$(this).hasClass('disabled')){
                        var elmForm = $("#myForm");
                        if(elmForm){
                            elmForm.validator('validate');
                            var elmErr = elmForm.find('.has-error');
                            if(elmErr && elmErr.length > 0){
                                notify('Oops we still have error in the form\n make sure to fill all data','error');

                                return false;
                            }else{
                                //alert('Great! we are ready to submit form');
                                //elmForm.submit();
                                confirm("Are you sure want to create workflows ?",()=>{
                                    //save workflows
                                    //SET DATA
                                    Workflows.params.name=$('#txtWorkflowName').val()
                                    Workflows.params.source_id=$('#optFormWorkflowSourceConnectionName').find(':selected').val();
                                    Workflows.params.source_type=$('#optFormWorkflowSourceType').find(':selected').text();

                                    Workflows.params.destination_id=$('#optFormWorkflowDestinationConnectionName').find(':selected').val();
                                    Workflows.params.source_type=$('#optFormWorkflowDestinationType').find(':selected').text();

                                    Workflows.params.source_action=$('#optFormWorkflowAction').find(':selected').val();
                                    Workflows.params.source_video_type=$('#optFormWorkflowTypeVideo').find(':selected').val();



                                    Ajax(Api.Workflows.Save.URL,"POST",Workflows.params,function(){
                                        notify(res.message,"info")
                                        Workflows.default()
                                    })
                                    
                                })

                                
                                return false;
                            }
                        }
                    }
                });

            var btnCancel = $('<button></button>')
                .text('Cancel')
                .addClass('btn btn-danger')
                .on('click', function(){
                    Workflows.default()
                    $('#myForm').find("input, select , textarea").val("");
                });



            // Smart Wizard
            $('#smartwizard').smartWizard({
                selected: 0,
                theme: 'dots',
                transitionEffect:'fade',
                toolbarSettings: {toolbarPosition: 'bottom',
                    toolbarExtraButtons: [btnFinish, btnCancel]
                },
                anchorSettings: {
                    markDoneStep: true, // add done css
                    markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
                    removeDoneStepOnNavigateBack: true, // While navigate back done step after active step will be cleared
                    enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
                }
            }).show();

            $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
                var elmForm = $("#form-step-" + stepNumber);
                // stepDirection === 'forward' :- this condition allows to do the form validation
                // only on forward navigation, that makes easy navigation on backwards still do the validation when going next
                if(stepDirection === 'forward' && elmForm){
                    elmForm.validator('validate');
                    var elmErr = elmForm.children('.has-error');
                    if(elmErr && elmErr.length > 0){
                        // Form validation failed
                        return false;
                    }
                }
                return true;
            });

            $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection) {
                // Enable finish button only on last step
                if(stepNumber == 4){
                    $('.btn-finish').removeClass('disabled');
                }else{
                    $('.btn-finish').addClass('disabled');
                }
            });

            
            $('#optFormWorkflowSourceType').off().on('change',function(){
                var a=$(this).find(':selected').val();
                localStorage.setItem('notThisChanel',a)

                
                Connections.GetMineOfChanel(function(){
                    var el="<option value=''>-- Choose Your Connection Name --</option>";
                    if(res.data.length > 0){
                        $.each(res.data,function(i,e){
                            el+="<option value='"+e.id+"' data-tok='"+e.access_token+"' data-name='"+e.name+"' data-label='"+e.label+"' data-icon='"+e.link_image+"' data-m_name='"+e.m_name+"'>"+e.name+"</option>";
                        })
                    }
    
                    render('#optFormWorkflowSourceConnectionName',el,()=>{
                        Workflows.handler()
                    })
    
                })
            

                Connections.showGroupNotByChanel(function(){
                    var el="<option value=''>-- Choose Your Destination Type --</option>";
                    if(res.data.length > 0){
                        $.each(res.data,function(i,e){
                            el+="<option value='"+e.m_id+"'>"+e.m_label+"</option>";
                        })
                        
                    }

                    render('#optFormWorkflowDestinationType',el,()=>{
                        Workflows.handler()
                    })
    
                })

                
            })

            $('#optFormWorkflowSourceConnectionName').off().on('change',function(){
                
                Workflows.source.id=$(this).find(':selected').val();
                Workflows.source.token=$(this).find(':selected').data('tok');
                Workflows.source.name=$(this).find(':selected').data('name');
                Workflows.source.label=$(this).find(':selected').data('label');
                Workflows.source.icon=$(this).find(':selected').data('icon');
                Workflows.source.type=$(this).find(':selected').data('m_name');
                Workflows.source.action=$('.optFormWorkflowAction').find(':selected').val();
                
                localStorage.setItem('notThisChanelId',Workflows.source.id)

                $('.img-source').empty().html("<img  width='50px;' height='50px;' src='/assets/images/icons/"+Workflows.source.icon+"' /> ")

            })

            $('#optFormWorkflowDestinationConnectionName').off().on('change',function(){
                
                Workflows.destination.id=$(this).find(':selected').val();
                Workflows.destination.token=$(this).find(':selected').data('tok');
                Workflows.destination.name=$(this).find(':selected').data('name');
                Workflows.destination.label=$(this).find(':selected').data('label');
                Workflows.destination.icon=$(this).find(':selected').data('icon');
                Workflows.destination.type=$(this).find(':selected').data('m_name');
                
                $('.img-destination').empty().html("<img width='50px;' height='50px;' src='/assets/images/icons/"+Workflows.destination.icon+"' /> ")


                console.log(Workflows.destination)
            })

            $('#optFormWorkflowDestinationType').off().on('change',function(){
                var a=$(this).find(':selected').val();
                localStorage.setItem('notThisChanel',a)

                Connections.GetMineOfChanel(function(){
                    var el="<option value=''>-- Choose Your Connection Name --</option>";
                    if(res.data.length > 0){
                        $.each(res.data,function(i,e){
                            el+="<option value='"+e.id+"' data-tok='"+e.access_token+"' data-name='"+e.name+"' data-label='"+e.label+"' data-icon='"+e.link_image+"' data-m_name='"+e.m_name+"'>"+e.name+"</option>";
                        })
                        
                    }
    
                    render('#optFormWorkflowDestinationConnectionName',el,()=>{
                        Workflows.handler()
                    })
    
                })
            })
    
        })
    },
    init    :  ()=>{
        
        notify("You build your workflows here...","info")
        Workflows.default();
        Workflows.handler();
    }
}