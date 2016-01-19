/**
 * @author ©Towns.cz
 * @fileOverview Block editor
 */
//======================================================================================================================


Pages.building_editor={};

Pages.building_editor.header='Budova';

Pages.building_editor.content= `

<form onsubmit="return false;" id="block-editing-form">



<div class="page-column-2">


    <canvas id="block-editing" width="300" height="300"></canvas>


    <button onclick="Pages.building_editor.deleteBlock();">{{block delete}}</button>
    <button onclick="Pages.building_editor.duplicateBlock();">{{block duplicate}}</button>

</div>




</form>


`;

//======================================================================================================================


Pages.building_editor.openJS = function(){


    //---------------------------------------------

    Pages.building_editor.rotation = 0 ;
    Pages.building_editor.slope = map_slope ;

    //---------------------------------------------

    if(building!==false){

        Pages.building_editor.block_id=building.id;

    }else {

        var tmp_id=generateID();
        object_prototypes.push(deepCopyObject(Pages.building_editor.default));

        Pages.building_editor.block_id=tmp_id;
    }

    //---------------------------------------------

    objectPrototypesMenu('building','block');

    //---------------------------------------------

    var i=ArrayFunctions.id2i(object_prototypes,Pages.building_editor.block_id);


    buildingStart(Pages.building_editor.block_id)









};


//======================================================================================================================



Pages.building_editor.start=function(){
    $('#block-editing-name').val(object_prototypes[i].name);

    (function(particle){


        particle=ModelParticles.cParams(particle);

        $('#block-editing-shape-n').val(particle.shape.n);

        $('#block-editing-shape-top').val(particle.shape.top);
        $('#block-editing-shape-bottom').val(particle.shape.bottom);

        $('#block-editing-skew-z-x').val(particle.skew.z.x);
        $('#block-editing-skew-z-y').val(particle.skew.z.y);

        $('#block-editing-size-x').val(particle.size.x);
        $('#block-editing-size-y').val(particle.size.y);
        $('#block-editing-size-z').val(particle.size.z);

        $('#block-editing-rotation-xy').val(particle.rotation.xy);
        $('#block-editing-rotation-xz').val(particle.rotation.xz);
        //('#block-editing-rotation-yz').val(particle.rotation.yz);


    })(object_prototypes[i].design.data.particles[0]);




    Pages.building_editor.block_editing = document.getElementById('block-editing');
    Pages.building_editor.block_editing_ctx = Pages.building_editor.block_editing.getContext('2d');


    $('#block-editing-form').find('input').mousemove(function(){
        Pages.building_editor.update();
    });


    Pages.building_editor.update();
};


//======================================================================================================================



Pages.building_editor.start=function(){
    $('#block-editing-name').val(object_prototypes[i].name);

    (function(particle){


        particle=ModelParticles.cParams(particle);

        $('#block-editing-shape-n').val(particle.shape.n);

        $('#block-editing-shape-top').val(particle.shape.top);
        $('#block-editing-shape-bottom').val(particle.shape.bottom);

        $('#block-editing-skew-z-x').val(particle.skew.z.x);
        $('#block-editing-skew-z-y').val(particle.skew.z.y);

        $('#block-editing-size-x').val(particle.size.x);
        $('#block-editing-size-y').val(particle.size.y);
        $('#block-editing-size-z').val(particle.size.z);

        $('#block-editing-rotation-xy').val(particle.rotation.xy);
        $('#block-editing-rotation-xz').val(particle.rotation.xz);
        //('#block-editing-rotation-yz').val(particle.rotation.yz);


    })(object_prototypes[i].design.data.particles[0]);




    Pages.building_editor.block_editing = document.getElementById('block-editing');
    Pages.building_editor.block_editing_ctx = Pages.building_editor.block_editing.getContext('2d');


    $('#block-editing-form').find('input').mousemove(function(){
        Pages.building_editor.update();
    });


    Pages.building_editor.update();
};


//======================================================================================================================


Pages.building_editor.default={

    id: tmp_id,
        name: "",
    type: "building",
    subtype: "main",
    design: {
    type: "model",
        data: {
        particles: [
            {
                shape:{
                    type: 'prism',
                    n:4,
                },
                color: "#cccccc",
                position: {x:0,y:0,z:0},
                size: {x:40,y:40,z:40},
                rotation: {"xy":0}

            }
        ]
    }
}
};


//======================================================================================================================


Pages.building_editor.closeJS = function(){//todo refactor to close

    townsAPI.post('objects/prototypes',ArrayFunctions.id2item(object_prototypes,Pages.building_editor.block_id),function(){

        loadObjectPrototypes(function(){

            objectPrototypesMenu('building','main');

        });

    });


}

//======================================================================================================================



Pages.building_editor.delete = function () {


    if(confirm(Locale.get(Pages.building_editor.type+' '+Pages.building_editor.subtype+' block delete confirm'))){

        var i=ArrayFunctions.id2i(object_prototypes,Pages.building_editor.block_id);//todo maybe create function deleteID

        ArrayFunctions.idRemove(object_prototypes,Pages.building_editor.block_id);
        //todo send to server


        window_close();



    }

};

//===================================================================


Pages.building_editor.duplicate = function () {

    var i=ArrayFunctions.id2i(object_prototypes,Pages.building_editor.block_id);


    var tmp_block = deepCopyObject(object_prototypes[i]);
    tmp_block.id=generateID();

    object_prototypes.push(tmp_block);

    building={id:tmp_block.id};//todo ?? better
    window_open('building_editor');

};