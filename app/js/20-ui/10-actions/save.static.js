/**
 * @author ©Towns.cz
 * @fileOverview Load object data from T.Storage
 */
//======================================================================================================================
//todo create T.UI.Actions or solve actions in towns-shared


function saveObject(object,callback){

    objects_server.update(object);//Create new

    T.TownsAPI.townsAPI.post('objects',object,function(response){

        object = objects_server.getById(object.id)

        object.id=response.objectId;

        r('object was send to server',object);

        if(callback)callback(object.id);



    });

    //-------------------------------


}



//todo dismantle or delete