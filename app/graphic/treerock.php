<?php
/**

    ████████╗██████╗ ███████╗███████╗██████╗  ██████╗  ██████╗██╗  ██╗
    ╚══██╔══╝██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝
       ██║   ██████╔╝█████╗  █████╗  ██████╔╝██║   ██║██║     █████╔╝
       ██║   ██╔══██╗██╔══╝  ██╔══╝  ██╔══██╗██║   ██║██║     ██╔═██╗
       ██║   ██║  ██║███████╗███████╗██║  ██║╚██████╔╝╚██████╗██║  ██╗
       ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
    © Towns.cz

 * @fileOverview Functions for rendring trees and rocks

 */


//======================================================================================================================


require_once('files.lib.php');
require_once('graphic.lib.php');
require_once('init.php');



//----------------------------------------------------------------------------------------------------------------------


$type=$_GET['type'];
$seed=$_GET['seed'];
$width=$_GET['width'];

if(isset($_GET['dark'])){
    $dark=$_GET['dark'];
}else{
    $dark=0;
}



$file='../../media/image/'.$type.'/'.$seed.'.png';

//--------------------------------------------------------------------------------------

$cachefile=files\cacheFile(array($seed,$width,$dark),'png',$type);
if(!file_exists($cachefile) /** or 1/**/) {
    //_________________________________________

    $src = imagecreatefrompng($file);
    $dest = graphic\imgresizew($src, $width);

    if($dark){
        imagefilter($dest, IMG_FILTER_BRIGHTNESS, -$dark);
        //imagefilter($dest, IMG_FILTER_CONTRAST, -30);
    }




    imagesavealpha($dest, true);
    imagepng($dest,$cachefile);

    //_________________________________________
}


header('Content-Type: image/png');
readfile($cachefile);


