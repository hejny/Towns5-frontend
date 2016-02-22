/**
 * @author ©Towns.cz
 * @fileOverview Creates Class webGL to simple canvas context manipulation
 */
//======================================================================================================================

var WebGL  = function(canvas){
    
    //this.this.gl=canvasgetContext('webthis.gl');
    
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
    this.perspectiveMatrix;
    
    this.cubeVertexIndicesGroups;*/
    
    
    if (this.gl) {
    
    
        this.gl.clearColor(0.1, 0.1, 0.1, 1.0);  // Clear to black, fully opaque
        this.gl.clearDepth(1.0);                 // Clear everything
        this.gl.enable(this.gl.DEPTH_TEST);           // Enable depth testing
        this.gl.depthFunc(this.gl.LEQUAL);            // Near things obscure far things
    
        // Initialize the shaders; this is where all the lighting for the
        // vertices and so forth is established.
        this.initShaders();
    
        // Here's where we call the routine that builds all the objects
        // we'll be drawing.
        this.initBuffers();
    
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

    //-------------------------


    // Now create an array of vertices for the cube.
    var vertices = [/*
     -1.0, 1.0, -1.0,
     -1.0, 1.0, 1.0,
     1.0, 1.0, 1.0,
     1.0, 1.0, -1.0
     */];


    var vertexNormals = [/*
     0.0, 1.0, 0.0,
     0.0, 1.0, 0.0,
     0.0, 1.0, 0.0,
     0.0, 1.0, 0.0
     */];

    var textureCoordinates = [/*
     0.0, 0.0,
     1.0, 0.0,
     1.0, 1.0,
     0.0, 1.0
     */];


    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.
    var cubeVertexIndices = [/*
     0, 1, 2, 0, 2, 3
     */];

    this.cubeVertexIndicesGroups=[];

    var addPolygon = function(polygon,texture){//TODO 1

        var i = vertices.length/3;


        if(polygon.length>=3){

            vector_ab={};
            vector_ac={};

            vector_ab.x = polygon[0].x-polygon[1].x;
            vector_ab.y = polygon[0].y-polygon[1].y;
            vector_ab.z = polygon[0].z-polygon[1].z;

            vector_ac.x = polygon[0].x-polygon[2].x;
            vector_ac.y = polygon[0].y-polygon[2].y;
            vector_ac.z = polygon[0].z-polygon[2].z;

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



        polygon.forEach(function(point,point_i){

            vertices.push(point.x/100,point.y/100,point.z/100);

            vertexNormals.push(vector_normal.x,vector_normal.y,vector_normal.z);

            switch(point_i%4) {
                case 0:
                    textureCoordinates.push(0,0);
                    break;
                case 1:
                    textureCoordinates.push(1,0);
                    break;
                case 2:
                    textureCoordinates.push(1,1);
                    break;
                case 3:
                    textureCoordinates.push(0,1);
                    break;

            }

        });


        var count=0;

        for(var nn=1;nn<=polygon.length-2;nn++){

            cubeVertexIndices.push(i+0);
            cubeVertexIndices.push(i+nn);
            cubeVertexIndices.push(i+nn+1);

            count+=3;

        }


        this.cubeVertexIndicesGroups.push({
            count: count,
            texture: texture
        });


    };

    //-------------------------TODO 2

    
    polygons.forEach(function(polygon){

        self.addPolygon(polygon.shape,polygon.texture);
    });

    //-------------------------


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

    /*r('vertices',vertices);
     r('vertexNormals',vertexNormals);
     r('textureCoordinates',textureCoordinates);
     r('cubeVertexIndices',cubeVertexIndices);
     r('this.cubeVertexIndicesGroups',this.cubeVertexIndicesGroups);*/

    //-------------------------


    // Create a buffer for the cube's vertices.
    this.cubeVerticesBuffer = this.gl.createBuffer();

    // Select the this.cubeVerticesBuffer as the one to apply vertex
    // operations to from here out.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesBuffer);


    // Now pass the list of vertices into WebGL to build the shape. We
    // do this by creating a Float32Array from the JavaScript array,
    // then use it to fill the current vertex buffer.
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    // Set up the normals for the vertices, so that we can compute lighting.
    this.cubeVerticesNormalBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesNormalBuffer);


    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
        this.gl.STATIC_DRAW);

    // Map the texture onto the cube's faces.
    this.cubeVerticesTextureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeVerticesTextureCoordBuffer);



    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        this.gl.STATIC_DRAW);


    // Build the element array buffer; this specifies the indices
    // into the vertex array for each face's vertices.
    this.cubeVerticesIndexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.cubeVerticesIndexBuffer);



    // Now send the element array to GL
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(cubeVertexIndices), this.gl.STATIC_DRAW);



};

//
// initTextures
//
// Initialize the textures we'll be using, then initiate a load of
// the texture images. The handleTextureLoaded() callback will finish
// the job; it gets called each time a texture finishes loading.
//
WebGL.prototype.initTextures = function() {


    this.cubeTextures[0] = this.gl.createTexture();
    this.handleTextureLoaded(textures[0], this.cubeTextures[0]);


    this.cubeTextures[1] = this.gl.createTexture();
    this.handleTextureLoaded(textures[1], this.cubeTextures[1]);


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
    
    // Clear the canvas before we start drawing on it.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Establish the perspective with which we want to view the
    // scene. Our field of view is 45 degrees, with a width/height
    // ratio of 640:480, and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    //this.perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
    //r(this.gl.canvas.width,this.gl.canvas.height);
    this.perspectiveMatrix = makeOrtho(
        this.gl.canvas.width/-200,
        this.gl.canvas.width/200,
        this.gl.canvas.height/-200,
        this.gl.canvas.height/200,
        -10,10);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.

    this.loadIdentity();
    // Now move the drawing position a bit to where we want to start
    // drawing the cube.

    this.mvTranslate([0.0, 0.0, -6.0]);
    // Save the current matrix, then rotate before we draw.

    this.mvPushMatrix();
    this.mvRotate(thsi.slope, [1, 0, 0]);//todo rotations
    this.mvRotate(rotation+45, [0, -1, 0]);


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

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.cubeTextures[group.texture]);
        this.gl.drawElements(this.gl.TRIANGLES, group.count, this.gl.UNSIGNED_SHORT, i*2);

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
    
    var fragmentShader = this.getShader("shader-fs");
    var vertexShader = this.getShader("shader-vs");

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
WebGL.prototype.getShader = function(id) {
    var shaderScript = document.getElementById(id);//todo Shaders in JS?

    // Didn't find an element with the specified ID; abort.
    if (!shaderScript) {
        return null;
    }

    // Walk through the source element's children, building the
    // shader source string.
    var theSource = "";
    var currentChild = shaderScript.firstChild;

    while(currentChild) {
        if (currentChild.nodeType == 3) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }

    // Now figure out what type of shader script we have,
    // based on its MIME type.

    var shader;

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
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
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
};

WebGL.prototype.setMatrixUniforms = function() {
    var pUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    this.gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.perspectiveMatrix.flatten()));

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
    multMatrix(m);
};
