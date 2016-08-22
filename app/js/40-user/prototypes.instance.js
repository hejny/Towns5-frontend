/**
 * @author ©Towns.cz
 * @fileOverview Load objects prototypes
 */
//======================================================================================================================
TOWNS.setNamespace('User');



TOWNS.User.loadObjectPrototypes=function(attempt){

    attempt++;

    TOWNS.TownsAPI.townsAPI.get('objects/prototypes',{},function(response){

        r('LOADED prototypes');

        TOWNS.User.object_prototypes = new TOWNS.Objects.Array();

        response.forEach(function(object){

            var object_prototype=object;//.clone();


            object_prototype.prototypeId=object_prototype._id;
            object_prototype.id=object_prototype._id;


            TOWNS.User.object_prototypes.push(object_prototype);//todo refactor read object or new object

        });


    },function(){


        if(attempt<5){

            TOWNS.User.loadObjectPrototypes(attempt);
            throw new Error('Cant load objects prototypes, loading again.');

        }else{

            throw new Error('Cant load objects prototypes.');

        }



    });



};



TOWNS.User.loadObjectPrototypes(0);//todo move to other file