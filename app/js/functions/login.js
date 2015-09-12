/**
 * Created by Pavel on 05.09.2015.
 */


function loginFormSubmit(){

    $('#login-error').removeClass();
    $('#login-error').addClass('info');
    $('#login-error').html('<i class="fa fa-spinner faa-spin animated"></i> Loading');

    //alert(1);
    var username=$('#username').val();
    var password=$('#password').val();



    if(username==''){
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


                window_close();

            }


        }

    )


};









