<?php
//todo headers



header('Content-Type: application/json');
error_reporting(0);

$_POST['email'];
$_POST['text'];


$from='feedback@towns.cz';
$to='ph@towns.cz';
$subject='New feedback';
$text='From:  '.$_POST['email']."\r\nText:".$_POST['text'];


if(

    file_put_contents('../../messages/'.date('l jS \of F Y h:i:s A').'.txt',$text)

    or

    mail($to,$subject,$text,'From: '.$from)

){

    echo(json_encode(array('ok'=>true)));

}else{
    echo(json_encode(array('error'=>true)));

}


