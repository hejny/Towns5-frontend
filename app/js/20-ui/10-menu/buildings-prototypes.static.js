/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu creating and TOWNS.UI.Menu.dismantling buildings
 */
//======================================================================================================================
TOWNS.setNamespace('UI.Menu');


TOWNS.UI.Menu.Building = class {



    static start(prototypeId) {


        var building = TOWNS.User.object_prototypes.getById(prototypeId).clone();
        var attach_callback = function (position, rotation, size) {

            var building_clone = building.clone();
            building_clone.x = position.x;
            building_clone.y = position.y;

            building_clone.getModel().rotation = rotation;
            building_clone.getModel().size = size;

            create(building_clone, function () {


                r('Building created on server!!!');

            });


            TOWNS.Map.scene.addBuilding(building_clone);



        };


        if (dragging_subtypes.indexOf(building.subtype) === -1) {

            TOWNS.Map.scene.mode('CREATING_POINT',building, attach_callback);

        } else {

            TOWNS.Map.scene.mode('CREATING_LINE',building, attach_callback);

        }

    }




    static dismantlingStart(){


        TOWNS.Map.scene.mode('CREATING_CIRCLE',null,function(position,rotation,size){

            objects_server
                .filterTypes('building')
                .filterRadius(position,size)
                .forEach(function(object){

                    deleteObject(object.id);

            });

            TOWNS.Map.loadMap(false);

        });


    }




};

