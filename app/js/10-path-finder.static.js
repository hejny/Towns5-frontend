



T.PathFinder = function(position_start,position_end,objects,map_center,map_radius){


    //--------------

    if (position_start.getDistance(map_center)>map_radius){
        throw new Error('T.PathFinder: position_start out of range');
    }
    if (position_end.getDistance(map_center)>map_radius){
        throw new Error('T.PathFinder: position_end out of range');
    }

    //--------------



    var map = objects.getMapOfCollisions(map_center, map_radius);


    var position_start_=position_start.clone().minus(map_center).getFloored();
    var position_end_=position_end.clone().minus(map_center).getFloored();


    position_start_.x+=map_radius;
    position_start_.y+=map_radius;
    position_end_.x+=map_radius;
    position_end_.y+=map_radius;


    //mapWindow(map);



    //--------------
    //r(map,position_end_,map[position_end_.y][position_end_.x]);
    if(map[position_start_.y][position_start_.x] === 1){
        throw new Error('Object is blocked');
    }
    if(map[position_end_.y][position_end_.x] === 1){
        throw new Error('Destination is blocked');
    }
    //--------------





    var grid = new PF.Grid(map.length, map.length, map);
    /*r(grid);
    /*r(typeof map);
    var grid = new PF.Grid(map);
    r(grid);*/

    var finder = new PF.AStarFinder({
        allowDiagonal: true,
        dontCrossCorners: true
    });
    var path_ = finder.findPath(
        position_start_.x,
        position_start_.y,
        position_end_.x ,
        position_end_.y,
        grid
    );


    //r(position_start_,position_end_);

    //r(path_);
    var positions=[];

    path_.forEach(function(position_){

        positions.push(new T.Position(position_[0]+map_center.x-map_radius, position_[1]+map_center.y-map_radius));

    });

    positions.shift();
    positions[positions.length-1]=position_end;


    return(positions);



    /*
    //var distance,xNe
    // xt,next_y;
    //this.positions = [];



    map[position_start_.y][position_start_.x] = 0;


    //mapWindow(map);


    var pathfinder_flow = function (y, x) {

        if (typeof map[y][x] === 'number' && map[y][x] >= 0) {


            //r(x,y);

            for (var next_y = y - 1; next_y <= y + 1; next_y++) {

                if(typeof map[next_y] === 'undefined') break;

                for (var next_x = x - 1; next_x <= x + 1; next_x++) {


                    if(typeof map[next_y][next_x] === 'undefined') break;


                    if (map[next_y][next_x] === true || limit < 2)
                        if (next_x == x ? next_y != y : next_y == y)//todo maybe less wtf conds
                            if (!(next_x == x && next_y == y)) {//todo maybe less wtf conds



                                //r(distance,map[y][x] - Math.abs(map[next_y][next_x]),limit);
                                if ((map[next_y][next_x] === true || limit < 2)) {


                                    map[next_y][next_x] = map[y][x] +T.Math.xy2dist(next_y - y, next_x - x);
                                    map[next_y][next_x] *= -1;

                                }
                            }


                }
            }


        }


    };

    var pathfinder_positive = function (y, x) {
        if (typeof map[y][x] === 'number')
            map[y][x] = Math.abs(map[y][x]);
    };
    

    var finished = false;
    for (var limit = 0; limit < 200 && !finished; limit++) {


        T.ArrayFunctions.iterate2D(map, pathfinder_flow);
        T.ArrayFunctions.iterate2D(map, pathfinder_positive);

        
        if (typeof map[position_end_.y][position_end_.x] == 'number') {
            finished = true;
        }

    }

    //--------------

    //mapWindow(map);

    if (!finished) {
        throw new Error('Cant find path');
    }

    //--------------


    var positions = [];

    finished = false;
    var x = position_end_.x,
        y = position_end_.y;



    var next_x,next_y,test_x,test_y;


    for (limit = 0; limit < 20 && !finished; limit++) {

        if (limit !== 0){
            positions.push(new T.Position(x+map_center.x-map_radius, y+map_center.y-map_radius));
        }

        distance = 0;
        next_x = false;
        next_y = false;

        for (test_y = y - 1; test_y <= y + 1; test_y++) {
            for (test_x = x - 1; test_x <= x + 1; test_x++) {


                //r(test_x-x,test_y-y);

                if (test_x != x || test_y != y) {
                    if (typeof map[test_y][test_x] === 'number') {

                        distance = map[y][x] - map[test_y][test_x];

                        if (map[y][x] - map[test_y][test_x] >= distance) {

                            next_x = test_x;
                            next_y = test_y;

                        }


                    }
                }

            }
        }


        if (next_x === false || next_y === false){
            throw new Error('Error in path', next_x, next_y);
        }


        x = next_x;
        y = next_y;

        if (x == position_start_.x && y == position_start_.y) {
            finished = true;
        }


    }

    //--------------

    //positions.push(start);
    positions.reverse();
    //positions.push(position_end);


    //------------------------------------------



    positions.forEach(function(position){
        var position_ = position.clone().minus(map_center).getFloored();
        map[position_.y+map_radius][position_.x+map_radius] = -1;
    });



    mapWindow(map);
    //r(positions);



    return(positions);

    */
};