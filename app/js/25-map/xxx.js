T.setNamespace('Map');

var prevent=false;


T.Map.drawMap = function(objects){


    if(prevent){
        r('drawMap prevented');
        return;
    }
    prevent=true;



    var canvas = document.getElementById("map-canvas-new");
    console.log(canvas);


    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);



        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), scene);
        light.position = new BABYLON.Vector3(20, 40, 20);
        light.intensity = 1;




        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.useVarianceShadowMap = true;
        shadowGenerator.bias = 0.01;



        /*scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        //BABYLON.Scene.FOGMODE_NONE;
        //BABYLON.Scene.FOGMODE_EXP;
        //BABYLON.Scene.FOGMODE_EXP2;
        //BABYLON.Scene.FOGMODE_LINEAR;
        scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        scene.fogDensity = 0.001;*/



        // Need a free camera for collisions
        //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
        //camera.attachControl(canvas, true);

        //var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, -8, -20), scene);
        //camera.attachControl(canvas, true);

        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI*(7/4), Math.PI / 8, 150, new BABYLON.Vector3(-10, 10, 2), scene);
        //camera.attachControl(canvas, true);


        camera.upperBetaLimit = Math.PI / 2;


        //-----------------------------------------------------------------------------------Constants
        global.MAP_FIELD_SIZE = 10;
        global.MAP_BUILDING_SIZE = 0.6;
        //-----------------------------------------------------------------------------------


        //-----------------------------------------------------------------------------------Buildings
        /**/
        var buildings  = objects.filterTypes('building');

        buildings.forEach(function(building){

            r('Creating building '+building.name);

            var mesh = new Model('building', building.getModel(), scene, shadowGenerator);

            mesh.position.x = (building.x-T.UI.Map.map_center.x)*MAP_FIELD_SIZE;
            mesh.position.z = -(building.y-T.UI.Map.map_center.y)*MAP_FIELD_SIZE;

            mesh.position.y = 40;//Math.random()*100;
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





        //-----------------------------------------------------------------------------------Ground
        var ground = BABYLON.Mesh.CreateGround("water", 5000, 5000, 2, scene);


        var ground_material = new BABYLON.StandardMaterial("ground", scene);
        ground_material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        ground_material.alpha = 0.3;

        ground.material = ground_material;


        ground.position.x = 0;
        ground.position.z = 0;

        ground.position.y = 0;
        ground.isPickable = false;
        //-----------------------------------------------------------------------------------



        //-----------------------------------------------------------------------------------
        /**
        var water = BABYLON.Mesh.CreateGround("water", 5000, 5000, 2, scene);


        var waterMaterial = new BABYLON.StandardMaterial("water", scene);
        //groundMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/ground.jpg", scene);
        waterMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/t1.png", scene);
        waterMaterial.diffuseTexture.uScale = 10;
        waterMaterial.diffuseTexture.vScale = 10;
        //groundMaterial.diffuseTexture.hasAlpha = true;
        //waterMaterial.alpha = 1;
        //groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        //var size=1+Math.random();
        water.position.x = 0;//*20*size;
        water.position.z = 0;//*20*size;

        water.position.y = 20;
        water.material = waterMaterial;
        water.isPickable = false;//todo

        /**
        water_rad=0;
        scene.registerBeforeRender(function () {
            water.position.y = Math.sin(water_rad)*5+20;
            water_rad+=0.02;

        });/**/
        //-----------------------------------------------------------------------------------






        //-------------

        /*
        //var terrain_managers={};
        var terrains_mesh_prototypes={};
        for(var t=1;t<14;t++){


            // Create a sprite manager to optimize GPU ressources
            // Parameters : name, imgUrl, capacity, cellSize, scene
            //terrain_managers['t'+t] = new BABYLON.SpriteManager("terrains_t"+t, "/app/php/terrain.php?size=150&terrain=t"+t, 2000, 150, scene);



            //var terrain_mesh = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/app/babylon-sample/textures/ring.png", 60, 60, 20, 0, 10, scene, false);
            var terrain_mesh = BABYLON.Mesh.CreateGround("terrain", 90, 90, 2, scene);
            var terrain_material = new BABYLON.StandardMaterial("terrain", scene);
            /*terrain_material.diffuseTexture = new BABYLON.Texture("/app/php/terrain.php?size=150&terrain=t"+t, scene);
            terrain_material.diffuseTexture.uScale = 1;
            terrain_material.diffuseTexture.vScale = 1;
            terrain_material.diffuseTexture.hasAlpha = true;* /

            terrain_material.diffuseColor = new BABYLON.Color3(0, 0, 0); // No diffuse color
            terrain_material.specularColor = new BABYLON.Color3(0, 0, 0); // No specular color


            terrain_material.emissiveTexture = new BABYLON.Texture("/app/php/terrain.php?raw&size=150&terrain=t"+t, scene);
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


        var terrain_mesh_texture = new BABYLON.DynamicTexture("terrain_mesh_texture", 2048, scene, true);
        var ctx = terrain_mesh_texture.getContext();
        ctx.fillStyle="#FF0000";
        ctx.fillRect(10,10,2048-20,2048-20);




        var height_canvas = document.createElement('canvas');
        var height_canvas_px=2;
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

        height_canvas_ctx.blur(2);


        terrain_mesh_texture.update();

        //var terrain_mesh = BABYLON.Mesh.CreateGround("terrain", 1024, 1024, 4, scene);
        //var terrain_mesh = BABYLON.Mesh.CreateRibbon("ribbon", paths, false, false, 0, scene);


        var terrain_mesh = CreateGroundFromCanvas("ground", height_canvas, {width: map_radius*2*MAP_FIELD_SIZE, height:map_radius*2*MAP_FIELD_SIZE, subdivisions:80, minHeight:0, maxHeight: 200}, scene);



        var terrain_mesh_material = new BABYLON.StandardMaterial("terrain", scene);

        //terrain_mesh_material.wireframe = true;


        /**
        terrain_mesh_material.diffuseTexture =  terrain_mesh_texture;
        //terrain_mesh_material.diffuseTexture =  new BABYLON.Texture('/app/babylon-sample/textures/crate.png', scene);
        terrain_mesh_material.diffuseTexture.uScale = 1;
        terrain_mesh_material.diffuseTexture.vScale = 1;
        /**/

        /**/
        terrain_mesh_material.diffuseColor = new BABYLON.Color4(0, 0, 0, 0.1); // No diffuse color
        terrain_mesh_material.specularColor = new BABYLON.Color4(0, 0, 0, 0.1); // No specular color
        terrain_mesh_material.emissiveTexture = terrain_mesh_texture;
        terrain_mesh_material.emissiveTexture.uScale = 1;
        terrain_mesh_material.emissiveTexture.vScale = 1;
        terrain_mesh_material.emissiveTexture.hasAlpha = true;
        /**/



        terrain_mesh.material = terrain_mesh_material;
        terrain_mesh.position.x = 0;
        terrain_mesh.position.z = 0;
        terrain_mesh.position.y = 1;
        terrain_mesh.isPickable = false;

        terrain_mesh.receiveShadows = true;



        //-------------

        /*
        // Ground



        /**/

        //-------------



        //-----------------------------------------------------------------------------------SkyBox
        /**
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/app/babylon-sample/textures/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
         /**/
        //-----------------------------------------------------------------------------------



        //-----------------------------------------------------------------------------------Water WORLDMONGER
        var water = BABYLON.Mesh.CreateGround("water", 5000, 5000, 2, scene);



        var material = new WORLDMONGER.WaterMaterial("water", scene, light);
        material.refractionTexture.renderList.push(terrain_mesh);
        material.reflectionTexture.renderList.push(terrain_mesh);
        //waterMaterial.reflectionTexture.renderList.push(skybox);

        water.position.x = 0;//*20*size;
        water.position.z = 0;//*20*size;

        water.position.y = 20;
        water.material = material;
        water.isPickable = false;//todo

        //-----------------------------------------------------------------------------------


        /**
        //When pointer down event is raised
        scene.onPointerDown = function (evt, pickResult) {
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

        /**/

        // Events
        var canvas = engine.getRenderingCanvas();
        var startingPoint;
        var currentMesh;

        var getGroundPosition = function () {
            // Use a predicate to get position on the ground
            var pickinfo = scene.pick(
                scene.pointerX,
                scene.pointerY,
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
            var pickInfo = scene.pick(
                scene.pointerX,
                scene.pointerY
                //function (mesh) { return mesh === ground; }
            );


            r(pickInfo);


            if (!pickInfo.hit) {

                r('Starting');

                currentMesh = pickInfo.pickedMesh;
                startingPoint = getGroundPosition(evt);

                //r(currentMesh,startingPoint);
            }

        };

        var onPointerUp = function () {
            if (startingPoint) {


                r('Finito');
                //camera.attachControl(canvas, true);

                startingPoint = null;
                return;
            }
        };


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

            //r(diff.x);


            camera.target.x+=diff.x;
            camera.target.z+=diff.z;



            //startingPoint = current;

        };

        canvas.addEventListener("pointerdown", onPointerDown, false);
        canvas.addEventListener("pointerup", onPointerUp, false);
        canvas.addEventListener("pointermove", onPointerMove, false);

        /*scene.onDispose = function () {
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



        return scene;
    };


    var modifyScene = function (scene) {

        //Simple crate
        var box = new BABYLON.Mesh.CreateBox("crate", 2, scene);
        box.material = new BABYLON.StandardMaterial("Mat", scene);
        box.material.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/crate.png", scene);
        box.material.diffuseTexture.hasAlpha = true;
        box.position = new BABYLON.Vector3(5+(Math.random()*4-2), 8, -10+(Math.random()*4-2));

        return box;

    };


    var scene = createScene();

    /*var box = modifyScene(scene);

     var rad = 0;
     setInterval(function(){

     var x,y;
     x = Math.sin(rad);
     y = Math.cos(rad);

     rad+=0.15;


     box.position = new BABYLON.Vector3(x, 8, y);

     },10);*/




    engine.runRenderLoop(function () {
        scene.render();

        $('#fps').html(engine.fps);
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });




};
