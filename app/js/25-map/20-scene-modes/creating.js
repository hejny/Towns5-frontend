/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================

//todo unattach to clearup scene
T.Map.Scene.prototype.attachObjectCreating = function(object,callback){

    var self = this;

    if (object.type == 'building') {


        var mesh = createModel('creating-object', object.getModel(), self.scene, self.materials, {}, {}, self.shadow_generator);




        self.prev_meshes.push(mesh);


        self.onPointerDown = function (evt) {

        };

        self.onPointerUp = function (evt) {

            /*var position = new T.Position(
             mesh.position.x/MAP_FIELD_SIZE+map_center.x,
             -mesh.position.z/MAP_FIELD_SIZE+map_center.y
             );*/

            var position = self.babylonToPosition(mesh.position);


            this.attachMapDefault();
            callback(position,T.Math.rad2deg(mesh.rotation.y),1);


        };


        self.onPointerMove = function (evt) {

            var scene_position = self.getPositionOnMesh(self.terrain_mesh,evt);


            mesh.position.x=scene_position.x;
            mesh.position.z=scene_position.z;
            mesh.position.y = self.terrain_mesh.getHeightAtCoordinates(mesh.position.x, mesh.position.z);


            //

        };


        self.onMouseWheel = function (e) {


            if (e.deltaY > 0) {

                mesh.rotation.y -= T.Math.deg2rad(10);

            } else {

                mesh.rotation.y += T.Math.deg2rad(10);
            }


        };




    }
    if(object.type == 'terrain'){


        self.onPointerDown = function (evt) {

        };

        self.onPointerUp = function (evt) {

            /*var position = new T.Position(
             self.selection_circle.position.x/MAP_FIELD_SIZE+map_center.x,
             -self.selection_circle.position.z/MAP_FIELD_SIZE+map_center.y
             );*/
            var position = self.babylonToPosition(self.selection_circle.position);


            this.attachMapDefault();
            callback(position,0,self.selection_circle_radius);


        };

        self.selection_circle_material = new BABYLON.StandardMaterial("selection_circle_material", self.scene);
        self.selection_circle_material.diffuseTexture = new BABYLON.Texture(T.Cache.backgrounds.get('t'+object.getCode()+'s0').src+'&raw', self.scene);


        self.selection_circle_radius=object.design.data.size;

        self.onPointerMove = function (evt) {

            if(self.selection_circle)
                self.selection_circle.dispose();

            var scene_position = self.getPositionOnMesh(self.terrain_mesh,evt);
            var radius = self.selection_circle_radius*MAP_FIELD_SIZE;


            self.selection_circle =
                createGroundRingMesh('tube', radius, 1, scene_position, self.terrain_mesh,  self.scene , 20 , 5)

            self.selection_circle.position.x = scene_position.x;
            self.selection_circle.position.z = scene_position.z;

            self.selection_circle.material = self.selection_circle_material;


        };


        self.onMouseWheel = function (e) {


            if (e.deltaY > 0) {

                self.selection_circle_radius=self.selection_circle_radius*1.2;

            } else {

                self.selection_circle_radius=self.selection_circle_radius/1.2;
            }


        };



    }


};