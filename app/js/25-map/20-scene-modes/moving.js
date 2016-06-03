/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================


T.Map.Scene.prototype.attachMapMoving = function(){


    var self = this;//todo different name for Babylon and Towns scene


    var startingPoint;
    var currentMesh;


    self.onPointerDown = function (evt) {


        if (evt.button !== 0) {
            return;
        }

        // check if we are under a mesh
        var pickInfo = self.scene.pick(
            self.scene.pointerX,
            self.scene.pointerY
            //function (mesh) { return mesh === self.ground_mesh; }
        );



        if(pickInfo.hit){

            r('Selecting');

            var pickedMesh = (pickInfo.pickedMesh);

            while(typeof pickedMesh._parentNode!=='undefined'){
                pickedMesh = pickedMesh._parentNode;
            }

            map_selected_ids=[pickedMesh.name];

            if(self.selected_circle) {
                self.selected_circle.dispose();
            }

            var radius = 1*MAP_FIELD_SIZE;
            self.selected_circle =//todo unite selection circles
                createGroundRingMesh('tube', radius, 1, pickedMesh.position, self.terrain_mesh,  self.scene , 20/*todo as const*/ , 5/*todo as const*/);

            self.prev_meshes.push(self.selected_circle);
            self.selected_circle.material = self.selected_circle_material;


        }else{

            r('Starting');

            whole_diff={x:0,z:0};


            currentMesh = pickInfo.pickedMesh;
            startingPoint = self.getPositionOnMesh(self.ground_mesh,evt);

            //r(currentMesh,startingPoint);
        }

    };

    self.onPointerUp = function (evt) {
        if (startingPoint) {


            r('Finito');
            //self.camera.attachControl(self.canvas, true);

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
    self.onPointerMove = function (evt) {
        if (!startingPoint) {
            return;
        }

        var current = self.getPositionOnMesh(self.ground_mesh,evt);

        if (!current) {
            return;
        }

        //r(startingPoint.x,current.x);
        var diff = startingPoint.subtract(current);
        //self.camera.target.addInPlace(diff);

        whole_diff.x+=diff.x;
        whole_diff.z+=diff.z;


        self.camera.target.x+=diff.x;
        self.camera.target.z+=diff.z;


        //self.light.position.x+=diff.x;
        //self.light.position.z+=diff.z;

        //startingPoint = current;

    };


    self.onMouseWheel = function (e) {

        if(e.deltaY>0){

            self.camera.target.y -=10;

        }else{

            self.camera.target.y +=10;
        }

    };

};
