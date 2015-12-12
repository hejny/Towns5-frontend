
pages.blocks={"header": 'Stavební bloky'};

pages.blocks.content= `


<canvas id="block-editing" width="100" height="50"></canvas>




 <form onsubmit="loginFormSubmit();return false;">


<table>

  <tr>
    <td>{{block.shape.n}}</td>
    <td><input id="slider1" type="range" min="3" max="20" step="1" /></td>
  </tr>

  <tr>
    <td>{{block.x}}</td>
    <td><input id="slider1" type="range" min="100" max="500" step="10" /></td>
  </tr>
  <tr>
    <td>{{block.y}}</td>
    <td><input id="slider1" type="range" min="100" max="500" step="10" /></td>
  </tr>
  <tr>
    <td>{{block.y}}</td>
    <td><input id="slider1" type="range" min="100" max="500" step="10" /></td>
  </tr>


  <tr>
    <td>{{block.shape.top.size}}</td>
    <td><input id="slider1" type="range" min="100" max="500" step="10" /></td>
  </tr>




</table>




<input type="submit" value="OK">

</form>


`;



pages.blocks.openJS = function(){


  //building.draw();

};