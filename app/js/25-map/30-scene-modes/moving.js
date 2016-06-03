/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================


T.Map.Scene.prototype.attachMapMoving = function(){


    var scene = this;//todo different name for Babylon and Towns scene


    var startingPoint;
    var currentMesh;


    scene.onPointerDown = function (evt) {

        r(evt);

        if (evt.button !== 0) {
            return;
        }

        // check if we are under a mesh
        var pickInfo = scene.scene.pick(
            scene.scene.pointerX,
            scene.scene.pointerY
            //function (mesh) { return mesh === scene.ground_mesh; }
        );


        r(pickInfo);


        if (!pickInfo.hit) {

            r('Starting');

            whole_diff={x:0,z:0};

            currentMesh = pickInfo.pickedMesh;
            startingPoint = scene.getPositionOnMesh(scene.ground_mesh,evt);

            //r(currentMesh,startingPoint);
        }

    };

    scene.onPointerUp = function (evt) {
        if (startingPoint) {


            r('Finito');
            //scene.camera.attachControl(scene.canvas, true);

            //todo Babylon(x,z) Mapping to Towns(x,y) CONSTANTS
            var moved_by = new T.Position(
                whole_diff.x/MAP_FIELD_SIZE,
                -whole_diff.z/MAP_FIELD_SIZE
            );

            map_center.plus(moved_by);
            T.URI.write();
            startingPoint = null;


            T.UI.Map.loadMap();



            return;
        }
    };


    var whole_diff;
    scene.onPointerMove = function (evt) {
        if (!startingPoint) {
            return;
        }

        var current = scene.getPositionOnMesh(scene.ground_mesh,evt);

        if (!current) {
            return;
        }

        //r(startingPoint.x,current.x);
        var diff = startingPoint.subtract(current);
        //scene.camera.target.addInPlace(diff);

        whole_diff.x+=diff.x;
        whole_diff.z+=diff.z;


        scene.camera.target.x+=diff.x;
        scene.camera.target.z+=diff.z;


        //scene.light.position.x+=diff.x;
        //scene.light.position.z+=diff.z;

        //startingPoint = current;

    };


    scene.onMouseWheel = function (e) {

        if(e.deltaY>0){

            scene.camera.target.y -=10;

        }else{

            scene.camera.target.y +=10;
        }

    };

};
