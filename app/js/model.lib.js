



    function drawModel(ctx,res) {


        //ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );

        //var res='[28,30,0][79,32,19][48,97,0][48,97,70]:1,2,3;1,2,4:00CC00,0ff00f';

        s=1;
        slnko=1;


        res=res.split('::').join(':1,1,1:');
        tmp=res.split(':');


        points=tmp[0];
        polygons=tmp[1];
        colors=tmp[2];
        rot=parseInt(tmp[3]);


        //---------------------------Rozklad barev

        colors=colors.split(',');

        //---------------------------Rozklad bodů

        points=points.split('][');

        i=0;
        while(points[i]){
            points[i]=points[i].split('[').join('');
            points[i]=points[i].split(']').join('');
            points[i]=points[i].split(',');
            i++;
        }


        //---------------------------Rotace



        i=0;
        while(points[i]){

            x=parseInt(points[i][0]);
            y=parseInt(points[i][1]);
            z=parseInt(points[i][2]);


            //-----
            vzdalenost=Math.sqrt(Math.pow((x-50),2)+Math.pow((y-50),2));

            uhel=Math.acos((x-50)/vzdalenost);


            uhel=(uhel/3.1415)*180;


            if(y<50){uhel=uhel+rot;}else{uhel=uhel-rot;}
            if((50-y)<0){uhel=180+(180-uhel);}




            x=50+(Math.cos((uhel/180)*3.1415)*vzdalenost);
            y=50-(Math.sin((uhel/180)*3.1415)*vzdalenost);
            x=Math.round(x);
            y=Math.round(y);

            //----Maximální rozsah

            if(x<0){x=0;} if(x>100){x=100;}
            if(y<0){y=0;} if(y>100){y=100;}
            if(z<0){z=0;} if(z>250){z=250;}


            points[i][0]=x;
            points[i][1]=y;
            points[i][2]=z;
            //---
            i++;
        }


        //---------------------------Rozklad polygonů
        polygons=polygons.split(';');


        i=0;
        while(polygons[i]){

            polygons[i]=polygons[i].split(',');

            polygons[i][polygons[i].length]=colors[i];
            i++;

        }
        //---------------------------Seřazení bodů - ne úplně elegantní řešení
        x=-1;
        polygonsord=[];
        polygonsord2=[];


        i2=0;
        while(polygons.length>i2){

            polygonsord[i2]=[]
            polygonsord2[i2]=[]


            i3=0;
            while(polygons[i2][i3]){


                 if(polygons[i2][polygons[i2].length-1]!=polygons[i2][i3]){

                     polygonsord2[i2][i3]=(points[polygons[i2][i3]-1][0]*0.5)+(points[polygons[i2][i3]-1][1]*0.5)+(points[polygons[i2][i3]-1][2]*1.11);
                 }

                i3++;
             }
             count=0;
            count3=0;

            i3=0;
            while(polygonsord2[i2][i3]){

                count=count+polygonsord2[i2][i3];
                count3=count3+1;
                i3++;
            }



             count=Math.floor(count/count3)+'';

             if(count<10){count='00'+count;}else
             if(count<100){count='0'+count;}



             polygons[i2]=count+'_'+polygons[i2].join(',');


            i2++;
        }

        polygons.sort();

        i2=0;
        while(polygons[i2]){
            polygons[i2]=polygons[i2].split('_');
            polygons[i2]=polygons[i2][1].split(',');

            i2++;
        }/**/


        //----------------------------------------------------------------stin

        /*shadow = imagecolorallocate(GLOBALS['ss']['im'],0,0,0);
         i2=-1;
         foreach(polygons as tmp){
         i2=i2+1;
         tmppoints=array();
         i=-1;

         foreach(tmp as ii){
         if(tmp[tmp.length-1]!=ii){
         x=points[ii-1][0];
         y=points[ii-1][1];
         z=points[ii-1][2];
         if(hore!=1){
         px=0.45;py=0.1;
         xx=100+(x*1)-(y*1)+(z*px);
         yy=279+(x*0.5)+(y*0.5)+(z*py);
         //xx=100+(x*1)-(y*1);
         ///yy=279+(x*0.5)+(y*0.5)-(z*1.11);
         }else{
         xx=x+25;
         yy=y+25;
         }
         i=i+1;
         tmppoints[i]=s*xx;
         i=i+1;
         tmppoints[i]=s*yy;
         }
         }
         if(!tmppoints[4]){tmppoints[0]=0;tmppoints[1]=0;tmppoints[2]=0;tmppoints[3]=0;tmppoints[4]=0;tmppoints[5]=0;}

         imagefilledpolygon(GLOBALS['ss']['im'],tmppoints,tmppoints.length/2,shadow);
         }*/

        //--------------------------------------------------------------Vykreslení polygonů

        i2=0;
        while(polygons.length>i2){


            tmppoints=[];


            i=0;
            i3=0;
            while(polygons[i2][i3]){
                if(typeof points[polygons[i2][i3]-1]!== 'undefined'){

                    //alert(points[polygons[i2][i3]-1]);
                    x=points[polygons[i2][i3]-1][0];
                    y=points[polygons[i2][i3]-1][1];
                    z=points[polygons[i2][i3]-1][2];

                    xx=100+(x*1)-(y*1);
                    yy=279+(x*0.5)+(y*0.5)-(z*1.11);
                    xxx=100+(x*1)-(y*1);
                    yyy=279+(x*0.5)+(y*0.5)-(z*1.11);


                    tmppoints[i]=s*xx;
                    i++;
                    tmppoints[i]=s*yy;
                    i++;

                }
                i3++;
            }
            if(!tmppoints[4]){tmppoints[0]=0;tmppoints[1]=0;tmppoints[2]=0;tmppoints[3]=0;tmppoints[4]=0;tmppoints[5]=0;}


            color=polygons[i2][polygons[i2].length-1];


            //----------------------Vystínování polygonu - sklon polygonu
            /*x1=points[polygons[i2][0]-1][0];
            y1=points[polygons[i2][0]-1][1];
            x2=points[polygons[i2][2]-1][0];
            y2=points[polygons[i2][2]-1][1];
            x=abs(x1-x2)+1;
            y=abs(y1-y2)+1;
            rand=pow(x/y,1/2);
            if(rand>1.5){rand=1.5;}
            rand=(rand*30*slnko)-(25*slnko);*/
            rand=1;
            //----------------------Vystínování polygonu - propočítání barvy


            /*red=hexdec(substr(color,0,2))+rand;
            green=hexdec(substr(color,2,2))+rand;
            blue=hexdec(substr(color,4,2))+rand;

            if(red>255){red=255;}if(red<0){red=0;}
            if(green>255){green=255;}if(green<0){green=0;}
            if(blue>255){blue=255;}if(blue<0){blue=0;}

            //------------------------Vystínování polygonu - nastavení barvy

            if(red>255){red=255;}if(red<0){red=0;}
            if(green>255){green=255;}if(green<0){green=0;}
            if(blue>255){blue=255;}if(blue<0){blue=0;}

            ctx.fillStyle = 'rgba('+red+', '+green+', '+blue+', 0.5)';*/

            ctx.fillStyle = '#'+color;

            //------------------------Vykreslení bodů

            ctx.beginPath();

            ctx.moveTo(tmppoints[0], tmppoints[1]);

            i=2;
            while(i<tmppoints.length){

                ctx.lineTo(tmppoints[i],tmppoints[i+1]);

                i=i+2;
            }

            ctx.closePath();
            ctx.fill();

            //------------------------

        i2++;
        }


    }


var model='[1,1,0][10,10,0][10,90,0][90,90,0][90,10,0][20,20,40][20,80,40][80,20,40][80,80,40][40,80,40][60,80,40][40,90,40][60,90,40][40,90,0][60,90,0][45,90,0][55,90,0][45,90,30][55,90,30][56,84,30][56,84,0][30,30,40][30,70,40][70,70,40][70,30,40][40,40,140][60,40,140][40,60,140][60,60,140][45,45,140][45,55,140][55,55,140][55,45,140][50,50,2500][30,20,40][20,30,40][70,20,40][80,30,40][20,70,40][30,80,40][70,80,40][80,70,40][25,75,150][25,25,150][75,25,150][75,75,150][50,61,140]:14,12,13,15,17,19,18,16;16,18,20,21;13,11,15;14,10,12;3,14,10,7;4,9,11,15;6,7,10,12,13,11,9,8;4,9,8,5;3,7,6,2;2,5,8,6;23,28,29,24;23,28,26,22;22,25,27,26;27,29,24,25;26,27,29,28;31,34,32;32,33,34;30,33,34;30,34,31;41,46,9;9,46,42;42,46,24;24,46,41;25,45,38;45,38,8;45,8,37;45,37,25;44,22,35;44,35,6;6,44,36;36,44,22;39,23,43;23,40,43;7,43,40;7,43,39;28,29,47:666666,663300,666666,666666,CCCCCC,CCCCCC,00CC00,CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC,003300,003300,FFFF00,FFFF00,FFFF00,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900:20';