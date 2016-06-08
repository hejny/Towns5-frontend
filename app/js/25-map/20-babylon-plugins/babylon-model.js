





createModel = function(name, model, scene, materials, particles_cache, models_cache, shadow_generator) {

    var model_hash = model.getHash();

    //r('models_cache',model_hash,models_cache);

    var model_mesh;

    if(typeof models_cache[model_hash]!=='undefined'){


        model_mesh = models_cache[model_hash].createInstance('model');
        model_mesh.material = models_cache[model_hash].material;


    }else {


        var last_material = false;
        var homogene = true;
        var all_meshes = [];

        var linear_particles = model.getLinearParticles(true);

        linear_particles.forEach(function (particle) {

            /*{
             "name":"",
             "shape":{
             "type":"prism",
             "n":6,
             "top":1,
             "bottom":1,
             "rotated":false
             },
             "material":"wood_raw",
             "position":{"x":0,"y":0,"z":35},
             "size":{"x":5,"y":15,"z":5},
             "rotation":0,
             "skew":{"z":{"x":0,"y":0}}
             }*/

            if (last_material !== false && last_material !== particle.material) {
                homogene = false;
            }

            last_material = particle.material;


            if (typeof materials[particle.material] === 'undefined') {

                r('Initializing new material ' + particle.material);

                //Creation of a material with an image texture
                materials[particle.material] = new BABYLON.StandardMaterial("texture3", scene);
                materials[particle.material].diffuseTexture = new BABYLON.Texture(T.Cache.textures.get(particle.material).src, scene);
                materials[particle.material].freeze();
            }


            var material = materials[particle.material];


            particle = T.Model.Particles.addMissingParams(particle);

            if (particle.shape.type == 'prism') {


                var particle_mesh;
                var particle_key = 'p' + [
                        particle.shape.n,
                        particle.shape.top,
                        particle.shape.bottom,
                        particle.skew.z.x,
                        particle.skew.z.y
                    ].join('_');


                if (typeof particles_cache[particle_key] === 'undefined' || true) {

                    var ribbons = [];


                    var path_bottom = [];
                    var path_top = [];

                    //-------------------------------------------------------------------prism

                    var x__, y__, z__;


                    for (var n = 0; n <= particle.shape.n; n++) {


                        //--------
                        for (var level = 0; level < 2; level++) {

                            if (level === 0) {
                                base = particle.shape.bottom;

                            } else {
                                base = particle.shape.top;
                            }


                            //------------------XYZ ratio

                            if (!is(particle.shape.rotated)) {

                                x__ = 0.5 * Math.cos(-n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + (level * particle.skew.z.x);
                                y__ = 0.5 * Math.sin(-n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * base + (level * particle.skew.z.y);
                                z__ = level;

                            } else {

                                var tmp = (2 - (Math.cos(T.Math.deg2rad(180 / particle.shape.n))));//todo better

                                x__ = ((level * 2) - 1);

                                y__ = 0.5 * Math.sin(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n));


                                z__ = (1) * 0.5 * (

                                        Math.cos(n / particle.shape.n * Math.PI * 2 + T.Math.deg2rad(180 + 180 / particle.shape.n)) * tmp +
                                        ((Math.cos(T.Math.deg2rad(180 / particle.shape.n)))) * tmp

                                    );


                                z__ -= 0.5;

                            }


                            //------------------


                            x__ = x__ * MAP_BUILDING_SIZE;
                            y__ = y__ * MAP_BUILDING_SIZE;
                            z__ = z__ * MAP_BUILDING_SIZE;


                            if (level === 0) {

                                path_bottom.push(new BABYLON.Vector3(x__, z__, y__));

                            } else {

                                path_top.push(new BABYLON.Vector3(x__, z__, y__));

                            }


                        }
                    }


                    var particle_ribbon = BABYLON.Mesh.CreateRibbon("ribbon", [path_bottom, path_top], false, false, 0, scene);
                    ribbons.push(particle_ribbon);


                    /*if(particle.name=='wheel'){
                     scene.registerBeforeRender(function () {
                     particle_ribbon.rotation.x += 0.02;
                     });
                     }*/

                    /**/
                    [path_bottom, path_top].forEach(function (path, i) {


                        var small_length = Math.ceil(path.length / 2);
                        var path_1 = path.slice(0, small_length);
                        var path_2 = path.slice(small_length);
                        if (path_2.length + 1 === path_1.length) {
                            path_2.push(path[0]);
                        }
                        if (i === 1) {
                            path_1.reverse();
                        } else {
                            path_2.reverse();
                        }


                        var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", [path_2, path_1], false, false, 0, scene);
                        ribbons.push(ribbon);

                    });

                    particle_mesh = BABYLON.Mesh.MergeMeshes(ribbons, true);
                    particle_mesh.convertToUnIndexedMesh();

                    particles_cache[particle_key] = particle_mesh;

                } else {

                    particle_mesh = particles_cache[particle_key].createInstance('particle');
                }
                /**/


                particle_mesh.position.x = particle.position.x * MAP_BUILDING_SIZE;
                particle_mesh.position.z = particle.position.y * MAP_BUILDING_SIZE;
                if (is(particle.shape.rotated)) {
                    particle_mesh.position.y = (particle.position.z + 0.5) * MAP_BUILDING_SIZE;
                } else {
                    particle_mesh.position.y = particle.position.z * MAP_BUILDING_SIZE;
                }


                particle_mesh.scaling.x = particle.size.x;
                particle_mesh.scaling.y = particle.size.z;
                particle_mesh.scaling.z = particle.size.y;


                particle_mesh.rotation.y = T.Math.deg2rad(-particle.rotation/*-180*/);

                particle_mesh.material = material;

                all_meshes.push(particle_mesh);


                //-------------------------------------------------------------------
            } else {

                throw 'Unknown particle shape ' + particle.shape.type;

            }


        });



        if (homogene) {

            model_mesh = BABYLON.Mesh.MergeMeshes(all_meshes, true);
            model_mesh.convertToUnIndexedMesh();

            models_cache[model_hash] = model_mesh;


        } else {

            model_mesh = BABYLON.Mesh.CreateSphere("model", 2, 0, scene);

            all_meshes.forEach(function (particle_mesh) {
                particle_mesh.parent = model_mesh;
            });

        }
    }


    model_mesh.name = name;


    shadow_generator.getShadowMap().renderList.push(model_mesh);
    //r(model_mesh.rotation.y);

    return(model_mesh);


};


