/**
 * @author Towns.cz
 * @fileOverview  Mouse wheel events
 */
//======================================================================================================================

$(function(){

    mouseWheel=function (e) {

        //e.preDefault();
        r('T.UI Event: mousewheel');

        if(specialCursor==true && building==false){

            if(e.deltaY>0){
                //todo sounds ion.sound.play("door_bump");
                selecting_distance+=100;
            }else{
                //todo sounds ion.sound.play("door_bump");
                selecting_distance-=100;
            }
            updateSelectingDistance();


        }else
        if(building!==false){

            if(e.deltaY>0){
                //todo sounds ion.sound.play("door_bump");
                building.design.data.rotation+=10;
            }else{
                //todo sounds ion.sound.play("door_bump");
                building.design.data.rotation-=10;
            }

            //r(building.rot);


            T.UI.Menu.Building.update();

        }else
        {

            /*if(e.deltaY>0){
             map_zoom_delta = 0.4;//e.deltaY *2;
             }else{
             map_zoom_delta = -0.4;//e.deltaY *2;
             }*/


        }



        Map.updateMap();


    };


    $('#map_drag').mousewheel(mouseWheel);
    $('#selecting-distance').mousewheel(mouseWheel);

});