

createGroundRingMesh = function(name, radius, thick, position, ground_mesh, scene , subdivisions1 , subdivisions2, shadowGenerator) {

    var tes = subdivisions1;
    var pi2 = Math.PI * 2;
    var step = pi2 / tes;
    var path = [];
    for (var i = 0; i < pi2; i += step ) {
        var x = radius * Math.sin(i);
        var z = radius * Math.cos(i);
        var y = ground_mesh.getHeightAtCoordinates(x+position.x,z+position.z)+1;

        if(y<20)y=20;//todo water level as constant

        path.push( new BABYLON.Vector3(x, y, z) );
    }
    path.push(path[0]);


    var ground_ring;
    ground_ring = BABYLON.Mesh.CreateTube("tube", path, thick, subdivisions2, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
    ground_ring.position.x = position.x;
    ground_ring.position.z = position.z;


    if(shadowGenerator)//todo to all meshes
    shadowGenerator.getShadowMap().renderList.push(ground_ring);

    return(ground_ring);


};


