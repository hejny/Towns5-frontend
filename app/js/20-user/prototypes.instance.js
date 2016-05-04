/**
 * @author ©Towns.cz
 * @fileOverview Load objects prototypes
 */
//======================================================================================================================
T.setNamespace('User');



T.User.loadObjectPrototypes=function(attempt){

    attempt++;

    T.TownsAPI.townsAPI.get('objects/prototypes',{},function(response){

        r('LOADED prototypes');

        T.User.object_prototypes = new T.Objects.Array();

        response.forEach(function(object){

            var object_prototype=object;//.clone();


            object_prototype.prototypeId=object_prototype._id;
            object_prototype.id=object_prototype._id;


            T.User.object_prototypes.push(object_prototype);//todo refactor read object or new object

        });


    },function(){


        if(attempt<5){

            T.User.loadObjectPrototypes(attempt);
            throw new Error('Cant load objects prototypes, loading again.');

        }else{

            throw new Error('Cant load objects prototypes.');

        }



    });



};



T.User.loadObjectPrototypes(0);//todo move to other file