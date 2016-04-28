<?php

    $title='map';
    require('init.php');
?>


<canvas id="a" width="300" height="300"></canvas>
<canvas id="b" width="300" height="300"></canvas>
<canvas id="c" width="600" height="600"></canvas>

<style>
    canvas{
        border: 2px solid #000000;
    }

</style>


<script>


    r(MapGenerator.getZ(100,100,100));

    //--------------------------------------------

    ctx1=document.getElementById('a').getContext('2d');
    ctx2=document.getElementById('b').getContext('2d');
    ctx3=document.getElementById('c').getContext('2d');


    //--------------------------------------------

    var size=1;



    var map=MapGenerator.getMap(-150,150,300,false);

    r(map);

    T.ArrayFunctions.iterate2D(map[1],function(y,x){


        ctx1.fillStyle = MapGenerator.terrainColor(map[1][y][x]);
        //r(ctx.fillStyle);
        ctx1.fillRect (x, y,x+size, y+size);

    });

    //--------------------

    //--------------------

    var map=MapGenerator.getMap(123456,-1234,300,false);
    T.ArrayFunctions.iterate2D(map[1],function(y,x){
        ctx2.fillStyle = MapGenerator.terrainColor(map[1][y][x]);
        ctx2.fillRect (x, y,x+size, y+size);

    });

    var map_x=(Math.random()-0.5)*1000000;
    var map_y=(Math.random()-0.5)*1000000;

    var map=MapGenerator.getMap(map_x,map_y,600,false);
    T.ArrayFunctions.iterate2D(map[1],function(y,x){
        ctx3.fillStyle = MapGenerator.terrainColor(map[1][y][x]);
        ctx3.fillRect (x, y,x+size, y+size);

    });



</script>

</body>
</html>