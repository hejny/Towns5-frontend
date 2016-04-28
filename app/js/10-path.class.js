/**
 * @author ©Towns.cz
 * @fileOverview Creates Class T.Path
 */
//======================================================================================================================


T.Path = class {


    /**
     * @param {object} Position start
     * @param {object} Position end
     * @param {number} speed in parcel/s
     * @param {array} map collision
     * @param {object} Position map_topleft center of collision map
     * @constructor
     */
    constructor(start, end, speed, map, map_topleft) {

        r(start, end, map_topleft);

        this.positions = [];

        //--------------


        if (map[Math.round(end.y) - map_topleft.y][Math.round(end.x) - map_topleft.x] == false) {

            throw 'Wrong Destination';//todo throw real Errors not strings
        }


        //--------------

        T.ArrayFunctions.iterate2D(map, function (y, x) {
            if (map[y][x] != false)
                map[y][x] = true;
        });


        //--------------

        map[Math.round(start.y) - map_topleft.y][Math.round(start.x) - map_topleft.x] = 0;


        var finished = false;
        for (var limit = 0; limit < 100 && !finished; limit++) {


            T.ArrayFunctions.iterate2D(map, function (y, x) {

                if (typeof map[y][x] == 'number' && map[y][x] >= 0) {

                    for (var yNext = y - 1; yNext <= y + 1; yNext++) {
                        for (var xNext = x - 1; xNext <= x + 1; xNext++) {

                            //r(xNext-x,yNext-y,map[yNext][xNext]);

                            if (map[yNext][xNext] == true || limit < 2)
                                if (xNext == x ? yNext != y : yNext == y)
                                    if (!(xNext == x && yNext == y))
                                        if (xNext >= 0)
                                            if (yNext >= 0)
                                                if (xNext < (map_radius * 2))/*todo is it OK to use (map_radius*2)???*/
                                                    if (yNext < (map_radius * 2)) {

                                                        var distance = T.Math.xy2dist(yNext - y, xNext - x);
                                                        //r(distance,map[y][x] - Math.abs(map[yNext][xNext]),limit);
                                                        if ((map[yNext][xNext] == true || limit < 2) /*&& map[y][x] - Math.abs(map[yNext][xNext])>distance*/) {

                                                            //r('OK');
                                                            map[yNext][xNext] = -(map[y][x] + /*map[yNext][xNext]*/distance);
                                                            //r(map[yNext][xNext],map[y][x] + map[yNext][xNext]);
                                                        }
                                                    }


                        }
                    }


                }


            });

            T.ArrayFunctions.iterate2D(map, function (y, x) {
                if (typeof map[y][x] == 'number')
                    map[y][x] = Math.abs(map[y][x]);
            });


            //r(map[Math.round(end.y)-map_topleft.y][Math.round(end.x)-map_topleft.x]);
            if (typeof map[Math.round(end.y) - map_topleft.y][Math.round(end.x) - map_topleft.x] == 'number') {
                finished = true;
            }

        }

        //--------------

        //mapWindow(map);

        if (!finished) {
            throw 'Cant find path';
        }

        //--------------


        var finished = false;
        var x = Math.round(end.x) - map_topleft.x,
            y = Math.round(end.y) - map_topleft.y;


        for (var limit = 0; limit < 20 && !finished; limit++) {

            if (limit !== 0)
                this.positions.push(new T.Position(x + map_topleft.x, y + map_topleft.y));

            var distance = 0,
                xNext = false,
                yNext = false;

            for (var yTest = y - 1; yTest <= y + 1; yTest++) {
                for (var xTest = x - 1; xTest <= x + 1; xTest++) {


                    //r(xTest-x,yTest-y);

                    if (xTest != x || yNext != y)
                        if (xTest >= 0)
                            if (yTest >= 0)
                                if (xTest < (map_radius * 2))/*todo is it OK to use (map_radius*2)???*/
                                    if (yTest < (map_radius * 2))
                                        if (typeof map[yTest][xTest] == 'number') {

                                            //r(map[y][x] - map[yTest][xTest]);
                                            if (map[y][x] - map[yTest][xTest] >= distance) {

                                                distance = map[y][x] - map[yTest][xTest];
                                                xNext = xTest;
                                                yNext = yTest;

                                            }


                                        }

                }
            }

            if (xNext == false || yNext == false)r('Error in path', xNext, yNext);

            //r(xNext-x,yNext-y,distance);
            //ewrgfd;

            x = xNext;
            y = yNext;

            if (x == Math.round(start.x) - map_topleft.x && y == Math.round(start.y) - map_topleft.y) {
                finished = true;
            }


        }

        //--------------

        this.positions.push(start);
        this.positions.reverse();
        this.positions.push(end);

        //r(this.positions);

        //------------------------------------------

        this.times = [new Date()];
        var ms = this.times[0].getTime();

        for (var i = 1, l = this.positions.length; i < l; i++) {

            var distance = T.Math.xy2dist(this.positions[i].x - this.positions[i - 1].x, this.positions[i].y - this.positions[i - 1].y);

            ms += Math.round(distance * 1000 / speed);

            this.times.push(new Date(ms));


        }


    };


//----------------------------------------------------------

    /**
     * @return {object} Position current
     */
    recount() {


        var actualDate = new Date();
        var actualMs = actualDate.getTime();


        for (var i = 0, l = this.times.length - 1; i < l; i++) {


            var chunkStartMs = this.times[i].getTime();
            var chunkStopMs = this.times[i + 1].getTime();

            if (actualMs >= chunkStartMs && actualMs < chunkStopMs) {

                var chunkProgress = (actualMs - chunkStartMs) / (chunkStopMs - chunkStartMs);

                var chunkXDelta = this.positions[i + 1].x - this.positions[i].x;
                var chunkYDelta = this.positions[i + 1].y - this.positions[i].y;

                return (new T.Position(this.positions[i].x + (chunkXDelta * chunkProgress), this.positions[i].y + (chunkYDelta * chunkProgress)));


            }


        }

        return (false);

    };

//----------------------------------------------------------

    /**
     *
     * @return {number} current rotation in degrees
     */
    rotation() {


        var actualDate = new Date();
        var actualMs = actualDate.getTime();


        for (var i = 0, l = this.times.length - 1; i < l; i++) {


            var chunkStartMs = this.times[i].getTime();
            var chunkStopMs = this.times[i + 1].getTime();

            if (actualMs >= chunkStartMs && actualMs < chunkStopMs) {

                var chunkXDelta = this.positions[i + 1].x - this.positions[i].x;
                var chunkYDelta = this.positions[i + 1].y - this.positions[i].y;

                var chunkDistDeg = T.T.Math.xy2distDeg(chunkYDelta, chunkXDelta);
                return (chunkDistDeg.deg + 90);


            }


        }

        return (false);

    };


//----------------------------------------------------------

    /**
     * @return {boolean} is this in progress = true, finished or not yet started=false
     */
    inProgress() {

        var stopMs = this.times[this.times.length - 1];

        var actualDate = new Date();
        var actualMs = actualDate.getTime();

        return (actualMs < stopMs);

    };


//----------------------------------------------------------


    /**
     * @static
     * @param {object} T.Path
     * @return {boolean} true = inserted object is path and it is in progress
     */
    static is(path) {


        if (!is(path)) return false;
        if (!is(path.inProgress)) return false;
        if (!path.inProgress()) return false;

        return true;

    };

};