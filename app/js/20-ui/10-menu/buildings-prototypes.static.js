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

            var building_clone = building.clone();
            building_clone.x = position.x;
            building_clone.y = position.y;

            building_clone.getModel().rotation = rotation;
            building_clone.getModel().size = size;

            create(building_clone, function () {


                r('Building created on server!!!');

            });


            T.Map.scene.addBuilding(building_clone);



        };


        if (dragging_subtypes.indexOf(building.subtype) === -1) {

            T.Map.scene.mode('CREATING_POINT',building, attach_callback);

        } else {

            T.Map.scene.mode('CREATING_LINE',building, attach_callback);

        }

    }




    static dismantlingStart(){


        T.Map.scene.mode('CREATING_CIRCLE',null,function(position,rotation,size){

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

