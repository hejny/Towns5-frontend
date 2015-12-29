<?php
/**
 * @author ©Towns.cz
 * @fileOverview Functions for file operations
 */
//======================================================================================================================




namespace files;



//----------------------------------------------------------------------------------------------------------------------


function createDir($dir){

    if(!file_exists($dir)){
        mkdir($dir);
        chmod($dir,0777);

    }


}

//----------------------------------------------------------------------------------------------------------------------



function cacheFile($file,$ext=imgext,$cpath='main'){

    $cache='../../cache';

    if($cpath)$cpath='/'.$cpath;

    if(is_array($file)){$file=serialize($file);}

    $md5=md5($file.$ext.$cpath);

    list($a,$b,$c)=str_split($md5,2);

    createDir($cache);
    if($cpath)createDir("$cache/$cpath");


    createDir("$cache/$cpath/$a");
    createDir("$cache/$cpath/$a/$b");


    $filename=("$cache/$cpath/$a/$b/$c.$ext");


    return($filename);
}






//----------------------------------------------------------------------------------------------------------------------


