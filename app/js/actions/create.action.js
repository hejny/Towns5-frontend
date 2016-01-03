/**
 * @author ©Towns.cz
 * @fileOverview Building and creating objects functions
 */
//======================================================================================================================


function generateID(){
    //todo here should we generate object IDs

    return(Math.round(Math.random()*1000000000));

}


//======================================================================================================================

function create(object,nosave){
    if(typeof nosave =='undefined')nosave=false;

    if(!nosave)//todo sounds ion.sound.play("door_bump");

    var x=Math.round(object.x);
    var y=Math.round(object.y);

    x=x-Math.round(map_x)+Math.floor(map_size/2);
    y=y-Math.round(map_y)+Math.floor(map_size/2);


    /*if([1/!*,5*!/,11].indexOf(map_bg_data[y][x])!==-1){
        return(false);
    }*/

    var updatedID=false;

    if(object.type=='building'){updatedID=createBuilding(object);}else
    if(object.type=='story'){updatedID=createStory(object);}else
    {throw 'Unknown object type';}



    //---------------------------------------Save objects to local storage
    if(!nosave){

        r('saving objects');
        saveMapObjectChangesToStorage();


        trackEvent('functions','create',object.name);

    }else{
        //r('NO saving objects');
    }
    //---------------------------------------

    return(updatedID);

}

//----------------------------------------------------------------------------------------------------------------------

function createMulti(objects){
    for (var i = 0,l=objects.length; i < l; i++)
        create(objects[i],(i==l-1?false:true));

}


//======================================================================================================================


function createNewOrJoin(object){
    //todo ?? maybe use DI

    var distance,distances=[];


    for (var i = 0,l=map_object_changes.length; i < l; i++){

        var bothDistances=0;

        bothDistances+=map_object_changes[i].design.data.range('xy');
        bothDistances+=object.design.data.range('xy');

        bothDistances=bothDistances/2/100;//todo better


        if((distance=Math.xy2dist(map_object_changes[i].x-object.x,map_object_changes[i].y-object.y))<bothDistances*map_model_size){


            distances.push({i: i,distance: distance});
            //map_object_changes.slice(i,1);
            //i--;l--;


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




        var xy=Math.xyRotate((object.x-map_object_changes[distances[0].i].x)*100/map_model_size,(object.y-map_object_changes[distances[0].i].y)*100/map_model_size,45);


        return {
            'i': distances[0].i,
            'xy': xy
        };


    }else{

        return(false);
    }



    }



//======================================================================================================================


function createBuilding(object){


    var join = createNewOrJoin(object);

    if(join===false) {
        //------------------------------------------------------------Normal building

        object.id=generateID();

        if(object.subtype=='block'){

            object.subtype='main';
        }


        map_object_changes.push(object);

        return(object.id);

        //------------------------------------------------------------
    }else{
        //------------------------------------------------------------Join buildings


        if(0){

            delete map_object_changes[join.i];
            map_object_changes[join.i]=object;
        }else{




            map_object_changes[join.i].design.data.joinModel(
                        object.design.data,
                        join.xy.x,
                        join.xy.y
                );


            map_object_changes[join.i].subtype='main';


            /*delete map_object_changes[distances[0].i].res_node;
            delete map_object_changes[distances[0].i].res_path;*/


            return(map_object_changes[join.i].id);

        }

        //------------------------------------------------------------

    }

}

//======================================================================================================================


function createStory(object){

    object.id=generateID();
    map_object_changes.push(deepCopyObject(object));

    return(object.id);

}


//======================================================================================================================


//todo where this function should be?
function definePrototype(objectReference,forceSubtype){
    r('definePrototype');
    r(forceSubtype);

    var object=deepCopyObject(objectReference);

    object.id=generateID();
    delete object.x;
    delete object.y;
    //delete object.;//todo all not prototype parameters

    if(is(forceSubtype)){
        object.subtype=forceSubtype;
    }

    r(object);
    object_prototypes.push(object);


}

//======================================================================================================================

function definePrototypeUI(objectReference,forceSubtype){

    definePrototype(objectReference,forceSubtype);
    message(Locale.get('defined prototype '+objectReference.type+' '+objectReference.subtype),'success');

}
