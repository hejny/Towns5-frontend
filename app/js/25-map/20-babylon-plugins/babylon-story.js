



//todo put directly into BABYLON
//todo shadow_generator refactor to shadow_generator

createStoryMesh = function(name, story, scene, shadow_generator) {


    var story_mesh = BABYLON.Mesh.CreateSphere(name, 16, 20, scene);//cache



    var content = $(markdown.toHTML(story.getMarkdown()));

    var image = content.find('img')[0];
    if(is(image)){

        var image_uri = URI(image.src).removeSearch("width");
        var image_normal = image_uri.addSearch({width: 800}).toString();





        //Creation of a material with an alpha texture
        story_mesh.material = new BABYLON.StandardMaterial("story-texture", scene);
        story_mesh.material.diffuseTexture = new BABYLON.Texture(image_normal, scene);
        story_mesh.material.diffuseTexture.hasAlpha = false;//Has an alpha
        story_mesh.material.diffuseTexture.uScale = -1;
        story_mesh.material.diffuseTexture.vScale = -1;
        //story_mesh.material.diffuseTexture.uOffset = 0.5;
        //story_mesh.material.diffuseTexture.uOffset = 0.5;
        story_mesh.material.freeze();

    }




    shadow_generator.getShadowMap().renderList.push(story_mesh);


    story_mesh.convertToUnIndexedMesh();

    return(story_mesh);


};


