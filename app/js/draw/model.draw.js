/**

 ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗
 ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║
 ██╔████╔██║██║   ██║██║  ██║█████╗  ██║
 ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║
 ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗
 ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
 © Towns.cz

 * @fileOverview 3D model rendring functions, 3D model manipulation functions

 */

//======================================================================================================================



/**
 * Draw model on canvas
 * @param ctx Canvas context
 * @param {string} res String of Towns model resource
 * @param {number} s Size of 1 virtual px
 * @param {number} x_begin Canvas left
 * @param {number} y_begin Canvas top
 * @param {number} rot 0-360 Angle in degrees
 * @param {number} slope 0-90 Angle in degrees
 * @param {string} force color - format #ff00ff
 */
this.Model.draw = function(ctx, res, s, x_begin, y_begin, rot, slope, force_color) {


    force_color=cParam(force_color,false);

    //todo delat kontrolu vstupnich parametru u funkci???


    var slope_m = Math.abs(Math.sin(slope / 180 * Math.PI));
    var slope_n = Math.abs(Math.cos(slope / 180 * Math.PI)) * 1.4;
    var slnko = 50;

    res=Model.addRotSize(res,rot-45,s);
    var res=Model.model2array(res);

    if(!res)return;


    var res=Model.arrayCompileRotSize(res);

    //------------------------Prirazeni barev k polygonum pred serazenim

    if(force_color==false){

        for(var i= 0,l=res['polygons'].length;i<l;i++){

            res['polygons'][i]['color']=res['colors'][i];
        }

    }else{

        var color = force_color;
        color = hexToRgb(color);

    }


    //------------------------Seřazení bodů

    res['polygons'].sort(function (a, b) {
        var sum,cnt;

        var polygons=[a,b];
        var zindex=[0,0];

        for(var polygon in polygons){

            sum = 0;
            cnt = 0;
            for (var i in polygons[polygon]) {

                if(i!='color' && is(res['points'][polygons[polygon][i]])) {

                    sum += res['points'][polygons[polygon][i]][0] * slope_m
                    +  res['points'][polygons[polygon][i]][1] * slope_m
                    +  res['points'][polygons[polygon][i]][2] * slope_n;
                    cnt++;
                }

            }
            //r(sum,cnt);
            zindex[polygon] = sum / cnt;

        }

        //-------------------
        if (zindex[0] > zindex[1]) {
            return 1;
        }
        if (zindex[1] > zindex[0]) {
            return -1;
        } else {
            return 0;
        }
    });


    //==========================================================================================stín


    for (var i2 = 0, l2 = res['polygons'].length; i2 < l2; i2++) {


        var tmppoints = [];

        for (var i3 = 0, l3 = res['polygons'][i2].length; i3 < l3; i3++) {


            if (typeof res['points'][res['polygons'][i2][i3]] !== 'undefined') {

                var z = Math.abs(res['points'][res['polygons'][i2][i3]][2]);
                var x =          res['points'][res['polygons'][i2][i3]][0]-50 + z / 1.5;
                var y =          res['points'][res['polygons'][i2][i3]][1]-50 - z / 1.5 / 2;


                var xx = x * 1 - (y * 1);
                var yy = x * slope_m + y * slope_m;


                tmppoints.push({x: xx, y: yy});


            }
        }

        ctx.fillStyle = 'rgba(0,0,0,0.2)';

        //------------------------Vykreslení­ bodů

        if(tmppoints.length>0){
            ctx.beginPath();

            for (var i = 0, l = tmppoints.length; i < l; i++) {

                ctx.lineTo(tmppoints[i].x + x_begin, tmppoints[i].y + y_begin);

            }
            ctx.closePath();
            ctx.fill();

        }

    }

    //==========================================================================================Vykreslení­ polygonů
    for (var i2 = 0, l2 = res['polygons'].length; i2 < l2; i2++) {

        tmppoints = [];
        i = 0;
        for (var i3 = 0, l3 = res['polygons'][i2].length; i3 < l3; i3++) {
            if (is(res['points'][res['polygons'][i2][i3]])) {

                x = res['points'][res['polygons'][i2][i3]][0]-50;
                y = res['points'][res['polygons'][i2][i3]][1]-50;
                z = res['points'][res['polygons'][i2][i3]][2];
                xx = x * 1 - (y * 1);
                yy = x * slope_m + y * slope_m - (z * slope_n);


                tmppoints.push({x: xx, y: yy});
            }
        }

        if(force_color==false){
            var color = res['polygons'][i2]['color'];
            color = hexToRgb('#' + color);
        }


        //------------------------Vystínování podle sklonu polygonu

        if ((res['points'][res['polygons'][i2][0]] != null) && (res['points'][res['polygons'][i2][2]] != null)) {
            var x1 = res['points'][res['polygons'][i2][0]][0],
                y1 = res['points'][res['polygons'][i2][0]][1],
                x2 = res['points'][res['polygons'][i2][2]][0],
                y2 = res['points'][res['polygons'][i2][2]][1];

            var x = Math.abs(x1 - x2) + 1,
                y = Math.abs(y1 - y2) + 1;

            var plus = Math.log(x / y) * slnko;

            if (plus < -20) {
                plus = -20;
            }
            if (plus > 20) {
                plus = 20;
            }
            plus = Math.round(plus);
        } else {
            plus = 0;
        }

        //--------------
        color.r = color.r + plus;
        color.g = color.g + plus;
        color.b = color.b + plus;

        //--------------
        if (color.r > 255) {
            color.r = 255;
        }
        if (color.r < 0) {
            color.r = 0;
        }
        if (color.g > 255) {
            color.g = 255;
        }
        if (color.g < 0) {
            color.g = 0;
        }
        if (color.b > 255) {
            color.b = 255;
        }
        if (color.b < 0) {
            color.b = 0;
        }
        ctx.fillStyle = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';

        //------------------------Vykreslení bodů

        if(tmppoints.length>0){

            ctx.beginPath();

            for (var i = 0, l = tmppoints.length; i < l; i++) {

                ctx.lineTo(tmppoints[i].x + x_begin, tmppoints[i].y + y_begin);

            }

            ctx.closePath();
            ctx.fill();

        }


    }
}


//======================================================================================================================


/**
 * Create icon of Towns model
 * @param {string} res Towns model string
 * @param {number} size Size of returned image
 * @returns {string} image data in base64
 */
this.Model.createIcon = function(res,size){

    var canvas = document.createElement('canvas');
    canvas.height=size;
    canvas.width = size;
    var context = canvas.getContext('2d');

    Model.draw(context, res, 0.3, size/2, size*(4/5), 10, 35);

    return(canvas.toDataURL());

}

//======================================================================================================================



this.Model.createSrc = function(res, s, x_begin, y_begin, x_size, y_size, rot, slope){

    var canvas = document.createElement('canvas');
    canvas.width=x_size;
    canvas.height = y_size;
    var context = canvas.getContext('2d');

    Model.draw(context, res, s, x_begin, y_begin,  rot, slope);

    return(canvas.toDataURL());

}

//======================================================================================================================



/**
 * Convert HTML HEX Color to {r:...,g:...,b:...}
 * @param {string} hex code of color
 * @returns {*}
 */
this.hexToRgb = function(hex) {
    var result, shorthandRegex;
    if (hex == null) {
        hex = '000000';
    }
    shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    } else {
        return {
            r: 0,
            g: 0,
            b: 0
        };
    }
};


//---------------------------

/**
 * Convert r,g,b to Hex HTML color
 * @param {number} r 0-255
 * @param {number} g 0-255
 * @param {number} b 0-255
 * @returns {string} Hex code of HTML color eg. #FF0000
 */
this.rgbToHex = function(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
