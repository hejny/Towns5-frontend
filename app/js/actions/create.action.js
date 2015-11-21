/**

 ███████╗     ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗
 ██╔════╝    ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝
 █████╗      ██║     ██████╔╝█████╗  ███████║   ██║   █████╗
 ██╔══╝      ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝
 ██║         ╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗
 ╚═╝          ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
 © Towns.cz

 * @fileOverview Building and creating objects functions

 */


//======================================================================================================================


//----------------Změny kumulované uživatelem na objektech (budovy, pribehy,...)


var map_object_changes=Storage.load('map_object_changes','[]');

/*var map_object_changes_=map_object_changes;
setTimeout(function(){
    window_open('',map_object_changes_);
},2000);*/



try {
    map_object_changes=JSON.parse(map_object_changes);
}
catch(err) {
    map_object_changes=[];
}

//----------------

function saveMapObjectChangesToStorage(){

    Storage.save('map_object_changes',JSON.stringify(map_object_changes));
}

//----------------

function saveMapTerrainChangesToStorage(){

    Storage.save('map_terrain_changes',JSON.stringify(map_terrain_changes));
}


//----------------


var map_object_changes_buffer=[];//Preview eg. walls
var map_object_changes_move=[];//Moving objects

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


function createBuilding(object){

    var distance,distances=[];


    for (var i = 0,l=map_object_changes.length; i < l; i++){

        if((distance=Math.xy2dist(map_object_changes[i].x-object.x,map_object_changes[i].y-object.y))<0.7*map_model_size){


            distances.push({i: i,distance: distance});
            //map_object_changes.slice(i,1);
            //i--;l--;


        }


    }


    if(distances.length>0){

        distances.sort(function (a, b) {

            if (a.distance > b.distance) {
                return (1);
            } else if (a.distance < b.distance) {
                return (-1);
            } else {
                return (0);
            }

        });

        if(0){

            delete map_object_changes[distances[0].i];
            map_object_changes[distances[0].i]=object;
        }else{



            if(is(map_object_changes[distances[0].i].res_node)) {

                map_object_changes[distances[0].i].res=map_object_changes[distances[0].i].res_node;
                //delete map_object_changes[distances[0].i].res_node;


            }

            if(is(object.res_node)) {



                if(map_object_changes[distances[0].i].res_node==object.res_node){

                    object.res='';

                }else{

                    object.res=object.res_node;

                }

            }

            map_object_changes[distances[0].i].res=
                Model.model2model(
                    map_object_changes[distances[0].i].res
                    ,object.res
                    ,false
                    ,(object.x-map_object_changes[distances[0].i].x)*100/map_model_size
                    ,(object.y-map_object_changes[distances[0].i].y)*100/map_model_size
                );

            delete map_object_changes[distances[0].i].res_node;
            delete map_object_changes[distances[0].i].res_path;

            //todo vyresit spojovani ruzne velkych budov

            return(object.id);

        }

    }else{


        object.id=generateID();
        map_object_changes.push(object);

        return(object.id);

    }

}

//======================================================================================================================


function createStory(object){

    object.id=generateID();
    map_object_changes.push(deepCopy(object));

    return(object.id);

}

