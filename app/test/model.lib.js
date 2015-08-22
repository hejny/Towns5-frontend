



function drawModel(ctx,res,s,x_begin,y_begin,rot) {

    s=s*1.6;
    slnko=1;


    res=res.split('::').join(':1,1,1:');
    tmp=res.split(':');


    points=tmp[0];
    polygons=tmp[1];
    colors=tmp[2];
    rot=parseInt(rot)+45+parseInt(tmp[3]);


    if(typeof(colors)=='undefined')return;
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


    /*x=-1;
    polygonsord=[];
    polygonsord2=[];


    i2=0;
    while(polygons.length>i2){

        polygonsord[i2]=[]
        polygonsord2[i2]=[]


        i3=0;
        while(polygons[i2][i3]){


             if(polygons[i2][polygons[i2].length-1]!=polygons[i2][i3])
                 if(typeof(points[polygons[i2][i3]-1])!='undefined')
                    polygonsord2[i2][i3]=(points[polygons[i2][i3]-1][0]*0.5)+(points[polygons[i2][i3]-1][1]*0.5)+(points[polygons[i2][i3]-1][2]*1.11);


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
    }*/


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

        ctx.moveTo(tmppoints[0]+x_begin, tmppoints[1]+y_begin);

        i=2;
        while(i<tmppoints.length){

            ctx.lineTo(tmppoints[i]+x_begin,tmppoints[i+1]+y_begin);

            i=i+2;
        }

        ctx.closePath();
        ctx.fill();

        //------------------------

    i2++;
    }


}
