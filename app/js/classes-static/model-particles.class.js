//todo headers




var ModelParticles = {};



ModelParticles.get3D = function(particle){

    var resource={};

    if(particle.shape=='cube') {

        var x = particle.position.x;
        var y = particle.position.y;
        var z = particle.position.z;

        var x_ = Math.cos(Math.deg2rad(particle.rotation.xy)) * particle.size.x;
        var y_ = Math.sin(Math.deg2rad(particle.rotation.xy)) * particle.size.y;
        var z_ = particle.size.z;


        resource.points = [
            [x + x_, y + y_, z],
            [x - y_, y + x_, z],
            [x - x_, y - y_, z],
            [x + y_, y - x_, z],
            [x + x_, y + y_, z + z_],
            [x - y_, y + x_, z + z_],
            [x - x_, y - y_, z + z_],
            [x + y_, y - x_, z + z_]
        ];


        resource.polygons = [
            //[1234]
            [5, 6, 7, 8],
            [1, 2, 6, 5],
            [2, 3, 7, 6],
            [3, 4, 8, 7],
            [4, 1, 5, 8]

        ];


        resource.polygons2D = [
            [1,2,3,4]
        ];

    }else
    if(particle.shape=='pyramid') {

        var x = particle.position.x;
        var y = particle.position.y;
        var z = particle.position.z;

        var x_ = Math.cos(Math.deg2rad(particle.rotation.xy)) * particle.size.x;
        var y_ = Math.sin(Math.deg2rad(particle.rotation.xy)) * particle.size.y;
        var z_ = particle.size.z;


        resource.points = [
            [x + x_, y + y_, z],
            [x - y_, y + x_, z],
            [x - x_, y - y_, z],
            [x + y_, y - x_, z],

            [x, y, z + z_],
        ];


        resource.polygons = [
            //[1234]
            [1, 2, 5],
            [2, 3, 5],
            [3, 4, 5],
            [4, 1, 5]

        ];


        resource.polygons2D = [
            [1,2,3,4]
        ];

    }else{

        throw 'Unknown particle shape '+particle.shape;

    }

    return resource;

};




ModelParticles.get2Dlines = function(particle){


    var resource=this.get3D(particle);

    var lines=[];



    for(var pn in resource.polygons2D){

        /*lines[pn]=[];

        for(var pt in resource.polygons[pn]) {

            var point = resource.points[resource.polygons[pn][pt] - 1];
            lines[pn][ps] = [point[0], point[1]];

        }*/

        for(var i=-1,l=resource.polygons2D[pn].length;i<l-1;i++){


            if(i!=-1)
                var point1=i;
            else
                var point1=l-1;

            var point2=i+1;


            //r(resource.polygons[pn],point1);

            point1 = resource.points[resource.polygons2D[pn][point1] - 1];
            point2 = resource.points[resource.polygons2D[pn][point2] - 1];


            lines.push(
                [
                    {
                        x: point1[0],
                        y: point1[1]
                    },{
                        x: point2[0],
                        y: point2[1]
                    }
                ]
            );


        }

    }



    //r(lines);

    return(lines);

};


//======================================================================================================================

ModelParticles.collisionLinesDetect = function(lines1,lines2){

    for (var i1 in lines1) {
        for (var i2 in lines2) {

            if (Math.lineCollision(
                    lines1[i1][0].x,
                    lines1[i1][0].y,
                    lines1[i1][1].x,
                    lines1[i1][1].y,
                    lines2[i2][0].x,
                    lines2[i2][0].y,
                    lines2[i2][1].x,
                    lines2[i2][1].y
                )) {

                //r('collision2D is true', particle1, particle2);
                return (true);
            }


        }
    }

    return false;


};

//----------------------------------------------------------------------------------------------------------------------


ModelParticles.collision2D = function(particle1,particle2){


    var lines1 = ModelParticles.get2Dlines(particle1);
    var lines2 = ModelParticles.get2Dlines(particle2);

    //-------------------------------Corner collision


    var collision=ModelParticles.collisionLinesDetect(lines1,lines2);

    //-------------------------------Inner convex collision

    if(!collision){

        collision=function(){


            var k=100;

            for(i=0;i<2;i++){

                if(i==0){
                    var outer=deepCopy(lines2);
                    var inner=deepCopy(lines1[0]);
                }else{
                    var outer=deepCopy(lines1);
                    var inner=deepCopy(lines2[0]);
                }



                var inner1=inner;
                var inner2=inner;



                var inner_vector_x=inner[1].x-inner[0].x;
                var inner_vector_y=inner[1].y-inner[0].y;

                inner1[0].x-=inner_vector_x*k;
                inner1[0].y-=inner_vector_y*k;


                inner2[1].x+=inner_vector_x*k;
                inner2[1].y+=inner_vector_y*k;


                inner1=[inner1];
                inner2=[inner2];

                var collision1=ModelParticles.collisionLinesDetect(inner1,outer);
                var collision2=ModelParticles.collisionLinesDetect(inner2,outer);


                if(collision1 && collision2){

                    return(true);

                }

            }


            return(false);

        }();


    }


    //-------------------------------

    //-------------------------------Debug TDD
    /**var size=50;
    var src=createCanvasViaFunctionAndConvertToSrc(
        size*2,size*2,function(ctx){

            //ctx.strokeStyle = '#000000';
            //ctx.strokeWidth = 2;

            ctx.beginPath();

            var lines_=[lines1,lines2];
            for(var key in lines_){

                ctx.beginPath();
                for(var i= 0,l=lines_[key].length;i<l;i++){

                   ctx.moveTo(lines_[key][i][0].x+size,lines_[key][i][0].y+size);
                   ctx.lineTo(lines_[key][i][1].x+size,lines_[key][i][1].y+size);

                }
                ctx.stroke();
                ctx.closePath();

            }

        }


    );
    $('body').append('<img src="'+src+'" border='+(collision?2:0)+'>');/**/
    //-------------------------------

    return(collision);


};