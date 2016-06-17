/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================

//todo modeUnattach to clearup scene
T.Map.Scene.prototype.attachCREATING_LINE = function(object,callback){


    var self = this;

    
    /*


    if(object.type==='building'){

        var mesh = 

    }else{

        throw new Error('attachObjectCreatingPoint can be called only with building.');

    }
    
    self.prev_meshes.push(mesh);

    /**/




    var starting_position=null,
        ending_position;
    self.onLeftDown = function (evt) {

        starting_position = self.babylonToPosition(self.getPositionOnTerrainMesh());

    };


    self.onLeftUp = function (evt) {


        //r(starting_position,ending_position);

        var position;

        for (var i= 0,l=meshes.length; i < l; i++) {
            self.prev_meshes.push(meshes[i]);

            position = self.babylonToPosition(meshes[i].position);
            degrees = self.babylonToRotation(meshes[i].rotation.y);
            callback(position,degrees,1);

        }


        starting_position=null;

    };

    
    var meshes = [];

    self.onPointerMove = function (evt) {

        if(!starting_position){
            return;
        }

        ending_position = self.babylonToPosition(self.getPositionOnTerrainMesh());


        var distance = starting_position.getDistance(ending_position);

        var particles = Math.ceil(distance/2);

        var i;
        if(meshes.length<particles) {

            for (i=meshes.length; i < particles; i++) {
                
                meshes[i]=createModel('creating-object', object.getModel(), self.scene, self.materials, {}, {}, self.shadow_generator);

            }

        }else
        if(meshes.length>particles) {


            for (i=particles; i < meshes.length; i++) {

                meshes[i].dispose();

            }
            meshes.splice(particles,meshes.length-particles);

        }
        

        var position = starting_position.clone();
        var diff_polar = ending_position.clone().multiply(-1).plus(starting_position).getPositionPolar();
        diff_polar.distance = -1*2;
        var diff = diff_polar.getPosition();

        var rad = diff_polar.getRadians();


        var l=meshes.length;
        for (i=0; i < l; i++) {

            meshes[i].position=self.positionToBabylon(position);
            meshes[i].position.y = self.terrain_mesh.getHeightAtCoordinates(meshes[i].position.x, meshes[i].position.z);

            meshes[i].rotation.y = rad;

            position.plus(diff);
            
        }
        


        //r(particles);


    };




    self.onMouseWheel = function (e) {};




};