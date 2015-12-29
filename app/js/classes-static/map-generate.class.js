/**
 * @author ©Towns.cz
 * @fileOverview Creates object MapGenerator with static methods
 */
//======================================================================================================================


var MapGenerator={};


MapGenerator.getZ = function(x,y){

	//var z=(x/y)*50;

	if(x+y<0){
		x=-x;
		y=-y;
	}



	var n= 0,
        max_possible_n=0;


    for(var i= 0;i<13;i++){


        n+=Math.round(Math.pow(Math.pow(x,2)+Math.pow(y,2),1.1))%3;
        max_possible_n+=2;

        x=Math.floor(x/1.5);
        y=Math.floor(y/1.5);

        var xy = Math.xyRotate(x,y,57);

        x=xy.x;
        y=xy.y;

    }



    n=n/max_possible_n;



    n=n-0.5;
    var sign=Math.sign(n);
    n=Math.abs(n)*2;
    n=Math.pow(n,1/3);
    n=(n/2*sign)+0.5;


    //n+=Math.round(Math.pow(Math.pow(x,3)+Math.pow(y,3),(1/3)))%4;
	//n+=Math.round(Math.pow(Math.pow(x,2)+Math.pow(y,2),1.1))%3;

	return(n);

};

//======================================================================================================================loadMap


MapGenerator.getZMap = function(startX,startY,size){

    //r(size,startY,startX);
	var map=[];

	for(var y=startY;y<=startY+size;y++){
	
		map[y-startY]=[];

		for(var x=startX;x<=startX+size;x++){

			//console.log(x+','+y);
			map[y-startY][x-startX]=MapGenerator.getZ(x,y);

		}
	}

    //r(map);
	return(map);

};

//======================================================================================================================loadMap



MapGenerator.blurMap = function(map,blur/*change*/){

    //r(blur,Math.pow(blur*2+1,2));

	var map_=[];

	for(var y= 0,l=map.length;y<l;y++){
		map_[y]=[];
		for(var x=0;x<l;x++){
			map_[y][x]=0;
		}
	}




	for(var y=0;y<l;y++){
		for(var x=0;x<l;x++){

			var z=map[y][x]/Math.pow(blur*2+1,2);//todo optimalizovat

			for(var y_=y-blur;y_<=y+blur;y_++){
				for(var x_=x-blur;x_<=x+blur;x_++){

					if(x_<0)break;
					if(y_<0)break;
					if(x_>=map.length)break;
					if(y_>=map.length)break;

                    map_[y_][x_]+=z;
				}
			}
			
		}
	}



	return(map_);

};


//======================================================================================================================loadMap


MapGenerator.terrainMap = function(map){

    var map_bg=[];

	for(var y=0,l=map.length;y<l;y++){
        map_bg[y]=[];
		for(var x=0;x<l;x++){

			var level=map[y][x]*100;

			var terrain=0;

			var ti=0;
			while(MapGenerator.terrains[ti]){
				
				if(MapGenerator.terrains[ti][1]>level){
					terrain=MapGenerator.terrains[ti][0];
					break;
				}
				ti++;
			}


            map_bg[y][x]=terrain;
		}
	}

	return(map_bg);

};

//======================================================================================================================loadMap



MapGenerator.getMap = function(startX,startY,size,onlyRound){

    onlyRound=cParam(onlyRound,true);

	var bounds=1;

	map=MapGenerator.getZMap(startX-bounds,startY-bounds,size+(2*bounds));
    //r(map);
	map=MapGenerator.blurMap(map,bounds);//r(map);
    //r(map);
	
	var map_z=[];

	for(var y=0;y<size;y++){
		map_z[y]=[];
		for(var x=0;x<size;x++){

            if(Math.pow(x-(size/2),2)+Math.pow(y-(size/2),2)<=Math.pow(size/2,2) || !onlyRound){


				//r(map,y+bounds);
                map_z[y][x]=map[y+bounds][x+bounds+2/*@todo proc*/];

            }else{

                map_z[y][x]=-1;

            }



		}
	}
	//delete map;

	var map_bg=MapGenerator.terrainMap(map_z);
	return([map_z,map_bg]);
};


//======================================================================================================================loadMap

MapGenerator.terrainColor = function(terrain){
	var ti=0;
	while(MapGenerator.terrains[ti]){
		if(MapGenerator.terrains[ti][0]==terrain){
			return('#'+MapGenerator.terrains[ti][2]);
		}
		ti++;
	}


};


//======================================================================================================================loadMap



//todo Biotopes

MapGenerator.terrains=[
	[ 0 , -1 , '000000'] ,  //temnota
    [ 5 , 5 , '878787'],   //kamení
    [ 8 , 10 , '2A7302'] ,  //tráva(normal)
    [ 9 , 12 , '51F311'] ,  //tráva(toxic)
    [ 4 , 14 , 'F9F98D'] ,  //písek
	[11 , 37 , '337EFA'] ,  //řeka
	[ 4 , 40 , 'F9F98D'] ,  //písek
	[ 9 , 47 , '51F311'] ,  //tráva(toxic)
	[12 , 55 , '8ABC02'] ,  //tráva(jaro)
    [ 8 , 57 , '2A7302'] ,  //tráva(normal)
    [10 , 58 , '535805'] ,  //les
	[ 8 , 62 , '2A7302'] ,  //tráva(normal)
    [10 , 68 , '535805'] ,  //les
	[13 , 80 , '8A9002'] ,  //tráva(pozim)
    [ 6 , 82 , '5A2F00'] ,  //hlína
	[ 5 , 85 , '878787'],   //kamení
    [ 3 , 93 , 'EFF7FB'],   //sníh/led
    [12 , 100 , '8ABC02'] ,  //tráva(jaro)


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

