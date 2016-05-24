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



        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
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

        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI, Math.PI / 8, 150, new BABYLON.Vector3(-10, 10, 2), scene);
        //camera.attachControl(canvas, true);

        camera.upperBetaLimit = Math.PI / 2;


        /*var rad = 0;
         setInterval(function(){

         var x,y;
         x = Math.sin(rad);
         y = Math.cos(rad);

         rad+=0.1;


         //camera.fov = Math.random();
         //camera.mode = 1;
         camera.target = new BABYLON.Vector3(x*20, 0, y*20);
         //camera.upVector = new BABYLON.Vector3(-10, 10, 2);

         },50);*/




        setTimeout(function(){

            var buildings = T.User.object_prototypes.filterTypes('building').getAll();


            var katapult = new Model('katapult', buildings[0].getModel(), scene, shadowGenerator);


            for(var limit=100;limit>0;limit--) {

                var model = katapult.createInstance('katapult'+limit);
                model.position.x = Math.random()*1000-500;
                model.position.y = Math.random()*100;
                model.position.z = Math.random()*1000-500;
                model.rotation.x = Math.PI*Math.random() / 10;
                model.rotation.z = Math.PI*Math.random() / 10;

                model.rotation.y = Math.PI*2*Math.random();

            }



            /*var model = new Model(buildings[3].getModel(), scene, shadowGenerator);
            model.position.x = 20;
            model.position.y = 0;
            model.position.z = -20;
            model.rotation.y = Math.PI/10;


            scene.registerBeforeRender(function () {
                model.position.x += 0.02;
                model.position.z += 0.02;
            });*/



        },1000);




        /*
        // Create a sprite manager to optimize GPU ressources
        // Parameters : name, imgUrl, capacity, cellSize, scene
        var spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "/app/php/treerock.php?type=tree&seed=8&width=200", 2000, 400, scene);
        //var spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "/app/babylon-sample/textures/palm.png", 2000, 800, scene);

        //We create 2000 trees at random positions
        for (var i = 0; i < 2000; i++) {
            var tree = new BABYLON.Sprite("tree", spriteManagerTrees);
            tree.size = 20;
            tree.position.x = Math.random() * 1000 - 500;
            tree.position.z = Math.random() * 1000 - 500;

            tree.position.y = Math.random()*100;
            //tree.isPickable = true;

        }




        /**/




        var water = BABYLON.Mesh.CreateGround("water", 100000, 100000, 2, scene);

        var waterMaterial = new BABYLON.StandardMaterial("water", scene);
        //groundMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/ground.jpg", scene);
        waterMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/t1.png", scene);
        //groundMaterial.diffuseTexture.uScale = 1;
        //groundMaterial.diffuseTexture.vScale = 1;
        //groundMaterial.diffuseTexture.hasAlpha = true;
        waterMaterial.alpha = 0.9;
        //groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        //var size=1+Math.random();
        water.position.x = 0;//*20*size;
        water.position.z = 0;//*20*size;

        water.position.y = -2000;
        water.material = waterMaterial;
        water.isPickable = false;//todo

        /*water_rad=0;
        scene.registerBeforeRender(function () {
            water.position.y = Math.sin(water_rad)+0.5;
            water_rad+=0.02;

        });*/





        //-------------



        /*CreateGroundFromArray = function (width, height, subdivisions, buffer, bufferWidth, bufferHeight) {
            var vertexData = new BABYLON.VertexData();
            vertexData.positions = [];
            vertexData.normals = [];
            vertexData.indices = [];
            vertexData.uvs  = [];
            var row, col;
            var indicesToSkip = {};
            var pos = 0;
            for (row = 0; row <= subdivisions; row++) {
                for (col = 0; col <= subdivisions; col++) {
                    if (buffer[pos] * 0.1 === -12345.6) {
                        indicesToSkip[pos] = true;
                        vertexData.positions.push(0, 0, 0);
                        vertexData.uvs.push(0,0);
                    }else{
                        // Add  vertex
                        vertexData.positions.push((col * width) / subdivisions - (width / 2.0), buffer[pos], ((subdivisions - row) * height) / subdivisions - (height / 2.0));
                        vertexData.uvs.push(col / subdivisions, 1.0 - row / subdivisions);
                    }
                    pos++;
                }
            }
            var subdivisionsPlus = subdivisions + 1;
            for (row = 0; row < subdivisions; row++) {
                for (col = 0; col < subdivisions; col++) {
                    var indexA = col + 1 + (row + 1) * subdivisionsPlus;
                    var indexB = col + 1 + row * subdivisionsPlus;
                    var indexC = col + row * subdivisionsPlus;
                    var indexD = col + (row + 1) * subdivisionsPlus;
                    var indexE = col + row * subdivisionsPlus;
                    var needsToBeSkipped = false;
                    if (!!indicesToSkip[indexA])
                        needsToBeSkipped = true;
                    else if (!!indicesToSkip[indexB])
                        needsToBeSkipped = true;
                    else if (!!indicesToSkip[indexC])
                        needsToBeSkipped = true;
                    else if (!!indicesToSkip[indexD])
                        needsToBeSkipped = true;
                    else if (!!indicesToSkip[indexE])
                        needsToBeSkipped = true;
                    if (!needsToBeSkipped)
                    {
                        //Triangle 1 and triangle 2


                        vertexData.indices.push(indexA, indexB, indexC, indexD, indexA, indexE);
                    }
                }
            }
            // Normals
             BABYLON.VertexData.ComputeNormals(vertexData.positions, vertexData.indices, vertexData.normals);
            // Result
              return vertexData;
        };*/





        /*var canvas = document.createElement('canvas');
        canvas.width  = 500;
        canvas.height = 500;
        var ctx = canvas.getContext("2d");
        ctx.moveTo(0,0);
        ctx.lineTo(200,100);
        ctx.stroke();*/


        // Ground
        /*var ground = new BABYLON.Mesh('ground', scene);
        var vertexData = VertexData.CreateGroundFromHeightMap(2000, 200, 3, 0, 200, buffer, heightMapWidth, heightMapHeight);
        vertexData.applyToMesh(ground, false);*/
        //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", canvas.toDataURL()/*"/app/babylon-sample/textures/heightMap.png"*/, 2000, 2000, 200, 0, 100, scene, false);
        //var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene);




        /*
        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/app/babylon-sample/textures/ring.png", 150, 150, 20, 0, 20, scene, false);
        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/ground.jpg", scene);
        //groundMaterial.diffuseTexture = new BABYLON.Texture("/app/php/terrain.php?raw&terrain=t8", scene);
        groundMaterial.diffuseTexture.uScale = 100;
        groundMaterial.diffuseTexture.vScale = 100;
        //groundMaterial.diffuseTexture.hasAlpha = true;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMaterial;
        //var size=1+Math.random();
        ground.position.x = 0;//*20*size;
        ground.position.z = 0;//*20*size;
        ground.position.y = -1;

        //ground.receiveShadows = true;



        for(var limit=10000;limit>0;limit--) {

            var instance = ground.createInstance('ground');

            instance.position.x = Math.random() * 6000 - 3000;
            instance.position.z = Math.random() * 6000 - 3000;

            instance.rotation.y = Math.random() * Math.PI * 2;

        }*/


        //-------------


        var terrain_managers={};
        for(var t=1;t<14;t++){


            // Create a sprite manager to optimize GPU ressources
            // Parameters : name, imgUrl, capacity, cellSize, scene
            terrain_managers['t'+t] = new BABYLON.SpriteManager("terrains_t"+t, "/app/php/terrain.php?size=150&terrain=t"+t, 2000, 150, scene);


        }

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


        var terrains  = objects.filterTypes('terrain');


        terrains.forEach(function(terrain){

            var t = terrain.getCode();

            var sprite = new BABYLON.Sprite("terrain", terrain_managers['t'+t]);
            sprite.size = 20;//*Math.random();
            sprite.position.x = (terrain.x-T.UI.Map.map_center.x)*15;
            sprite.position.z = (terrain.y-T.UI.Map.map_center.y)*15;

            sprite.position.y = 0;//Math.random()*100;
            //tree.isPickable = true;


        });



        //-------------

        /*
        // Ground
        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/app/babylon-sample/textures/heightMap2.png", 2000, 2000, 200, 0, 100, scene, false);
        //var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene);


        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        //groundMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/ground.jpg", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/ground.jpg", scene);
        groundMaterial.diffuseTexture.uScale = 100;
        groundMaterial.diffuseTexture.vScale = 100;
        //groundMaterial.diffuseTexture.hasAlpha = true;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.material = groundMaterial;
        //var size=1+Math.random();
        ground.position.x = 0;//*20*size;
        ground.position.z = 0;//*20*size;

        ground.position.y = -1;


        /**/

        //-------------





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
                function (mesh) { return mesh === water; }
            );

            if (pickinfo.hit) {
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

                currentMesh = pickInfo.pickedMesh;
                startingPoint = getGroundPosition(evt);

                r(currentMesh,startingPoint);

                /*if (startingPoint) { // we need to disconnect camera from canvas
                    setTimeout(function () {
                        camera.detachControl(canvas);
                    }, 0);
                }*/
            }
        };

        var onPointerUp = function () {
            if (startingPoint) {

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

            var diff = startingPoint.subtract(current);
            //var diff = current.subtract(startingPoint);
            camera.target.addInPlace(diff);

            startingPoint = current;

        };

        canvas.addEventListener("pointerdown", onPointerDown, false);
        canvas.addEventListener("pointerup", onPointerUp, false);
        canvas.addEventListener("pointermove", onPointerMove, false);

        scene.onDispose = function () {
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
