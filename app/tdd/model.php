

<?php
    $title='model';
    $inits=array('prototypes.init.js');
    require('init.php');
?>



<canvas id="canvas1" width="300" height="300"></canvas>
<canvas id="canvas2" width="300" height="300"></canvas>
<canvas id="canvas3" width="300" height="300"></canvas>
<canvas id="canvas4" width="300" height="300"></canvas>

<style>
    canvas{
        border: 2px solid #000000;
    }

</style>


<script>


    ctx1=document.getElementById('canvas1').getContext('2d');
    ctx2=document.getElementById('canvas2').getContext('2d');
    ctx3=document.getElementById('canvas3').getContext('2d');
    ctx4=document.getElementById('canvas4').getContext('2d');


    //--------------------------------------------

    building1=new Model({
        particles: [
            {
                particles:[
                    {
                        shape:{
                            type: 'prism',
                            n:4
                        },
                        color: "#cccccc",
                        position: {x:10,y:10,z:0},
                        size: {x:10,y:10,z:10},
                        rotation: 10
                    },{
                        shape:{
                            type: 'prism',
                            n:5,
                            rotated:true
                        },
                        color: "#cccccc",
                        position: {x:-10,y:-10,z:0},
                        size: {x:10,y:10,z:10},
                        rotation: 20
                    }
                ],
                position: {x:0,y:0,z:40},
                size: 1,
                rotation: 20

            },{
                shape:{
                    type: 'prism',
                    n:4,
                    bottom: 0
                },
                color: "#cccccc",
                position: {x:0,y:0,z:0},
                size: {x:40,y:40,z:40},

            }
        ]
    });
    //deepCopyModel(objectPrototypes[2].design.data);
    //building2=

    //console.log(building1);
    //console.log(building2);

    //building2.rotation=30;
    //building2.size=0.5;

    building1.draw(ctx1, 0.5, 150, 250, 0, 30);
    /**
    building1.rotation+=20;
    building1.draw(ctx2, 0.5, 150, 250, 0, 30);
    building1.rotation+=20;
    building1.draw(ctx3, 0.5, 150, 250, 0, 30);
    building1.rotation+=20;
    building1.draw(ctx4, 0.5, 150, 250, 0, 30);/**/

    /**/

    building2.draw(ctx2, 0.5, 150, 250, 0, 30);
    building1.joinModel(building2,50,-80);
    building2.rotation+=20;
    building1.joinModel(building2);
    //building2.rotation+=20;
    //building1.joinModel(building2);

    building1.draw(ctx3, 0.5, 150, 250, 0, 30);


    r('------------------------------');
    building1.joinModel(building1,15,-16);

    building1.draw(ctx4, 0.5, 150, 250, 0, 30,false,true);


    r(building1.range('x'));
    r(building1.range('y'));
    r(building1.range('z'));


    /**/



</script>

</body>
</html>