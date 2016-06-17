


createPathMesh = function(name, towns_scene/*todo maybe all plugins like this*/, path) {

    var path_tube = [];
    path.getPositions().forEach(function (position) {

        var babylon_position = towns_scene.positionToBabylon(position);
        babylon_position.y = towns_scene.terrain_mesh.getHeightAtCoordinates(babylon_position.x, babylon_position.z) + 1;

        path_tube.push(babylon_position);
    });

    var path_mesh = BABYLON.Mesh.CreateTube(name, path_tube, 1/*thick*/, 5/*subdivisions2*/, null, 0, towns_scene.scene, false, BABYLON.Mesh.FRONTSIDE);
    path_mesh.material = towns_scene.path_material;

    towns_scene.prev_meshes.push(path_mesh);

};