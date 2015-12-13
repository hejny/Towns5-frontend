
pages.blocks={"header": 'Stavební bloky'};

pages.blocks.content= `


<canvas id="block-editing" width="300" height="300"></canvas>




 <form onsubmit="return false;" id="block-editing-form">


<table>



  <tr><th colspan="2">{{block.shape}}</th></tr>
  <tr>
    <td>{{block.shape.n}}</td>
    <td><input id="block-editing-shape-n" type="range" min="3" max="20" step="1" /></td>
  </tr>
  <tr>
    <td>{{block.shape.top}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>
  <tr>
    <td>{{block.shape.top}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>




  <tr><th colspan="2">{{block.skew}}</th></tr>
  <tr>
    <td>{{block.skew.z.x}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>
  <tr>
    <td>{{block.skew.z.y}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>




  <tr><th colspan="2">{{block.size}}</th></tr>
  <tr>
    <td>{{block.size.x}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>
  <tr>
    <td>{{block.size.y}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>
  <tr>
    <td>{{block.size.y}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>




  <tr><th colspan="2">{{block.rotation}}</th></tr>
  <tr>
    <td>{{block.rotation.xz}}</td>
    <td><input id="block-editing-" type="range" min="100" max="500" step="10" /></td>
  </tr>





</table>




<input type="submit" value="OK">

</form>


`;



pages.blocks.openJS = function(){

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


    r($('#block-editing-shape-n').val());


    building.design.data.particles[0].shape.n = parseInt($('#block-editing-shape-n').val());




    pages.blocks.block_editing_ctx.clearRect ( 0 , 0 ,300 , 300 );
    building.design.data.draw(pages.blocks.block_editing_ctx,1,150,150,pages.blocks.rotation,pages.blocks.slope);


};