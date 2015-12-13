
pages.blocks={"header": 'Stavební bloky'};

pages.blocks.content= `


<canvas id="block-editing" width="300" height="300"></canvas>




 <form onsubmit="return false;" id="block-editing-form">

<textarea id="block-editing-json" style="display:none;"></textarea>


<table>





  <tr><th colspan="2">{{block.shape}}</th></tr>
  <tr>
    <td>{{block.shape.n}}</td>
    <td><input id="block-editing-shape-n" type="range" min="3" max="20" step="1" /></td>
  </tr>
  <tr>
    <td>{{block.shape.top}}</td>
    <td><input id="block-editing-shape-top" type="range" min="0" max="2" step="0.05" /></td>
  </tr>
  <tr>
    <td>{{block.shape.bottom}}</td>
    <td><input id="block-editing-shape-bottom" type="range" min="0" max="2" step="0.05" /></td>
  </tr>




  <tr><th colspan="2">{{block.skew}}</th></tr>
  <tr>
    <td>{{block.skew.z.x}}</td>
    <td><input id="block-editing-skew-z-x" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>
  <tr>
    <td>{{block.skew.z.y}}</td>
    <td><input id="block-editing-skew-z-y" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>




  <tr><th colspan="2">{{block.size}}</th></tr>
  <tr>
    <td>{{block.size.x}}</td>
    <td><input id="block-editing-size-x" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block.size.y}}</td>
    <td><input id="block-editing-size-y" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block.size.z}}</td>
    <td><input id="block-editing-size-z" type="range" min="1" max="100" step="1" /></td>
  </tr>




  <tr><th colspan="2">{{block.rotation}}</th></tr>
  <tr>
    <td>{{block.rotation.xy}}</td>
    <td><input id="block-editing-rotation-xy" type="range" min="0" max="360" step="10" /></td>
  </tr>
    <tr>
    <td>{{block.rotation.xz}}</td>
    <td><input id="block-editing-rotation-xz" type="range" min="0" max="90" step="10" /></td>
  </tr>





</table>




<input type="submit" value="OK">

</form>


`;



pages.blocks.openJS = function(){

    building.design.data.particles[0]=ModelParticles.cParams(building.design.data.particles[0]);


    $('#block-editing-shape-n').val(building.design.data.particles[0].shape.n);

    $('#block-editing-shape-top').val(building.design.data.particles[0].shape.top);
    $('#block-editing-shape-bottom').val(building.design.data.particles[0].shape.bottom);

    $('#block-editing-skew-z-x').val(building.design.data.particles[0].skew.z.x);
    $('#block-editing-skew-z-y').val(building.design.data.particles[0].skew.z.y);

    $('#block-editing-size-x').val(building.design.data.particles[0].size.x);
    $('#block-editing-size-y').val(building.design.data.particles[0].size.y);
    $('#block-editing-size-z').val(building.design.data.particles[0].size.z);

    $('#block-editing-rotation-xy').val(building.design.data.particles[0].rotation.xy);
    $('#block-editing-rotation-xz').val(building.design.data.particles[0].rotation.xz);


    pages.blocks.block_editing = document.getElementById('block-editing');
    pages.blocks.block_editing_ctx = pages.blocks.block_editing.getContext('2d');


    $('#block-editing-form').find('input').mousemove(function(){
        pages.blocks.update();
    });

    pages.blocks.update();


};

pages.blocks.rotation = 0 ;
pages.blocks.slope = map_slope ;



pages.blocks.update = function () {


    //r($('#block-editing-shape-n').val());


    building.design.data.particles[0].shape.n = parseInt($('#block-editing-shape-n').val());


    building.design.data.particles[0].shape.top = parseFloat($('#block-editing-shape-top').val());
    building.design.data.particles[0].shape.bottom = parseFloat($('#block-editing-shape-bottom').val());

    building.design.data.particles[0].skew={z:{}};
    building.design.data.particles[0].skew.z.x = parseFloat($('#block-editing-skew-z-x').val());
    building.design.data.particles[0].skew.z.y = parseFloat($('#block-editing-skew-z-y').val());


    building.design.data.particles[0].size.x = parseInt($('#block-editing-size-x').val());
    building.design.data.particles[0].size.y = parseInt($('#block-editing-size-y').val());
    building.design.data.particles[0].size.z = parseInt($('#block-editing-size-z').val());

    building.design.data.particles[0].rotation.xy = parseInt($('#block-editing-rotation-xy').val());
    building.design.data.particles[0].rotation.xz = parseInt($('#block-editing-rotation-xz').val());



    $('#block-editing-json').val(JSON.stringify(building.design.data.particles[0],'false',true));


    pages.blocks.block_editing_ctx.clearRect ( 0 , 0 ,300 , 300 );
    building.design.data.draw(pages.blocks.block_editing_ctx,1,150,150,pages.blocks.rotation,pages.blocks.slope);


};