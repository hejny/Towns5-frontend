
/*   ██████╗ ██████╗  █████╗ ██╗    ██╗
     ██╔══██╗██╔══██╗██╔══██╗██║    ██║
     ██║  ██║██████╔╝███████║██║ █╗ ██║
     ██║  ██║██╔══██╗██╔══██║██║███╗██║
     ██████╔╝██║  ██║██║  ██║╚███╔███╔╝
     ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝*/
//██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



this.drawModel = function(ctx, res, s, x_begin, y_begin, rot, slope) {
    //todo delat kontrolu vstupnich parametru u funkci???

    var slope_m = Math.abs(Math.sin(slope / 180 * Math.PI));
    var slope_n = Math.abs(Math.cos(slope / 180 * Math.PI)) * 1.4;
    var slnko = 50;

    res=modelRotSize(res,rot,s);
    var res=model2array(res,rot,s);


    //------------------------Seřazení bodů
    res['polygons'].sort(function (a, b) {
        var sum,cnt;

        var polygons=[a,b];
        var zindex=[0,0];

        for(var polygon in polygons){

            sum = 0;
            cnt = 0;
            for (var i in polygons[polygon][i]) {

                    sum +=    res['points'][polygons[polygon][i]][0] * slope_m
                            + res['points'][polygons[polygon][i]][1] * slope_m
                            + res['points'][polygons[polygon][i]][2] * slope_n;
                    cnt++;

            }
            zindex[polygon] = sum / (l+1);

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
                var x =          res['points'][res['polygons'][i2][i3]][0] + z / 1.5;
                var y =          res['points'][res['polygons'][i2][i3]][1] - z / 1.5 / 2;


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

                ctx.lineTo(tmppoints[i].x*s + x_begin, tmppoints[i].y*s + y_begin);

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
            if (!isNot(res['points'][res['polygons'][i2][i3]])) {

                x = res['points'][res['polygons'][i2][i3]][0];
                y = res['points'][res['polygons'][i2][i3]][1];
                z = res['points'][res['polygons'][i2][i3]][2];
                xx = x * 1 - (y * 1);
                yy = x * slope_m + y * slope_m - (z * slope_n);

                tmppoints.push({x: xx, y: yy});
            }
        }

        var color = res['colors'][i2];
        color = hexToRgb('#' + color);

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

                ctx.lineTo(tmppoints[i].x*s + x_begin, tmppoints[i].y*s + y_begin);

            }

            ctx.closePath();
            ctx.fill();

        }


    }
};

//======================================================================================================================

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

this.rgbToHex = function(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};



//======================================================================================================================



this.createIcon = function(res,size){

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

        var array={};

        res=str_replace("::",":1,1,1:",res);
        var tmp=explode(":",res);


        var points=tmp[0];
        var polygons=tmp[1];
        var colors=tmp[2];
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

                polygons[i]=explode(",",polygons[i]);

                for (var ii= 0,ll=polygons[i].length;ii<ll;ii++)
                    polygons[i][ii]-=1;

            }else{

                polygons[i]=[];

            }


        }

        array['polygons']=polygons;

        //---------------------------
        return(array);
    }else{
        return(false);
    }
}



//======================================================================================================array2model
this.array2model = function(array){

    var res='';

    //---------------------------points

    for (var i=0,l=array['points'].length;i<l;i++) {

        var x=round(array['points'][i][0]*100)/100,
            y=round(array['points'][i][1]*100)/100,
            z=round(array['points'][i][2]*100)/100;
        res+= '['+x+','+y+','+z+']';
    }

    //---------------------------polygons

    i=0;
    while(array['polygons'][i]){//todo change to for


        for (var ii=0,ll=array['polygons'][i].length;ii<ll;ii++) {
            array['polygons'][i][ii]++;
        }

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


    for (var i = 0, l = array['points'].length; i < l; i++) {

        var x = parseInt(array['points'][i][0]),
            y = parseInt(array['points'][i][1]),
            z = parseInt(array['points'][i][2]);

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

    var parray={};
    parray['rot']=array['rot'];
    parray['size']=array['size'];
    parray['polygons']=[];//todo ??? difference between [] and {}
    var i=0;
    for (var polygonVal in array['polygons']) {
        var polygon = array['polygons'][polygonVal];

        parray['polygons'][i]={};
        parray['polygons'][i]['points']=[];

        parray['polygons'][i]['color']=array['colors'][i];
        var ii=0;
        for (var pointVal in polygon) {
            point = polygon[pointVal];
            parray['polygons'][i]['points'][ii]=array['points'][point];
            ii++;
        }
        i++;
    }
    return(parray);
}
//======================================================================================================parray2array
this.parray2array = function(parray){

    var array={};

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
                newpolygon[i]=count(array['points'])-1;

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

                if(!isNot(point))
                    if(point[2]>joinlevel)joinlevel=point[2];
            }
        }

        if(joinlevel!=0){
            joinlevel-=50;
        }


    }

    return(joinlevel);

}

//======================================================================================================model2model
this.model2model = function(res1,res2,simple){
    if(typeof simple=='undefined')simple=false;

    var array1=model2array(res1),
        array2=model2array(res2);

    array1=arrayCompileRotSize(array1);
    array2=arrayCompileRotSize(array2);

    var array={};
    //---------------------------
    if(array1==false){
        //------------------------------------------------------------------Model 1 neexistuje => vysledek je model 2
        //r('model2model: Model 1 neexistuje => vysledek je model 2');
        array=array2;
        //------------------------------------------------------------------
    }else if(array2==false){
        //------------------------------------------------------------------Model 2 neexistuje => vysledek je model 1
        //r('model2model: Model 2 neexistuje => vysledek je model 1');
        array=array1;
        //------------------------------------------------------------------
    }else if(simple){
        //------------------------------------------------------------------Jednoduche smichani modelu
        //r('model2model: Jednoduche smichani modelu');

        var parray1=array2parray(array1),
            parray2=array2parray(array2),
            parray=emptyParray();


        parray['polygons']=parray['polygons'].concat(parray1['polygons'])
        parray['polygons']=parray['polygons'].concat(parray2['polygons'])



        array=parray2array(parray);

        //------------------------------------------------------------------
    }else{
        //------------------------------------------------------------------Spojeni modelu s joinlevel
        //r('model2model: Spojeni modelu s joinlevel');

        var joinlevel1=modelJoinlevel(res1),
            joinlevel2=modelJoinlevel(res2);

        parray1=array2parray(array1);
        parray2=deepCopy(array2parray(array2));

        parray=emptyParray();

        //-----------------

        for (var polygonVal in parray2['polygons']) {
            polygon = parray2['polygons'][polygonVal];


            if(!isNot(polygon['points']))
            for(var i in polygon['points']){

                polygon['points'][i][2]+=joinlevel1;

            }

        }
        //-----------------

        parray['polygons']=(parray1['polygons']).concat(parray2['polygons'])


        //-----------------
        array=parray2array(parray);

        array['points'].push([-4,-4,joinlevel1+joinlevel2]);

        //------------------------------------------------------------------
    }

    //---------------------------

    return(array2model(array));
}


//======================================================================================================model_postavene todo
/*
this.model_postavene = function(res,postavene){
    var array=model2array(res);
    var points=array['points'];

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
}*/
