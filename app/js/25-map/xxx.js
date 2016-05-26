T.setNamespace('Map');

//var prevent=false;


T.Map.Scene = class{


    constructor(){

        
        var self = this;


        self.materials={};//cache for materials





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



        // Need a free camera for collisions
        //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), self.scene);
        //camera.attachControl(canvas, true);

        //var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, -8, -20), self.scene);
        //camera.attachControl(canvas, true);

        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI*(7/4), Math.PI / 8, 150, new BABYLON.Vector3(-10, 10, 2), self.scene);
        //camera.attachControl(canvas, true);


        camera.upperBetaLimit = Math.PI / 2;


        //-----------------------------------------------------------------------------------Constants
        global.MAP_FIELD_SIZE = 10;
        global.MAP_BUILDING_SIZE = 0.6;
        //-----------------------------------------------------------------------------------




        //-----------------------------------------------------------------------------------Ground
        var ground = BABYLON.Mesh.CreateGround("water", 5000, 5000, 2, self.scene);


        var ground_material = new BABYLON.StandardMaterial("ground", self.scene);
        ground_material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        ground_material.alpha = 0.3;
        ground_material.freeze();

        ground.material = ground_material;


        ground.position.x = 0;
        ground.position.z = 0;

        ground.position.y = 0;
        ground.isPickable = false;

        ground.convertToUnIndexedMesh();
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
        //material.refractionTexture.renderList.push(terrain_mesh);
        //material.reflectionTexture.renderList.push(terrain_mesh);

        water.position.x = 0;//*20*size;
        water.position.z = 0;//*20*size;

        water.position.y = 20;
        water.material = material;
        water.isPickable = false;//todo

        water.convertToUnIndexedMesh();

        this.water=water;
        //-----------------------------------------------------------------------------------


        /**
         //When pointer down event is raised
         self.scene.onPointerDown = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {

            //pickResult.pickedMesh.rotation.y += 0.1;
            //impact.position.x = pickResult.pickedPoint.x;
            //impact.position.y = pickResult.pickedPoint.y;
        }

        r(pickResult);
    };
         /**/





        //--------------------------------------------------------------------------------------------------------------

        self.assets=[];

        var loader = new BABYLON.AssetsManager(self.scene);

        var pos = function(t) {


            r('loaded mesh',t);

            t.loadedMeshes.forEach(function(m) {



                r('loaded mesh',m);

                self.assets.push(m);
                //m.rotation.x=-Math.PI/2;
                //m.material=-Math.PI/2;


                var instance = m.createInstance('aaa');
                instance.position = new BABYLON.Vector3(0,100,0);

                instance.scaling.x=3;
                instance.scaling.y=3;
                instance.scaling.z=3;
                /**/


            });

        };



        var bane = loader.addMeshTask("bane", "", "http://towns.local/app/babylon-sample/textures/test/tree4/", "tree1.obj");
        //var bane = loader.addMeshTask("bane", "", "/app/babylon-sample/textures/", "bane.obj");
        //var bane = loader.addMeshTask("bane", "", "/app/babylon-sample/textures/", "skull.babylon");
        bane.onSuccess = pos;
        bane.onError = function(e){

            r('ERROR loading mesh',e);
        };
        /*var batman = loader.addMeshTask("batman", "", "https://dl.dropboxusercontent.com/u/17799537/objFileLoader/Batman/", "Batman_Injustice.obj");
        batman.onSuccess = pos;
        var penguin = loader.addMeshTask("penguin", "", "https://dl.dropboxusercontent.com/u/17799537/objFileLoader/Penguin/", "Penguin.obj");
        penguin.onSuccess = pos;*/

        loader.onFinish = function() {
            engine.runRenderLoop(function () {
                self.scene.render();
            });
        };

        loader.load();
        //--------------------------------------------------------------------------------------------------------------







        //--------------------------------------------------------------------------------------------------------------

        /**/

        // Events
        var canvas = engine.getRenderingCanvas();
        var startingPoint;
        var currentMesh;

        var getGroundPosition = function () {
            // Use a predicate to get position on the ground
            var pickinfo = self.scene.pick(
                self.scene.pointerX,
                self.scene.pointerY,
                function (mesh) { return mesh === ground; }
            );

            if (pickinfo.hit) {
                //r(pickinfo);
                return pickinfo.pickedPoint;
            }

            return null;
        };

        var onPointerDown = function (evt) {

            r(evt);

            if (evt.button !== 0) {
                return;
            }

            // check if we are under a mesh
            var pickInfo = self.scene.pick(
                self.scene.pointerX,
                self.scene.pointerY
                //function (mesh) { return mesh === ground; }
            );


            r(pickInfo);


            if (!pickInfo.hit) {

                r('Starting');

                whole_diff={x:0,z:0};

                currentMesh = pickInfo.pickedMesh;
                startingPoint = getGroundPosition(evt);

                //r(currentMesh,startingPoint);
            }

        };

        var onPointerUp = function (evt) {
            if (startingPoint) {


                r('Finito');
                //camera.attachControl(canvas, true);

                var moved_by = new T.Position(
                    whole_diff.x/MAP_FIELD_SIZE,
                    whole_diff.z/MAP_FIELD_SIZE
                );

                T.UI.Map.map_center.plus(moved_by);
                startingPoint = null;


                T.UI.Map.loadMap();


                return;
            }
        };


        var whole_diff;
        var onPointerMove = function (evt) {
            if (!startingPoint) {
                return;
            }

            var current = getGroundPosition(evt);

            if (!current) {
                return;
            }

            //r(startingPoint.x,current.x);
            var diff = startingPoint.subtract(current);
            //camera.target.addInPlace(diff);

            whole_diff.x+=diff.x;
            whole_diff.z+=diff.z;


            camera.target.x+=diff.x;
            camera.target.z+=diff.z;



            //startingPoint = current;

        };

        canvas.addEventListener("pointerdown", onPointerDown, false);
        canvas.addEventListener("pointerup", onPointerUp, false);
        canvas.addEventListener("pointermove", onPointerMove, false);

        /*self.scene.onDispose = function () {
         canvas.removeEventListener("pointerdown", onPointerDown);
         canvas.removeEventListener("pointerup", onPointerUp);
         canvas.removeEventListener("pointermove", onPointerMove);
         };/**/

        //--------------------------------------------------------------------------------------------------------------

        var mouseWheel = function (e) {

            if(e.deltaY>0){

                camera.target.y -=10;

            }else{

                camera.target.y +=10;
            }

        };


        $(canvas).mousewheel(mouseWheel);

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

    }







    update(objects) {

        if(!this.updatable)return;
        this.updatable=false;

        var self = this;








        //-------------

        /*
         //var terrain_managers={};
         var terrains_mesh_prototypes={};
         for(var t=1;t<14;t++){


         // Create a sprite manager to optimize GPU ressources
         // Parameters : name, imgUrl, capacity, cellSize, self.scene
         //terrain_managers['t'+t] = new BABYLON.SpriteManager("terrains_t"+t, "/app/php/terrain.php?size=150&terrain=t"+t, 2000, 150, self.scene);



         //var terrain_mesh = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/app/babylon-sample/textures/ring.png", 60, 60, 20, 0, 10, self.scene, false);
         var terrain_mesh = BABYLON.Mesh.CreateGround("terrain", 90, 90, 2, self.scene);
         var terrain_material = new BABYLON.StandardMaterial("terrain", self.scene);
         /*terrain_material.diffuseTexture = new BABYLON.Texture("/app/php/terrain.php?size=150&terrain=t"+t, self.scene);
         terrain_material.diffuseTexture.uScale = 1;
         terrain_material.diffuseTexture.vScale = 1;
         terrain_material.diffuseTexture.hasAlpha = true;* /

         terrain_material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
         terrain_material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color


         terrain_material.emissiveTexture = new BABYLON.Texture("/app/php/terrain.php?raw&size=150&terrain=t"+t, self.scene);
         //terrain_material.ambientTexture.uScale = 1;
         //terrain_material.ambientTexture.vScale = 1;
         terrain_material.emissiveTexture.hasAlpha = true;



         terrain_mesh.material = terrain_material;
         terrain_mesh.position.x = 0;
         terrain_mesh.position.z = 0;
         terrain_mesh.position.y = 0;
         terrain_mesh.isPickable = false;

         terrains_mesh_prototypes['t'+t] = terrain_mesh;


         }*/

        /*
         for (var y = -10; y < 10; y++) {
         for (var x = -10; x < 10; x++) {

         var t = Math.ceil(Math.random()*13);

         var tree = new BABYLON.Sprite("terrain", terrain_managers['t'+t]);
         tree.size = 20;//*Math.random();
         tree.position.x = x*10;
         tree.position.z = y*10;

         tree.position.y = 0;//Math.random()*100;
         //tree.isPickable = true;


         }
         }*/




        //-----------------------------------------------------------------------------------Terrains

        var terrain_mesh_texture = new BABYLON.DynamicTexture("terrain_mesh_texture", 2048, self.scene, true);
        var ctx = terrain_mesh_texture.getContext();
        /*ctx.fillStyle="#FF0000";
        ctx.fillRect(10,10,2048-20,2048-20);*/




        var height_canvas = document.createElement('canvas');
        var height_canvas_px=1;
        height_canvas.width = map_radius*2*height_canvas_px;
        height_canvas.height = map_radius*2*height_canvas_px;
        var height_canvas_ctx = height_canvas.getContext('2d');





        var map_of_terrain_codes  = objects.getMapOfTerrainCodes(T.UI.Map.map_center,map_radius);
        var terrain_code, z;

        r(map_of_terrain_codes);


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
                        T.Cache.backgrounds.get('t' + terrain_code + 's1'),
                        (x ) / map_radius / 2 * 2048 + 1024,
                        (y ) / map_radius / 2 * 2048 + 1024,
                        90, 90
                    );

                }



            }



        }

        height_canvas_ctx.blur(3);


        terrain_mesh_texture.update();

        //var terrain_mesh = BABYLON.Mesh.CreateGround("terrain", 1024, 1024, 4, self.scene);
        //var terrain_mesh = BABYLON.Mesh.CreateRibbon("ribbon", paths, false, false, 0, self.scene);


        var terrain_mesh = CreateGroundFromCanvas("ground", height_canvas, {width: map_radius*2*MAP_FIELD_SIZE, height:map_radius*2*MAP_FIELD_SIZE, subdivisions:80, minHeight:0, maxHeight: 200}, self.scene);



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
        terrain_mesh.material = terrain_mesh_material;
        terrain_mesh.position.x = 0;
        terrain_mesh.position.z = 0;
        terrain_mesh.position.y = 1;
        terrain_mesh.isPickable = false;

        terrain_mesh.receiveShadows = true;
        //terrain_mesh.convertToUnIndexedMesh();


        self.water.material.refractionTexture.renderList=[terrain_mesh];
        self.water.material.reflectionTexture.renderList=[terrain_mesh];
        //-----------------------------------------------------------------------------------




        //-----------------------------------------------------------------------------------Naturals = Trees
        /**/
        var naturals  = objects.filterTypes('natural');

        //r(naturals);
        r('all assets',self.assets);

        naturals.forEach(function(natural){

            r('Creating natural '+building.name);

            //var mesh = new Tree(20,60,20, self.scene, self.materials, self.shadow_generator);


            var mesh = self.assets[0].createInstance('tree');

            mesh.position.x = (natural.x-T.UI.Map.map_center.x)*MAP_FIELD_SIZE;
            mesh.position.z = -(natural.y-T.UI.Map.map_center.y)*MAP_FIELD_SIZE;
            mesh.position.y = terrain_mesh.getHeightAtCoordinates(mesh.position.x,mesh.position.z);


            /*BABYLON.SceneLoader.ImportMesh("", "/app/babylon-sample/textures/", "trees.obj", self.scene, function (newMeshes) {

                r(newMeshes);

                // Set the target of the camera to the first imported mesh
                //camera.target = newMeshes[0];


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

            mesh.position.x = (building.x-T.UI.Map.map_center.x)*MAP_FIELD_SIZE;
            mesh.position.z = -(building.y-T.UI.Map.map_center.y)*MAP_FIELD_SIZE;
            mesh.position.y = terrain_mesh.getHeightAtCoordinates(mesh.position.x,mesh.position.z);

            r(mesh.position.y);
            r(terrain_mesh);


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
