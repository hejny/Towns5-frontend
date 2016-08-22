/**
 * @author ©Towns.cz
 * @fileOverview Profile viewer
 */
//======================================================================================================================


TOWNS.Plugins.install(new TOWNS.Plugins.Viewer(
    'profile-viewer'
    ,{
        type: 'building'
    }
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


        new TOWNS.ModelCanvas('model-canvas',object.design.data,'100%','100%',null,1);


        var price = game.getObjectPrice(object).toHTML();
        var maxlife = game.getObjectMaxLife(object).toTOWNS.LocaleString();


        var html='<table  class="full_width">';



        html+='<tr><th colspan="2"><h2>'+object.name+'</h2></th></tr>';
        html+='<tr><td>'+TOWNS.Locale.get('object','price')+'</td><td>'+price+'</td></tr>';
        html+='<tr><td>'+TOWNS.Locale.get('object','maxlife')+'</td><td>'+maxlife+'</td></tr>';



        object.actions.forEach(function(action){

            html+='<tr><th colspan="2">'+TOWNS.Locale.get('action',action.type)+'</th></tr>';

            for(var key in action.params){

                html+='<tr><td>'+TOWNS.Locale.get('action',action.type,key)+'</td><td>'+action.params[key].toTOWNS.LocaleString()+'</td></tr>';

            }


        });

        html+='</table>';

        $('#profile-viewer-price').html(html);




    }


));