/**
 * @author ©Towns.cz
 * @fileOverview Building and creating objects functions
 */
//======================================================================================================================
//todo create T.UI.Actions or solve actions in towns-shared



function generateID(){
    //todo here should we generate object IDs

    return('tmp'+Math.round(Math.random()*1000000000));

}


//======================================================================================================================
//todo create Static object Actions


function create(object,callback=false){

    //todo sounds ion.sound.play("door_bump");

    var x=Math.round(object.x);
    var y=Math.round(object.y);

    x=x-Math.round(map_center.x)+map_radius;
    y=y-Math.round(map_center.y)+map_radius;


    /*if([1/!*,5*!/,11].indexOf(map_bg_data[y][x])!==-1){
        return(false);
    }*/

    var updatedID=false;

    /*if(object.type=='terrain'){updatedID=createTerrain(object,callback);}else
    if(object.type=='building'){updatedID=createBuilding(object,callback);}else
    if(object.type=='story'){updatedID=createStory(object,callback);}else
    {throw 'Unknown object type';}*/

    object.id=generateID();
    saveObject(object,callback);



    trackEvent('functions','create',object.name);



    //---------------------------------------

    return(object.id);

}


//======================================================================================================================


function createNewOrJoin(object){
    //todo ?? maybe use DI

    var distance,distances=[];


    for (var i = 0,l=objects_server.length; i < l; i++){
        if(objects_server[i].type=='building'){

            var bothDistances=0;

            bothDistances+=objects_server[i].getModel().range('xy');
            bothDistances+=object.getModel().range('xy');

            bothDistances=bothDistances/100;//todo better


            if((distance=T.TMath.xy2dist(objects_server[i].x-object.x,objects_server[i].y-object.y))<bothDistances*map_model_size){


                distances.push({i: i,distance: distance});
                //objects_external.slice(i,1);
                //i--;l--;


            }
        }
    }


    if(distances.length>0) {

        distances.sort(function (a, b) {

            if (a.distance > b.distance) {
                return (1);
            } else if (a.distance < b.distance) {
                return (-1);
            } else {
                return (0);
            }

        });



        //todo better
        var xy=T.TMath.xyRotate(
            (object.x-objects_server[distances[0].i].x)*10,//map_model_size,
            (object.y-objects_server[distances[0].i].y)*10,//map_model_size,

            //0
            //2*(map_rotation-45)
            -45+2*(map_rotation-45)

        );

        //xy.x=-xy.x;//todo better
        xy.y=-xy.y;


        return {
            'i': distances[0].i,
            'id': objects_server[distances[0].i].id,
            'xy': xy
        };


    }else{

        return(false);
    }



    }



//==========================================================createTerrain

/*
function createTerrain(object,callback){//todo maybe create other

    object.id=generateID();
    saveObject(object.clone());//todo refactor

    if(callback)callback();

    return(object.id);

}


//==========================================================createStory

function createBuilding(object,callback){

    var join;

    if (dragging_subtypes.indexOf(object.subtype)==-1){

        join=createNewOrJoin(object);

    }else{

        join=false;

    }




    if(join=== false) {
        //------------------------------------------------------------Normal building
        r('createBuilding: Normal building');

        object.id=generateID();

        if(object.subtype=='block'){

            object.subtype='main';
        }


        saveObject(object);

        if(callback)callback();


        return(object.id);

        //------------------------------------------------------------
    }else{
        //------------------------------------------------------------Join buildings
        r('createBuilding: Join buildings');
        r(join.xy);


        objects_external[join.i].getModel().joinModel(
                    object.design.data,
                    join.xy.x,
                    join.xy.y
            );


        objects_external[join.i].subtype='main';


        T.TownsAPI.townsAPI.post('objects/prototypes/',objects_external[join.i],function(response){

            T.TownsAPI.townsAPI.delete('objects/'+objects_external[join.i].id,function(){

                T.TownsAPI.townsAPI.post('objects',{
                    prototypeId: response.prototypeId,
                    x: objects_external[join.i].x,
                    y: objects_external[join.i].y

                },function(){

                    if(callback)callback();


                });


            });





        });




        return(objects_external[join.i].id);

        //------------------------------------------------------------

    }

}




//==========================================================createStory

function createStory(object,callback){

    object=object.clone();
    object.id=generateID();

    //objects_server.update(object);

    //callback(object.id);
    saveObject(object,callback);//todo refactor

    return(object.id);

}
*/

//======================================================================================================================
//==========================================================definePrototype

//todo where this function should be?
function definePrototype(objectReference,forceSubtype){
    r('definePrototype');
    r(forceSubtype);

    var object=objectReference.clone();

    object.id=generateID();
    delete object.x;
    delete object.y;
    //delete object.;//todo all not prototype parameters

    if(is(forceSubtype)){
        object.subtype=forceSubtype;
    }

    r(object);
    T.User.object_prototypes.push(object);


}

//======================================================================================================================

function definePrototypeUI(objectReference,forceSubtype){

    definePrototype(objectReference,forceSubtype);
    message(T.Locale.get('defined prototype '+objectReference.type+' '+objectReference.subtype),'success');

}
