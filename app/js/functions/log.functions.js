/**
 * @author ©Towns.cz
 * @fileOverview Functions for debugging
 */
//======================================================================================================================



if(environment=='production'){

    var r = function(){};

}else{

    var r = console.log.bind(console);

}


//======================================================================================================================

var lastMs=0;
function t(flag){
    if(environment=='production')return;

    var actualDate=new Date();
    var actualMs=actualDate.getTime();


    var deltaMs=actualMs-lastMs;
    r(flag+' '+deltaMs);

    lastMs=actualMs;

}
t('start timing');


//======================================================================================================================


function mapWindow(map){
    if(environment=='production')return;

    size=2;


    var src=createCanvasViaFunctionAndConvertToSrc((map_radius*2)*size,(map_radius*2)*size,function(ctx){



        ArrayFunctions.iterate2D(map,function(y,x){

            if(typeof map[y][x]=='number'){

                var r = 255,
                    g = map[y][x]*5,
                    b = map[y][x]*5;

            }else if(map[y][x]==true){
                var r = 255,
                    g = 255,
                    b = 255;
            }else{
                var r = 0,
                    g = 0,
                    b = 0;
            }


            ctx.fillStyle = 'rgb('+r+','+g+','+b+')';
            ctx.fillRect (x*size, y*size,x*size+size, y*size+size);
        });

    });

    window.open(src);
}





