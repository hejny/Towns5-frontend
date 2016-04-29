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


        $("#map-out").find('.story').each(function(){

            var position = new T.Position($(this).attr('t:position'));
            r(position);

        });



    });




});
