

window.drawModel = function(ctx, res, s, x_begin, y_begin, rot, slope) {
    var color, colors, i, i2, i3, j, l, len, plus, points, polygon, polygons, slnko, slope_m, slope_n, tmp, tmppoints, uhel, vzdalenost, x, x1, x2, xx, xxx, y, y1, y2, yy, yyy, z;

    //todo kontrola vstupnich parametru
    slope_m = Math.abs(Math.sin(slope / 180 * pi));
    slope_n = Math.abs(Math.cos(slope / 180 * pi)) * 1.4;
    s = s * 1.2;
    slnko = 10;
    res = res.split('::').join(':1,1,1:');
    tmp = res.split(':');
    points = tmp[0];
    polygons = tmp[1];
    colors = tmp[2];

    if (typeof tmp[3] == 'undefined')tmp[3] = 0;
    if (typeof tmp[4] == 'undefined')tmp[4] = 1;

    rot = parseInt(rot) + 45 + parseInt(tmp[3]);
    if (typeof colors === 'undefined') {
        return;
    }

    s=s*tmp[4];


    /*---------------------------Rozklad barev */
    colors = colors.split(',');

    /*---------------------------Rozklad bodu */
    points = points.split('][');
    points[0] = points[0].split('[').join('');
    points[points.length - 1] = points[points.length - 1].split(']').join('');

    for (var i = 0, l = points.length; i < l; i++) {//todo vsude v model for jako tady
        /*r(points[i]);
         r(points[i].split(','));*/
        points[i] = points[i].split(',');
    }
    //r(points);return;

    /*---------------------------Rotace */

    for (var i = 0, l = points.length; i < l; i++) {

        x = parseInt(points[i][0]);
        y = parseInt(points[i][1]);
        z = parseInt(points[i][2]);

        /*----- */
        vzdalenost = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
        uhel = Math.acos((x - 50) / vzdalenost);
        uhel = uhel / 3.1415 * 180;
        if (y < 50) {
            uhel = uhel + rot;
        } else {
            uhel = uhel - rot;
        }
        if (50 - y < 0) {
            uhel = 180 + 180 - uhel;
        }
        x = 50 + Math.cos(uhel / 180 * 3.1415) * vzdalenost;
        y = 50 - (Math.sin(uhel / 180 * 3.1415) * vzdalenost);
        x = Math.round(x);
        y = Math.round(y);

        points[i][0] = x;
        points[i][1] = y;
        points[i][2] = z;

    }


    //------------------------Rozklad polygonů
    polygons = polygons.split(';');
    i = 0;
    for (var i = 0, l = polygons.length; i < l; i++) {

        polygons[i] = polygons[i].split(',');
        for (var i2 = 0, l2 = polygons[i].length; i2 < l2; i2++){
            polygons[i][i2]--;
        }

        polygons[i].color = colors[i];

    }

    //r(polygons);

    //------------------------Seřazení bodů
    polygons.sort(function (a, b) {
        var as, bs, cnt, sum;
        sum = 0;
        cnt = 0;
        i = 0;
        while (a[i]) {
            if (points[a[i] - 1] != null) {
                sum += points[a[i]][0] * slope_m + points[a[i]][1] * slope_m + points[a[i]][2] * slope_n;
                cnt++;
            }
            i++;
        }
        as = sum / cnt;
        sum = 0;
        cnt = 0;
        i = 0;
        while (b[i]) {
            if (points[b[i] - 1] != null) {
                sum += points[b[i]][0] * slope_m + points[b[i]][1] * slope_m + points[b[i]][2] * slope_n;
                cnt++;
            }
            i++;
        }
        bs = sum / cnt;
        if (as > bs) {
            return 1;
        }
        if (bs > as) {
            return -1;
        } else {
            return 0;
        }
    });

    //==========================================================================================stín

    //r(polygons);

    for (var i2 = 0, l2 = polygons.length; i2 < l2; i2++) {


        tmppoints = [];

        for (var i3 = 0, l3 = polygons[i2].length; i3 < l3; i3++) {


            //r(polygons[i2][i3]-1);
            if (typeof points[polygons[i2][i3]] !== 'undefined') {

                z = Math.abs(points[polygons[i2][i3]][2]);
                x = points[polygons[i2][i3]][0] + z / 1.5;
                y = points[polygons[i2][i3]][1] - z / 1.5 / 2;

                //r(x, y, z);

                xx = x * 1 - (y * 1);
                yy = x * slope_m + y * slope_m;

                //r(slope_m);
                //r(xx, yy);

                tmppoints.push({x: xx, y: yy});


            }
        }

        ctx.fillStyle = 'rgba(0,0,0,0.2)';

        //------------------------Vykreslení­ bodů

        //r(tmppoints);
        if(tmppoints.length>0){
            ctx.beginPath();

            for (var i = 0, l = tmppoints.length; i < l; i++) {

                ctx.lineTo(tmppoints[i].x*s + x_begin, tmppoints[i].y*s + y_begin);

            }
            ctx.closePath();
            ctx.fill();

        }

    }

    //==========================================================================================Vykreslení­ polygonů
    for (var i2 = 0, l2 = polygons.length; i2 < l2; i2++) {

        tmppoints = [];
        i = 0;
        for (var i3 = 0, l3 = polygons[i2].length; i3 < l3; i3++) {
            if (typeof points[polygons[i2][i3]] !== 'undefined') {
                x = points[polygons[i2][i3]][0];
                y = points[polygons[i2][i3]][1];
                z = points[polygons[i2][i3]][2];
                xx = x * 1 - (y * 1);
                yy = x * slope_m + y * slope_m - (z * slope_n);

                tmppoints.push({x: xx, y: yy});
            }
        }

        color = polygons[i2].color;
        color = hexToRgb('#' + color);

        //------------------------Vystínování podle sklonu polygonu

        if ((points[polygons[i2][0]] != null) && (points[polygons[i2][2]] != null)) {
            x1 = points[polygons[i2][0]][0];
            y1 = points[polygons[i2][0]][1];
            x2 = points[polygons[i2][2]][0];
            y2 = points[polygons[i2][2]][1];
            x = Math.abs(x1 - x2) + 1;
            y = Math.abs(y1 - y2) + 1;
            plus = Math.log(x / y) * slnko;
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

            //r(tmppoints);

            ctx.beginPath();

            for (var i = 0, l = tmppoints.length; i < l; i++) {

                ctx.lineTo(tmppoints[i].x*s + x_begin, tmppoints[i].y*s + y_begin);

            }




            ctx.closePath();
            ctx.fill();

        }


    }
};

//======================================================================================================================

window.hexToRgb = function(hex) {
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

window.rgbToHex = function(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};



//======================================================================================================================



window.createIcon = function(res,size){



    var canvas = document.createElement("canvas");
    canvas.height=size;
    canvas.width = size;
    var context = canvas.getContext('2d');

    drawModel(context, res, 0.2, size/2, size*(2/5), 10, 35);


    return(canvas.toDataURL());


}

