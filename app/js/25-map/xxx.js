

$(function(){






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




        // Need a free camera for collisions
        //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
        //camera.attachControl(canvas, true);

        //var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, -8, -20), scene);
        //camera.attachControl(canvas, true);

        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI, Math.PI / 8, 150, new BABYLON.Vector3(-10, 10, 2), scene);
        camera.attachControl(canvas, true);


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


            var model = new Model(buildings[0].getModel(), scene, shadowGenerator);
            model.position.x = -10;
            model.position.y = 5;
            model.position.z = 5;
            model.rotation.x = Math.PI/10;



            var model = new Model(buildings[3].getModel(), scene, shadowGenerator);
            model.position.x = 20;
            model.position.y = 0;
            model.position.z = -20;
            model.rotation.y = Math.PI/10;


            //r(T.User.object_prototypes);
            //r(building);

        },1000);


        // Ground
        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/app/babylon-sample/textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/ground.jpg", scene);
        groundMaterial.diffuseTexture.uScale = 6;
        groundMaterial.diffuseTexture.vScale = 6;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.position.y = 0;
        ground.material = groundMaterial;



        //When pointer down event is raised
        scene.onPointerDown = function (evt, pickResult) {
            // if the click hits the ground object, we change the impact position
            /*if (pickResult.hit) {
                impact.position.x = pickResult.pickedPoint.x;
                impact.position.y = pickResult.pickedPoint.y;
            }*/

            r(pickResult);
        };



        /*for(var i=0;i<200;i++){

         //Simple crate
         var box = new BABYLON.Mesh.CreateBox("crate", 2, scene);
         box.material = new BABYLON.StandardMaterial("Mat", scene);
         box.material.diffuseTexture = new BABYLON.Texture("/app/babylon-sample/textures/crate.png", scene);
         box.material.diffuseTexture.hasAlpha = true;
         box.position = new BABYLON.Vector3((Math.random()*100-50), Math.random()*10, (Math.random()*100-50));


         shadowGenerator.getShadowMap().renderList.push(box);

         }*/



        /*var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
        shadowGenerator.getShadowMap().renderList.push(knot);
        // Animations
        var beta = 5;
        scene.registerBeforeRender(function () {
            knot.rotation.x += 0.01;
            knot.rotation.z += 0.02;

            knot.position = new BABYLON.Vector3(Math.cos(beta) * 30, 10, Math.sin(beta) * 30);
            beta += 0.02;

        });*/




        /*var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 7, 1, scene, false);
        cylinder.arc= 0.5;
        cylinder.position = new BABYLON.Vector3((Math.random()*100-50), Math.random()*10, (Math.random()*100-50));



        var torus = BABYLON.Mesh.CreateTorus("torus", 4, 2, 30, scene, false);
        shadowGenerator.getShadowMap().renderList.push(torus);
        // Animations
        var alpha = 0;
        scene.registerBeforeRender(function () {
            torus.rotation.x += 0.01;
            torus.rotation.z += 0.02;

            torus.position = new BABYLON.Vector3(Math.cos(alpha) * 30, 10, Math.sin(alpha) * 30);
            alpha += 0.01;

        });*/




        ground.receiveShadows = true;




        //Set gravity for the scene (G force like, on Y-axis)
        //scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

        // Enable Collisions
        //scene.collisionsEnabled = true;

        //Then apply collisions and gravity to the active camera
        //camera.checkCollisions = true;
        //camera.applyGravity = true;

        //Set the ellipsoid around the camera (e.g. your player's size)
        //camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

        //finally, say which mesh will be collisionable
        //ground.checkCollisions = true;
        //box.checkCollisions = true;

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




});
