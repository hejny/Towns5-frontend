/**

     ██╗   ██╗███╗   ██╗██╗ ██████╗ ██╗   ██╗███████╗    ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
     ██║   ██║████╗  ██║██║██╔═══██╗██║   ██║██╔════╝    ████╗ ████║██╔════╝████╗  ██║██║   ██║
     ██║   ██║██╔██╗ ██║██║██║   ██║██║   ██║█████╗      ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
     ██║   ██║██║╚██╗██║██║██║▄▄ ██║██║   ██║██╔══╝      ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
     ╚██████╔╝██║ ╚████║██║╚██████╔╝╚██████╔╝███████╗    ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
      ╚═════╝ ╚═╝  ╚═══╝╚═╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝
     © Towns.cz

 * @fileOverview Left tool menu creating and dismantling buildings

 */


//======================================================================================================================Load
/*
 ██╗      ██████╗  █████╗ ██████╗
 ██║     ██╔═══██╗██╔══██╗██╔══██╗
 ██║     ██║   ██║███████║██║  ██║
 ██║     ██║   ██║██╔══██║██║  ██║
 ███████╗╚██████╔╝██║  ██║██████╔╝
 ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝
 */
//todo refactor move loading to init

var unique_objectsů


if(/*Storage.is('unique_objects')*/ false) {//todo cache object prototypes

    unique_objects=JSON.parse(Storage.load('unique_objects'));


}else{

    r('loading unique_objects from TownsAPI');
    townsApi(
        [
            'list',
            'id,x,y,type,res,_name,profile,func,permalink,func,group,own,superown,fp,fs',
            //'id,name,_name,type,permalink,origin,func,group,expand,block,attack,hold,res,profile,fp,fs,fc,fr,fx,own,superown,x,y,ww,traceid,starttime,readytime,stoptime',
            'unique',
            'id'
        ]
        ,function(json){

            unique_objects=json['objects'];
            //+++++++++++++++++++++++++++++++++++++++++++++++++

            unique_objects.push({
                'name': 'krychle',
                'type': 'building',
                'group': 'block',
                'res': '[50,50,50][20,20,0][80,20,0][20,80,0][80,80,0][20,20,60][80,20,60][20,80,60][80,80,60]:;2,3,5,4;4,8,9,5;5,9,7,3;3,7,6,2;4,8,6,2;8,9,7,6:,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc'
            });
            unique_objects.push({
                'name': 'jehlan',
                'type': 'building',
                'group': 'block',
                'res': '[90,10,0][10,10,0][10,90,0][90,90,0][50,50,50]:;3,5,4;4,5,1;5,1,2;3,5,2:CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC'
            });
            /*unique_objects.push({
                'name': 'kopule',
                'type': 'building',
                'group': 'block',
                'res': '[50,50,NaN][50,50,50][50,50,50][50,50,50][50,50,50][50,50,50][50,50,50][50,50,50][50,50,50][50,50,50][50,50,50][72,50,45][68,38,45][57,30,45][44,30,45][33,38,45][28,50,45][33,63,45][44,71,45][57,71,45][68,63,45][80,50,40][75,33,40][60,22,40][41,22,40][26,33,40][20,50,40][26,68,40][41,79,40][60,79,40][75,68,40][86,50,35][80,29,35][62,16,35][39,16,35][21,29,35][14,50,35][21,72,35][39,85,35][62,85,35][80,72,35][90,50,30][83,27,30][63,12,30][38,12,30][18,27,30][10,50,30][18,74,30][38,89,30][63,89,30][83,74,30][94,50,25][86,25,25][64,9,25][37,9,25][15,25,25][6,50,25][15,76,25][37,92,25][64,92,25][86,76,25][96,50,20][88,23,20][65,7,20][36,7,20][13,23,20][4,50,20][13,78,20][36,94,20][65,94,20][88,78,20][98,50,15][89,22,15][65,5,15][36,5,15][12,22,15][2,50,15][12,79,15][36,96,15][65,96,15][89,79,15][99,50,10][90,22,10][66,4,10][35,4,10][11,22,10][1,50,10][11,79,10][35,97,10][66,97,10][90,79,10][100,50,5][91,21,5][66,3,5][35,3,5][10,21,5][0,50,5][10,80,5][35,98,5][66,98,5][91,80,5][100,50,0][91,21,0][66,3,0][35,3,0][10,21,0][0,50,0][10,80,0][35,98,0][66,98,0][91,80,0]:1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;12,21,11,2;13,12,2,3;14,13,3,4;15,14,4,5;16,15,5,6;17,16,6,7;18,17,7,8;19,18,8,9;20,19,9,10;21,20,10,11;22,31,21,12;23,22,12,13;24,23,13,14;25,24,14,15;26,25,15,16;27,26,16,17;28,27,17,18;29,28,18,19;30,29,19,20;31,30,20,21;32,41,31,22;33,32,22,23;34,33,23,24;35,34,24,25;36,35,25,26;37,36,26,27;38,37,27,28;39,38,28,29;40,39,29,30;41,40,30,31;42,51,41,32;43,42,32,33;44,43,33,34;45,44,34,35;46,45,35,36;47,46,36,37;48,47,37,38;49,48,38,39;50,49,39,40;51,50,40,41;52,61,51,42;53,52,42,43;54,53,43,44;55,54,44,45;56,55,45,46;57,56,46,47;58,57,47,48;59,58,48,49;60,59,49,50;61,60,50,51;62,71,61,52;63,62,52,53;64,63,53,54;65,64,54,55;66,65,55,56;67,66,56,57;68,67,57,58;69,68,58,59;70,69,59,60;71,70,60,61;72,81,71,62;73,72,62,63;74,73,63,64;75,74,64,65;76,75,65,66;77,76,66,67;78,77,67,68;79,78,68,69;80,79,69,70;81,80,70,71;82,91,81,72;83,82,72,73;84,83,73,74;85,84,74,75;86,85,75,76;87,86,76,77;88,87,77,78;89,88,78,79;90,89,79,80;91,90,80,81;92,101,91,82;93,92,82,83;94,93,83,84;95,94,84,85;96,95,85,86;97,96,86,87;98,97,87,88;99,98,88,89;100,99,89,90;101,100,90,91;102,111,101,92;103,102,92,93;104,103,93,94;105,104,94,95;106,105,95,96;107,106,96,97;108,107,97,98;109,108,98,99;110,109,99,100;111,110,100,101:cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc'
            });
            unique_objects.push({
                'name': 'koule',
                'type': 'building',
                'group': 'block',
                'res': '[50,50,NaN][50,50,0][50,50,0][50,50,0][50,50,0][50,50,0][50,50,0][50,50,0][50,50,0][50,50,0][73,50,6][68,36,6][54,28,6][39,31,6][29,43,6][29,58,6][39,70,6][54,73,6][68,65,6][82,50,12][75,30,12][56,19,12][34,23,12][20,40,12][20,61,12][34,78,12][56,82,12][75,71,12][88,50,17][80,26,17][57,13,17][31,18,17][15,37,17][15,63,17][31,83,17][57,88,17][80,75,17][92,50,23][83,23,23][58,9,23][29,14,23][11,36,23][11,65,23][29,87,23][58,92,23][83,77,23][95,50,28][85,22,28][58,6,28][28,12,28][8,35,28][8,66,28][28,89,28][58,95,28][85,79,28][98,50,34][87,20,34][59,3,34][26,9,34][5,34,34][5,67,34][26,92,34][59,98,34][87,81,34][99,50,39][88,19,39][59,2,39][26,8,39][4,34,39][4,67,39][26,93,39][59,99,39][88,82,39][100,50,45][89,18,45][59,1,45][25,7,45][4,33,45][4,68,45][25,94,45][59,100,45][89,83,45][100,50,50][89,18,50][59,1,50][25,7,50][4,33,50][4,68,50][25,94,50][59,100,50][89,83,50][50,50,100][50,50,100][50,50,100][50,50,100][50,50,100][50,50,100][50,50,100][50,50,100][50,50,100][73,50,95][68,36,95][54,28,95][39,31,95][29,43,95][29,58,95][39,70,95][54,73,95][68,65,95][82,50,89][75,30,89][56,19,89][34,23,89][20,40,89][20,61,89][34,78,89][56,82,89][75,71,89][88,50,84][80,26,84][57,13,84][31,18,84][15,37,84][15,63,84][31,83,84][57,88,84][80,75,84][92,50,78][83,23,78][58,9,78][29,14,78][11,36,78][11,65,78][29,87,78][58,92,78][83,77,78][95,50,73][85,22,73][58,6,73][28,12,73][8,35,73][8,66,73][28,89,73][58,95,73][85,79,73][98,50,67][87,20,67][59,3,67][26,9,67][5,34,67][5,67,67][26,92,67][59,98,67][87,81,67][99,50,62][88,19,62][59,2,62][26,8,62][4,34,62][4,67,62][26,93,62][59,99,62][88,82,62][100,50,56][89,18,56][59,1,56][25,7,56][4,33,56][4,68,56][25,94,56][59,100,56][89,83,56][100,50,50][89,18,50][59,1,50][25,7,50][4,33,50][4,68,50][25,94,50][59,100,50][89,83,50]:1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;1,1,1,1;11,19,10,2;12,11,2,3;13,12,3,4;14,13,4,5;15,14,5,6;16,15,6,7;17,16,7,8;18,17,8,9;19,18,9,10;20,28,19,11;21,20,11,12;22,21,12,13;23,22,13,14;24,23,14,15;25,24,15,16;26,25,16,17;27,26,17,18;28,27,18,19;29,37,28,20;30,29,20,21;31,30,21,22;32,31,22,23;33,32,23,24;34,33,24,25;35,34,25,26;36,35,26,27;37,36,27,28;38,46,37,29;39,38,29,30;40,39,30,31;41,40,31,32;42,41,32,33;43,42,33,34;44,43,34,35;45,44,35,36;46,45,36,37;47,55,46,38;48,47,38,39;49,48,39,40;50,49,40,41;51,50,41,42;52,51,42,43;53,52,43,44;54,53,44,45;55,54,45,46;56,64,55,47;57,56,47,48;58,57,48,49;59,58,49,50;60,59,50,51;61,60,51,52;62,61,52,53;63,62,53,54;64,63,54,55;65,73,64,56;66,65,56,57;67,66,57,58;68,67,58,59;69,68,59,60;70,69,60,61;71,70,61,62;72,71,62,63;73,72,63,64;74,82,73,65;75,74,65,66;76,75,66,67;77,76,67,68;78,77,68,69;79,78,69,70;80,79,70,71;81,80,71,72;82,81,72,73;83,91,82,74;84,83,74,75;85,84,75,76;86,85,76,77;87,86,77,78;88,87,78,79;89,88,79,80;90,89,80,81;91,90,81,82;92,100,91,83;93,92,83,84;94,93,84,85;95,94,85,86;96,95,86,87;97,96,87,88;98,97,88,89;99,98,89,90;100,99,90,91;101,109,100,92;102,101,92,93;103,102,93,94;104,103,94,95;105,104,95,96;106,105,96,97;107,106,97,98;108,107,98,99;109,108,99,100;110,118,109,101;111,110,101,102;112,111,102,103;113,112,103,104;114,113,104,105;115,114,105,106;116,115,106,107;117,116,107,108;118,117,108,109;119,127,118,110;120,119,110,111;121,120,111,112;122,121,112,113;123,122,113,114;124,123,114,115;125,124,115,116;126,125,116,117;127,126,117,118;128,136,127,119;129,128,119,120;130,129,120,121;131,130,121,122;132,131,122,123;133,132,123,124;134,133,124,125;135,134,125,126;136,135,126,127;137,145,136,128;138,137,128,129;139,138,129,130;140,139,130,131;141,140,131,132;142,141,132,133;143,142,133,134;144,143,134,135;145,144,135,136;146,154,145,137;147,146,137,138;148,147,138,139;149,148,139,140;150,149,140,141;151,150,141,142;152,151,142,143;153,152,143,144;154,153,144,145;155,163,154,146;156,155,146,147;157,156,147,148;158,157,148,149;159,158,149,150;160,159,150,151;161,160,151,152;162,161,152,153;163,162,153,154;164,172,163,155;165,164,155,156;166,165,156,157;167,166,157,158;168,167,158,159;169,168,159,160;170,169,160,161;171,170,161,162;172,171,162,163;173,181,172,164;174,173,164,165;175,174,165,166;176,175,166,167;177,176,167,168;178,177,168,169;179,178,169,170;180,179,170,171;181,180,171,172:cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc,cccccc'
            });*/

            //+++++++++++++++++++++++++++++++++++++++++++++++++Parse //todo nakonec presunout do API
            for(var i= 0,l=unique_objects.length;i<l;i++){


                //r(unique_objects[i]._name,i);

                if(typeof unique_objects[i].res!='undefined'){


                    if(unique_objects[i].res.substring(0,1)=='{'){

                        var ress=unique_objects[i].res.substring(1,unique_objects[i].res.length-2).split('}{');

                        //unique_objects[i].res=[];
                        unique_objects[i].res=unique_objects[11].res;
                        unique_objects[i].res_path=ress[3];
                        unique_objects[i].res_node=unique_objects[i].res

                        //r(unique_objects[i]._name,unique_objects[i].res);

                    }


                    unique_objects[i].icon=Model.createIcon(unique_objects[i].res,50);


                }

            }
            //+++++++++++++++++++++++++++++++++++++++++++++++++




            //unique_objects=[{res:'[50,50,NaN][17,15,15][89,6,36][11,89,0][75,98,0]:;2,3,5,4:00CCFF,00CCFF'}];

            setTimeout(function(){

                Storage.save('unique_objects',JSON.stringify(unique_objects));
                //objectMenuUnique('wall');


            },100);




        });

}





//======================================================================================================================buildingStart
/*
 ██████╗ ██╗   ██╗██╗██╗     ██████╗ ██╗███╗   ██╗ ██████╗
 ██╔══██╗██║   ██║██║██║     ██╔══██╗██║████╗  ██║██╔════╝
 ██████╔╝██║   ██║██║██║     ██║  ██║██║██╔██╗ ██║██║  ███╗
 ██╔══██╗██║   ██║██║██║     ██║  ██║██║██║╚██╗██║██║   ██║
 ██████╔╝╚██████╔╝██║███████╗██████╔╝██║██║ ╚████║╚██████╔╝
 ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝

 */

function buildingStart(object){

    mapSpecialCursorStart();

    building=object;
    building.rot=0;
    building.size=1;
    selecting_offset={x: 150,y: 250};



    $('#selecting-distance').attr('height',300);//todo Jaká by měla být velikost - rozmyslet?
    $('#selecting-distance').attr('width',300);
    //$('#selecting-distance').css('border',2);

    buildingUpdate();
    //r(building.res);


    $('#selecting-distance-ctl').css('background','');//neutral background
    $('#selecting-distance-ctl').show();//showing toolbar control
    $('#selecting-distance-ctl .mini-button').hide();//hiding all buttons
    //showing buttons used by actual tool
    if(object.group!='wall')$('#selecting-distance-right').show();//todo refactor group to subtype
    if(object.group!='wall')$('#selecting-distance-left').show();
    $('#selecting-distance-plus').show();
    $('#selecting-distance-minus').show();
    if(object.group=='block')$('#selecting-distance-color').show();
    $('#selecting-distance-close').show();



    $('#selecting-distance').show();
}

//---------------------------------------------------------------


function buildingUpdate(object){

    selecting_distance_canvas_ctx.clearRect ( 0 , 0 ,300 , 300 );


    Model.draw(selecting_distance_canvas_ctx,Model.addRotSize(building.res,(building.rot-map_rotation),building.size),map_zoom_m*map_model_size,selecting_offset['x'],selecting_offset['y'],0,map_slope,building.group=='block'?selected_color:false);


}

//---------------------------------------------------------------


function buildingStop(){

    building=false;
    selecting_offset={x: 0,y: 0};

}

//======================================================================================================================dismantlingStart
/*
 ██████╗ ██╗███████╗███╗   ███╗ █████╗ ███╗   ██╗████████╗██╗     ██╗███╗   ██╗ ██████╗
 ██╔══██╗██║██╔════╝████╗ ████║██╔══██╗████╗  ██║╚══██╔══╝██║     ██║████╗  ██║██╔════╝
 ██║  ██║██║███████╗██╔████╔██║███████║██╔██╗ ██║   ██║   ██║     ██║██╔██╗ ██║██║  ███╗
 ██║  ██║██║╚════██║██║╚██╔╝██║██╔══██║██║╚██╗██║   ██║   ██║     ██║██║╚██╗██║██║   ██║
 ██████╔╝██║███████║██║ ╚═╝ ██║██║  ██║██║ ╚████║   ██║   ███████╗██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝

 */

function dismantlingStart(){

    mapSpecialCursorStop();
    mapSpecialCursorStart();

    updateSelectingDistance();

    dismantling=true;

    $('#selecting-distance-ctl').css('background','');
    $('#selecting-distance-ctl').css('background-size','cover');


    $('#selecting-distance-ctl').show();
    $('#selecting-distance-left').hide();
    $('#selecting-distance-right').hide();



    $('#selecting-distance').show();

}


//---------------------------------------------------------------dismantlingStop


function dismantlingStop(){

    dismantling=false;


}

//======================================================================================================================ObjectMenu
/*
 ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
 ████╗ ████║██╔════╝████╗  ██║██║   ██║
 ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
 ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
 ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
 ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝
 */

function objectMenuUnique(group){

    var objectmenu='';

    r(unique_objects);

    for(var i= 0,l=unique_objects.length;i<l;i++){


        if(unique_objects[i].group==group){

            var icon=unique_objects[i].icon;


            var title='ahoj';
            var content='rsgeths aetsyhj  res6tu yhj esyhu j sy rthu ae5y t ae5 y';
            var action='buildingStart(unique_objects['+(i)+']);';


            objectmenu+=objectmenu_template
                .split('%icon').join(icon)
                .split('%title').join(htmlEncode(title))
                .split('%content').join(htmlEncode(content))
                .split('%action').join(htmlEncode(action));

            //$(objectmenu[i]).children('div').attr('content',content);
            //$(objectmenu[i]).children('.js-popup-action-open').css('background','url(\''+icon+'\')');

        }



    }


    showLeftMenu(objectmenu);

}