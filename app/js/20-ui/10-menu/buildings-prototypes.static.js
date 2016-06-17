/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu creating and T.UI.Menu.dismantling buildings
 */
//======================================================================================================================
T.setNamespace('UI.Menu');


T.UI.Menu.Building = class {



    static start(prototypeId) {


        var building = T.User.object_prototypes.getById(prototypeId).clone();
        var attach_callback = function (position, rotation, size) {

            building.x = position.x;
            building.y = position.y;

            building.getModel().rotation = rotation;
            building.getModel().size = size;

            create(building, function () {


                r('Building created on server!!!');

            });


        };


        if (dragging_subtypes.indexOf(building.subtype) === -1) {

            T.UI.Map.scene.mode('CREATING_POINT',building, attach_callback);

        } else {

            T.UI.Map.scene.mode('CREATING_LINE',building, attach_callback);

        }

    }




    static dismantlingStart(){


        T.UI.Map.scene.mode('CREATING_CIRCLE',null,function(position,rotation,size){

            objects_server
                .filterTypes('building')
                .filterRadius(position,size)
                .forEach(function(object){

                    deleteObject(object.id);

            });

            T.Map.loadMap(false);

        });


    }




};

