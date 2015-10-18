<?php

require_once('files.lib.php');
require_once('graphic.lib.php');
require_once('init.php');



//----------------------------------------------------------------------------------------------------------------------


$type=$_GET['type'];
$seed=$_GET['seed'];
$width=$_GET['width'];


$file='../../media/image/'.$type.'/'.$seed.'.png';

//--------------------------------------------------------------------------------------

$cachefile=files\cacheFile(array($seed,$width),'png',$type);
if(!file_exists($cachefile) /** or 1/**/) {
    //_________________________________________

    $src = imagecreatefrompng($file);
    $dest = graphic\imgresizew($src, $width);



    imagesavealpha($dest, true);
    imagepng($dest,$cachefile);

    //_________________________________________
}


header('Content-Type: image/png');
readfile($cachefile);


