var CreateGroundFromCanvas = function (name, canvas, options, scene) {
    var width = options.width || 10;
    var height = options.height || 10;
    var subdivisions = options.subdivisions || 1;
    var minHeight = options.minHeight;
    var maxHeight = options.maxHeight || 10;
    var updatable = options.updatable;
    var onReady = options.onReady;
    var ground = new BABYLON.GroundMesh(name, scene);
    ground._subdivisions = subdivisions;
    ground._width = width;
    ground._height = height;
    ground._maxX = ground._width / 2;
    ground._maxZ = ground._height / 2;
    ground._minX = -ground._maxX;
    ground._minZ = -ground._maxZ;


    ground._setReady(false);


    var context = canvas.getContext("2d");
    var bufferWidth = canvas.width;
    var bufferHeight = canvas.height;

    // Create VertexData from map data
    // Cast is due to wrong definition in lib.d.ts from ts 1.3 - https://github.com/Microsoft/TypeScript/issues/949
    var buffer = context.getImageData(0, 0, bufferWidth, bufferHeight).data;
    var vertexData = BABYLON.VertexData.CreateGroundFromHeightMap({
        width: width, height: height,
        subdivisions: subdivisions,
        minHeight: minHeight, maxHeight: maxHeight,
        buffer: buffer, bufferWidth: bufferWidth, bufferHeight: bufferHeight
    });
    vertexData.applyToMesh(ground, updatable);
    ground._setReady(true);
    //execute ready callback, if set
    if (onReady) {
        onReady(ground);
    }

    return ground;



};
