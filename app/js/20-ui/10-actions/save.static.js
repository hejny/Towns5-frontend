/**
 * @author ©Towns.cz
 * @fileOverview Load object data from T.Storage
 */
//======================================================================================================================
//todo create T.UI.Actions or solve actions in towns-shared


function saveObject(object,callback){

    //objects_server.update(object);//Create new
    objects_server.push(object);


    T.TownsAPI.townsAPI.post('objects',object,function(response){

        object.id=response.objectId;

        r('object was send to server',object);

        if(callback)callback(object.id);



    });

    //-------------------------------


}


function deleteObject(id,callback){

    objects_server.removeId(id);//Create new

    T.TownsAPI.townsAPI.delete('objects/'+id,function(response){

        r('object was deleted on server',response);

        if(callback)callback(true);

    },function(response){

        r('object was NOT deleted on server',response);

        if(callback)callback(false);

    });

    //-------------------------------


}
//todo dismantle or delete