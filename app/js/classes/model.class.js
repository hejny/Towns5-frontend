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


//======================================================================================================================





/**
 * Draw model on canvas
 * @param ctx Canvas context
 * @param {number} s Size of 1 virtual px
 * @param {number} x_begin Canvas left
 * @param {number} y_begin Canvas top
 * @param {number} rotation 0-360 Angle in degrees
 * @param {number} slope 0-90 Angle in degrees
 * @param {string} force color - format #ff00ff //todo maybe delete
 * @param {boolean} selected - display blue highlight around model
 */
Model.prototype.draw = function(ctx, s, x_begin, y_begin, rotation, slope, force_color=false, selected=false, simple=false) {


    //force_color=cParam(force_color,false);
    //todo delat kontrolu vstupnich parametru u funkci???






    var slope_m = Math.abs(Math.sin(slope / 180 * Math.PI));
    var slope_n = Math.abs(Math.cos(slope / 180 * Math.PI));
    var slnko = 50;


    var this_=deepCopyModel(this);
    //r(this_);

    this_.addRotationSize(rotation,s);
    //this_.compileRotationSize();

    //---------------------------------------------Create empty Towns4 3DModel Array

    var resource={
        points: [],
        polygons: [],
        colors: [],
        particles: []
    };


    var particlesLinear=this_.getLinearParticles();
    delete this_;

    //---------------------------------------------Convert particles to Towns4 3DModel Array


    //this_.particles
    particlesLinear.forEach(function(particle,particle_i){

        var addResource=ModelParticles.get3D(particle);

        //r(addResource);


        var i=resource.points.length;
        addResource.points.forEach(function(point){
            resource.points.push(point);
        });


        for(var poly_i in addResource.polygons){

            for(var point_i in addResource.polygons[poly_i]){
                addResource.polygons[poly_i][point_i]+=i-1;
            }

            resource.colors.push(particle.color);
            resource.polygons.push(addResource.polygons[poly_i]);

            resource.particles.push(particle_i);

        }


        //resource.points.push([]);


    });

    //"use strict"//delete this_;//todo deep delete


    //r(resource);

    //------------------------Prirazeni barev a cisel castecek k polygonum pred serazenim

    if(force_color==false){

        for(var i= 0,l=resource.polygons.length;i<l;i++){

            resource.polygons[i].color=resource.colors[i];
            resource.polygons[i].particle=resource.particles[i];
        }

    }else{

        var color = force_color;
        color = hexToRgb(color);

    }

    //r(resource);

    //==========================================================================================Sorting

    /**/
    resource['polygons'].sort(function (a, b) {

        var sum,cnt;

        var polygons=[a,b];
        var zindex=[0,0];

        for(var polygon in polygons){

            var sum = 0;
            var cnt = 0;

            for (var i in polygons[polygon]) {

                if(i!='color' && is(resource['points'][polygons[polygon][i]])) {

                    sum += resource['points'][polygons[polygon][i]][0] ;//* slope_m;
                    sum += resource['points'][polygons[polygon][i]][1] ;//* slope_m;
                    sum += resource['points'][polygons[polygon][i]][2] ;//* slope_n;
                    cnt++;
                }

            }

            zindex[polygon] = sum / cnt;

        }

        //-------------------
        if (zindex[0] > zindex[1]) {
            return 1;
        }
        if (zindex[1] > zindex[0]) {
            return -1;
        } else {
            return 0;
        }
    });/**/


    //==========================================================================================Shaders

    var shaders=[];
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Shadow
    if(!simple)
    shaders.push({
            fill: function(){return(new Color(255,255,255,255));},
            position: function(position3D){
                z = Math.abs(position3D.z);
                x = position3D.x + z / 1.5;
                y = position3D.y - z / 1.5 / 2;

                var xx = x * 1 - (y * 1);
                var yy = x * slope_m + y * slope_m;

                return(new Position(xx,yy));

            },
            canvas: simple?false:function(ctx) {
                ctx.recolorImage(
                    new Color(255,255,255,false),
                    new Color(0,0,0,100)
                );
                ctx.blur(2);
            }

        });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var shaderShapePosition = function(position3D){

        //return(new Color(0,255,255,100));

        var x = position3D.x,
            y = position3D.y,
            z = position3D.z;

        /*var k=1+(z/400);

         x=x*k;
         y=y*k;
         z=z*Math.pow(k,(1/1.2));*/

        xx = x - y;
        yy = x * slope_m + y * slope_m - (z * slope_n);

        return(new Position(xx,yy));

    };
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material - glow

    if(selected===true){
        shaders.push({
            line: function(color,polygon3D){
                return({
                    color: hexToRgb('4C9ED9'),
                    width: 10
                });

            },
            position: shaderShapePosition,
            canvas: simple?false:function(ctx) {
                ctx.blur(2);
            }
        });
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Material
    shaders.push({

        fill: force_color==false?function(color,polygon3D){

            var vector1={},
                vector2={},
                vector3={};//normal vector

            vector1.x=polygon3D[1].x-polygon3D[0].x;
            vector1.y=polygon3D[1].y-polygon3D[0].y;
            vector1.z=polygon3D[1].z-polygon3D[0].z;

            vector2.x=polygon3D[2].x-polygon3D[0].x;
            vector2.y=polygon3D[2].y-polygon3D[0].y;
            vector2.z=polygon3D[2].z-polygon3D[0].z;


            vector3.x = vector1.y*vector2.z - vector1.z*vector2.y
            vector3.y = vector1.z*vector2.x - vector1.x*vector2.z
            vector3.z = vector1.x*vector2.y - vector1.y*vector2.x


            var polar = Math.xy2distDeg(vector3.x,vector3.y);//todo refactor  all distdeg to polar

            var angle=Math.angleDiff(polar.deg,-45);

            var add=angle/-5;

            color.r+=add;
            color.g+=add;
            color.b+=add;

            return(color);



        }:function(){

            return(hexToRgb(force_color));//todo refactoring force_color should be instance of Color

        },
        position: shaderShapePosition
    });
    //==========================================================================================Draw


    shaders.forEach(function(shader){


        draw_polygons=[];

        for (var i2 = 0, l2 = resource['polygons'].length; i2 < l2; i2++) {


            draw_polygons[i2]={
                points: []
            };
            var polygon3D=[];


            for (var i3 = 0, l3 = resource['polygons'][i2].length; i3 < l3; i3++) {


                //x2 = resource['points'][resource['polygons'][i2][2]][0],
                //y2 = resource['points'][resource['polygons'][i2][2]][1];

                if (typeof resource['points'][resource['polygons'][i2][i3]] !== 'undefined') {


                    x = resource['points'][resource['polygons'][i2][i3]][0];
                    y = resource['points'][resource['polygons'][i2][i3]][1];
                    z = resource['points'][resource['polygons'][i2][i3]][2];

                    var position3D=new Position3D(x,y,z);
                    polygon3D.push(position3D);
                    var position=shader.position(position3D);


                    position.x+=x_begin;
                    position.y+=y_begin;

                    draw_polygons[i2].points.push(position);

                }
            }

            //todo refactor maybe as shader ?
            /*if(selected!==false && resource['polygons'][i2]['particle']===selected){

                draw_polygons[i2].line={
                    width: 2,
                    color: hexToRgb('4C9ED9')
                };

            }*/

            if(is(shader.fill)){
                color = hexToRgb(resource['polygons'][i2]['color']);
                draw_polygons[i2].fill={color: shader.fill(color,polygon3D)};
            }

            if(is(shader.line)){
                draw_polygons[i2].line=shader.line();
            }




        }

        //------------------------Range

        var range={
            min:{
                x: false,
                y: false
            },
            max:{
                x: false,
                y: false
            }
        };


        draw_polygons.forEach(function(polygon){

            polygon.points.forEach(function(point){

                if(range.min.x===false)range.min.x=point.x;
                if(range.min.y===false)range.min.y=point.y;
                if(range.max.x===false)range.max.x=point.x;
                if(range.max.y===false)range.max.y=point.y;

                if(range.min.x>point.x)range.min.x=point.x;
                if(range.min.y>point.y)range.min.y=point.y;
                if(range.max.x<point.x)range.max.x=point.x;
                if(range.max.y<point.y)range.max.y=point.y;

            });

        });

        var border=10;

        range.min.x-=border;
        range.min.y-=border;
        range.max.x+=border;
        range.max.y+=border;


        //------------------------

        //r(draw_polygons);

        var canvas = createCanvasViaFunction(range.max.x-range.min.x,range.max.y-range.min.y,function(ctx_){

            ctx_.drawPolygons(draw_polygons,range.min);

            if(is(shader.canvas)){
                shader.canvas(ctx_);
            }


        });

        ctx.drawImage(canvas,range.min.x,range.min.y);




        //ctx.drawPolygons(draw_polygons);


        //------------------------Vykreslení

    });

};


//======================================================================================================================


/**
 * Create icon of Towns model
 * @param {number} size Size of returned image
 * @returns {string} image data in base64
 */
Model.prototype.createIcon = function(size){

    var canvas = document.createElement('canvas');
    canvas.height=size;
    canvas.width = size;
    var context = canvas.getContext('2d');

    //r(context);
    this.draw(context, 0.5, size*(1/2), size*(2/3) , 10, 35);

    //r(canvas.toDataURL());

    return(canvas.toDataURL());

};

//==================================================


Model.prototype.createSrc = function( s, x_begin, y_begin, x_size, y_size, rot, slope,selected=false){

    var canvas = document.createElement('canvas');
    canvas.width=x_size;
    canvas.height = y_size;
    var context = canvas.getContext('2d');

    this.draw(context, s, x_begin, y_begin,  rot, slope,false,selected);

    return(canvas.toDataURL());

};


