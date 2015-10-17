

/*   ██████╗ ██████╗  █████╗ ██╗    ██╗
     ██╔══██╗██╔══██╗██╔══██╗██║    ██║
     ██║  ██║██████╔╝███████║██║ █╗ ██║
     ██║  ██║██╔══██╗██╔══██║██║███╗██║
     ██████╔╝██║  ██║██║  ██║╚███╔███╔╝
     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝*/
//██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



window.drawModel = function(ctx, res, s, x_begin, y_begin, rot, slope) {
    var color, colors, i, i2, i3, j, l, len, plus, points, polygon, polygons, slnko, slope_m, slope_n, tmp, tmppoints, uhel, vzdalenost, x, x1, x2, xx, xxx, y, y1, y2, yy, yyy, z;

    //todo kontrola vstupnich parametru
    slope_m = Math.abs(Math.sin(slope / 180 * Math.PI));
    slope_n = Math.abs(Math.cos(slope / 180 * Math.PI)) * 1.4;
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

//======================================================================================================================






/*   ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
     ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
     █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
     ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
     ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
     ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝*/
//██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

//todo [ph] vyrobit ascii bloky http://patorjk.com/software/taag/#p=display&h=0&f=ANSI%20Shadow&t=functions%0A
//todo [ph] upravit vsechny todo

//======================================================================================================
window.modelRotSize = function(res,rot,size){

    //r(res);

    res=res.split(':');

    if (typeof res[3] == 'undefined')res[3] = 0;
    if (typeof res[4] == 'undefined')res[4] = 1;

    res[3]=res[3]+rot;
    res[4]=res[4]*size;

    res=res.join(':');
    return(res);
}


//======================================================================================================model2array

//todo [PH] vsechny funkce bud (function abc(){}...) NEBO (window.abc =) NEBO (this.abc=) - rozhodnout se
//todo Zacit delat jsdoc
this.model2array = function(res){
    if(res.substr(0,1)=='['){

        array={};

        res=str_replace("::",":1,1,1:",res);
        tmp=explode(":",res);


        points=tmp[0];
        polygons=tmp[1];
        colors=/*explode(",",)*/tmp[2];
        array['rot']=tmp[3];
        if(array['rot'])array['rot']=0;
        //---------------------------colors
        colors=explode(",",colors);
        array['colors']=colors;
        //---------------------------rozklad bodu
        points=points.substr(1,points.length-2);
        points=explode("]",points);
        i=-1;
        for (var tmpVal in points) {
            tmp = points[tmpVal];
            i=i+1;
            points[i]=str_replace("[","",points[i]);
            points[i]=explode(",",points[i]);
        }

        array['points']=points;
        //---------------------------polygons
        polygons=explode(';',polygons);
        i=-1;
        for (var tmpVal in polygons) {
            tmp = polygons[tmpVal];
            i=i+1;
            polygons[i]=explode(",",polygons[i]);
            if(polygons[i].length==0){polygons[i][0]=1;polygons[i][1]=1;polygons[i][2]=1;}
            polygons[i][count(polygons[i])]=colors[i];

        }

        array['polygons']=polygons;
        //---------------------------
        return(array);
    }else{
        return(false);
    }
}

r(model2array(unique_objects[5].res));

//======================================================================================================array2model
this.array2model = function(array){
    res='';
    //---------------------------points
    for (var pointVal in array) {
        point = array[pointVal];

        x=round(point[0]*100)/100;
        y=round(point[1]*100)/100;
        z=round(point[2]*100)/100;
        res+= '['+x+','+y+','+z+']';;
    }
    //---------------------------polygons
    i=0;
    while(array['polygons'][i]){
        array['polygons'][i]=implode(',',array['polygons'][i]);
        i++;
    }
    array['polygons']=implode(';',array['polygons']);
    res+= ':'+array['polygons'];
    //---------------------------colors
    array['colors']=implode(',',array['colors']);
    res+= ':'+array['colors'];
    //---------------------------rot
    res+= ':'+array['rot'];
    //---------------------------
    res=str_replace(',;',';',res);
    res=str_replace(',:',':',res);
    return(res);
}
//======================================================================================================array2parray
this.array2parray = function(array){
    //$array=model2array($res);
    //r($array);
    parray={};
    parray['rot']=array['rot'];
    i=0;
    for (var polygonVal in array) {
        polygon = array[polygonVal];
        parray['polygons'][i]['color']=array['colors'][i];
        ii=0;
        for (var pointVal in polygon) {
            point = polygon[pointVal];
            parray['polygons'][i]['points'][ii]=array['points'][point-1];
            ii++;
        }
        i++;
    }
    return(parray);
}
//======================================================================================================parray2array
this.parray2array = function(parray){
    array={};

    array['points']=[[-1,-1,0]];//$pi=1;
    array['polygons']={};
    array['colors']={};
    array['rot']=parray['rot'];

    for (var polygonVal in parray) {
        polygon = parray[polygonVal];
        array['colors'].push(polygon['color']);

        i=0;
        while(polygon['points'][i]){
            array['points'].push(polygon['points'][i]);
            polygon['points'][i]=count(array['points']);
            i++;
        }
        array['polygons'].push(polygon['points']);

    }

    return(array);
    //$res=array2model($array);
    //return($res);
}
//======================================================================================================model2model
this.model2model = function(res1,res2,simple){
    if(typeof simple=='undefined')simple=false

    array1=model2array(res1);
    array2=model2array(res2);
    array={};
    //---------------------------
    if(array1){
        array=array2;
    }else if(array2){
        array=array1;
    }else if(simple){
        parray1=array2parray(array1);
        parray2=array2parray(array2);
        parray={};

        for (var polygonVal in parray1) {
            polygon = parray1[polygonVal];
            parray['polygons'].push(polygon);
        }
        for (var polygonVal in parray2) {
            polygon = parray2[polygonVal];
            parray['polygons'].push(polygon);
        }

        parray['rot']=parray1['rot'];


        array=parray2array(parray);

    }else if(strpos(res1,'[-4,-4,')!==false){
        //------------------------------------------------------------------SpojenÃ­ modelÅ¯ s joinlevel
        joinlevel=res1.substr2('[-4,-4,',']');
        joinlevel=joinlevel-1+1;

        parray1=array2parray(array1);
        parray2=array2parray(array2);
        parray={};

        //-----------------
        for (var polygonVal in parray1) {
            polygon = parray1[polygonVal];
            //if($polygon['points'][1][2]<100){
            i=0;
            while(polygon['points'][i]){
                //if($polygon['points'][$i][2]>$level)$polygon['points'][$i][2]=$level;
                i++;
            }

            parray['polygons'].push(polygon);
            //}
        }
        for (var polygonVal in parray2) {
            polygon = parray2[polygonVal];
            //if($polygon['points'][1][2]>$level){
            i=0;
            while(polygon['points'][i]){
                //if($polygon['points'][$i][2]>$level)$polygon['points'][$i][2]=$level;
                polygon['points'][i][2]+=joinlevel;
                i++;
            }
            parray['polygons'].push(polygon);
            //}
        }
        parray['rot']=parray1['rot'];


        array=parray2array(parray);


        //------------------------------------------------------------------
    }else if(array1['points']==array2['points'] && array1['polygons']==array2['polygons'] && array1['colors']==array2['colors']){
        //------------------------------------------------------------------SpojenÃ­ stejnÃ½ch modelÅ¯
        //e(1);
        array=array2;
        k=pow(2,(1/3));
        i=0;
        while(array['points'][i]){
            var x=array['points'][i][0];
            var y=array['points'][i][1];
            var z=array['points'][i][2];
            //------
            x=x-50;y=y-50;
            x=x*k;
            y=y*k;
            z=z*k;
            x=x+50;y=y+50;
            //------
            array['points'][i]=[x,y,z];
            i++;
        }
        //------------------------------------------------------------------
    }else{
        //------------------------------------------------------------------SpojenÃ­ jinÃ½ch modelÅ¯
        parray1=array2parray(array1);
        parray2=array2parray(array2);
        parray=[];


        //-----------------
        maxx=50;maxy=50;minx=50;miny=50;
        for (var polygonVal in parray1) {
            polygon = parray1[polygonVal];
            for (var pointVal in polygon) {
                point = polygon[pointVal];
                if(point[0]>maxx)maxx=point[0];
                if(point[1]>maxy)maxy=point[1];
                if(point[0]<minx)minx=point[0];
                if(point[1]<miny)miny=point[1];
            }
        }
        range1=(maxx-minx)*(maxy-miny);

        //-----------------
        maxx=50;maxy=50;minx=50;miny=50;
        for (var polygonVal in parray2) {
            polygon = parray2[polygonVal];
            for (var pointVal in polygon) {
                point = polygon[pointVal];
                if(point[0]>maxx)maxx=point[0];
                if(point[1]>maxy)maxy=point[1];
                if(point[0]<minx)minx=point[0];
                if(point[1]<miny)miny=point[1];
            }
        }
        range2=(maxx-minx)*(maxy-miny);
        //-----------------
        //e("$range1~$range2");
        if(range2>range1){
            tmp=parray1;
            parray1=parray2;
            parray2=tmp;
        }

        //-----------------
        maxz1=0;
        for (var polygonVal in parray1) {
            polygon = parray1[polygonVal];
            for (var pointVal in polygon) {
                point = polygon[pointVal];
                if(point[2]>maxz1)maxz1=point[2];
            }
        }
        //-----------------
        maxz2=0;
        for (var polygonVal in parray2) {
            polygon = parray2[polygonVal];
            for (var pointVal in polygon) {
                point = polygon[pointVal];
                if(point[2]>maxz2)maxz2=point[2];
            }
        }
        level=maxz1-maxz2;
        //-----------------
        for (var polygonVal in parray1) {
            polygon = parray1[polygonVal];
            //if($polygon['points'][1][2]<100){
            i=0;
            while(polygon['points'][i]){
                if(polygon['points'][i][2]>level)polygon['points'][i][2]=level;
                i++;
            }

            parray['polygons'].push(polygon);
            //}
        }
        for (var polygonVal in parray2) {
            polygon = parray2[polygonVal];
            //if($polygon['points'][1][2]>$level){
            i=0;
            while(polygon['points'][i]){
                //if($polygon['points'][$i][2]>$level)$polygon['points'][$i][2]=$level;
                polygon['points'][i][2]+=level;
                i++;
            }
            parray['polygons'].push(polygon);
            //}
        }
        parray['rot']=parray1['rot'];


        array=parray2array(parray);
        //------------------------------------------------------------------
    }


    //---------------------------
    res=array2model(array);
    return(res);
}


//======================================================================================================model_postavene
this.model_postavene = function(res,postavene){
    array=model2array(res);
    points=array['points'];

    i=-1;
    for (var iiVal in points) {
        ii = points[iiVal];
        i=i+1;
        x=points[i][0];
        y=points[i][1];
        z=points[i][2];
        //-------------------------
        //$x=$x+rand(-$postavene/10,$postavene/10);
        //$y=$y+rand(-$postavene/10,$postavene/10);
        z=z-(((points[i-1][2]+points[i-2][2])*postavene)/50);
        t=21;
        if(x<0-t){x=0-t;}if(x>100+t){x=100+t;}
        if(y<0-t){y=0-t;}if(y>100+t){y=100+t;}
        if(z<0){z=0;}if(z>250){z=250;}
        //-------------------------
        points[i][0]=x;
        points[i][1]=y;
        points[i][2]=z;
        //---
    }

    array['points']=points;
    res=array2model(array);
    return(res);
}