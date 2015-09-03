// [PH] -> [Matusko]  Přepsal jsem PHP skript na JS

var objectmenu_template;


$(function() {

    objectmenu_template = $('#objectmenu-inner').html();


});

//----------------------------------------------------------------------

function objectMenu(){
    r('objectMenu');


    $('#objectmenu').stop(true,true);

    if(map_selected_ids.length>0){

        //--------------------------------------------------

        var id=map_selected_ids[0];


        r(id);
        for(var i= 0,l=map_data.length;i<l;i++){

            if(map_data[i].id==id){
                r(map_data[i]);


            }

        }

        var icon='media/image/icon/f_dismantle.png';

        var objectmenu='';

        var content='<h2>'+id+'</h2>' +
            '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
            '<button>Postaviť drist!</button>';


        for(i=0;i<50;i++){


            // todo funkce

            objectmenu+=objectmenu_template.split('%icon').join(icon).split('%i').join(i).split('%content').join(content);
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