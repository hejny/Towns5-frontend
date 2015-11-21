
/**todo refactor to tools*/
function canvas2Src(width,height,manipulationFunction){

    var canvas = document.createElement('canvas');
    canvas.width=width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    manipulationFunction(context);

    return(canvas.toDataURL());


}


//======================================================================================================================


function downloadCanvas(canvas){

    r('downloadCanvas');
    var name='mapX'+Math.round(map_x)+'Y'+Math.round(map_y);
    var src=canvas.toDataURL();
    //download(src,name,'image/png');



    var srcWindow = window.open("", "srcWindow", "toolbar=no, scrollbars=yes, resizable=yes, top=100, left=100, width=800, height=600");
    srcWindow.document.write('<title>'+name+'</title><img src="'+src+'" width="100%"><br><a href="'+src+'">Download</a> - <a onclick="window.prompt(\'Copy to clipboard: Ctrl+C, Enter\', \''+src+'\');">Source</a>');


}