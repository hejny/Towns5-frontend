//todo headers


//todo maybe move to vals
var fps=0;
var time=0;

var map_bg =false;
var map_ctx =false;

var map_buffer =false;
var map_buffer_ctx =false;






$(function() {

    map_bg = document.getElementById('map_bg');
    map_ctx = map_bg.getContext('2d');

    map_buffer = document.getElementById('map_buffer');
    map_buffer_ctx = map_buffer.getContext('2d');


    //-------window size

    canvasResize();


});