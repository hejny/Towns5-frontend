/**
 * Created by Pavel on 05.09.2015.
 */


function loginFormSubmit(){

    //alert(1);
    var username=$('#username').val();
    var password=$('#password').val();

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
                alert(res.error);
            }


        }

    )


};









