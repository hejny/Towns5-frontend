<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

//todo security

$url=$_GET['url'];
if(substr($url,0,7)=='http://' || substr($url,0,8)=='https://'){

    readfile($url);


}else{

    echo('wrong url!');

}




?>