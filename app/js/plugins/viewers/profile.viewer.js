/**
 * @author ©Towns.cz
 * @fileOverview Profile viewer
 */
//======================================================================================================================


T.Plugins.install(new T.Viewer(
    'profile-viewer'
    ,{}
    ,'Profil'
    ,`

    <div class="page-column-2">
        <div id="profile-viewer-price">name</div>
    </div>

    <div class="page-column-2">
        <div id="model-canvas"></div>
    </div>

    `
    ,function(object){


        new ModelCanvas('model-canvas',object.design.data,'100%','100%',null,1);


        var price = game.getObjectPrice(object).toHTML();
        var maxlife = game.getObjectMaxLife(object).toLocaleString();


        var html='<table  class="full_width">';



        html+='<tr><th colspan="2"><h2>'+object.name+'</h2></th></tr>';
        html+='<tr><td>'+Locale.get('object','price')+'</td><td>'+price+'</td></tr>';
        html+='<tr><td>'+Locale.get('object','maxlife')+'</td><td>'+maxlife+'</td></tr>';



        object.actions.forEach(function(action){

            html+='<tr><th colspan="2">'+Locale.get('action',action.type)+'</th></tr>';

            for(var key in action.params){

                html+='<tr><td>'+Locale.get('action',action.type,key)+'</td><td>'+action.params[key].toLocaleString()+'</td></tr>';

            }


        });

        html+='</table>';

        $('#profile-viewer-price').html(html);




    }


));