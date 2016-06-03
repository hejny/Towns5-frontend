



//todo put directly into BABYLON
//todo shadow_generator refactor to shadow_generator

createStoryMesh = function(name, markdown, scene, shadow_generator) {


    var story_mesh = BABYLON.Mesh.CreateSphere(name, 16, 20, scene);

    shadow_generator.getShadowMap().renderList.push(story_mesh);

    return(story_mesh);


};


