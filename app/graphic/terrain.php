<?php

require_once('files.lib.php');
require_once('init.php');


//----------------------------------------------------------------------------------------------------------------------


error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_WARNING );
ini_set("register_globals","off");
ini_set("display_errors","on");

//----------------------------------------------------------------------------------------------------------------------

define("gr",1.62);


define("height",212);//výška html bloku
//---------------------------
define("grid",0);
define("t_brdcc",0.3);//počet kuliček
define("t_brdca",2);//6;//min radius kule
define("t_brdcb",10);//8;//max radius kule
define("t_brdcr",gr);//8;//poměr šířka/výška kule
define("t_pofb",1);//přesah okrajů


//---------------------------

define("border",(1+(2*t_pofb)));


$size=intval($_GET['size']);
if(!$size)$size=160;

define("t_size",$size/border);

//----------------------------------------------------------------------------------------------------------------------





$terrain=$_GET['terrain'];
$file="../../media/image/terrain/$terrain.png";

if(!file_exists($file)){
    die('{error: \'No terrain!\'}');
}

$seed=intval($_GET['seed']);

$seed=abs($seed);
$seed=($seed%10)+1;

srand($seed);




//$ease=floatval($_GET['ease']);
//if(!$ease)$ease=1;


if(false){

}elseif($terrain=='t1' or $terrain=='t11') {
    $ease = 0.9;
}elseif($terrain=='t4'){
    $ease = 0.6;
}else{
    $ease=pow($seed,(1/3));
}

//$ease=0.3;


//----------------------------------------------------------------------------------------------------------------------



$cachefile=files\cacheFile(array(1,$ease,$seed,$terrain,$size),'png','terrain');
if(!file_exists($cachefile)) {
    //_________________________________________

    $source = imagecreatefrompng($file);


    $maxx = imagesx($source) - (t_size * border);
    $maxy = imagesy($source) - (t_size * 2 * border);

    //die($maxx.','.$maxy);


    $xt = rand(0, $maxx);
    $yt = rand(0, $maxy);

    //die($xt.','.$yt);


    $terrain = imagecreatetruecolor(t_size * border, t_size * border /* 2*/);
    $terrain2 = imagecreatetruecolor(t_size * border, t_size * 2 * border);

    //----------------------------------------------------------------

    imagealphablending($terrain, false);

    $alpha = imagecolorallocatealpha($terrain, 0, 0, 0, 127);
    imagefill($terrain, 0, 0, $alpha);


    imagecopy($terrain2, $source, 0, 0, $xt, $yt, t_size * border, t_size * 2 * border);


    //----------------------------------------------------------------


    $sourceSize = imagesx($terrain2);
    $sourceSize2 = $sourceSize / 2;

    for ($i = 1; t_brdcc * $sourceSize * $sourceSize > $i; $i++) {

        $ytmp = rand(0, $sourceSize - 1);
        $xtmp = rand(0, $sourceSize - 1);

        $dist = pow(pow(abs($sourceSize2 - $ytmp), 2) + pow(abs($sourceSize2 - $xtmp), 2), 1 / 2);
        $alpha = $dist / ($sourceSize2 * 1);
        if ($alpha > 1) {
            $alpha = 1;
        }


        $radiusx = rand(t_brdca, t_brdcb);
        $radiusy = rand(t_brdca, t_brdcb);


        $rgb = imagecolorat($terrain2, round($xtmp), round($ytmp*2));
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;
        $a = intval((1 - (1 - $alpha) * $ease) * 127);
        if ($a < 1) $a = 1;
        if ($a > 127) $a = 127;
        $alpha = imagecolorallocatealpha($terrain, $r, $g, $b, $a);
        //imagesetpixel($terrain,$xtmp,$ytmp,$alpha);
        imagefilledellipse($terrain, $xtmp, $ytmp /* 2*/, $radiusx, $radiusy / t_brdcr, $alpha);
        //imagefilledellipse($terrain,$xtmp,$ytmp,$radiusx,$radiusy,$alpha);

    }


    //--------------------------Output
    imagedestroy($terrain2);
    imagedestroy($source);
    imagesavealpha($terrain, true);


    imagepng($terrain,$cachefile);


    //_________________________________________
}


header('Content-Type: image/png');
readfile($cachefile);





?>