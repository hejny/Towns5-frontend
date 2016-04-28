/**
 * @author ©Towns.cz
 * @fileOverview Load objects prototypes
 */
//======================================================================================================================
T.setNamespace('User');



T.User.loadObjectPrototypes=function(callback=false){


    T.TownsAPI.townsAPI.get('objects/prototypes',{},function(response){

        r('LOADED prototypes');

        T.User.object_prototypes = new T.Objects.Array();

        response.forEach(function(object){

            var object_prototype=object;//.clone();


            object_prototype.prototypeId=object_prototype._id;
            object_prototype.id=object_prototype._id;


            T.User.object_prototypes.push(object_prototype);//todo refactor read object or new object

        });


        if(callback!=false){
            callback();
        }

    },function(){

        r('NOT LOADED prototypes');

    });



};



T.User.loadObjectPrototypes();//todo movo to other file