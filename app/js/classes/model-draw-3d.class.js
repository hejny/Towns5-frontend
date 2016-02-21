/**
 * @author ©Towns.cz
 * @fileOverview Creates method draw3D in Class Model
 */
//======================================================================================================================


Model.prototype.draw3D = function(ctx, s, x_begin, y_begin, rotation, slope, force_color=false, selected=false, simple=false) {


    //force_color=cParam(force_color,false);
    //todo delat kontrolu vstupnich parametru u funkci???






    //var slope_m = Math.abs(Math.sin(slope / 180 * Math.PI));
    //var slope_n = Math.abs(Math.cos(slope / 180 * Math.PI));
    var slnko = 50;


    var this_=deepCopyModel(this);
    //r(this_);

    this_.addRotationSize(rotation+45,s);
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

    //------------------------Prirazeni barev a cisel castecek k polygonum pred serazenim //todo delete

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


    //==========================================================================================Draw


    var canvas = createCanvasViaFunction(/*range.max.x-range.min.x,range.max.y-range.min.y*/300,300,function(gl){



        //-------------------------------------

        var shaderProgram;
        var pMatrix = mat4.create();



        //function initGL() {
            //gl = WebGLUtils.setupWebGL(canvas);

            /*if (!gl) {
                return;
            }*/

            gl.clearColor(0.0, 0.0, 0.0, 1.0);

            gl.viewportWidth = gl.canvas.width;
            gl.viewportHeight = gl.canvas.height;

            mat4.ortho(0, gl.viewportWidth, 0, gl.viewportHeight, -200, +10, pMatrix);
        //}


        function getShader(gl, id) {
            var shaderScript = document.getElementById(id);

            if (!shaderScript) {
                return null;
            }

            var str = "";
            var k = shaderScript.firstChild;

            while (k) {
                if (k.nodeType == 3) {
                    str += k.textContent;
                }

                k = k.nextSibling;
            }

            var shader;

            if (shaderScript.type == "x-shader/x-fragment") {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if (shaderScript.type == "x-shader/x-vertex") {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                return null;
            }

            gl.shaderSource(shader, str);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(shader));
                return null;
            }

            return shader;
        }

        //function initShaders() {
            var fragmentShader = getShader(gl, "shader-fs");
            var vertexShader = getShader(gl, "shader-vs");

            shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                r("Could not initialise shaders");
            }

            gl.useProgram(shaderProgram);

            shaderProgram.vertexPositionLoc = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(shaderProgram.vertexPositionLoc);

            shaderProgram.colorLoc = gl.getUniformLocation(shaderProgram, "uColor");
            shaderProgram.pMatrixLoc = gl.getUniformLocation(shaderProgram, "uPMatrix");
        //}


        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniformMatrix4fv(shaderProgram.pMatrixLoc, false, pMatrix);

        //drawPolygons();
        //function drawPolygons() {
        /*    var p1 = [
                new Point(50, 50, 5),
                new Point(50, 100, 5),
                new Point(250, 170, -5),
                new Point(230, 245, -5),
                new Point(70, 200, -5)
            ];

            var p2 = [
                new Point(300, 320, 0),
                new Point(480, 280, 0),
                new Point(550, 350, 0),
                new Point(270, 420, 0)
            ];

            var p3 = [
                new Point(400, 100, 0),
                new Point(520, 70, 0),
                new Point(600, 160, 0),
                new Point(550, 220, 0),
                new Point(430, 230, 0),
                new Point(345, 200, 0)
            ];

            gl.uniform4f(shaderProgram.colorLoc, 1.0, 1.0, 1.0, 1.0);
            DrawUtils.drawPolygon(p1, gl, shaderProgram.vertexPositionLoc);

            gl.uniform4f(shaderProgram.colorLoc, 0.0, 1.0, 0.0, 1.0);
            DrawUtils.drawPolygon(p2, gl, shaderProgram.vertexPositionLoc);

            gl.uniform4f(shaderProgram.colorLoc, 0.0, 0.0, 1.0, 1.0);
            DrawUtils.drawPolygon(p3, gl, shaderProgram.vertexPositionLoc);*/


        //}


        for (var i2 = 0, l2 = resource['polygons'].length; i2 < l2; i2++) {

            var polygon3D=[];

            for (var i3 = 0, l3 = resource['polygons'][i2].length; i3 < l3; i3++) {



                if (typeof resource['points'][resource['polygons'][i2][i3]] !== 'undefined') {

                    var x = resource['points'][resource['polygons'][i2][i3]][0];
                    var y = resource['points'][resource['polygons'][i2][i3]][1];
                    var z = resource['points'][resource['polygons'][i2][i3]][2];

                    var DistDeg=Math.xy2distDeg(x,z);//todo all DistDeg via capital

                    DistDeg.deg+=slope;

                    var XY = Math.distDeg2xy(DistDeg.dist,DistDeg.deg);

                    x=XY.x;
                    x=XY.y;

                    var position3D=new Position3D(y+150,x+150,z);
                    polygon3D.push(position3D);

                }


            }
            var color = hexToRgb(resource['polygons'][i2]['color']);


            //r(polygon3D);


            gl.uniform4f(shaderProgram.colorLoc, color.r/255, color.g/255, color.b/255, 1.0);
            DrawUtils.drawPolygon(polygon3D, gl, shaderProgram.vertexPositionLoc);

        }



        //-------------------------------------


        /*gl.viewport(0, 0,
            gl.drawingBufferWidth, gl.drawingBufferHeight);

        var vertices = [
            0.5,0.5,  //Vertex 1
            0.5,-0.5, //Vertex 2
            -0.5,-0.5, //Vertex 3
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);*/


        /*gl.enable(gl.SCISSOR_TEST);
        gl.scissor(30, 10, 60, 60);
        gl.clearColor(1.0, 1.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);*/


    },'webgl');

    ctx.drawImage(canvas,/*range.min.x,range.min.y*/0,0);



};
