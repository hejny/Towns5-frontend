<?php
/**
 * @author ©Towns.cz
 * @fileOverview Functions for rendring trees and rocks
 */
//======================================================================================================================



require_once(__DIR__.'/files.lib.php');
require_once(__DIR__.'/graphic.lib.php');
require_once(__DIR__.'/init.php');



//----------------------------------------------------------------------------------------------------------------------


$width=intval($_GET['width']);//todo security to all files
$file=__DIR__.'/../../'.$_GET['file'];//todo security to all files
$pathinfo=pathinfo($file);
$extension=$pathinfo['extension'];


//--------------------------------------------------------------------------------------

$cachefile=files\cacheFile($file,$extension,$width,'image');
if(!file_exists($cachefile) or isset($_GET['notmp']) or filesize($cachefile)<10 /** or 1/**/) {
    //_________________________________________

    $src = imagecreatefromstring(file_get_contents($file));
    $dest = graphic\imgresizew($src, $width);



    imagesavealpha($dest, true);
    imagepng($dest,$cachefile);

    //_________________________________________
}


header("Cache-Control: max-age=".(3600*24*100));
header('Content-Type: image/'.$extension);
readfile($cachefile);


