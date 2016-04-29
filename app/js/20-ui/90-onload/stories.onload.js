/**
 * @author Towns.cz
 * @fileOverview Load and display stories
 */
//======================================================================================================================

$(function(){


    T.TownsAPI.townsAPI.get('stories',{latest:true},function(result){

        console.log(stories);

        var html = '';


        var stories=new T.Objects.Array(result);//todo refactor TownsAPI should return T.Objects.Array
        stories.forEach(function(story){

            html+='<div class="story" t:position="'+story.getPosition()+'">'/*+story.getPosition()*/+'xx</div>';//

        });




        $('#map-out').html(html);


        T.UI.Map.mapOutRefresh = function(){

            //var map_center = T.UI.Map.map_center;
            //var map_center_ = map_center.clone().multiply(-1);

            $("#map-out").find('.story').each(function () {

                var position = new T.Position($(this).attr('t:position'));

                /*var positionPolar = position.plus(map_center_).getPositionPolar();
                positionPolar.distance = positionPolar.distance*0.9;
                position = positionPolar.getPosition().plus(map_center);*/


                mouseCenterposition = T.UI.Map.Coords.convertPositionToMouseCenterPosition(position);


                if(mouseCenterposition.y<60){

                    /*(
                    (window_height/2)-mouseCenterposition.y
                        /
                    (window_height/2)-60
                    )*/

                    mouseCenterposition.y=60;
                }

                if(mouseCenterposition.x<0){
                    mouseCenterposition.x=0;
                }



                $(this)
                    .css('position', 'fixed')
                    .css('left', mouseCenterposition.x)
                    .css('top', mouseCenterposition.y)
                ;


                //r(mouseCenterposition);


            });
        };




    });




});
