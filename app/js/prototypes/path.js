/**

 ██████╗  █████╗ ████████╗██╗  ██╗
 ██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
 ██████╔╝███████║   ██║   ███████║
 ██╔═══╝ ██╔══██║   ██║   ██╔══██║
 ██║     ██║  ██║   ██║   ██║  ██║
 ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
 © Towns.cz

 * @fileOverview Path class - list of positions and start - end time

 */


//======================================================================================================================


var Path = function (start, end, speed) {


    this.path=[];
    this.path.push(start);
    this.path.push(end);


    this.startDate=new Date();


    var ms = this.startDate.getTime();
    ms+=Math.round(1000/speed);

    this.stopDate=new Date(ms);

};


//----------------------------------------------------------


Path.prototype.recount = function(){

    var startMs=this.startDate.getTime();
    var stopMs=this.stopDate.getTime();

    var actualDate=new Date();
    var actualMs=actualDate.getTime();


    var progress=(actualMs-startMs)/(stopMs-startMs);
    if(progress>1)progress=1;
    if(progress<0)progress=0;


    //var dist=Math.xy2dist(this.path[0].x-this.path[1].x,this.path[0].y-this.path[1].y);

    var xDelta=this.path[1].x-this.path[0].x;
    var yDelta=this.path[1].y-this.path[0].y;

    return(new Position(this.path[0].x+(xDelta*progress),this.path[0].y+(yDelta*progress)));

};


//----------------------------------------------------------


Path.prototype.inProgress = function(){

    //var startMs=this.startDate.getTime();
    var stopMs=this.stopDate.getTime();

    var actualDate=new Date();
    var actualMs=actualDate.getTime();


    return(/*actualMs>=startMs &&*/ actualMs<stopMs);

};


//----------------------------------------------------------



Path.is = function(path){


    if(!is(path)) return false;
    if(!is(path.inProgress)) return false;
    if(!path.inProgress()) return false;

    return true;

};