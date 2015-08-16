// [PH] -> [Matusko]  Přepsal jsem PHP skript na JS

var objectmenu_template;


$(function() {

    objectmenu_template = $('#objectmenu-inner').html();


});

//----------------------------------------------------------------------

function objectMenu(){



    $('#objectmenu').stop(true,true);

    if(map_selected_uids.length>0){

        //--------------------------------------------------

        var uid=map_selected_uids[0];

        var objectmenu='';

        var content='<h2>'+uid+'</h2>' +
            '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio eligendi et ex fuga mollitia nisi obcaecati possimus sint, tenetur vitae? A aspernatur officiis quas quis ratione. Atque fugit optio suscipit?</p> ' +
            '<button>Postaviť drist!</button>';


        for(i=0;i<50;i++){


            objectmenu+=objectmenu_template.split('%i').join(i).split('%content').join(content);
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