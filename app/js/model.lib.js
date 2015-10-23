
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
        distance = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
        uhel = Math.acos((x - 50) / distance);
        uhel = uhel / 3.1415 * 180;
        if (y < 50) {
            uhel = uhel + rot;
        } else {
            uhel = uhel - rot;
        }
        if (50 - y < 0) {
            uhel = 180 + 180 - uhel;
        }
        x = 50 + Math.cos(uhel / 180 * 3.1415) * distance;
        y = 50 - (Math.sin(uhel / 180 * 3.1415) * distance);
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
//todo doplnit var u tehdle funkci pred vnitrnimi promennymi
this.model2array = function(res){//todo vyuzit v modeldraw
    if(res.substr(0,1)=='['){

        array={};

        res=str_replace("::",":1,1,1:",res);
        tmp=explode(":",res);


        points=tmp[0];
        polygons=tmp[1];
        colors=tmp[2];
        array['rot']=toFloat(tmp[3],0);
        array['size']=toFloat(tmp[4],1);

        //---------------------------colors

        colors=explode(',',colors);

        array['colors']=colors;

        //---------------------------rozklad bodu

        points=points.substr(1,points.length-2);
        points=explode("]",points);

        for (var i= 0,l=points.length;i<l;i++) {

            points[i]=str_replace("[","",points[i]);
            points[i]=explode(",",points[i]);

            for (var ii= 0,ll=points[i].length;ii<ll;ii++)
                points[i][ii]-=0;

        }

        array['points']=points;

        //---------------------------polygons

        polygons=explode(';',polygons);

        for (var i=0,l=polygons.length;i<l;i++) {


            if(!isNot(polygons[i])){

                //r('spliting polygon',polygons,i);
                polygons[i]=explode(",",polygons[i]);

                for (var ii= 0,ll=polygons[i].length;ii<ll;ii++)
                    polygons[i][ii]-=0;

            }else{

                //r('empty polygon',polygons,i,isNotType(polygons[i]));
                polygons[i]=[];

            }


        }

        //r(polygons);

        array['polygons']=polygons;

        //---------------------------
        return(array);
    }else{
        return(false);
    }
}



//======================================================================================================array2model
this.array2model = function(array){
    res='';

    //---------------------------points

    for (var i=0,l=array['points'].length;i<l;i++) {

        //r(i);

        x=round(array['points'][i][0]*100)/100;
        y=round(array['points'][i][1]*100)/100;
        z=round(array['points'][i][2]*100)/100;
        res+= '['+x+','+y+','+z+']';
    }

    //---------------------------polygons

    i=0;
    while(array['polygons'][i]){
        array['polygons'][i]=implode(',',array['polygons'][i]/*.slice(0,-1)*/);
        i++;
    }
    array['polygons']=implode(';',array['polygons']);
    res+= ':'+array['polygons'];

    //---------------------------colors

    array['colors']=implode(',',array['colors']);
    res+= ':'+array['colors'];

    //---------------------------rot,size

    array['rot']=toFloat(array['rot'],0);
    array['size']=toFloat(array['size'],1);


    res+= ':'+array['rot']+':'+array['size'];

    //---------------------------

    res=str_replace(',;',';',res);
    return(res);

}

//======================================================================================================arrayPurge

this.arrayPurge = function(array) {

    for (var i = Math.max(array.polygons.length,array.colors.length)-1; i>-1 ; i--) {

        if (isNot(array.polygons[i]) || isNot(array.colors[i])) {

            //r('deleting',i,isNot(array.polygons[i]),isNot(array.colors[i]),array.polygons[i],array.colors[i]);

            array.polygons.splice(i, 1);
            array.colors.splice(i, 1);

        }

    }

    return(array);

}

//======================================================================================================arraySnap

//todo Array Snap

//======================================================================================================arrayCompileRotSize

this.arrayCompileRotSize = function(array) {

    //r(array);

    for (var i = 0, l = array['points'].length; i < l; i++) {

        var x = parseInt(array['points'][i][0]);
        var y = parseInt(array['points'][i][1]);
        var z = parseInt(array['points'][i][2]);

        //-----

        var distDeg = xy2distDeg(x-50,y-50);

        //r(distDeg);

        distDeg['dist']=distDeg['dist']*array['size'];
        distDeg['deg']-=array['rot'];

        //r(distDeg);

        var xy = distDeg2xy(distDeg['dist'],distDeg['deg']);

        //r(xy);

        x = Math.round(xy['x']+50);
        y = Math.round(xy['y']+50);

        array['points'][i][0] = x;
        array['points'][i][1] = y;
        array['points'][i][2] = z*array['size'];

    }


    array['rot']=0;
    array['size']=1;


    return(array);

}
//======================================================================================================array2parray
this.array2parray = function(array){

    parray={};
    parray['rot']=array['rot'];
    parray['size']=array['size'];
    parray['polygons']=[];//todo PH ??? difference between [] and {}
    var i=0;
    for (var polygonVal in array['polygons']) {
        polygon = array['polygons'][polygonVal];

        parray['polygons'][i]={};
        parray['polygons'][i]['points']=[];

        parray['polygons'][i]['color']=array['colors'][i];
        var ii=0;
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

    array['points']=[];
    array['polygons']=[];
    array['colors']=[];
    array['rot']=parray['rot'];
    array['size']=parray['size'];


    for (var polygonVal in parray['polygons']) {
        var polygon = parray['polygons'][polygonVal];

        if(!isNot(polygon['points'][0])){//todo ?? nemelo by [undefined] take vracet ze je to isNot

            var newpolygon=[];

            array['colors'].push(polygon['color']);

            for(var i=0,l=polygon['points'].length;i<l;i++){

                array['points'].push(polygon['points'][i]);
                newpolygon[i]=count(array['points']);

            }
            array['polygons'].push(newpolygon);

        }

    }

    return(array);
}

//======================================================================================================emptyParray
this.emptyParray = function(){
    return({
        polygons:[],
        res:0,
        size:1
    });
}


//======================================================================================================parray2array
this.modelJoinlevel = function(res){

    var joinlevel=parseInt(substr2(res,'[-4,-4,',']'));//todo stejny prevod string na int v celem projektu


    if(isNaN(joinlevel)){

        var parray=array2parray(model2array(res));

        joinlevel=0;
        for (var polygonVal in parray['polygons']) {
            var polygon = parray['polygons'][polygonVal];
            for (var pointVal in polygon['points']) {
                var point = polygon['points'][pointVal];
                if(point[2]>joinlevel)joinlevel=point[2];
            }
        }

        if(joinlevel!=0){
            joinlevel-=30;
        }


    }

    return(joinlevel);

}

//======================================================================================================model2model
this.model2model = function(res1,res2,simple){
    if(typeof simple=='undefined')simple=false;

    array1=model2array(res1);
    array2=model2array(res2);

    array1=arrayCompileRotSize(array1);
    array2=arrayCompileRotSize(array2);

    array={};
    //---------------------------
    if(array1==false){
        //------------------------------------------------------------------Model 1 neexistuje => vysledek je model 2
        r('model2model: Model 1 neexistuje => vysledek je model 2');
        array=array2;
        //------------------------------------------------------------------
    }else if(array2==false){
        //------------------------------------------------------------------Model 2 neexistuje => vysledek je model 1
        r('model2model: Model 2 neexistuje => vysledek je model 1');
        array=array1;
        //------------------------------------------------------------------
    }else if(simple){
        //------------------------------------------------------------------Jednoduche smichani modelu
        r('model2model: Jednoduche smichani modelu');
        parray1=array2parray(array1);
        parray2=array2parray(array2);
        parray=emptyParray();

        /*for (var polygonVal in parray1) {
            polygon = parray1[polygonVal];
            parray['polygons'].push(polygon);
        }
        for (var polygonVal in parray2) {
            polygon = parray2[polygonVal];
            parray['polygons'].push(polygon);
        }*/
        parray['polygons']=parray['polygons'].concat(parray1['polygons'])
        parray['polygons']=parray['polygons'].concat(parray2['polygons'])



        array=parray2array(parray);

        //------------------------------------------------------------------
    }else{
        //------------------------------------------------------------------Spojeni modelu s joinlevel
        r('model2model: Spojeni modelu s joinlevel');


        joinlevel1=modelJoinlevel(res1);
        joinlevel2=modelJoinlevel(res2);

        parray1=array2parray(array1);
        parray2=deepCopy(array2parray(array2));

        parray=emptyParray();//todo var v tomhle souboru



        //-----------------

        //r(parray2);
        for (var polygonVal in parray2['polygons']) {//todo co pouzivat v projektu??? for (var polygonVal in nebo for (var i=0,l=... , Co je lepsi????
            polygon = parray2['polygons'][polygonVal];


            if(!isNot(polygon['points']))
            for(var i in polygon['points']){
                //if($polygon['points'][$i][2]>$level)$polygon['points'][$i][2]=$level;
                polygon['points'][i][2]+=joinlevel1;

            }

        }
        //-----------------

        parray['polygons']=(parray1['polygons']).concat(parray2['polygons'])


        //-----------------
        array=parray2array(parray);

        r([-4,-4,joinlevel1+joinlevel2]);//todo odstaranit tyhle reporty
        array['points'].push([-4,-4,joinlevel1+joinlevel2]);

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