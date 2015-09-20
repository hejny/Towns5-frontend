

var mapdata=[];


//var maxlevel=130;
//var maxlevel=180*;
//var maxlevel=400;



/*
@return integer
*/
function getZ(x,y){

	//var z=(x/y)*50;

	if(x+y<0){
		x=-x;
		y=-y;
	}



	var n=0;


    n+=Math.round(Math.pow(Math.pow(x,2)+Math.pow(y,2),1.1))%3;
    n+=Math.round(Math.pow(Math.pow(x+y,2)+Math.pow(x,2),(1/1.6))/16)%2;

    //n+=Math.round(Math.pow(Math.pow(x,3)+Math.pow(y,3),(1/3)))%4;
	//n+=Math.round(Math.pow(Math.pow(x,2)+Math.pow(y,2),1.1))%3;

	return(n);

}




function getPrimeMap(startX,startY,size){

	var map=[];

	for(var y=startY;y<=startY+size;y++){
	
		map[y-startY]=[];

		for(var x=startX;x<=startX+size;x++){

			//console.log(x+','+y);
			map[y-startY][x-startX]=getZ(x,y);

		}
	}
	return(map);

}




function roundMap(map,z_/*change*/){

	var map_=[];

	for(var y=0;y<map.length;y++){
		map_[y]=[];
		for(var x=0;x<map.length;x++){
			map_[y][x]=1;
		}
	}

   /* r(map_[100][100]);
    r(map_[100]);
    r(map_);*/


    //return;

	for(var y=0;y<map.length;y++){/*todo optimize*/
		for(var x=0;x<map.length;x++){

			var z=map[y][x]*1;
            //r(z);
            //var z_=Math.floor(z);

			for(var y_=y-z_;y_<y+z_;y_++){
				for(var x_=x-z_;x_<x+z_;x_++){

					if(x_<0)break;
					if(y_<0)break;
					if(x_>=map.length)break;
					if(y_>=map.length)break;

					//if(Math.pow(x-x_,2)+Math.pow(y-y_,2)<z*z)break;
					//console.log(y_);


                    map_[y_][x_]+=z;
					//map_[y_][x_]+=Math.round(100*z/maxlevel)/100;//Math.sqrt(Math.pow(x-x_,2)+Math.pow(y-y_,2));
				}
			}

            //r(map_[y][x]);
			
			
		}
	}



	return(map_);

}


function boundMap(map,min,max){

    for(var y=0;y<map.length;y++){
        for(var x=0;x<map.length;x++){
            map[y][x]=Math.round((map[y][x]-min)/(max-min)*100)/100;
        }
    }
    return(map);
}


/*function statMap(map){

	var maxi=1;
	var stat=[];

	for(var y=0;y<map.length;y++){
		for(var x=0;x<map.length;x++){

			var i=map[y][x];

			if(i>maxi)maxi=i;

			if(typeof stat[i]=='undefined')stat[i]=0;

			stat[i]++;
		}
	}

	//console.log(stat);
	return(maxi);

}*/


function terrainMap(map){

	//console.log(map);
	//var maxlevel=statMap(map);
	//alert(statMap(map));

    var map_bg=[];

	for(var y=0;y<map.length;y++){
        map_bg[y]=[];
		for(var x=0;x<map.length;x++){

			var level=map[y][x]*100;

			var terrain=0;

			var ti=0;
			while(terrains[ti]){
				
				if(terrains[ti][1]>level){
					terrain=terrains[ti][0];
					break;
				}
				ti++;
			}


            map_bg[y][x]=terrain;
		}
	}

	return(map_bg);

}




function getMap(startX,startY,size){


	//console.log('getMap');

	//if(map==[])return[[],[]];
	var bounds=4;

	map=getPrimeMap(startX-bounds,startY-bounds,size+(2*bounds));
	map=roundMap(map,bounds);
	map=boundMap(map,80,120);


	
	var map_z=[];

	for(var y=0;y<size;y++){
		map_z[y]=[];
		for(var x=0;x<size;x++){

            if(Math.pow(x-(size/2),2)+Math.pow(y-(size/2),2)<=Math.pow(size/2,2)){

                map_z[y][x]=map[y+bounds][x+bounds+2/*@todo proc*/];

            }else{

                map_z[y][x]=-1;

            }






		}
	}
	//delete map;

	var map_bg=terrainMap(map_z);
	return([map_z,map_bg]);
}


var terrains=[	
	[ 0 , -1 , '000000'] ,  //temnota
	[ 1 , 0 , '5299F9'] ,  //moře
	[ 1 , 20 , '5299F9'] ,  //moře
	//[ 1 , 999 , '5299F9'] ,  //moře
	[11 , 23 , '337EFA'] ,  //řeka
	[ 4 , 26 , 'F9F98D'] ,  //písek
	//[ 7 , 22 , 'DCDCAC'] ,  //sůl
	[ 9 , 30 , '51F311'] ,  //tráva(toxic)
	[12 , 34 , '8ABC02'] ,  //tráva(jaro)
	[ 8 , 53 , '2A7302'] ,  //tráva(normal)
    [10 , 60 , '535805'] ,  //les
	[13 , 70 , '8A9002'] ,  //tráva(pozim)
	[ 5 , 100 , '878787']   //kamení




	/*[10 , 40 , '535805'] ,  //les
	[ 6 , 41 , '5A2F00'] ,  //hlína
	[ 2 , 42 , '545454'] ,  //dlažba
	[ 5 , 70 , '878787'] ,  //kamení
	[ 3 , 80 , 'EFF7FB'] ,  //sníh/led
	[ 5 , 93 , '878787'] ,  //kamení
	[ 2 , 96 , '545454'] ,  //dlažba
    [ 5 , 1000 , '878787'] ,  //kamení
	//[ 0 , 100 , '000000'] ,  //temnota*/


];

function terrainColor(terrain){
	var ti=0;
	while(terrains[ti]){
		if(terrains[ti][0]==terrain){
			return('#'+terrains[ti][2]);
		}
		ti++;
	}

    
}

/*function renderMap(startX,startY,size){

	var html='<table cellpadding="0" cellspacing="0">';


	for(var y=startY;y<=startY+size;y++){

		//console.log(y);	

		html+='<tr>';
		for(var x=startX;x<=startX+size;x++){

			//console.log(x+','+y);
			var z=getZ(x,y);
			//z=Math.round(z);

			//html+='<td>'+z+'</td>';

			if(z>0)
				html+='<td width="4" height="4" bgcolor="000000"></td>';
			else
				html+='<td width="4" height="4" bgcolor="3366ff"></td>';

		}
		html+='</tr>';
	}


	
	html+='</table>';
	//console.log(html);	

	return(html);
}*/

//console.log(renderMap(1,1,5));


