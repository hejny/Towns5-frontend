/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================

//todo unattach to clearup scene
T.Map.Scene.prototype.attachObjectCreatingCircle = function(object,callback){

    r('attachObjectCreatingCircle');

    var self = this;


    self.unattach();
    self.unattach = function () {

        if(self.selection_circle)
            self.selection_circle.dispose();

    };


    self.onLeftDown = function (evt) {

    };

    self.onLeftUp = function (evt) {

        /*var position = new T.Position(
         self.selection_circle.position.x/MAP_FIELD_SIZE+map_center.x,
         -self.selection_circle.position.z/MAP_FIELD_SIZE+map_center.y
         );*/
        var position = self.babylonToPosition(self.selection_circle.position);


        //this.attachMapDefault();
        callback(position,0,self.selection_circle_radius);


    };


    if(object) {

        self.selection_circle_radius = object.design.data.size;

        self.selection_circle_material = new BABYLON.StandardMaterial("selection_circle_material", self.scene);
        self.selection_circle_material.diffuseTexture = new BABYLON.Texture(T.Cache.backgrounds.get('t'+object.getCode()+'s0').src+'&raw', self.scene);

    }else{

        self.selection_circle_radius = 1;

        self.selection_circle_material = new BABYLON.StandardMaterial("selection_circle_material", self.scene);
        self.selection_circle_material.diffuseColor = new BABYLON.Color3(1, 0, 0);

    }









    self.onPointerMove = function (evt) {

        if(self.selection_circle)
            self.selection_circle.dispose();

        var scene_position = self.getPositionOnMesh(self.terrain_mesh);
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





};