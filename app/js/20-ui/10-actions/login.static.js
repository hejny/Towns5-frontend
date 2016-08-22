/**
 * @author ©Towns.cz
 * @fileOverview Login / Register functions
 */
//======================================================================================================================
//todo create TOWNS.UI.Actions or solve actions in towns-shared



//todo udelat funkci login jako login(username,password)
function loginFormSubmit(){

    $('#login-error').removeClass();
    $('#login-error').addClass('info');
    $('#login-error').html('<i class="fa fa-spinner faa-spin animated"></i> Loading');

    //alert(1);
    var username=$('#username').val();
    var password=$('#password').val();



    if(username===''){
        $('#login-error').removeClass();
        $('#login-error').addClass('error');
        $('#login-error').text('!Username');
    }




    townsApi(
        [
            'login',
            username,
            'towns',
            password

        ],
        function(res){

            r(res);

            if(typeof res.error !== 'undefined'){

                $('#login-error').removeClass();
                $('#login-error').addClass('error');
                $('#login-error').text(res.error);

            }else{


                TOWNS.UI.popupWindow.close();

            }


        }

    );


}









