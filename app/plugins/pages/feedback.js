


/**
 * @author ©Towns.cz
 * @fileOverview Login page
 */
//======================================================================================================================



TOWNS.Plugins.install(new TOWNS.Plugins.Page(
    'feedback',
    TOWNS.Locale.get('page','feedback'),
    `



 <form id="feedback-form" class="form-big">

    <table>


        <tr>
            <td>`+TOWNS.Locale.get('user','email')+`:</td>
            <td><input style="width: 100%;" type="email" name="email"  autofocus></td>
        </tr>


        <tr>
            <td colspan="2"><textarea name="text"  style="width:100%;height: 130px;"></textarea></td>
        </tr>

        <tr>
            <td colspan="2">
            <button style="width: 150px;">`+TOWNS.Locale.get('send')+`</button>
            </td>
        </tr>

    </table>


</form>


`
    ,function(){



        $('#feedback-form').find('button').click(function(){
            $('#feedback-form').trigger('submit');
        });


        $('#feedback-form').submit(function(e){

            e.preventDefault();

            var data={};

            //todo form to json
            $(this).find('input,textarea').each(function(){

                if($(this).attr('type')=='submit')return;

                var key=$(this).attr('name');
                key=key.split('-').join('_');

                //r(key);

                data[key]=$(this).val();

            });


            $('#feedback-form').find('button').html(TOWNS.Locale.get('loading')+' <i class="fa fa-spinner faa-spin animated"></i>');


            r(data);

            var request = $.post(
                appDir+'/php/feedback.php',
                data
            );
            request.done(function( response ){

                $('#login-form').find('button').html(TOWNS.Locale.get('send'));
                TOWNS.UI.popupWindow.close();
                TOWNS.UI.Message.success(TOWNS.Locale.get('feedback','success'));

            });
            request.fail(function( response ){

            });




        });





    },
    undefined,
    'SMALL'
));

