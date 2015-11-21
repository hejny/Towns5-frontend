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
 * Object contains Towns Model manipulation functions
 * @type {{}}
 */
this.Model = {};


//======================================================================================================================



/**
 * Add rotation and size to model
 * @param {string} res
 * @param {number} rot
 * @param {number} size
 * @returns {string} Towns Model
 */
this.Model.addRotSize = function(res,rot,size){

    rot=cParam(rot,0);
    size=cParam(size,1);



    res=res.split(':');

    if (typeof res[3] == 'undefined')res[3] = 0;
    if (typeof res[4] == 'undefined')res[4] = 1;


    res[3]=parseFloat(res[3])+rot;
    res[4]=parseFloat(res[4])*size;


    res[3]=Math.round(res[3]);
    res[4]=Math.round(res[4]*100)/100;

    res=res.join(':');
    return(res);
}

//======================================================================================================

/**
 * Rewrite rotation
 * @param {string} res
 * @param {number} rot
 * @returns {string} Towns Model
 */
this.Model.rewriteRot = function(res,rot){

    rot=cParam(rot,0);

    res=res.split(':');

    res[3]=Math.round(rot);

    res=res.join(':');
    return(res);
}


//======================================================================================================Model.model2array

/**
 * @param {string} res Towns model string
 * @returns {*} Towns model array
 */
this.Model.model2array = function(res){
    if(res.substr(0,1)=='['){

        var array={};

        res=res.split('::').join(':1,1,1:');
        var tmp=res.split(':');


        var points=tmp[0];
        var polygons=tmp[1];
        var colors=tmp[2];
        array['rot']=Math.toFloat(tmp[3],0);
        array['size']=Math.toFloat(tmp[4],1);

        //---------------------------colors

        colors=colors.split(',');

        array['colors']=colors;

        //---------------------------rozklad bodu

        points=points.substr(1,points.length-2);
        points=points.split(']');

        for (var i= 0,l=points.length;i<l;i++) {

            points[i]=points[i].split('[').join('');
            points[i]=points[i].split(',');

            for (var ii= 0,ll=points[i].length;ii<ll;ii++)
                points[i][ii]-=0;

        }

        array['points']=points;

        //---------------------------polygons

        polygons=polygons.split(';');

        for (var i=0,l=polygons.length;i<l;i++) {


            if(is(polygons[i])){

                polygons[i]=polygons[i].split(',');

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



//======================================================================================================Model.array2model

/**
 * @param {*} array Towns model array
 * @returns {string} Towns model string
 */
this.Model.array2model = function(array){

    var res='';

    //---------------------------points

    for (var i=0,l=array['points'].length;i<l;i++) {

        var x=Math.round(array['points'][i][0]*100)/100,
            y=Math.round(array['points'][i][1]*100)/100,
            z=Math.round(array['points'][i][2]*100)/100;
        res+= '['+x+','+y+','+z+']';
    }

    //---------------------------polygons

    for(var i in array['polygons']){


        for (var ii=0,ll=array['polygons'][i].length;ii<ll;ii++) {
            array['polygons'][i][ii]++;
        }

        array['polygons'][i]=array['polygons'][i].join(',');

    }
    array['polygons']=array['polygons'].join(';');
    res+= ':'+array['polygons'];

    //---------------------------colors

    array['colors']=array['colors'].join(',');
    res+= ':'+array['colors'];

    //---------------------------rot,size

    array['rot']=Math.toFloat(array['rot'],0);
    array['size']=Math.toFloat(array['size'],1);


    res+= ':'+array['rot']+':'+array['size'];

    //---------------------------

    res=res.split(',;').join(';');
    return(res);

}

//======================================================================================================Model.arrayPurge

/**
 * Removes empty polygons from Towns model array
 * @param {*} array Towns model array
 * @returns {*} Towns model array
 */
this.Model.arrayPurge = function(array) {

    for (var i = Math.max(array.polygons.length,array.colors.length)-1; i>-1 ; i--) {

        if (!is(array.polygons[i]) || !is(array.colors[i])) {

            array.polygons.splice(i, 1);
            array.colors.splice(i, 1);

        }

    }

    return(array);

}

//======================================================================================================Model.arrayMoveBy

/**
 * Move Towns model array by x,y,z
 * @param {*} array Towns model array
 * @param {number} move_x
 * @param {number} move_y
 * @param {number} move_z
 * @returns {*} Towns model array
 */
this.Model.arrayMoveBy = function(array,move_x,move_y,move_z) {

    if(is(array['points']))
        for (var i=0,l=array['points'].length;i<l;i++) {

            array['points'][i][0]+=move_x;
            array['points'][i][1]+=move_y;
            array['points'][i][2]+=move_z;

        }


    return(array);

}

//======================================================================================================arraySnap

/**
 * Snap nearby points together
 * @param {*} array Towns model array
 * @param {number} distance Distance od pount snapping
 * @returns {*} Towns model array
 */
this.Model.arraySnap = function(array,distance) {

    //todo Create this method
    return(array);

}

//======================================================================================================Model.arrayCompileRotSize

/**
 * Compile rotation and size into points
 * @param {*} array Towns model array
 * @returns {*} Towns model array
 */
this.Model.arrayCompileRotSize = function(array) {


    for (var i = 0, l = array['points'].length; i < l; i++) {

        var x = parseInt(array['points'][i][0]),
            y = parseInt(array['points'][i][1]),
            z = parseInt(array['points'][i][2]);

        //-----

        if(!(x==-4 && y==-4)){

            var distDeg = Math.xy2distDeg(x - 50, y - 50);

            //r(distDeg);

            distDeg['dist'] = distDeg['dist'] * array['size'];
            distDeg['deg'] -= array['rot'];

            //r(distDeg);

            var xy = Math.distDeg2xy(distDeg['dist'], distDeg['deg']);

            //r(xy);

            x = Math.round(xy['x'] + 50);
            y = Math.round(xy['y'] + 50);

            array['points'][i][0] = x;
            array['points'][i][1] = y;

        }

        array['points'][i][2] = z*array['size'];

    }


    array['rot']=0;
    array['size']=1;


    return(array);

}
//======================================================================================================Model.array2parray

/**
 * @param {*} arrayTowns model array
 * @returns {*} Towns model polygons array
 */
this.Model.array2parray = function(array){

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
//======================================================================================================Model.parray2array

/**
 *
 * @param {*} parray Towns model polygons array
 * @returns {*} Towns model array
 */
this.Model.parray2array = function(parray){

    var array={};

    array['points']=[];
    array['polygons']=[];
    array['colors']=[];
    array['rot']=parray['rot'];
    array['size']=parray['size'];


    for (var polygonVal in parray['polygons']) {
        var polygon = parray['polygons'][polygonVal];

        if(is(polygon['points'][0])){

            var newpolygon=[];

            array['colors'].push(polygon['color']);

            for(var i=0,l=polygon['points'].length;i<l;i++){

                array['points'].push(polygon['points'][i]);
                newpolygon[i]=array['points'].length-1;

            }
            array['polygons'].push(newpolygon);

        }

    }

    return(array);
}

//======================================================================================================Model.emptyParray

/**
 * Generates empty Towns model polygons array
 * @returns {{polygons: Array, res: number, size: number}} Empty Towns model polygons array
 */
this.Model.emptyParray = function(){
    return({
        polygons:[],
        res:0,
        size:1
    });
}


//======================================================================================================Model.modelJoinlevel

/**
 * Calculates model joinlevel - maximum Z in model
 * @param {string} res Towns model string
 * @param {number} start_x
 * @param {number} start_y
 * @param {number} stop_x
 * @param {number} stop_y
 * @returns {number} Join level
 */
this.Model.modelJoinlevel = function(res,start_x,start_y,stop_x,stop_y){

    if(!is(start_x))start_x=0;
    if(!is(start_y))start_y=0;
    if(!is(stop_x))stop_x=100;
    if(!is(stop_y))stop_y=100;

    var joinlevel=parseInt(substr2(res,'[-4,-4,',']'));


    if(isNaN(joinlevel)){

        var parray=Model.array2parray(Model.model2array(res));

        joinlevel=0;
        for (var polygonVal in parray['polygons']) {
            var polygon = parray['polygons'][polygonVal];
            for (var pointVal in polygon['points']) {
                var point = polygon['points'][pointVal];

                if(is(point)){

                    if(
                        point[0]>start_x &&
                        point[0]<stop_x &&
                        point[1]>start_y &&
                        point[1]<stop_y &&
                        point[2]>joinlevel
                    )joinlevel=point[2];


                }

            }
        }

        if(joinlevel!=0){
            joinlevel-=30;
        }


    }

    return(joinlevel);


}
//======================================================================================================Model.parrayBounds

/**
 * Calculate bounds of Towns model
 * @param parray Towns model polygons array
 * @returns {{start_x: (number|*), start_y: (number|*), stop_x: (number|*), stop_y: (number|*)}} Bounds
 */
this.Model.parrayBounds = function(parray){

    start_x=0;
    start_y=0;
    stop_x=100;
    stop_y=100;


    for (var polygonVal in parray['polygons']) {
        var polygon = parray['polygons'][polygonVal];
        for (var pointVal in polygon['points']) {
            var point = polygon['points'][pointVal];

            if(is(point)){

                if(!is(start_x))start_x=point[0];
                if(!is(stop_x))stop_x=point[0];
                if(!is(start_y))start_y=point[1];
                if(!is(stop_y))stop_y=point[1];


                if(point[0]<start_x)start_x=point[0];
                if(point[0]>stop_x)stop_x=point[0];
                if(point[1]<start_y)start_y=point[1];
                if(point[1]>stop_y)stop_y=point[1];



            }

        }
    }



    return({
        'start_x': start_x,
        'start_y': start_y,
        'stop_x': stop_x,
        'stop_y': stop_y
    });

}

//======================================================================================================Model.model2model

/**
 * Combinate two models
 * @param {string} res1 Towns model string
 * @param {string} res2 Towns model string
 * @param {boolean} simple Simple combination of models
 * @param {number} move_x
 * @param {number} move_y
 * @returns {string} Towns model string
 */
this.Model.model2model = function(res1,res2,simple,move_x,move_y){
    if(typeof simple=='undefined')simple=false;


    var array1=Model.model2array(res1),
        array2=Model.model2array(res2);


    if(is(move_x) || is(move_y)){

        //r(move_x,move_y);

        var tmp = Math.xyRotate(move_x,move_y,-45);//todo Jde nejekym zkusobem vytvorit v js funkci, ktera zmeni hodnotu primo a ne tak, ze je musi vratit pres nejake pomocene pole?

        //r(move_x,move_y);

        move_x=Math.round(tmp.x);
        move_y=Math.round(tmp.y);

        //r(move_x,move_y);
        array2=Model.arrayMoveBy(array2,move_x,move_y,0);

    }



    var array={};
    //---------------------------
    if(array1==false){
        //------------------------------------------------------------------Model 1 neexistuje => vysledek je Model 2
        //r('Model.model2model: Model 1 neexistuje => vysledek je Model 2');
        array=array2;
        //------------------------------------------------------------------
    }else if(array2==false){
        //------------------------------------------------------------------Model 2 neexistuje => vysledek je Model 1
        //r('Model.model2model: Model 2 neexistuje => vysledek je Model 1');
        array=array1;
        //------------------------------------------------------------------
    }else if(simple){
        //------------------------------------------------------------------Jednoduche smichani modelu bez navyseni
        //r('Model.model2model: Jednoduche smichani modelu');

        array1=Model.arrayCompileRotSize(array1);
        array2=Model.arrayCompileRotSize(array2);

        var parray1=Model.array2parray(array1),
            parray2=Model.array2parray(array2),
            parray=Model.emptyParray();


        parray['polygons']=parray['polygons'].concat(parray1['polygons'])
        parray['polygons']=parray['polygons'].concat(parray2['polygons'])



        array=Model.parray2array(parray);

        //------------------------------------------------------------------
    }else{
        //------------------------------------------------------------------Spojeni modelu s joinlevel
        //r('Model.model2model: Spojeni modelu s joinlevel');

        array1=Model.arrayCompileRotSize(array1);
        array2=Model.arrayCompileRotSize(array2);

        var parray1=Model.array2parray(array1);
        parray2=deepCopy(Model.array2parray(array2));


        var bounds=Model.parrayBounds(res2);


        var joinlevel1=Model.modelJoinlevel(res1,bounds.start_x,bounds.start_y,bounds.stop_x,bounds.stop_y),
            joinlevel2=Model.modelJoinlevel(res2);



        parray=Model.emptyParray();

        //-----------------

        //todo [PH] udelat pres Model.arrayMoveBy

        for (var polygonVal in parray2['polygons']) {
            polygon = parray2['polygons'][polygonVal];


            if(is(polygon['points']))
                for(var i in polygon['points']){

                    polygon['points'][i][2]+=joinlevel1;

                }

        }

        //-----------------

        parray['polygons']=(parray1['polygons']).concat(parray2['polygons'])


        //-----------------
        array=Model.parray2array(parray);

        array['points'].push([-4,-4,joinlevel1+joinlevel2]);

        //------------------------------------------------------------------
    }

    //---------------------------

    return(Model.array2model(array));
}


//======================================================================================================model_postavene todo
/*
 this.model_postavene = function(res,postavene){
 var array=Model.model2array(res);
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
 res=Model.array2model(array);
 return(res);
 }*/
