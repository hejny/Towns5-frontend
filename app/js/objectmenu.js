// [PH] -> [Matusko]  Přepsal jsem PHP skript na JS

var objectmenu_template;


$(function() {

    objectmenu_template = $('#objectmenu-inner').html();


});

//======================================================================================================================

function objectMenu(){
    r('objectMenu');


    $('#objectmenu').stop(true,true);

    if(map_selected_ids.length>0){

        //--------------------------------------------------

        var id=map_selected_ids[0];


        //r(id)
        var object_data;
        for(var i=0,l=map_data.length;i<l;i++){

            if(map_data[i].id==id){
                //r(map_data[i]);
                object_data=map_data[i];
                break;

            }

        }

        var objectmenu='';

        var icon,content;


        //r(map_data[i].func);

        for(var key in object_data.func){

            //object_data.func[key]
            // todo funkce

            icon='media/image/icon/f_'+(object_data.func[key].class)+'.png';
            content='<h2>'+key+id+'</h2>' +
                '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
                '<button>Postaviť drist!</button>';


            objectmenu+=objectmenu_template.split('%icon').join(icon).split('%content').join(htmlEncode(content));

            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');



        }


        for(i=0;i<5;i++)
            objectmenu+='<br>';


        $('#objectmenu-inner').html(objectmenu);

        uiScript();

        //--------------------------------------------------

        $('#objectmenu').animate({left:0}, 200);
    }else{

        $(".action-wrapper").removeClass("active");
        $('#objectmenu').animate({left:-60}, 200);

    }



}