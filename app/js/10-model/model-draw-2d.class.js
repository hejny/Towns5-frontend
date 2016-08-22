/**
 * @author ©Towns.cz
 * @fileOverview Creates method draw in Class Model
 */
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
TOWNS.Model.prototype.draw = function(ctx, s, x_begin, y_begin, rotation, slope, force_color=false, selected=false, simple=false) {


    //force_color=cParam(force_color,false);
    //todo delat kontrolu vstupnich parametru u funkci???






    var slope_m = Math.abs(Math.sin(slope / 180 * Math.PI));
    var slope_n = Math.abs(Math.cos(slope / 180 * Math.PI));
    var slnko = 50;


    var this_=this.clone();
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

        var addResource= TOWNS.Model.Particles.get3D(particle);

        //r(addResource);


        var i=resource.points.length;
        addResource.points.forEach(function(point){
            resource.points.push(point);
        });


        for(var poly_i in addResource.polygons){

            for(var point_i in addResource.polygons[poly_i]){
                addResource.polygons[poly_i][point_i]+=i-1;
            }


            var imgData=ctx.getImageData(10,10,1,1);

            resource.colors.push(TOWNS.Cache.textures.getColor(particle.material).clone());
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
        color = TOWNS.Color.createFromHex(color);

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
            fill: function(){return(new TOWNS.Color(255,255,255,255));},
            position: function(position3D){
                z = Math.abs(position3D.z);
                x = position3D.x + z / 1.5;
                y = position3D.y - z / 1.5 / 2;

                var xx = x * 1 - (y * 1);
                var yy = x * slope_m + y * slope_m;

                return(new TOWNS.Position(xx,yy));

            },
            canvas: simple?false:function(ctx) {
                ctx.recolorImage(
                    new TOWNS.Color(255,255,255,false),
                    new TOWNS.Color(0,0,0,100)
                );
                ctx.blur(2);
            }

        });
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var shaderShapePosition = function(position3D){

        //return(new TOWNS.Color(0,255,255,100));

        var x = position3D.x,
            y = position3D.y,
            z = position3D.z *1.33;

        /*var k=1+(z/400);

         x=x*k;
         y=y*k;
         z=z*Math.pow(k,(1/1.2));*/

        xx = x - y;
        yy = x * slope_m + y * slope_m - (z * slope_n);

        return(new TOWNS.Position(xx,yy));

    };

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


            var polar = TOWNS.TMath.xy2distDeg(vector3.x,vector3.y);//todo refactor  all distdeg to polar

            var angle= TOWNS.TMath.angleDiff(polar.deg,-45);

            var add=angle/-5;

            color.r+=add;
            color.g+=add;
            color.b+=add;

            return(color);



        }:function(){

            return(TOWNS.Color.createFromHex(force_color));//todo refactoring force_color should be instance of TOWNS.Color

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

                    var position3D=new TOWNS.Position3D(x,y,z);
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
                color = resource['polygons'][i2]['color'];
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
TOWNS.Model.prototype.createIcon = function(size){

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


TOWNS.Model.prototype.createSrc = function( s, x_begin, y_begin, x_size, y_size, rot, slope,selected=false){

    var canvas = document.createElement('canvas');
    canvas.width=x_size;
    canvas.height = y_size;
    var context = canvas.getContext('2d');

    this.draw(context, s, x_begin, y_begin,  rot, slope,false,selected);

    return(canvas.toDataURL());

};
