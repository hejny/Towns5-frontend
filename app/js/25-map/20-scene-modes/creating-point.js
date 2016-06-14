/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================

//todo unattach to clearup scene
T.Map.Scene.prototype.attachObjectCreatingPoint = function(object,callback){

    r('attachObjectCreatingPoint');

    var self = this;


    if(object.type==='building'){

        var mesh = createModel('creating-object', object.getModel(), self.scene, self.materials, {}, {}, self.shadow_generator);


    }else
    if(object.type==='story'){

        var mesh = createStoryMesh('creating-object', object, self.scene, self.shadow_generator);

    }else{

        throw new Error('attachObjectCreatingPoint can be called only with building or story.');

    }




    self.prev_meshes.push(mesh);


    self.unattach();
    self.unattach = function () {
        mesh.dispose();
    };


    self.onLeftDown = function (evt) {

    };

    self.onLeftUp = function (evt) {

        /*var position = new T.Position(
         mesh.position.x/MAP_FIELD_SIZE+map_center.x,
         -mesh.position.z/MAP_FIELD_SIZE+map_center.y
         );*/

        var position = self.babylonToPosition(mesh.position);


        this.attachMapDefault();
        callback(position,T.Math.rad2deg(mesh.rotation.y),1);


    };


    self.onPointerMove = function (evt) {

        var scene_position = self.getPositionOnTerrainMesh();


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




};