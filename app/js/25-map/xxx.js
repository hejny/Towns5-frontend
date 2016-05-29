T.setNamespace('Map');

//var prevent=false;


T.Map.Scene = class{


    constructor() {


        var self = this;


        self.materials = {};//cache for materials


        var canvas = document.getElementById("map-canvas-new");
        console.log(canvas);


        var engine = new BABYLON.Engine(canvas, true, null, false);


        self.scene = new BABYLON.Scene(engine);


        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), self.scene);
        light.position = new BABYLON.Vector3(20, 40, 20);
        light.intensity = 1;


        self.shadow_generator = new BABYLON.ShadowGenerator(1024, light);
        self.shadow_generator.useVarianceShadowMap = true;
        self.shadow_generator.bias = 0.01;


        /*self.scene.fogMode = BABYLON.self.scene.FOGMODE_EXP;
         //BABYLON.self.scene.FOGMODE_NONE;
         //BABYLON.self.scene.FOGMODE_EXP;
         //BABYLON.self.scene.FOGMODE_EXP2;
         //BABYLON.self.scene.FOGMODE_LINEAR;
         self.scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
         self.scene.fogDensity = 0.001;*/


        // Need a free self.camera for collisions
        //var self.camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), self.scene);
        //self.camera.attachControl(canvas, true);

        //var self.camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, -8, -20), self.scene);
        //self.camera.attachControl(canvas, true);

        self.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI * (7 / 4), Math.PI / 8, 150, new BABYLON.Vector3(-10, 10, 2), self.scene);
        //self.camera.attachControl(canvas, true);


        self.camera.upperBetaLimit = Math.PI / 2;
        self.camera.target.y = 300;


        //-----------------------------------------------------------------------------------Constants
        global.MAP_FIELD_SIZE = 10;
        global.MAP_BUILDING_SIZE = 0.6;
        //-----------------------------------------------------------------------------------


        //-----------------------------------------------------------------------------------Ground
        self.ground_mesh = BABYLON.Mesh.CreateGround("water", 5000, 5000, 2, self.scene);


        var ground_mesh_material = new BABYLON.StandardMaterial("self.ground_mesh", self.scene);
        ground_mesh_material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        ground_mesh_material.alpha = 0.3;
        ground_mesh_material.freeze();

        self.ground_mesh.material = ground_mesh_material;


        self.ground_mesh.position.x = 0;
        self.ground_mesh.position.z = 0;

        self.ground_mesh.position.y = 0;
        self.ground_mesh.isPickable = false;

        self.ground_mesh.convertToUnIndexedMesh();
        //-----------------------------------------------------------------------------------


        //ddd


        //-----------------------------------------------------------------------------------SkyBox
        /**
         var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, self.scene);
         var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", self.scene);
         skyboxMaterial.backFaceCulling = false;
         skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/app/babylon-sample/textures/skybox/skybox", self.scene);
         skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
         skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
         skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
         skybox.material = skyboxMaterial;
         /**/
        //-----------------------------------------------------------------------------------


        //-----------------------------------------------------------------------------------Water WORLDMONGER
        var water = BABYLON.Mesh.CreateGround("water", 5000, 5000, 2, self.scene);


        var material = new WORLDMONGER.WaterMaterial("water", self.scene, light);
        material.freeze();
        //material.refractionTexture.renderList.push(self.terrain_mesh);
        //material.reflectionTexture.renderList.push(self.terrain_mesh);

        water.position.x = 0;//*20*size;
        water.position.z = 0;//*20*size;

        water.position.y = 20;
        water.material = material;
        water.isPickable = false;//todo

        water.convertToUnIndexedMesh();

        this.water = water;
        //-----------------------------------------------------------------------------------


        /**
         //When pointer down event is raised
         self.scene.onPointerDown = function (evt, pickResult) {
        // if the click hits the self.ground_mesh object, we change the impact position
        if (pickResult.hit) {

            //pickResult.pickedMesh.rotation.y += 0.1;
            //impact.position.x = pickResult.pickedPoint.x;
            //impact.position.y = pickResult.pickedPoint.y;
        }

        r(pickResult);
    };
         /**/





            //--------------------------------------------------------------------------------------------------------------

        self.loaded = false;
        self.assets = [];

        var loader = new BABYLON.AssetsManager(self.scene);

        var pos = function (t) {


            r('loaded mesh', t);

            t.loadedMeshes.forEach(function (m) {


                r('loaded mesh', m);

                self.assets.push(m);
                //m.rotation.x=-Math.PI/2;
                //m.material=-Math.PI/2;

                /*
                 var instance = m.createInstance('aaa');
                 instance.position = new BABYLON.Vector3(0,100,0);

                 instance.scaling.x=3;
                 instance.scaling.y=3;
                 instance.scaling.z=3;
                 /**/


            });

        };


        var tree = loader.addMeshTask("bane", "", "/media/3d/test/tree4/", "tree1.obj");
        //var bane = loader.addMeshTask("bane", "", "/app/babylon-sample/textures/", "bane.obj");
        //var bane = loader.addMeshTask("bane", "", "/app/babylon-sample/textures/", "skull.babylon");
        tree.onSuccess = pos;
        tree.onError = function (e) {

            r('ERROR loading mesh', e);
        };
        /*var cat = loader.addMeshTask("batman", "", "https://dl.dropboxusercontent.com/u/17799537/objFileLoader/Batman/", "Batman_Injustice.obj");
         cat.onSuccess = pos;

         /*var penguin = loader.addMeshTask("penguin", "", "https://dl.dropboxusercontent.com/u/17799537/objFileLoader/Penguin/", "Penguin.obj");
         penguin.onSuccess = pos;*/

        loader.onFinish = function () {
            engine.runRenderLoop(function () {

                self.scene.render();
                self.loaded = true;

            });
        };

        loader.load();
        //--------------------------------------------------------------------------------------------------------------



        var self = this;




        //==============================================================================================================

        /**/

        // Events
        var canvas = engine.getRenderingCanvas();

        self.getPositionOnMesh = function (mesh) {
            // Use a predicate to get position on the self.ground_mesh
            var pickinfo = self.scene.pick(
                self.scene.pointerX,
                self.scene.pointerY,
                function (picked_mesh) { return picked_mesh === mesh; }
            );

            if (pickinfo.hit) {
                //r(pickinfo);
                return pickinfo.pickedPoint;
            }

            return null;
        };



        canvas.addEventListener("pointerdown", function(event){self.onPointerDown(event);}, false);
        canvas.addEventListener("pointerup",   function(event){self.onPointerUp(event);}, false);
        canvas.addEventListener("pointermove", function(event){self.onPointerMove(event);}, false);
        $(canvas).mousewheel(function(event){self.onMouseWheel(event);});

        //--------------------------------------------------------------------------------------------------------------



        engine.runRenderLoop(function () {
            self.scene.render();

            $('#fps').html(engine.fps);
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });


        this.updatable=true;

        this.prev_meshes=[];


        this.attachMapDefault();
        
    }



    attachMapDefault(){
        this.attachMapMoving();
    }



    attachMapMoving(){
        
        var self = this;


        var startingPoint;
        var currentMesh;

        
        self.onPointerDown = function (evt) {

            r(evt);

            if (evt.button !== 0) {
                return;
            }

            // check if we are under a mesh
            var pickInfo = self.scene.pick(
                self.scene.pointerX,
                self.scene.pointerY
                //function (mesh) { return mesh === self.ground_mesh; }
            );


            r(pickInfo);


            if (!pickInfo.hit) {

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
                //self.camera.attachControl(canvas, true);

                //todo Babylon(x,z) Mapping to Towns(x,y) CONSTANTS
                var moved_by = new T.Position(
                    whole_diff.x/MAP_FIELD_SIZE,
                    -whole_diff.z/MAP_FIELD_SIZE
                );

                T.UI.Map.map_center.plus(moved_by);
                T.URI.write();
                startingPoint = null;


                T.UI.Map.scene.updatable=true;//todo REMOVE
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



            //startingPoint = current;

        };


        self.onMouseWheel = function (e) {

            if(e.deltaY>0){

                self.camera.target.y -=10;

            }else{

                self.camera.target.y +=10;
            }

        };

    }




    attachMapRotating(){

        var self = this;


        self.pointer_position=null;

        self.onPointerDown = function (evt) {

            self.pointer_position = {
                x: self.scene.pointerX,
                y: self.scene.pointerY
            };



        };

        self.onPointerUp = function (evt) {

            self.pointer_position=null;

        };


        self.onPointerMove = function (evt) {



            if (!self.pointer_position) {
                return;
            }


            var x = self.scene.pointerX-self.pointer_position.x;
            var y = self.scene.pointerY-self.pointer_position.y;

            //r(x,y);

            self.camera.alpha+=x/-500;
            self.camera.beta+=y/1000;

            //r(self.camera.beta,self.camera.alpha);

            self.pointer_position.x = self.scene.pointerX;
            self.pointer_position.y = self.scene.pointerY;
            

        };



    }




    attachObjectCreating(object,callback){

        var self = this;

        if (object.type == 'building') {


            var mesh = new Model('creating-object', object.getModel(), self.scene, self.materials, self.shadow_generator);




            self.prev_meshes.push(mesh);


            self.onPointerDown = function (evt) {

            };

            self.onPointerUp = function (evt) {

                var position = new T.Position(
                    mesh.position.x/MAP_FIELD_SIZE+T.UI.Map.map_center.x,
                    -mesh.position.z/MAP_FIELD_SIZE+T.UI.Map.map_center.y
                );


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

                var position = new T.Position(
                    self.selection_circle.position.x/MAP_FIELD_SIZE+T.UI.Map.map_center.x,
                    -self.selection_circle.position.z/MAP_FIELD_SIZE+T.UI.Map.map_center.y
                );


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
                var tes = 20;//Math.round(radius/100);
                var pi2 = Math.PI * 2;
                var step = pi2 / tes;
                var path = [];
                for (var i = 0; i < pi2; i += step ) {
                    var x = radius * Math.sin(i);
                    var z = radius * Math.cos(i);
                    var y = self.terrain_mesh.getHeightAtCoordinates(x+scene_position.x,z+scene_position.z)+1;

                    if(y<20)y=20;//todo water level as constant

                    path.push( new BABYLON.Vector3(x, y, z) );
                }
                path.push(path[0]);

               // var path_1 = path.slice(0, tes/2).reverse();
               // var path_2 = path.slice(tes/2+1);

                //r('paths',path_1,path_2);


                self.selection_circle = BABYLON.Mesh.CreateTube("tube", path, 1, 5, null, 0, self.scene, false, BABYLON.Mesh.FRONTSIDE);
                self.selection_circle.position.x = scene_position.x;
                self.selection_circle.position.z = scene_position.z;

                //self.selection_circle = BABYLON.Mesh.CreatePath("circle", path, self.scene);
                //self.selection_circle = BABYLON.Mesh.CreateRibbon("circle", [path_2,path_1], false, false, 0, self.scene);
                self.selection_circle.material = self.selection_circle_material;


            };


            self.onMouseWheel = function (e) {


                if (e.deltaY > 0) {

                    self.selection_circle_radius=self.selection_circle_radius*1.2;

                } else {

                    self.selection_circle_radius=self.selection_circle_radius/1.2;
                }


            };

            /*var terrain = object;


            self.onPointerDown = function (evt) {

            };

            self.onPointerUp = function (evt) {




            };


            self.from_center_position=new T.Position(0,0);

            self.onPointerMove = function (evt) {

                var scene_position = self.getPositionOnMesh(self.ground_mesh,evt);
                var position = new T.Position(
                    scene_position.x/MAP_FIELD_SIZE+map_radius,
                    -scene_position.z/MAP_FIELD_SIZE+map_radius
                );

                position.x=Math.round(position.x);
                position.y=Math.round(position.y);


                if(self.from_center_position.x!==position.x || self.from_center_position.y!==position.y) {

                    self.from_center_position = position;
                    r(position);

                    var map_of_terrain_codes = JSON.parse(JSON.stringify(self.map_of_terrain_codes));

                    map_of_terrain_codes[position.y][position.x] = 5;
                    self.updateTerrain(map_of_terrain_codes);

                }


            };*/



        }


    }



    updateTerrain(map_of_terrain_codes){

        //-----------------------------------------------------------------------------------Terrains

        var self = this;

        if(self.terrain_mesh){
            self.terrain_mesh.dispose();
        }


        var terrain_mesh_texture = new BABYLON.DynamicTexture("terrain_mesh_texture", 2048, self.scene, true);
        var ctx = terrain_mesh_texture.getContext();
        /*ctx.fillStyle="#FF0000";
         ctx.fillRect(10,10,2048-20,2048-20);*/




        var height_canvas = document.createElement('canvas');
        var height_canvas_px=1;
        height_canvas.width = map_radius*2*height_canvas_px;
        height_canvas.height = map_radius*2*height_canvas_px;
        var height_canvas_ctx = height_canvas.getContext('2d');



        var terrain_code, z;

        //r(map_of_terrain_codes);


        for(var y= -map_radius;y<map_radius;y++){
            for(var x= -map_radius;x<map_radius;x++){

                //r(y+map_radius);
                terrain_code = map_of_terrain_codes[y+map_radius][x+map_radius];


                if(terrain_code===false) {
                    z = 0;
                }
                if(terrain_code===1 || terrain_code===11){
                    z = 0;
                }else
                if(terrain_code===3 || terrain_code===7){
                    z = 0.7;
                }else
                if(terrain_code===5){
                    z = 1;
                }else
                if(terrain_code===4){
                    z = 0.15;
                }else{
                    z = 0.2;
                }

                z=Math.floor(z*255);

                height_canvas_ctx.fillStyle="rgb("+z+","+z+","+z+")";
                height_canvas_ctx.fillRect(
                    (x+map_radius)*height_canvas_px,
                    (y+map_radius)*height_canvas_px,
                    height_canvas_px
                    ,height_canvas_px
                );



                if(terrain_code!==false) {

                    ctx.drawImage(
                        T.Cache.backgrounds.get('t' + terrain_code + 's'+Math.floor(T.Math.randomSeedPosition(3,{x:x+T.UI.Map.map_center.x,y:y+T.UI.Map.map_center.y})*seedCount)%seedCount),
                        (x ) / map_radius / 2 * 2048 + 1024,
                        (y ) / map_radius / 2 * 2048 + 1024,
                        90, 90
                    );

                }



            }



        }

        height_canvas_ctx.blur(3);


        terrain_mesh_texture.update();

        //var self.terrain_mesh = BABYLON.Mesh.CreateGround("terrain", 1024, 1024, 4, self.scene);
        //var self.terrain_mesh = BABYLON.Mesh.CreateRibbon("ribbon", paths, false, false, 0, self.scene);


        self.terrain_mesh = CreateGroundFromCanvas("self.ground_mesh", height_canvas, {width: map_radius*2*MAP_FIELD_SIZE, height:map_radius*2*MAP_FIELD_SIZE, subdivisions:80, minHeight:0, maxHeight: 200}, self.scene);



        var terrain_mesh_material = new BABYLON.StandardMaterial("terrain", self.scene);

        //terrain_mesh_material.wireframe = true;


        /**/
        terrain_mesh_material.diffuseTexture =  terrain_mesh_texture;
        //terrain_mesh_material.diffuseTexture =  new BABYLON.Texture('/app/babylon-sample/textures/crate.png', self.scene);
        terrain_mesh_material.diffuseTexture.uScale = 1;
        terrain_mesh_material.diffuseTexture.vScale = 1;
        terrain_mesh_material.diffuseTexture.hasAlpha = true;
        /**/

        /**
         terrain_mesh_material.diffuseColor = new BABYLON.Color4(0, 0, 0, 0.1); // No diffuse color
         terrain_mesh_material.specularColor = new BABYLON.Color4(0, 0, 0, 0.1); // No specular color
         terrain_mesh_material.emissiveTexture = terrain_mesh_texture;
         terrain_mesh_material.emissiveTexture.uScale = 1;
         terrain_mesh_material.emissiveTexture.vScale = 1;
         terrain_mesh_material.emissiveTexture.hasAlpha = true;
         /**/


        terrain_mesh_material.freeze();
        self.terrain_mesh.material = terrain_mesh_material;
        self.terrain_mesh.position.x = 0;
        self.terrain_mesh.position.z = 0;
        self.terrain_mesh.position.y = 1;
        self.terrain_mesh.isPickable = false;

        self.terrain_mesh.receiveShadows = true;
        //self.terrain_mesh.convertToUnIndexedMesh();


        self.water.material.refractionTexture.renderList=[self.terrain_mesh];
        self.water.material.reflectionTexture.renderList=[self.terrain_mesh];
        //-----------------------------------------------------------------------------------

    }




    update(objects) {

        if(!this.loaded)return;

        if(!this.updatable)return;
        this.updatable=false;

        var self = this;


        self.prev_meshes.forEach(function(mesh){
            mesh.dispose();
        });
        self.shadow_generator.getShadowMap().renderList=[];


        self.camera.target.x=100;//todo based on coords mapping
        self.camera.target.z=-100;




        self.map_of_terrain_codes  = objects.getMapOfTerrainCodes(T.UI.Map.map_center,map_radius);
        self.updateTerrain(self.map_of_terrain_codes);



        //-----------------------------------------------------------------------------------Naturals = Trees
        /**/
        var naturals  = objects.filterTypes('natural');

        //r(naturals);
        r('all assets',self.assets);

        naturals.forEach(function(natural){

            r('Creating natural '+building.name);

            //var mesh = new Tree(20,60,20, self.scene, self.materials, self.shadow_generator);


            var mesh = self.assets[1].createInstance('tree');

            mesh.position.x = (natural.x-T.UI.Map.map_center.x)*MAP_FIELD_SIZE;//todo coords mapping
            mesh.position.z = -(natural.y-T.UI.Map.map_center.y)*MAP_FIELD_SIZE;
            mesh.position.y = self.terrain_mesh.getHeightAtCoordinates(mesh.position.x,mesh.position.z);

            mesh.scaling.x=natural.design.data.size;
            mesh.scaling.y=natural.design.data.size;
            mesh.scaling.z=natural.design.data.size;

            mesh.rotation.y=T.Math.deg2rad(natural.design.data.rotation.z);
            mesh.rotation.x=T.Math.deg2rad(natural.design.data.rotation.x);
            mesh.rotation.z=T.Math.deg2rad(natural.design.data.rotation.y);

            self.shadow_generator.getShadowMap().renderList.push(mesh);

            //mesh.convertToUnIndexedMesh();
            self.prev_meshes.push(mesh);

            /*BABYLON.SceneLoader.ImportMesh("", "/app/babylon-sample/textures/", "trees.obj", self.scene, function (newMeshes) {

                r(newMeshes);

                // Set the target of the self.camera to the first imported mesh
                //self.camera.target = newMeshes[0];


            });*/



            //tree.isPickable = true;

        });
        //-----------------------------------------------------------------------------------





        //-----------------------------------------------------------------------------------Buildings
        /**/
        var buildings  = objects.filterTypes('building');

        buildings.forEach(function(building){

            r('Creating building '+building.name);

            var mesh = new Model('building', building.getModel(), self.scene, self.materials, self.shadow_generator);

            mesh.position.x = (building.x-T.UI.Map.map_center.x)*MAP_FIELD_SIZE;//todo coords mapping
            mesh.position.z = -(building.y-T.UI.Map.map_center.y)*MAP_FIELD_SIZE;
            mesh.position.y = self.terrain_mesh.getHeightAtCoordinates(mesh.position.x,mesh.position.z);

            self.prev_meshes.push(mesh);


            //tree.isPickable = true;


        });
        /*for(var limit=100;limit>0;limit--) {

         var model = katapult.createInstance('katapult'+limit);
         model.position.x = Math.random()*1000-500;
         model.position.y = Math.random()*100;
         model.position.z = Math.random()*1000-500;
         model.rotation.x = Math.PI*Math.random() / 10;
         model.rotation.z = Math.PI*Math.random() / 10;

         model.rotation.y = Math.PI*2*Math.random();

         }
         */
        //-----------------------------------------------------------------------------------




    };







};
