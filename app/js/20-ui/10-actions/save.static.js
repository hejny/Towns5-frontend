/**
 * @author ©Towns.cz
 * @fileOverview Load object data from T.Storage
 */
//======================================================================================================================
//todo create T.UI.Actions or solve actions in towns-shared


function saveObject(object){//todo delete this and use direct API

    var i = T.ArrayFunctions.id2i(objects_external,object.id);


    //----------------Sending to API


    if(!is(object.stop_time)){
        //-------------------------------Update or create new



        if(i==-1){
            r('saveObject: Creating new object');
            objects_external.push(object);//Create new
        }else{
            r('saveObject: Updating existing object');
            objects_external[i]=object;//Update
        }


        T.TownsAPI.townsAPI.post('objects',object,function(response){

            object.id=response.objectId;
            r('object was send to server',object);


        });

        //-------------------------------
    }else{
        //-------------------------------Delete

        r('saveObject: Deleting object');

        if(i==-1)throw Error('Object do not exists.');


        T.TownsAPI.townsAPI.delete('objects/'+objects_external[i].id,function(response){

            r('object '+objects_external[i].id+' was deleted in server');

        });

        objects_external.splice(i,1);

        //-------------------------------
    }
    //----------------



}
