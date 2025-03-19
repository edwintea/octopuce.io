$(function(){
var App = {
      initial : function(){
        App.modal();
      },
      menus : function(){

        $('.actBoxMenu').click(function(){
            $(".box-menus").css({"right" : "0px"});
            $("#main-content").css({"marginRight" : "320px"});
            $(".box-menu-overlay").css({
              "backgroundColor": "rgba(0,0,0,0.6)",
              "position" : "fixed",
              "width" : "100%",
              "height" : "100%",
              "top" : "0",
              "right" : "0",
              "z-index" : "99999"
            }); 
            $(".modal-overlay-menu").css({"display" : "block"});
        });
        $('.actCloseMenu').click(function(){
            $(".box-menus").css({"right": "-320px"});
            $("#main-content").css({"marginRight" : "0px"});
            $(".box-menu-overlay").css({
              "width" : "0"
            });
            $(".modal-overlay-menu").css({"display" : "none"});
        });

        /* Upload File */
        $(document).on('change', ':file', function() {
          var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        $(document).ready( function() {
            $(':file').on('fileselect', function(event, numFiles, label) {

                var input = $(this).parents('.upload-document').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if( input.length ) {
                    input.val(log);
                } else {
                    if( log ) alert(log);
                }

            });
        });
      },
      modal : function(){ 
        $('.actDemo').click(function(){
          $('#viewModalDemo').modal();
          $('.vLogin').show();
          $('.vRegister').hide();
          $('.vPass').hide();
          $('.vConfirmRegister').hide();
          $('.vConfirmPass').hide();
        });

        $('.actLogin').click(function(){
          $('#viewModalDemo').modal();
          $('.vLogin').show();
          $('.vRegister').hide();
          $('.vPass').hide();
          $('.vConfirmRegister').hide();
          $('.vConfirmPass').hide();
        });

        $('.actRegister').click(function(){
          $('#viewModalDemo').modal();
          $('.vLogin').hide();
          $('.vRegister').show();
          $('.vPass').hide();
          $('.vConfirmRegister').hide();
          $('.vConfirmPass').hide();
        });

        /*
        $('.actConfirmRegister').click(function(){
          
          $('#viewModalDemo').modal();
          $('.vLogin').hide();
          $('.vRegister').hide();
          $('.vPass').hide();
          $('.vConfirmRegister').show();
          $('.vConfirmPass').hide();
          
        });

        */
        $('.actPass').click(function(){
          $('#viewModalDemo').modal();
          $('.vLogin').hide();
          $('.vRegister').hide();
          $('.vPass').show();
          $('.vConfirmRegister').hide();
          $('.vConfirmPass').hide();
        });

        /*
        $('.actConfirmPass').click(function(){
          
          $('#viewModalDemo').modal();
          $('.vLogin').hide();
          $('.vRegister').hide();
          $('.vPass').hide();
          $('.vConfirmRegister').hide();
          $('.vConfirmPass').show();
          
        });
        */

        $('.actShare').click(function(){
          $('#viewModalShare').modal();
        });

        /*
        $('.actLogout').click(function(){
          $('#viewModalLogout').modal();
        });
        */

        $('.actEditProfile').click(function(){
          $('#viewModalEditProfile').modal();
        });

        $('.actEditAccount').click(function(){
          $('#viewModalEditAccount').modal();
        });

      }
  };

  App.initial();  

});