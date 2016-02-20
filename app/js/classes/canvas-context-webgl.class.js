/**
 * @author Towns.cz
 * @fileOverview Additional methods to WebGLRenderingContext prototype
 */
//======================================================================================================================

//todo webgl
/*
WebGLRenderingContext.prototype.drawPolygon = function (points, pLoc) {

    var gl=this;//todo delete

    var vertices = [];

    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        vertices.push(p.x, p.y, p.z);
    }

    var itemSize = 3;
    var numItems = vertices.length / itemSize;

    var posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(pLoc, itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, numItems);
};

*/
