/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Model
 */
//======================================================================================================================


/**
 * @param {object} Model json
 * @return {boolean} false in case of fail
 * @constructor
 */
var Model = function (json){

    if(typeof(json)=='undefined')return false;

    this.name=json.name;
    this.particles=json.particles;
    this.rotation=json.rotation;
    this.size=json.size;

    if(!is(this.rotation))this.rotation=0;
    if(!is(this.size))this.size=1;
};
//==================================================

/**
 * @param {number} rotation
 * @param {number} size
 */
Model.prototype.addRotationSize = function(rotation=0,size=1){

    this.rotation+=rotation;
    this.size=this.size*size;

};






//==================================================

/**
 * Mix rotation and size into particles
 */
/*Model.prototype.compileRotationSize = function(){

    //r(this.particles);
    //r('compileRotationSize',this.rotation,this.size);

    for(var i in this.particles){

        //r(i);
        //r(this.particles[i].position);
        var distDeg = Math.xy2distDeg(this.particles[i].position.x,this.particles[i].position.y);

        distDeg.dist=distDeg.dist*this.size;
        distDeg.deg+=this.rotation;

        //r(distDeg);

        var xy = Math.distDeg2xy(distDeg.dist,distDeg.deg);

        //r(xy);
        //r(this.particles[i].position.z,this.size);

        this.particles[i].rotation.xy+=this.rotation;

        this.particles[i].position.x=xy.x;
        this.particles[i].position.y=xy.y;
        this.particles[i].position.z=this.particles[i].position.z*this.size;


        this.particles[i].size.x=this.particles[i].size.x*this.size;
        this.particles[i].size.y=this.particles[i].size.y*this.size;
        this.particles[i].size.z=this.particles[i].size.z*this.size;



    }




    this.rotation=0;
    this.size=1;

};*/

//==================================================

/**
 * @param {string} dimension x,y,z,xy
 * @return {number} range
 */
Model.prototype.range = function(dimension){

    if(dimension=='xy'){

        return Math.xy2dist(this.range('x'),this.range('y')*this.size);

    }


    var particlesLinear=this.getLinearParticles();

    var max=false,min=false,max_,min_;
    for(var i in particlesLinear){


        min_=particlesLinear[i].position[dimension];
        max_=particlesLinear[i].position[dimension]+particlesLinear[i].size[dimension];

        //todo feature reverse

        if(max===false)max=max_;
        if(min===false)min=min_;


        if(max_>max)max=max_;
        if(min_<min)min=min_;

    }


    return(Math.abs(min-max)/*this.size*/);//todo rotation



};


//==================================================

/**
 * @param {number} move_x
 * @param {number} move_y
 * @param {number} move_z
 */
Model.prototype.moveBy = function(move_x,move_y,move_z){

    move_x=cParam(move_x,0);
    move_y=cParam(move_y,0);
    move_z=cParam(move_z,0);


    for(var i in this.particles){


        this.particles[i].position.x+=move_x;
        this.particles[i].position.y+=move_y;
        this.particles[i].position.z+=move_z;

    }



};
//==================================================

/**
 * Join models together
 * @param {object} Model
 * @param {number} move_x
 * @param {number} move_y
 */
Model.prototype.joinModel = function(model,move_x,move_y){//todo second param should be position

    //var  model_=deepCopyModel(model);
    //model_.moveBy(move_x,move_y);//todo maybe delete moveBy

    //var max_z=this.range('z');


    var this_linear_particles=this.getLinearParticles();
    var model_linear_particles=model.getLinearParticles();


    var distances=[0];
    for(var i in model_linear_particles){

        model_linear_particles[i].position.x+=move_x;
        model_linear_particles[i].position.y+=move_y;

        for(var ii in this_linear_particles){//todo maybe optimize by pre-sorting


            if(ModelParticles.collision2D(this_linear_particles[ii],model_linear_particles[i])){

                r(this_linear_particles[ii],model_linear_particles[i]);


                distances.push(this_linear_particles[ii].position.z+this_linear_particles[ii].size.z);

            }



        }

    }

    var max_z=Math.max.apply(Math,distances);
    //max_z=max_z/2;


    this.particles=[
            deepCopy(this),
            deepCopy(model)
        ];

    this.particles[1].position={
      x:move_x,
      y:move_y,
      z:max_z
    };

    this.rotation=0;
    this.size=1;

};



//======================================================================================================================


/**
 * Deep copy this and converts links to raw data
 * @returns {object} Model
 */
Model.prototype.getDeepCopyWithoutLinks = function() {


    var model = deepCopyModel(this);

    //---------------------------------------------Convert links to raw data


    var findParticleByName = function (particles, name) {//todo move to prototype

        for (var i in particles) {

            if (particles[i].name == name) {
                return (particles[i]);
            }

            if (is(particles[i].particles)) {
                var finded_particle = findParticleByName(particles[i].particles, name);

                if (finded_particle !== false) {
                    return (finded_particle);
                }

            }


        }

        return (false);

    };


    var particlesLinks = function (particles) {//todo move to prototype


        //r(particles);

        for (var i in particles) {


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Link
            if (is(particles[i].link)) {


                var linked_particle = findParticleByName(model.particles, particles[i].link);

                if (linked_particle == false) {
                    throw new Error('Invalid link ' + particle.link);
                }

                linked_particle = deepCopy(linked_particle);

                if (is(particles[i].rotation)) {
                    linked_particle.rotation = particles[i].rotation;
                }
                if (is(particles[i].size)) {
                    linked_particle.size = particles[i].size;
                }
                if (is(particles[i].position)) {
                    linked_particle.position = particles[i].position;
                }
                //todo skew


                particles[i] = linked_particle;
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Group
            if (is(particles[i].particles)) {

                particlesLinks(particles[i].particles);

            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


        }

    };


    particlesLinks(model.particles);

    return(model);

};


//======================================================================================================================


/**
 * Get 1D array of particles
 * @returns {Array} array of particles
 */
Model.prototype.getLinearParticles = function(){


    var particlesLinear=[];

    //---------------------------------------------Convert particles to 1D particles

    var particles2Linear = function(particles,position=false,rotation=0,size=1){//todo move to prototype

        if(position===false){
            position={
                x:0,
                y:0,
                z:0
            };
        }

        particles.forEach(function(particle){

            //particle=deepCopy(particle);



            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Default params of particle, group or link
            if(!particle.position){
                particle.position={
                    x:0,
                    y:0,
                    z:0
                }
            }
            if(!is(particle.rotation))particle.rotation=0;
            if(!is(particle.size))particle.size=1;
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Position, Rotation and size //todo skew

            var distDeg = Math.xy2distDeg(particle.position.x, particle.position.y);

            distDeg.dist = distDeg.dist * size;
            distDeg.deg += rotation;

            var xy = Math.distDeg2xy(distDeg.dist, distDeg.deg);

            particle.rotation += rotation;

            particle.position.x = xy.x;
            particle.position.y = xy.y;
            particle.position.z = particle.position.z * size;

            particle.position.x += position.x;
            particle.position.y += position.y;
            particle.position.z += position.z;

            if(typeof particle.size == 'number') {

                particle.size = particle.size * size;

            }else{

                particle.size.x = particle.size.x * size;
                particle.size.y = particle.size.y * size;
                particle.size.z = particle.size.z * size;

            }

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




            //------------------------------------------Particle
            if(is(particle.particles)){

                particles2Linear(particle.particles,particle.position,particle.rotation,particle.size);

            }else
            //------------------------------------------Group
            if(is(particle.shape)){

                particlesLinear.push(particle);

            }
            //------------------------------------------



        });


    };

    var model=this.getDeepCopyWithoutLinks();

    particles2Linear(model.particles,false,model.rotation,model.size);

    delete model;

    return(particlesLinear);

};

//======================================================================================================================

/**
 *
 * @param path
 * @returns {object} part of this
 */
Model.prototype.filterPath = function(path){

    var model=this;

    if(!is(path.forEach)){
        r(path);
        throw new Error('Path is not correct array.');
    }


    path.forEach(function(i){
        model = model.particles[i];
    });


    return(model);

};



//======================================================================================================================

/**
 *
 * @param path
 * @returns {object} part of this
 */
Model.prototype.filterPathSiblings = function(path){

    var model=this.getDeepCopyWithoutLinks();
    var current=model;

    if(!is(path.forEach)){
        r(path);
        throw new Error('Path is not correct array.');
    }


    path.forEach(function(particle_i,path_ii){

        /*if(path_ii<path.length-1){

         current = current.particles[particle_i];

         }else{*/

        var me = current.particles[particle_i];

        current.particles = [me];

        current=me;
        //}


    });

    return(model);

};

