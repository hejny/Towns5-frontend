/**
 * @author Towns.cz
 * @fileOverview Load and display stories
 */
//======================================================================================================================

$(function(){


    T.TownsAPI.townsAPI.get('stories',{latest:true},function(result){

        //console.log(stories);

        var html = '';


        var stories=new T.Objects.Array(result);//todo refactor TownsAPI should return T.Objects.Array
        //stories.forEach(function(story){map_out_ids.push(story.id);});


        var $stories_html=$(T.UI.Map.storiesHTML(stories));
        $stories_html.each(function () {
            $(this).css('border','3px solid #FB9500');
        });

        //$stories_html.find('.story').append('<i class="fa fa-arrow-up" aria-hidden="true"></i>');
        //r($stories_html);

        $('#map-out').html($stories_html.outerHTML());


        T.UI.Map.mapOutRefresh = function(){


            //return;


            var bounds={
                top: 60,
                bottom: window_height,
                left: 0,
                right: window_width-60
            };


            //var map_center = T.UI.Map.map_center;
            //var map_center_ = map_center.clone().multiply(-1);

            $("#map-out").find('.story').each(function () {

                var $this=$(this);

                var width = parseInt($this.css('width'));
                var height = parseInt($this.css('height'));

                var position = new T.Position($this.attr('t:position'));
                var anchor = new T.Position($this.attr('t:anchor'));

                /*var positionPolar = position.plus(map_center_).getPositionPolar();
                positionPolar.distance = positionPolar.distance*0.9;
                position = positionPolar.getPosition().plus(map_center);*/


                screenPosition = T.UI.Map.Coords.convertPositionToScreenPosition(position);
                screenPosition.x-=anchor.x;
                screenPosition.y-=anchor.y;



                var out = false;

                //----------------------------------
                if(screenPosition.y<bounds.top){out = true;

                    screenPosition.x= T.Math.proportions(

                        screenPosition.y,
                        bounds.top,
                        (window_height/2),
                        screenPosition.x,
                        (window_width/2)

                    );

                    screenPosition.y=bounds.top;

                }else
                if(screenPosition.y>bounds.bottom-height){out = true;

                    screenPosition.x= T.Math.proportions(

                        screenPosition.y,
                        bounds.bottom-height,
                        (window_height/2),
                        screenPosition.x,
                        (window_width/2)

                    );

                    screenPosition.y=bounds.bottom-height;
                }
                //------------
                if(screenPosition.x<bounds.left){out = true;

                    screenPosition.x= T.Math.proportions(

                        screenPosition.x,
                        bounds.left,
                        (window_width/2),
                        screenPosition.y,
                        (window_height/2)

                    );

                    screenPosition.x=bounds.left;

                }else
                if(screenPosition.x>bounds.right-width){out = true;

                    screenPosition.x= T.Math.proportions(

                        screenPosition.x,
                        bounds.right-width,
                        (window_width/2),
                        screenPosition.y,
                        (window_height/2)

                    );

                    screenPosition.x=bounds.right-width;

                }
                //----------------------------------

                if(out){

                    $this
                        .css('position', 'fixed')
                        .css('left', screenPosition.x)
                        .css('top', screenPosition.y)




                        .show()
                    ;

                }else{

                    $this.hide();

                }



            });
        };




    });




});
