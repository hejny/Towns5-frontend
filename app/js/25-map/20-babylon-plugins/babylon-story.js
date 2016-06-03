



//todo put directly into BABYLON
//todo shadowGenerator refactor to shadow_generator

createStoryMesh = function(name, markdown, scene, shadowGenerator) {


    var story_mesh = BABYLON.Mesh.CreateSphere(name, 16, 20, scene);

    shadowGenerator.getShadowMap().renderList.push(story_mesh);

    return(story_mesh);


};


