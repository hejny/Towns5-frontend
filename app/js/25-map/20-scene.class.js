TOWNS.setNamespace('Map');

//var prevent=false;


TOWNS.Map.Scene = class{



    babylonToPosition(vector3){
        return(new TOWNS.Position(
            vector3.x/MAP_FIELD_SIZE + map_center.x,
            -vector3.z/MAP_FIELD_SIZE + map_center.y
        ));

    }

    positionToBabylon(position,z=0){

        return(new BABYLON.Vector3(
            (position.x-map_center.x)*MAP_FIELD_SIZE,
            z,
            -(position.y-map_center.y)*MAP_FIELD_SIZE
        ));

    }


    rotationToBabylon(degrees){
        return -TOWNS.TMath.deg2rad(degrees-45);
    }


    babylonToRotation(radians){
        return TOWNS.TMath.rad2deg(-radians)+45;
    }




    setCamera(){

        this.camera.target.x=Math.sin(Math.PI*(3/2)-this.camera.alpha)*-30*MAP_FIELD_SIZE+(this.moved_by.x)*MAP_FIELD_SIZE;
        this.camera.target.z=Math.cos(Math.PI*(3/2)-this.camera.alpha)*-30*MAP_FIELD_SIZE-(this.moved_by.y)*MAP_FIELD_SIZE;
    }


    resetCamera(){

        this.camera.target.y = 450;
        this.camera.alpha=Math.PI * (7 / 4);
        this.camera.beta=TOWNS.TMath.deg2rad(25);

        this.setCamera();

    }



    moveBy(position){

        r('moveBy');

        this.moved_by.plus(position);
        this.setCamera();

    }


    moveByProcess(){

        map_center.plus(this.moved_by);
        this.moved_by=new TOWNS.Position(0,0);

        TOWNS.Map.loadMap();

    }




    getPositionOnMesh(mesh,x,y) {
        // Use a predicate to get position on the self.ground_mesh

        x = x || this.scene.pointerX;
        y = y || this.scene.pointerY;


        var pickinfo = this.scene.pick(
            x,
            y,
            function (picked_mesh) { return picked_mesh === mesh; }
        );

        if (pickinfo.hit) {
            //r(pickinfo);
            return pickinfo.pickedPoint;
        }

        return null;
    }



    getPositionOnTerrainMesh(x,y) {
        return this.getPositionOnMesh(this.terrain_mesh,x,y);
    }

    getPositionOnGroundMesh(x,y) {
        return this.getPositionOnMesh(this.ground_mesh,x,y);
    }


    getMeshById(id){


        for(var i= 0,l=this.prev_meshes.length;i<l;i++){
            if(this.prev_meshes[i].name==id){
                return(this.prev_meshes[i]);
            }

        }

        return(null);
    }



    constructor() {


        var self = this;


        self.materials = {};//cache for materials


        self.canvas = document.getElementById("map-canvas-new");


        self.engine = new BABYLON.Engine(self.canvas, true, null, false);


        self.scene = new BABYLON.Scene(self.engine);

        self.moved_by=new TOWNS.Position(0,0);


        self.light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -2, 1), self.scene);
        //self.light.position = new BABYLON.Vector3(20, 40, 20);
        self.light.intensity = 0.8;


        self.light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -2, 0), self.scene);
        //self.light.position = new BABYLON.Vector3(20, 40, 20);
        self.light2.intensity = 0.2;


        self.shadow_generator = new BABYLON.ShadowGenerator(1024, self.light);
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
        //self.camera.attachControl(self.canvas, true);

        //var self.camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, -8, -20), self.scene);
        //self.camera.attachControl(self.canvas, true);

        self.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 150, new BABYLON.Vector3(-10, 10, 2), self.scene);
        //self.camera.attachControl(self.canvas, true);


        //self.camera.mode = 1;

        self.camera.upperBetaLimit = Math.PI / 2;


        self.resetCamera();



        //-----------------------------------------------------------------------------------Ground
        /**/
        self.ground_mesh = BABYLON.Mesh.CreateGround("water", 50000, 50000, 2, self.scene);


        var ground_mesh_material = new BABYLON.StandardMaterial("ground_mesh", self.scene);
        ground_mesh_material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        ground_mesh_material.alpha = 0.3;
        ground_mesh_material.freeze();

        self.ground_mesh.material = ground_mesh_material;


        self.ground_mesh.position.x = 0;
        self.ground_mesh.position.z = 0;

        self.ground_mesh.position.y = 0;
        self.ground_mesh.isPickable = false;

        self.ground_mesh.convertToUnIndexedMesh();/**/
        //-----------------------------------------------------------------------------------



        //-----------------------------------------------------------------------------------Ground 40
        /*self.ground_40_mesh = BABYLON.Mesh.CreateGround("water", 5000, 5000, 2, self.scene);


        self.ground_40_mesh.material =  new BABYLON.StandardMaterial("red", self.scene);
        self.ground_40_mesh.diffuseColor = new BABYLON.Color3(0, 0, 1); //Red
        self.ground_40_mesh.material.alpha = 0.9;

        self.ground_40_mesh.position.x = 0;
        self.ground_40_mesh.position.z = 0;

        self.ground_40_mesh.position.y = 40;
        self.ground_40_mesh.isPickable = false;

        self.ground_40_mesh.convertToUnIndexedMesh();*/
        //-----------------------------------------------------------------------------------




        //-----------------------------------------------------------------------------------Water WORLDMONGER
        var water = BABYLON.Mesh.CreateGround("water", 50000, 50000, 2, self.scene);


        var material = new WORLDMONGER.WaterMaterial("water", self.scene, self.light);
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
         self.scene.onLeftDown = function (evt, pickResult) {
        // if the click hits the self.ground_mesh object, we change the impact position
        if (pickResult.hit) {

            pickResult.pickedMesh.rotation.y += 0.1;
            //impact.position.x = pickResult.pickedPoint.x;
            //impact.position.y = pickResult.pickedPoint.y;
        }

        r(pickResult);
    };
         /**/





        self.selected_circle_material = new BABYLON.StandardMaterial("selected_circle_material", self.scene);
        self.selected_circle_material.diffuseColor = new BABYLON.Color3(0, 1, 1);
        self.selected_circle_material.alpha = 0.8;




        //--------------------------------------------------------------------------------------------------------------

        self.loaded = false;
        self.assets = [];

        self.assetsManager = new BABYLON.AssetsManager(self.scene);


        var progress = function(){

            var all= 0,loaded=0;

            self.assetsManager._tasks.forEach(function(task){
                all++;
                if(task.isCompleted)loaded++;
            });

            self.engine.loadingUIText = TOWNS.Locale.get('loading of graphic')+' '+Math.floor(loaded/all*100)+'%';

        };

        //-------------------------------------------Meshes

        var meshLoad = function (t) {


            t.loadedMeshes.forEach(function (m) {


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


            progress();

        };

        var tree = self.assetsManager.addMeshTask("bane", "", "/media/3d/test/tree4/", "tree1.obj");
        tree.onSuccess = meshLoad;

        //-------------------------------------------

        //-------------------------------------------Image Collection
        TOWNS.setNamespace('Cache');
        TOWNS.Cache.backgrounds= new TOWNS.Cache.ImagesCollection();//todo maybe refactor to TOWNS.Cache.images

        var imageLoad = function (result) {
            TOWNS.Cache.backgrounds.addImage(result.name,result.image);
            progress();
        };

        var files=[],name,task;
        for(var terrain=1;terrain<terrainCount+1;terrain++) {
            for (var seed = 0; seed < seedCount; seed++) {

                task = self.assetsManager.addImageTask(
                    't'+terrain+'s'+seed,
                    appDir+'/php/terrain.php?terrain=t' + (terrain) + '&seed=' + seed + '&size=220'
                );

                task.onSuccess = imageLoad;

            }
        }
        //-------------------------------------------
        //-------------------------------------------Texture Collection

        TOWNS.Cache.textures= new TOWNS.Cache.ImagesCollection();

        var texturesLoad = function (result) {
            TOWNS.Cache.textures.addImage(result.name,result.image);
            progress();
        };

        var textures = {

            shadow: 'shadow.png',

            //todo refactor smart loading file list
            clay_bricks: 'clay-bricks.jpg',
            clay_roof: 'clay-roof.jpg',
            iron_plates: 'iron-plates.jpg',
            stone_bricks: 'stone-bricks.jpg',
            stone_plain: 'stone-plain.jpg',
            wood_boards: 'wood-boards.jpg',
            wood_raw: 'wood-raw.jpg',
            wood_fence: 'wood-fence.jpg'

        };


        for(name in textures){
            task = self.assetsManager.addImageTask(name,appDir+'/php/image.php?width=128&file=media/image/textures/'+textures[name]);

            task.onSuccess = texturesLoad;

        }
        //-------------------------------------------

        //-------------------------------------------Finish


        self.assetsManager.onFinish = function () {
            self.engine.runRenderLoop(function () {

                self.scene.render();

            });

            self.loaded = true;
            TOWNS.Map.loadMap(true);

        };


        self.assetsManager.load();
        //self.engine.hideLoadingUI();
        self.engine.loadingUIBackgroundColor = "#171e33";
        //--------------------------------------------------------------------------------------------------------------

        //r(self.assetsManager);

        //==============================================================================================================


        //------------------
        self.canvas.addEventListener("pointerdown", function(event){

            r(event);

            if(event.button==0){
                self.onLeftDown(event);
            }else
            if(event.button==2){
                //self.onRightDown(event);
            }
        }, false);
        //------------------


        //------------------
        self.canvas.addEventListener("pointerup", function(event){
            if(event.button==0){
                self.onLeftUp(event);
            }else
            if(event.button==2){
                //self.onRightUp(event);
            }
        }, false);
        //------------------



        //------------------
        self.canvas.addEventListener("contextmenu", function(event){

            event.preventDefault();

            self.onRightUp(event);
            return false;

        }, false);
        //------------------




        self.canvas.addEventListener("pointermove", function(event){self.onPointerMove(event);}, false);
        $(self.canvas).mousewheel(function(event){self.onMouseWheel(event);});

        //--------------------------------------------------------------------------------------------------------------



        self.engine.runRenderLoop(function () {
            self.scene.render();

            $('#fps').html(Math.round(self.engine.fps*10)/10);
        });

        // Resize
        window.addEventListener("resize", function () {
            self.engine.resize();
        });


        self.prev_meshes=[];


        this.modeDefault();


        self.moving_objects = [];
        //--------------------------------------------------------------------------------------------------------------Moving
        self.scene.registerBeforeRender(function () {

            self.moving_objects.forEach(function(object_mesh){


                var position = self.positionToBabylon(object_mesh.object.getPosition());
                position.y = self.terrain_mesh.getHeightAtCoordinates(position.x, position.z);
                object_mesh.mesh.position = position;

                object_mesh.mesh.rotation.y=TOWNS.TMath.deg2rad(object_mesh.object.path.countRotation());




            });


        });
        //--------------------------------------------------------------------------------------------------------------



        //--------------------------------------------------------------------------------------------------------------path_material
        /**/
        self.path_material =  new BABYLON.StandardMaterial("path_material", self.scene);
        self.path_material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5); //Red
        self.path_material.alpha = 0.3;
        self.path_material.freeze();
        /**/
        //--------------------------------------------------------------------------------------------------------------




        self.particles_cache={};
        self.models_cache={};



    }



    mode(mode){


        var attachMode = this['attach'+mode];


        if(typeof attachMode === 'undefined'){
            throw new Error('Scene has no mode '+mode);
        }


        if(typeof self.modeUnattach === 'function'){
            self.modeUnattach();
        }

        self.modeUnattach = function () {};


        var args = [].slice.call(arguments).splice(1);


        r('Attaching mode '+mode);

        //--------------------------------------Icon //todo should it be here?
        var mode_icon = mode.split('_')[0].toLowerCase();
        $('#map-ctl').find('.button-icon').removeClass('selected');
        $('#map-ctl-'+mode_icon).addClass('selected');
        //--------------------------------------


        attachMode.apply(this,args);

    }

    modeDefault(){//todo rename
        this.mode('MOVING');
    }




    getArea(){

        var self = this;


        var borders = 200;

        var corners=[];
        [

            [self.canvas.width*(1)+borders,self.canvas.height*(1)+borders],
            [self.canvas.width*(0)-borders,self.canvas.height*(1)+borders],
            [self.canvas.width*(0)-borders,self.canvas.height*(0)-borders],
            [self.canvas.width*(1)+borders,self.canvas.height*(0)-borders]

        ].forEach(function(corner_canvas){


            var pickResult = self.scene.pick(
                corner_canvas[0],
                corner_canvas[1],
                function (picked_mesh) { return picked_mesh === self.ground_mesh; }
            );



            if (pickResult.hit) {

                var corner_scene={};
                corner_scene.x = pickResult.pickedPoint.x;
                corner_scene.z = pickResult.pickedPoint.z;


                /*var corner_position= new TOWNS.Position(
                    corner_scene.x/MAP_FIELD_SIZE + map_center.x,
                    -corner_scene.z/MAP_FIELD_SIZE + map_center.y
                );*/
                var corner_position = self.babylonToPosition(corner_scene);

                corners.push(corner_position);

            }else{

                throw new Error('Cant pick scene corner '+corner_canvas[0]);

            }

            //r(corner_canvas,corner_scene);

        });

        //var area = new TOWNS.Area(...corners);

        //todo change to ... when migrate to TS
        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
        var area = new (Function.prototype.bind.apply(TOWNS.Area, [null].concat(_toConsumableArray(corners))))();


        return(area);

    }






    update(objects_in_scene) {

        var self = this;


        if(!this.loaded)return;



        //--------------------------------------Clear scene
        self.prev_meshes.forEach(function(mesh){
            mesh.dispose();
        });
        self.prev_meshes=[];
        self.shadow_generator.getShadowMap().renderList=[];
        self.moving_objects=[];
        //--------------------------------------


        //self.light.position = new BABYLON.Vector3(20, 40, 20);


        self.setCamera();



        //--------------------------------------Area
        var area = this.getArea();
        var objects = objects_in_scene.filterArea(area);


        /**
        var path = [];
        area.positions.forEach(function(position){

            path.push(self.positionToBabylon(position));

        });

        path.push(self.positionToBabylon(area.positions[0]));

        self.area = BABYLON.Mesh.CreateTube("tube", path, 5, 5, null, 0, self.scene, false, BABYLON.Mesh.FRONTSIDE);
        self.area.position.x = 0;
        self.area.position.z = 0;
        self.area.position.y = 40;
        self.area.material =  new BABYLON.StandardMaterial("red", self.scene);
        self.area.material.diffuseColor = new BABYLON.Color3(1, 0, 1); //Red
        //self.area_circle.material.alpha = 0.3;

        self.prev_meshes.push(self.area);
        /**/
        //--------------------------------------





        self.map_of_terrain_codes  = objects.getMapOfTerrainCodes(map_center.getFloored(),map_radius);
        self.updateTerrain(self.map_of_terrain_codes);



        //-----------------------------------------------------------------------------------Naturals = Trees
        /**/
        var naturals  = objects.filterTypes('natural');


        naturals.forEach(function(natural){


            //var mesh = new Tree(20,60,20, self.scene, self.materials, self.shadow_generator);


            var mesh = self.assets[1].createInstance('tree');

            /*mesh.position.x = (natural.x-map_center.x)*MAP_FIELD_SIZE;//todo coords mapping
            mesh.position.z = -(natural.y-map_center.y)*MAP_FIELD_SIZE;*/

            mesh.position = self.positionToBabylon(natural);
            mesh.position.y = self.terrain_mesh.getHeightAtCoordinates(mesh.position.x,mesh.position.z);



            mesh.scaling.x=natural.design.data.size;
            mesh.scaling.y=natural.design.data.size;
            mesh.scaling.z=natural.design.data.size;

            mesh.rotation.y=TOWNS.TMath.deg2rad(natural.design.data.rotation.z);
            mesh.rotation.x=TOWNS.TMath.deg2rad(natural.design.data.rotation.x);
            mesh.rotation.z=TOWNS.TMath.deg2rad(natural.design.data.rotation.y);

            mesh.isPickable = false;

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

        var particles_cache={};
        var models_cache={};

        var buildings  = objects.filterTypes('building');

        buildings.forEach(function(building){self.addBuilding(building)});


        r('models_cache',models_cache);
        r('particles_cache',particles_cache);

        //-----------------------------------------------------------------------------------



        //-----------------------------------------------------------------------------------Stories
        /**/


        var stories  = objects.filterTypes('story');

        stories.forEach(function(story){

            //r('Creating story '+story.name);


            var position = self.positionToBabylon(story);
            position.y = self.terrain_mesh.getHeightAtCoordinates(position.x,position.z);

            //r(position.y);

            //if(position.y>1) {

                var mesh = createStoryMesh(story.id, story, self.scene, self.shadow_generator);


                mesh.position = position;

                self.prev_meshes.push(mesh);

            //}






            function getTextWidth(text, font) {
                // re-use canvas object for better performance
                var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
                var context = canvas.getContext("2d");
                context.font = font;
                var metrics = context.measureText(text);
                return metrics.width;
            }


            var size=15;
            var size_quality=size*3;


            var font= Math.round(size_quality)+"px Verdana";
            var len = getTextWidth(story.name,font);//todo better

            //-----------------Texture
            var width = len;
            var height = size_quality;

            var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", {width: width, height: height}, self.scene, true);
            var ctx = outputplaneTexture.getContext();
            ctx.imageSmoothingEnabled= false;
            ctx.font = font;
            ctx.textAlign = "center";


            ctx.fillStyle = "#fff";
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;

            ctx.strokeText(story.name, ctx.canvas.width/2, ctx.canvas.height*(3/4));
            ctx.fillText(story.name, ctx.canvas.width/2, ctx.canvas.height*(3/4));
            ctx.blur(1);


            /*ctx.blur(2);
            ctx.fillStyle = "#000";
            ctx.fillText(story.name, ctx.canvas.width/2, ctx.canvas.height*(3/4));*/

            outputplaneTexture.update();
            //-----------------



            //-----------------Mesh + Material
            var outputplane = BABYLON.Mesh.CreateGround(story.id, (size*width)/height ,size,1, self.scene);
            //outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
            outputplane.material = new BABYLON.StandardMaterial("outputplane", self.scene);
            outputplane.isPickable = false;

            outputplane.position.x = mesh.position.x;
            outputplane.position.y = mesh.position.y+40;
            outputplane.position.z = mesh.position.z;

            outputplane.rotation.y = Math.PI*(3/2)-self.camera.alpha;


            outputplane.material.diffuseTexture = outputplaneTexture;
            outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);//todo to terrain
            outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);

            outputplane.material.diffuseTexture.uScale = 1;
            outputplane.material.diffuseTexture.vScale = 1;



            outputplaneTexture.hasAlpha = true;
            //outputplaneTexture.drawText(story.name, 0, 150, font, "white", "transparent");
            outputplane.material.freeze();
            outputplane.convertToUnIndexedMesh();

            self.prev_meshes.push(outputplane);
            //-----------------




        });

        //-----------------------------------------------------------------------------------






    }



    updateTerrain(map_of_terrain_codes){

        //-----------------------------------------------------------------------------------Terrains

        var self = this;

        if(self.terrain_mesh){
            self.terrain_mesh.dispose();
        }


        var map_center_floor = map_center.getFloored();

        var terrain_mesh_texture = new BABYLON.DynamicTexture("terrain_mesh_texture", 2048, self.scene, true);
        var ctx = terrain_mesh_texture.getContext();

        /*ctx.fillStyle="#00ff00";
        ctx.fillRect(10,10,2048-20,2048-20);
        ctx.fillStyle="#FF0000";
        ctx.fillRect(20,20,2048-40,2048-40);*/




        var height_canvas = document.createElement('canvas');
        var height_canvas_px=2;//todo as Const
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
                    //z = 0.5+TOWNS.TMath.randomSeedPosition(4,{x:x+map_center_floor.x,y:y+map_center_floor.y})/2
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
                        TOWNS.Cache.backgrounds.get('t' + terrain_code + 's'+Math.floor(TOWNS.TMath.randomSeedPosition(3,{x:x+map_center_floor.x,y:y+map_center_floor.y})*seedCount)%seedCount),
                        (x ) / map_radius / 2 * 2048 + 1024,
                        (y ) / map_radius / 2 * 2048 + 1024,
                        MAP_FIELD_SIZE*7,//todo as Const
                        MAP_FIELD_SIZE*7//todo as Const
                    );

                }



            }



        }

        //height_canvas_ctx.canvas.downloadCanvas();

        height_canvas_ctx.blur(3*height_canvas_px);//todo as Const


        for(var y= -map_radius;y<map_radius;y++){
            for(var x= -map_radius;x<map_radius;x++){

                //r(y+map_radius);
                terrain_code = map_of_terrain_codes[y+map_radius][x+map_radius];


                if(terrain_code===5) {
                    z = 0.5+TOWNS.TMath.randomSeedPosition(3,{x:x+map_center_floor.x,y:y+map_center_floor.y})/2;


                    z = Math.floor(z * 255);

                    height_canvas_ctx.fillStyle = "rgb(" + z + "," + z + "," + z + ")";
                    height_canvas_ctx.fillRect(
                        (x + map_radius) * height_canvas_px,
                        (y + map_radius) * height_canvas_px,
                        height_canvas_px
                        , height_canvas_px
                    );
                }
            }



        }

        height_canvas_ctx.blur(0.5*height_canvas_px);//todo as Const


        terrain_mesh_texture.update();

        //var self.terrain_mesh = BABYLON.Mesh.CreateGround("terrain", 1024, 1024, 4, self.scene);
        //var self.terrain_mesh = BABYLON.Mesh.CreateRibbon("ribbon", paths, false, false, 0, self.scene);


        self.terrain_mesh = CreateGroundFromCanvas("self.ground_mesh", height_canvas, {
            width: map_radius*2*MAP_FIELD_SIZE,
            height:map_radius*2*MAP_FIELD_SIZE,
            subdivisions:height_canvas.width/2,
            minHeight:0,//todo maybe as Const
            maxHeight: 200//todo as Const
        }, self.scene);



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

        self.terrain_mesh.position = self.positionToBabylon(map_center_floor);
        //self.terrain_mesh.position.x=-self.terrain_mesh.position.x;
        //self.terrain_mesh.position.z=-self.terrain_mesh.position.z;
        self.terrain_mesh.isPickable = false;

        self.terrain_mesh.receiveShadows = true;
        //self.terrain_mesh.convertToUnIndexedMesh();


        self.water.material.refractionTexture.renderList=[self.terrain_mesh];
        self.water.material.reflectionTexture.renderList=[self.terrain_mesh];
        //-----------------------------------------------------------------------------------

    }





    addBuilding(building){


        var self = this;
        //r('Creating '+(building.isMoving()?'moving':'stable')+' building '+building);


        var position = self.positionToBabylon(building.getPosition());
        position.y = self.terrain_mesh.getHeightAtCoordinates(position.x,position.z);

        //r(position.y);

        if(position.y>1) {

            var model = building.getModel();

            var model_mesh = createModel(building.id, model, self.scene, self.materials, self.particles_cache, self.models_cache, self.shadow_generator);



            if(building.isMoving()) {
                self.moving_objects.push({
                    object: building,
                    mesh: model_mesh
                });


                createPathMesh('path',self,building.path);


            }





            model_mesh.rotation.y = self.rotationToBabylon(model.rotation);

            /*var normal = self.terrain_mesh.getNormalAtCoordinates(position.x,position.z);
             model_mesh.rotation.z = normal.z*Math.sin(model_mesh.rotation.y);
             model_mesh.rotation.x = normal.x*Math.cos(model_mesh.rotation.y);*/


            model_mesh.scaling.x = model.size;
            model_mesh.scaling.y = model.size;
            model_mesh.scaling.z = model.size;

            model_mesh.position = position;


            self.prev_meshes.push(model_mesh);



            if(map_selected_ids.indexOf(building.id)!==-1){


                var radius = MAP_SELECTED_FIELDS*MAP_FIELD_SIZE;
                self.selected_circle =//todo unite selection circles
                    createGroundRingMesh('tube', radius, 1, position, self.terrain_mesh,  self.scene , 20/*todo as const*/ , 5/*todo as const*/);

                self.prev_meshes.push(self.selected_circle);
                self.selected_circle.material = self.selected_circle_material;


            }

        }


    }




};
