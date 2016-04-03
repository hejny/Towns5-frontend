<?php
//todo headers

header('Content-Type: application/json');


//error_reporting(E_ALL);
error_reporting(0);

$email=$_POST['email'];
$text=$_POST['text'];


$from='feedback@towns.cz';
$to='ph@towns.cz';
$subject='New feedback';
$text='From:  '.$email."\r\nText:".$text;


$status=array();

$status['file']=file_put_contents('../../messages/'.date('l jS \of F Y h:i:s A').'.txt',$text);
$status['mail']=mail($to,$subject,$text/*,'From: '.$from*/);



echo(json_encode($status));

