


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



T.Plugins.install(new T.Page(
    'register',
    Locale.get('page','register'),
    `


<div id="login-error" class="hidden"></div>




 <form id="login-form" class="form-big">

    <table>

        `/*+`
        <tr>
            <th colspan="2">`+Locale.get('user','basic')+`</th>
        </tr>
        `*/+`

        <tr>
            <td>*`+Locale.get('user','username')+`:</td>
            <td><input type="text" name="username" placeholder="`+Locale.get('user','username','placeholder')+`" value="xxx" required autofocus autocomplete="off"></td>
        </tr>


        <tr>
            <td>*`+Locale.get('user','password')+`:</td>
            <td><input type="text" name="password" autocomplete="off" required></td>
        </tr>
        <tr>
            <td>*`+Locale.get('user','password','again')+`:</td>
            <td><input type="text" name="password-again" autocomplete="off" required></td>
        </tr>


        <tr>
            <td>`+Locale.get('user','email')+`:</td>
            <td><input type="email" name="username" placeholder="`+Locale.get('user','email','placeholder')+`" value="aa@bb" autocomplete="on"></td>
        </tr>



        `/*+`
        <tr>
            <th colspan="2">`+Locale.get('user','extended')+`</th>
        </tr>

        <tr>
            <td>`+Locale.get('user','name')+`:</td>
            <td><input type="text" name="name"></td>
        </tr>
        <tr>
            <td>`+Locale.get('user','surname')+`:</td>
            <td><input type="text" name="surname"></td>
        </tr>

        <tr>
            <td>`+Locale.get('user','birthday')+`:c</td>
            <td><input type="date" name="birthday"></td>
        </tr>

        <tr>
            <th colspan="2">`+Locale.get('user','description')+`</th>
        </tr>
        <tr>
            <td colspan="2"><textarea name="description" class="full"></textarea></td>
        </tr>

        `*/+`

        <tr>
            <td colspan="2"><input type="submit" value="`+Locale.get('user','register')+`"></td>
        </tr>


    </table>





</form>









`
,function(){

        $('#login-form').find('input').change(function(e){

            r('changed');
            unsetInputError(this);

        });



        $('#login-form').submit(function(e){

            e.preventDefault();

            var data={};

            //todo form to json
            $(this).find('input').each(function(){


                if($(this).attr('type')=='submit')return;
                //r(this);

                var key=$(this).attr('name');
                key=key.split('-').join('_');

                r(key);

                data[key]=$(this).val();

            });


            if(data.password!==data.password_again){


                setInputError($("input[name='password-again']")[0],Locale.get('user','password','again','notsame'));


            }else{



                var password=data.password;
                delete data.password;
                delete data.password_again;

                townsAPI.post('users',{
                    "profile": data,
                    "login_methods": {
                        password
                    },
                    "contacts": [],
                    "language" : "cs"//todo language
                },
                {},
                function(response){
                    r(response);

                },
                function(response){

                    setInputError($("input[name='username']")[0],Locale.get('user','username','taken'));

                }
                );


            }



        });



        /*{
            "username": "Janko11",
            "name": "Jano",
            "surname": "Mrkvicka",
            "birthday": "11.11.1911",
            "description": "Som Janko a mam rad mrkvicku",
            "image": "cdn.towns.cz/users/profileimages/janko.jpg",
            "email": "jano@mrkvicka.cz"
        }*/


    },
    undefined,
    'SMALL'
));

