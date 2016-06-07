/**
 * @author ©Towns.cz
 * @fileOverview Babylon map - moving mode
 */
//======================================================================================================================

//todo unattach to clearup scene
T.Map.Scene.prototype.attachObjectCreatingLine = function(object,callback){

    r('attachObjectCreatingLine');

    var self = this;
    self.unattach();
    self.unattach = function () {
        //mesh.dispose();
    };


    
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
    self.onPointerDown = function (evt) {

        starting_position = self.babylonToPosition(self.getPositionOnMesh(self.ground_mesh,evt));

    };


    self.onPointerUp = function (evt) {


        r(starting_position,ending_position);

        starting_position=null;

    };

    
    var meshes = [];

    self.onPointerMove = function (evt) {

        if(!starting_position){
            return;
        }

        ending_position = self.babylonToPosition(self.getPositionOnMesh(self.ground_mesh,evt));


        var distance = starting_position.getDistance(ending_position);

        var particles = Math.ceil(distance/1.4);

        var i;
        if(meshes.length<particles) {

            for (i=meshes.length; i < particles; i++) {
                
                meshes[i]=createModel('creating-object', object.getModel(), self.scene, self.materials, {}, {}, self.shadow_generator);

            }

        }
        
        

        var position = starting_position.clone();
        var diff = ending_position.clone().multiply(-1).plus(starting_position).multiply(-1/particles);
        
        var l=meshes.length;
        for (i=0; i < l; i++) {

            meshes[i].position=self.positionToBabylon(position);
            meshes[i].position.y = self.terrain_mesh.getHeightAtCoordinates(meshes[i].position.x, meshes[i].position.z);

            position.plus(diff);
            
        }
        


        //r(particles);


    };




    self.onMouseWheel = function (e) {};




};