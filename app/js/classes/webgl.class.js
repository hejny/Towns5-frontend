/**
 * @author ©Towns.cz
 * @fileOverview Creates Class webGL to simple canvas context manipulation
 */
//======================================================================================================================

var WebGL  = function(gl,polygons,rotations,shadow=false){

    this.gl=gl;
    this.polygons=gl;
    this.rotations=rotations;
    this.shadow=shadow;
    //this.gl=canvasgetContext('webthis.gl');
    
    /*this.cubeVerticesBuffer;
    this.cubeVerticesTextureCoordBuffer;
    this.cubeVerticesIndexBuffer;
    this.cubeVerticesNormalBuffer;*/
    //var this.cubeVerticesIndexBuffer;
    this.cubeRotation = 0.0;
    this.lastCubeUpdateTime = 0;

    
    this.cubeTextures=[];

    this.mvMatrixStack = [];
    
    /*this.mvMatrix;
    this.shaderProgram;
    this.vertexPositionAttribute;
    this.vertexNormalAttribute;
    this.textureCoordAttribute;
    this.viewMatrix;
    
    this.cubeVertexIndicesGroups;*/
    
    
    if (this.gl) {
    
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);  // Clear to black, fully opaque
        this.gl.clearDepth(1.0);                 // Clear everything
        this.gl.enable(this.gl.DEPTH_TEST);           // Enable depth testing
        this.gl.depthFunc(this.gl.LEQUAL);            // Near things obscure far things
    
        // Initialize the shaders; this is where all the lighting for the
        // vertices and so forth is established.
        this.initShaders();
    
        // Here's where we call the routine that builds all the objects
        // we'll be drawing.
        this.initBuffers(polygons);
    
        // Next, load and set up the textures we'll be using.
        this.initTextures();
    
        // Set up to draw the scene periodically.
        this.drawScene();
        //setInterval(drawScene, 15);
    }

};

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just have
// one object -- a simple two-dimensional cube.
//
WebGL.prototype.initBuffers = function(polygons) {

    var self=this;

    //---------------------------------------------Creating empty arrays for rendring


    // Now create an array of vertices for the cube.
    this.vertices = [/*
     -1.0, 1.0, -1.0,
     -1.0, 1.0, 1.0,
     1.0, 1.0, 1.0,
     1.0, 1.0, -1.0
     */];


    this.vertexNormals = [/*
     0.0, 1.0, 0.0,
     0.0, 1.0, 0.0,
     0.0, 1.0, 0.0,
     0.0, 1.0, 0.0
     */];

    this.textureCoordinates = [/*
     0.0, 0.0,
     1.0, 0.0,
     1.0, 1.0,
     0.0, 1.0
     */];


    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.
    this.cubeVertexIndices = [/*
     0, 1, 2, 0, 2, 3
     */];

    this.cubeVertexIndicesGroups=[];

    //---------------------------------------------Adding test polygons


    /*addPolygon([
     {x:-100,y:-100,z:0},
     {x:-100,y:100,z:0},
     {x:100,y:100,z:0},
     {x:150,y:-100,z:0},
     {x:100,y:-150,z:0},


     ],0);

     addPolygon([
     {x:-100,y:-100,z:100},
     {x:-100,y:100,z:100},
     {x:100,y:100,z:100},
     {x:100,y:-100,z:100},

     ],1);

     addPolygon([
     {x:-100,y:-100,z:-50},
     {x:-100,y:100,z:-50},
     {x:100,y:100,z:-50},
     {x:100,y:-100,z:-50},

     ],1);*/

    //---------------------------------------------Ground

    /*for(var y=-1;y<=1;y++){
        for(var x=-1;x<=1;x++){

            var xx=x*75;
            var yy=y*75;
            var zz=Math.round(Math.random()*100);

            polygons.push({
                shape: [
                    {x:-100+xx,y:-100+yy,z:zz},
                    {x:100+xx,y:-100+yy,z:zz},
                    {x:100+xx,y:100+yy,z:zz},
                    {x:-100+xx,y:100+yy,z:zz}

                ],
                texture: 2
            });


        }
    }*/


    //---------------------------------------------Adding polygons data

    var materials=['solid'];
    if(this.shadow){
        materials.push('shadow');
    }

    materials.forEach(function(material){

        polygons.forEach(function(polygon){



            var i = self.vertices.length/3;


            if(polygon.shape.length>=3 && material=='solid'){

                var vector_ab={};
                var vector_ac={};
                var vector_normal={};

                vector_ab.x = polygon.shape[0].x-polygon.shape[1].x;
                vector_ab.y = polygon.shape[0].y-polygon.shape[1].y;
                vector_ab.z = polygon.shape[0].z-polygon.shape[1].z;

                vector_ac.x = polygon.shape[0].x-polygon.shape[2].x;
                vector_ac.y = polygon.shape[0].y-polygon.shape[2].y;
                vector_ac.z = polygon.shape[0].z-polygon.shape[2].z;

                vector_normal.x = vector_ab.y*vector_ac.z - vector_ab.z*vector_ac.y;
                vector_normal.y = vector_ab.z*vector_ac.x - vector_ab.x*vector_ac.z;
                vector_normal.z = vector_ab.x*vector_ac.y - vector_ab.y*vector_ac.x;

                var distance = Math.sqrt(
                    Math.pow(vector_normal.x,2)+
                    Math.pow(vector_normal.y,2)+
                    Math.pow(vector_normal.z,2));

                vector_normal.x = vector_normal.x/distance;
                vector_normal.y = vector_normal.y/distance;
                vector_normal.z = vector_normal.z/distance;

            }else{

                vector_normal={x:0,y:1,z:0};

            }



            polygon.shape.forEach(function(point,point_i){

                var point_=deepCopy(point);
                if(material=='shadow'){
                    point_.x+=point_.z;
                    point_.y+=point_.z;
                    point_.z=0;
                }

                self.vertices.push(point_.x/100,point_.y/100,point_.z/100);

                self.vertexNormals.push(vector_normal.x,vector_normal.y,vector_normal.z);

                switch(point_i%4) {
                    case 0:
                        self.textureCoordinates.push(0,0);
                        break;
                    case 1:
                        self.textureCoordinates.push(1,0);
                        break;
                    case 2:
                        self.textureCoordinates.push(1,1);
                        break;
                    case 3:
                        self.textureCoordinates.push(0,1);
                        break;

                }

            });


            var count=0;

            for(var nn=1;nn<=polygon.shape.length-2;nn++){

                self.cubeVertexIndices.push(i+0);
                self.cubeVertexIndices.push(i+nn);
                self.cubeVertexIndices.push(i+nn+1);

                count+=3;

            }


            self.cubeVertexIndicesGroups.push({
                count: count,
                texture: material=='shadow'?'shadow':polygon.texture
            });



        });

    });

    //---------------------------------------------Debug data

     /*
     r('vertices',this.vertices);
     r('vertexNormals',this.vertexNormals);
     r('textureCoordinates',this.textureCoordinates);
     r('this.cubeVertexIndices',this.cubeVertexIndices);
     r('this.cubeVertexIndicesGroups',this.cubeVertexIndicesGroups);/**/

    //---------------------------------------------Processing polygons data


    // Create a buffer for the cube's vertices.
    this.cubeVerticesBuffer = this.gl.createBuffer();

    // Select the this.cubeVerticesBuffer as the one to apply vertex
    // operations to from here out.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesBuffer);


    // Now pass the list of vertices into WebGL to build the shape. We
    // do this by creating a Float32Array from the JavaScript array,
    // then use it to fill the current vertex buffer.
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);

    // Set up the normals for the vertices, so that we can compute lighting.
    this.cubeVerticesNormalBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesNormalBuffer);


    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals),
        this.gl.STATIC_DRAW);

    // Map the texture onto the cube's faces.
    this.cubeVerticesTextureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesTextureCoordBuffer);



    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
        this.gl.STATIC_DRAW);


    // Build the element array buffer; this specifies the indices
    // into the vertex array for each face's vertices.
    this.cubeVerticesIndexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);



    // Now send the element array to GL
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(this.cubeVertexIndices), this.gl.STATIC_DRAW);



};

//
// initTextures
//
// Initialize the textures we'll be using, then initiate a load of
// the texture images. The handleTextureLoaded() callback will finish
// the job; it gets called each time a texture finishes loading.
//
WebGL.prototype.initTextures = function() {

    for(var key in Textures){

        this.cubeTextures[key] = this.gl.createTexture();
        this.handleTextureLoaded(Textures[key], this.cubeTextures[key]);


    };

};

WebGL.prototype.handleTextureLoaded = function(image, texture) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
};

//
// drawScene
//
// Draw the scene.
//
WebGL.prototype.drawScene = function() {

    var self = this;

    
    // Clear the canvas before we start drawing on it.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Establish the perspective with which we want to view the
    // scene. Our field of view is 45 degrees, with a width/height
    // ratio of 640:480, and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    /*/this.viewMatrix = makePerspective(
        45,
        this.gl.canvas.width/this.gl.canvas.height,
        0.1,
        100.0
    );/**/

    /**/this.viewMatrix = makeOrtho(
        this.gl.canvas.width/-200,
        this.gl.canvas.width/200,
        this.gl.canvas.height/-200,
        this.gl.canvas.height/200,
        -10,10);/**/

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.

    this.loadIdentity();
    // Now move the drawing position a bit to where we want to start
    // drawing the cube.

    this.mvTranslate([0.0, 0.0, -6.0]);
    // Save the current matrix, then rotate before we draw.

    this.mvPushMatrix();


    this.rotations.forEach(function(rotation){
        self.mvRotate(rotation.deg, rotation.vector);
    });


    // Draw the cube by binding the array buffer to the cube's vertices
    // array, setting attributes, and pushing it to GL.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesBuffer);
    this.gl.vertexAttribPointer(this.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);

    // Set the texture coordinates attribute for the vertices.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesTextureCoordBuffer);
    this.gl.vertexAttribPointer(this.textureCoordAttribute, 2, this.gl.FLOAT, false, 0, 0);

    // Bind the normals buffer to the shader attribute.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesNormalBuffer);
    this.gl.vertexAttribPointer(this.vertexNormalAttribute, 3, this.gl.FLOAT, false, 0, 0);



    // Draw the cube.

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);
    this.setMatrixUniforms();
    //this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);


    // Specify the texture to map onto the faces.

    this.gl.activeTexture(this.gl.TEXTURE0);


    //this.cubeVertexIndicesGroups=[this.cubeVertexIndicesGroups[1]];

    var i=0;
    this.cubeVertexIndicesGroups.forEach(function(group){

        self.gl.bindTexture(self.gl.TEXTURE_2D, self.cubeTextures[group.texture]);
        self.gl.drawElements(self.gl.TRIANGLES, group.count, self.gl.UNSIGNED_SHORT, i*2);

        i+=group.count;

    });


    /*this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTextures[1]);
     this.gl.drawElements(this.gl.TRIANGLES, 9, this.gl.UNSIGNED_SHORT, 0)/


     this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTextures[0]);
     this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 18);*/



    /*this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTextures[1]);
     this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 12);*/




    this.gl.uniform1i(this.gl.getUniformLocation(this.shaderProgram, "uSampler"), 0);



    // Restore the original matrix
    this.mvPopMatrix();

    // Update the rotation for the next draw, if it's time to do so.
    /*var currentTime = (new Date).getTime();
     if (this.lastCubeUpdateTime) {
     var delta = currentTime - this.lastCubeUpdateTime;

     this.cubeRotation += (100 * delta) / 1000.0;
     }

     this.lastCubeUpdateTime = currentTime;*/



};

//
// initShaders
//
// Initialize the shaders, so WebGL knows how to light our scene.
//
WebGL.prototype.initShaders = function() {
    
    var fragmentShader = this.getShader('x-shader/x-fragment');
    var vertexShader = this.getShader('x-shader/x-vertex');

    // Create the shader program

    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);

    // If creating the shader program failed, alert

    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    this.gl.useProgram(this.shaderProgram);

    this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
    this.gl.enableVertexAttribArray(this.vertexPositionAttribute);

    this.textureCoordAttribute = this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
    this.gl.enableVertexAttribArray(this.textureCoordAttribute);

    this.vertexNormalAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
    this.gl.enableVertexAttribArray(this.vertexNormalAttribute);
};

//
// getShader
//
// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
//
WebGL.prototype.getShader = function(type) {

    var shader,theSource;

    if (type == "x-shader/x-fragment") {
        theSource=`
            varying highp vec2 vTextureCoord;
            varying highp vec3 vLighting;

            uniform sampler2D uSampler;

            void main(void) {
                highp vec4 texelColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

                gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
            }
        `;
        shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    } else if (type == "x-shader/x-vertex") {
        theSource=`
            attribute highp vec3 aVertexNormal;
            attribute highp vec3 aVertexPosition;
            attribute highp vec2 aTextureCoord;

            uniform highp mat4 uNormalMatrix;
            uniform highp mat4 uMVMatrix;
            uniform highp mat4 uPMatrix;

            varying highp vec2 vTextureCoord;
            varying highp vec3 vLighting;

            void main(void) {
                gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
                vTextureCoord = aTextureCoord;

                // Apply lighting effect

                highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);
                highp vec3 directionalLightColor = vec3(0.8, 0.8, 0.8);
                highp vec3 directionalVector = vec3(-1, -1, -0.2);

                highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

                highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
                vLighting = ambientLight + (directionalLightColor * directional);
            }
        `;
        shader = this.gl.createShader(this.gl.VERTEX_SHADER);
    } else {
        return null;  // Unknown shader type
    }

    // Send the source to the shader object

    this.gl.shaderSource(shader, theSource);

    // Compile the shader program

    this.gl.compileShader(shader);

    // See if it compiled successfully

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};

//
// Matrix utility functions
//
WebGL.prototype.loadIdentity = function() {
    this.mvMatrix = Matrix.I(4);
};

WebGL.prototype.multMatrix = function(m) {
    this.mvMatrix = this.mvMatrix.x(m);
};

WebGL.prototype.mvTranslate = function(v) {
    this.multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
};

WebGL.prototype.setMatrixUniforms = function() {
    var pUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    this.gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.viewMatrix.flatten()));

    var mvUniform = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
    this.gl.uniformMatrix4fv(mvUniform, false, new Float32Array(this.mvMatrix.flatten()));

    var normalMatrix = this.mvMatrix.inverse();
    normalMatrix = normalMatrix.transpose();
    var nUniform = this.gl.getUniformLocation(this.shaderProgram, "uNormalMatrix");
    this.gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
};



WebGL.prototype.mvPushMatrix = function(m) {
    if (m) {
        this.mvMatrixStack.push(m.dup());
        this.mvMatrix = m.dup();
    } else {
        this.mvMatrixStack.push(this.mvMatrix.dup());
    }
};

WebGL.prototype.mvPopMatrix = function() {
    if (!this.mvMatrixStack.length) {
        throw("Can't pop from an empty matrix stack.");
    }
    this.mvMatrix = this.mvMatrixStack.pop();
    return this.mvMatrix;
};

WebGL.prototype.mvRotate = function(angle, v) {
    var inRadians = angle * Math.PI / 180.0;
    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    this.multMatrix(m);
};
