<?php
/**
 * @author ©Towns.cz
 * @fileOverview Advanced functions for php taken from Towns4
 */
//======================================================================================================================



//todo use path like require __DIR__ . '/neon/neon.php';

require_once(root.core."/func_vals.php");
require_once(root.core."/func_object.php");
require_once(root.core."/func_main.php");
require_once(root.core."/func_external.php");
require_once(root.core."/memory.php");


//=============================================================
//(4.5*6+5*6+4.5*6+3*2+5*7+1*2)/(6+6+6+2+7+2)
define("notmp", false);
//define("notmp", true);
if($_GET["output"]=="js"){
    define("noreport", true);
}else{
    define("noreport", false);
}
define("imgext", "jpg");
//$GLOBALS['ss']['useid']=$GLOBALS['ss']['useid'];
//$GLOBALS['ss']['logid']=$GLOBALS['ss']['logid'];
//======================================================================================================================Cache
function tmpfile2($file,$ext=imgext,$cpath="main"){
    if($cpath)$cpath="/".$cpath;
    $ext=".".$ext;
    if(is_array($file)){$file=serialize($file);}

    $md5=md5($file.$ext);
    $md52=md52($file.$ext);
    list($a,$b)=str_split($md5,2);
    $a=hexdec($a);
    $b=hexdec($b);
    mkdir2(root.cache);
    if($cpath)mkdir2(root.cache.$cpath);
    mkdir2(root.cache.$cpath."/$a");
    mkdir2(root.cache.$cpath."/$a/$b");
    $url=root.cache.$cpath."/$a/$b/$md52".$ext;
    //echo($url.'<br>');
    return($url);
}/**/
//--------------------------------------------
function cache($key,$value=false,$cpath='cachevals'){
    $file=tmpfile2($key,'txt',$cpath);
    if($value===false){
        if(file_exists($file)){
            return(unserialize(fgc($file)));
        }else{
            return(false);
        }
    }else{
        fpc($file,serialize($value));
    }
}
//--------------------------------------------
function cleartmp($id){
    /*error_reporting(E_ALL );
    $name="id_$id";
    r($name);
    $tmp=url.tmpfile2($name);
    r($tmp);
    //r(imageurl($name));
    //imge($name,"",100,100);
    r(file_exists("http://localhost/4/tmp/32/193/269388.jpg"));
    r(file_exists("tmp/32/193/269388.jpg"));
    r(file_exists("tmp/32/193"));
    r(glob("tmp/32/193/*"));
    r(file_exists($tmp));
    //unlink($tmp);*/
    unlink(tmpfile2("id_$id"));
    unlink(tmpfile2("id_$id"."_icon"));
}
//===============================================================================================================
if(!defined('mapsize')){

    if(!$mapsize=cache('mapsize')) {
        $mapsize1 = sql_1data('SELECT max(x) FROM [mpx]pos_obj WHERE `type`=\'terrain\' AND ww=\'' . $GLOBALS['ss']["ww"] . '\'');
        $mapsize2 = sql_1data('SELECT max(y) FROM [mpx]pos_obj WHERE `type`=\'terrain\' AND ww=\'' . $GLOBALS['ss']["ww"] . '\'');
        $mapsize1 = intval($mapsize1) + 1;
        $mapsize2 = intval($mapsize2) + 1;
        //echo("($mapsize1,$mapsize2)");
        if ($mapsize1 > $mapsize2) {
            $mapsize = $mapsize1;
        } else {
            $mapsize = $mapsize2;
        }
        cache('mapsize',$mapsize);
    }
    define('mapsize', $mapsize);
}
//===============================================================================================================
define('cookietime',time()+60*60*24*30*12);
/*if($GLOBALS['ss']["setcookie"] and array()!=$GLOBALS['ss']["setcookie"]){
    print_r($GLOBALS['ss']["setcookie"]);die();
    $t=time()+60*60*24*30;
    foreach($GLOBALS['ss']["setcookie"] as $a=>$b)
    setcookie($a,$b,$t);
}
$GLOBALS['ss']["setcookie"]=array();*/

//=============================================================
function changemap($x,$y,$files=false){
    //v total onMap verzi nemá smysl parametr $files -> nastavit na pevno na true
    //$files=true;
    
    if($files and $files!=2){

    
    
    //-------------------
    
    //r('changemap');
    //$gx=floor((($y-1)/-10)+(($x-1)/10));
    $gy=floor((($y-1)/10)+(($x-1)/10)-0.5);
    $gx_=round((($y-1)/-10)+(($x-1)/10));
    $gy_=round((($y-1)/10)+(($x-1)/10)-0.5);
    $gs=array(/*array($gx,$gy),array($gx_,$gy),*/array($gx,$gy_),array($gx_,$gy_));
    //r($gx.",".$gy.",".$gx_.",".$gy_);
    $x=round($x);
    $y=round($y);
    
    foreach($gs as $g){list($gx,$gy)=$g;
        //$x=($gy+$gx)*5+1;
        //s$y=($gy-$gx)*5+1;
        //2NOCACHE//$file=tmpfile2("map2,".size.",".zoom.",".$x.",".$y.",".w.",".gird.",".t_sofb.",".t_pofb.",".t_brdcc.",".t_brdca.",".t_brdcb.$GLOBALS['ss']["ww"],"png","map");e("<img src=\"$file\" width=\"100\"/>");/**/unlink2($file);
        //---      
        //r("outimgunits,".size.",".zoom.",".$gx.",".$gy.",".w.",".gird.",".t_sofb.",".t_pofb.",".t_brdcc.",".t_brdca.",".t_brdcb.','.$GLOBALS['ss']["ww"]);
        //$file=tmpfile2("outimgunits,".size.",".zoom.",".$gx.",".$gy.",".w.",".gird.",".t_sofb.",".t_pofb.",".t_brdcc.",".t_brdca.",".t_brdcb.','.$GLOBALS['ss']["ww"],"png","map");/*if(debug){e("<img src=\"$file\" width=\"200\"/>");}*/
        //r($gx,$gy);        
        //htmlmap($gx,$gy);

        //---
        //NOCACHE//$file=tmpfile2("output6,".root.",$gx,$gy,".$GLOBALS['ss']["ww"],"txt","map");unlink2($file);
    }
    }elseif($files==2){

 	    $x=round($x);
	    $y=round($y);
		 $gx1=floor((($y-1)/-10)+(($x-1)/10));
   		 $gy1=floor((($y-1)/10)+(($x-1)/10));
		 $gx2=ceil((($y-1)/-10)+(($x-1)/10));
   		 $gy2=ceil((($y-1)/10)+(($x-1)/10));
		 $gx3=ceil((($y-1)/-10)+(($x)/10));


	    $gs=array(array($gx1,$gy1),array($gx2,$gy1),array($gx3,$gy1),array($gx1,$gy2),array($gx2,$gy2),array($gx3,$gy2));
	   
	    
	    foreach($gs as $g){list($gx,$gy)=$g;
		
		//e("$gx,$gy");br();
		$file=htmlmap($gx,$gy,1);
		define('terrain_error',$file);  
		unlink2($file);


	    }

    }
    //sql_query("UPDATE `[mpx]map` SET  `hard` =  IF(`terrain`='t1' OR `terrain`='t11',1,0)+(SELECT SUM(`[mpx]pos_obj`. `hard`) FROM `[mpx]pos_obj` WHERE `[mpx]pos_obj`.`ww`=`[mpx]map`.`ww` AND  ROUND(`[mpx]pos_obj`.`x`)=`[mpx]map`.`x` AND ROUND(`[mpx]pos_obj`.`y`)=`[mpx]map`.`y`) WHERE `ww`=".$GLOBALS['ss']["ww"]." AND `x`=$x AND `y`=$y");
}
//------------------------

//Funkce HARD je zastaralá
/*function hard($rx,$ry,$w=false){
    if(!$w)$w=$GLOBALS['ss']["ww"];
    $hard1=sql_1data("SELECT IF(`terrain`='t1' OR `terrain`='t11',1,0) FROM `[mpx]map`  WHERE `[mpx]map`.`ww`=".$w." AND  `[mpx]map`.`x`=$rx AND `[mpx]map`.`y`=$ry");// WHERE `ww`=".$GLOBALS['ss']["ww"]." AND `x`=$x AND `y`=$y");
    $hard2=sql_1data("SELECT SUM(`[mpx]pos_obj`. `hard`) FROM `[mpx]pos_obj` WHERE `[mpx]pos_obj`.`ww`=".$w." AND  ROUND(`[mpx]pos_obj`.`x`)=$rx AND ROUND(`[mpx]pos_obj`.`y`)=$ry AND `own`!='".$GLOBALS['ss']['useid']."'");// WHERE `ww`=".$GLOBALS['ss']["ww"]." AND `x`=$x AND `y`=$y");
    $hard=floatval($hard1)+floatval($hard2);
    return($hard);
}*/
  
//======================================================================================
//CONFIG
if($_GET["w"]){
    $GLOBALS['get']=$GLOBALS['ss'][$_GET["w"]];
}
if($GLOBALS['get']){
    $GLOBALS['ss']["get"]=$GLOBALS['get'];
}
//print_r($GLOBALS['ss']["get"]);

function get($key){return($GLOBALS['ss']["get"][$key]);}
//$GLOBALS['ss']["getvars"]=array();
//---------------------------------------------------------
$post=$_POST;
//---------------------------------------------------------
function sg($value,$d=false){
global $$value;
if(!$GLOBALS['ss']['sg_'.$value])$GLOBALS['ss']['sg_'.$value]=$d;
if($GLOBALS['ss']["get"][$value]){
    $GLOBALS['ss']['sg_'.$value]=$GLOBALS['ss']["get"][$value];
}
if($_GET[$value]){
    $GLOBALS['ss']['sg_'.$value]=$_GET[$value];
}
if($GLOBALS['ss']["get"][$value]==="0"){
    $GLOBALS['ss']['sg_'.$value]=$d;
}
$$value=$GLOBALS['ss']['sg_'.$value];
return($GLOBALS['ss']['sg_'.$value]);
}
//---------------------------------------------------------
/*$i=0;foreach($md5 as $a){
$md5[$i]=hexdec($a);
$i++;}*/
function md52($text){
    $md5=md5($text);
    $md5=str_split($md5,4);
    $count=0;
    foreach($md5 as $a){
        $count=$count+hexdec($a);
    }
    return($count);
}
//---------------------------------------------------------
function md5t($text){
    $md5=md5($text);
    $md5=str_split($md5,4);
    $i=intval(hexdec($md5[0])/(256*256)*100000);
    //echo($i);
    $names=explode(",",$GLOBALS['config']["names"]);
    $i1=mod($i,count($names));
    $i=div($i,count($names));
    $i2=mod($i,count($names));
    $i=div($i,count($names));
    $i=$names[$i1].$names[$i2];//.dechex($i)
    return($i);
    //return($names[$i]);
}
//===================================================URSL, SUBPAGE, WINDOWS
function target($sub,$w="",$ee="",$q,$only=false,$rot="",$noi=false,$prompt='',$set='',$cache='',$jsa=''){
    //newwindow
    if($q)$q="&q=$q";
    if($w)$w="&w=$w";
    if($rot)$rot="&rot=$rot";
    if(!$ee)$ee=$sub;
    if($set)$set="&set=$set";
    if($prompt)$prompt="pokracovat = confirm('$prompt');if(pokracovat)";
    $apart=("w_open('$sub','$ee','$w$q$set');");
    //oldwindow

    $vi="
if(typeof event === 'undefined'){1;}else{
ion.sound.play('beer_can_opening');
\$('#loading').scss('display','block');
\$('#loading').scss('left',event.pageX-10);
\$('#loading').scss('top',event.pageY-10);
}
";
    $iv="\$('#loading').scss('display','none');";//ion.sound.play('bell_ring');
    if($jsa)$iv.=$jsa;
    
    
    if(!$noi){$inter="&i=$sub,$ee";}else{$inter="";}
    $bpart=("\$(function(){\$.get('?token=".$_GET['token']."&e=$ee$w$q$rot$inter$set', function(vystup){\$('#$sub').html(vystup);$iv});$vi});");
    if($cache){
        $bpart="if(ifcache('$cache')){ \$('#$sub').html(cache('$cache')); $bpart }else{ $bpart }";
        
        
    }
    //-------
    //return("if(getElementById('$sub')){alert(1);};");
    if(!$only and $sub!='map'){
        return($prompt."{if($('#$sub').html()){1;$bpart}else{1;$apart}}");
    }else{
	
	/*if($sub=='map'){
		$before='';
		$bpart
	}else{
		$before='';
	}*/
        return($prompt."{if($('#$sub').html()){1;$bpart}}");
    }
}
//---------------------------------------------------------
function subempty($sub,$html='',$style=''){
    if(!$html)$html=nbsp;
    echo('<span id="'.$sub.'" '.($style?'style="'.$style.'"':'').'>'.$html.'</span>');
}
//---------------------------------------------------------

function subpage($sub,$ee=""){
    if(!$ee)$ee=$sub;
    list($dir,$ee)=explode('-',$ee);
    if(!$ee){$ee=$dir;$dir='page';}
    $eval='echo("<span id=\"'.$sub.'\">");
    include(core."/'.$dir.'/'.$ee.'.php");
    echo("</span>");';
    return($eval);
    //? ><script><?php echo(target($sub)); ? ></script><?php
}
//---------------------------------------------------------
function aac(){
        ob_start();
        include(core.'/page/aac.php');
        $buffer = ob_get_contents();
        ob_end_clean();
	//e($buffer);
	js($buffer);
}
//---------------------------------------------------------
function subpage_($sub,$ee=""){
    if(!$ee)$ee=$sub;
    list($dir,$ee)=explode('-',$ee);
    if(!$ee){$ee=$dir;$dir='page';}
    $eval='include(core."/'.$dir.'/'.$ee.'.php");';
    return($eval);
    //? ><script><?php echo(target($sub)); ? ></script><?php
}
//---------------------------------------------------------
function subref($sub,$period=false){$period=$period*1000;
if($period){
    ?>
    <script type="text/javascript">
    setInterval(function() {
    <?php echo(target($sub,"","","",true,"",true)); ?>
    }, <?php echo($period); ?>);
    </script>
    <?php
}else{
    ?>
    <script type="text/javascript">
    <?php echo(target($sub,"","","",true,"",true)); ?>
    </script>
    <?php
}
}
//---------------------------------------------------------
/*function subdelay($sub,$delay=false){$delay=$delay*1000;
if($delay){
    ?>
    <script>
    setTimeout(function() {
    alert(567);
    <?php echo(target($sub,"","","",true,"",true)); ?>
    }, <?php echo($delay); ?>);
    </script>
    <?php
}else{
    ?>
    <script>
    <?php echo(target($sub,"","","",true,"",true)); ?>
    </script>
    <?php
}
}*/
//---------------------------------------------------------
function subescape($sub){
    if(!$ee)$ee=$sub;
    list($dir,$ee)=explode('-',$ee);
    if(!$ee){$ee=$dir;$dir='page';}
    if(!$buffer){
        ob_start();
        include(core.'/'.$dir.'/'.$ee.'.php');
        $buffer = ob_get_contents();
        ob_end_clean();
    }
    //e($buffer);br();
     //-------
        //$buffer=contentlang($buffer);
        $bufferx="";
        foreach(str_split($buffer) as $char){
            if(strtr($char,"ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮqwertyuiopasdfghjkl","0000000000000000000000000000000000000000000000000000000000")==$char){
                $char=dechex(ord($char));
                if(strlen($char)==1){ $char=("0".$char); }
                $char="%".$char;
            }
            $bufferx=$bufferx.$char;
        }     
     //-------
     //$bufferx=aacute($bufferx);
     
     
     return($bufferx);
}
//---------------------------------------------------------

//$bufferx=str_replace(array("\r","\n","'",'"'),array("\\\r","\\\n","\\'",'\\"'),$buffer);

function subjsr($sub,$buffer=false,$plus=false,$alert=false){
    if(!$ee)$ee=$sub;
    list($dir,$ee)=explode('-',$ee);
    if(!$ee){$ee=$dir;$dir='page';}
    if(!$buffer){
        ob_start();
        include(core.'/'.$dir.'/'.$ee.'.php');
        $buffer = ob_get_contents();
        ob_end_clean();
    }
     //-------
        //$buffer=contentlang($buffer);

        $bufferx="";
        $buffer=str_split($buffer);
        $nochars=str_split('ěščřžýáíéúůĚŠČŘŽÝÁÍÉÚŮqwertyuiopasdfghjkl');

        foreach($buffer as $char){
            if(!in_array($char,$nochars)){
                $char=dechex(ord($char));
                if(strlen($char)==1){ $char=("0".$char); }
                $char="%".$char;
            }
            $bufferx.=$char;
        }     
     //-------
    $return='';
 
     $return.=('tmp=unescape("'.($bufferx).'");if(typeof(last'.str_replace('-','__',$sub).')=="undefined")last'.str_replace('-','__',$sub).'="";if(last'.str_replace('-','__',$sub).'!=tmp){last'.str_replace('-','__',$sub).'=tmp;');
     if($alert)$return.=('alert("'.$sub.'");');
     if($alert)$return.=('alert($("#'.$sub.'").html());');
     if($alert)$return.=('alert(tmp);');
     //$return.=($plus?'tmp=$("#'.$sub.'").html()+tmp;':'');
     //if($alert)$return.=('alert(tmp);');
	 if($plus){
     	$return.=('$("#'.$sub.'").append(tmp);}');
     }else{
		$return.=('$("#'.$sub.'").html(tmp);}');
	 }
     return($return);
}
//--------
function subjs($sub,$buffer=false,$plus=false,$alert=false){
    e(subjsr($sub,$buffer,$plus,$alert));   
}
//---------------------------------------------------------
function subexec($sub){
    if(!$ee)$ee=$sub;
    list($dir,$ee)=explode('-',$ee);
    if(!$ee){$ee=$dir;$dir='page';}
        ob_start();
        include(core.'/'.$dir.'/'.$ee.'.php');
        ob_end_clean();
   }
//---------------------------------------------------------
function urlr($tmp){//$tmpx="&amp;tmp=".$tmp;$tmpxx="&tmp=".$tmp;
    //r($tmp);
    if(str_replace("http://","",$tmp)==$tmp and str_replace("https://","",$tmp)==$tmp){
        if(logged()){
            //echo("rand");
            $md5=md52(session_id().$tmp);
        }else{
            $md5=md52($tmp);
        }
        $GLOBALS['ss'][$md5]=array();
        $tmp=explode(';',$tmp);
        foreach($tmp as $row){
            list($a,$b)=explode("=",$row);
            $GLOBALS['ss'][$md5][$a]=$b;
        }
        $e=$GLOBALS['ss'][$md5]['e'];
        $q=$GLOBALS['ss'][$md5]['q'];$qq=$q;
        $ee=$GLOBALS['ss'][$md5]["ee"];
        $js=$GLOBALS['ss'][$md5]["js"];
        $jsa=$GLOBALS['ss'][$md5]["jsa"];
        $ref=$GLOBALS['ss'][$md5]["ref"];
        $rot=$GLOBALS['ss'][$md5]["rot"];
        $i=$GLOBALS['ss'][$md5]["i"];
        $set=$GLOBALS['ss'][$md5]["set"];
        if($q){$q="&amp;q=$q";}else{$q="";}
        if($rot){$rot="&amp;rot=$rot";}else{$rot="";}
        if($i){$i="&amp;i=$i";}else{$i="";}
        if($set){$set="&amp;set=$set";}else{$set="";}
        if(!$prompt)$prompt='';        
        if(!$e and !$js and !$ref){
            //r("outling(!$e and !$js  and !$ref)");
            return(/*$GLOBALS['ss']["url"]*/url."?token=".$_GET['token']."&amp;w=".$md5.$q.$rot.$i.$set);//.$tmpx
        }else{
            if($e=="s"){$e=$GLOBALS['ss']["page"];}
            if($ee=="s"){$ee=$GLOBALS['ss']["page"];}
            if($js)$js=xx2x($js).";";
            $js=str_replace("[semicolon]",";",$js);
            $rot=$GLOBALS['ss'][$md5]["rot"];
            $noi=$GLOBALS['ss'][$md5]["noi"];
            $prompt=$GLOBALS['ss'][$md5]["prompt"];
            $set=$GLOBALS['ss'][$md5]["set"];
            $cache=$GLOBALS['ss'][$md5]["cache"];
            //r($GLOBALS['ss'][$md5]);
            if($e)$js=$js.target($e,$md5,$ee,$qq,false,$rot,$noi,$prompt,$set,$cache,xx2x($jsa));//.$tmpxx
            if($ref)$js=$js.target($ref);
            return("javascript: ".($js));//addslashes
        }
    }else{
        return($tmp);
    }
}
//------------------------
function url($tmp){
    echo(urlr($tmp));
}
//------------------------
function urlxr($url,$script=true){
    $url=urlr($url);
    //r('urlx: '.$url);
    if(strpos($url,'javascript:')!==false){
        $url=str_replace('javascript:', '', $url);
        $url=trim($url);
        if($script){
            return('<script type="text/javascript">'.$url.'</script>');
        }else{
            return($url);
        }
        
    }
}
function urlx($url,$script=true){e(urlxr($url,$script));if($script){exit2();}}
//------------------------
function js2($js){
	return("js=".x2xx($js));
}//------------------------
function jsa2($js){
	return("jsa=".x2xx($js));
}
//======================================================================================
function logged(){
    if($GLOBALS['ss']['logid']){
	if($GLOBALS['url_param']!='fbonly'){
	    if(ifobject($GLOBALS['ss']["logid"])){
            return(true);
	    }else{
	        return(false);
	    }
	}else{
        return(false);
	}
    }else{
        return(false);
    }
}
define("logged",logged());
//===============================================================================================================
function short($text,$len){
    //r($text);
    if(substr($text,0,1)=='{')$text=contentlang($text);
    $text2=substr($text,0,$len-3);
    if($text!=$text2){$text2=$text2."...";}
    return($text2);
}
function shortx($text,$len){
    //r($text);
    if(substr($text,0,1)=='{')$text=contentlang($text);
    $text2=substr($text,0,$len);
    return($text2);
}
//===============================================================================================================
function substr2($input,$a,$b,$i=0,$change=false,$startstop=true){if(rr()){echo("<br/>substr2($input,$a,$b,$i,$change)<br/>");echo($input);}
            if(!$startstop){
                $start=strlen($a);
                $stop=strlen($b); 
            }else{
                $start=0;
                $stop=0;
            }
    //$begin=$a;$end=$b;
    $string=$input;
    $aa=strlen($a);
    $p=0;
    for($ii=0;$ii<$i;$ii++){$pp=strpos($string,$a)+1;$p=$p+$pp;$string=substr($string,$pp);}
    //$inner=$string;
    $a=strpos($string,$a);
    if($a!==false){if(rr())echo("<br/>".$a);
        $string=substr($string,$a+$aa);
        //echo(htmlspecialchars($string));
        $b=strpos($string,$b);
        if(rr())echo("/".$b);
        $string=substr($string,0,$b);
        if(rr())echo("<br/>".$change);
        if($change!=false){
            //$input=substr_replace($input,$change,,1);
            //echo("<br/>substr_replace($input,$change,$a+$aa+$p,$b);");
            if(rr())echo("<br/>input: ".$input);
            $inner=substr($input,$a+$aa+$p,$b);
            $input=substr_replace($input,$change,$a+$aa+$p-$start,$b+$stop+$start);//$b-$a-$aa
            if(rr())echo("<br/>return: ".$input);
        }//průser v akcentu
        //$input=substr($input,$a+$aa+$b);
        if(rr())echo("<br/>return($string)");
        
        $input=str_replace("[]",$inner,$input);
        
        if($change)return($input);
        return($string);
    }else{
        if($change)return($input);
        return(false);
    }
}
//--------------------------------------------
function part3($input,$aa,$bb){
    if(strpos($input,$aa)){
        list($a,$input)=explode($aa,$input);
        list($b,$c)=explode($bb,$input);
        return(array($a,$b,$c));
    }else{
        return(array("",$input,""));
    }
}
//print_r(part3("-sfd6sf8d-","6","8"));
//--------------------------------------------
function params($params){
    $params=preg_split('~(?<!\\\)' . preg_quote(',', '~') . '~', $params);
    $params=str_replace('\,',',',$params);
    return($params);
}
//--------------------------------------------
//define("vals_a",array("*",",",";",":","=","(","[","{","}","]",")","\"","\'","\\"," ",nln));
//define("vals_b",array("[star]","[comma]","[semicolon]","[colon]","[equate]","[aabracket]","[babracket]","[cabracket]","[babracket]","[bbbracket]","[cbbracket]","[doublequote]","[quote]","[slash]","[space]","[nln]"));
$GLOBALS['ss']["vals_a"]=array("*",",",";",":","=","(","[","{","}","]",")","\"","\'","\\"," ",nln);
$GLOBALS['ss']["vals_bb"]=array("[1]","[2]","[3]","[4]","[5]","[6]","[7]","[8]","[9]","[10]","[11]","[12]","[13]","[14]","[15]","[16]");
$GLOBALS['ss']["vals_b"]=array("[star]","[comma]","[semicolon]","[colon]","[equate]","[aabracket]","[babracket]","[cabracket]","[cbbracket]","[bbbracket]","[abbracket]","[doublequote]","[quote]","[slash]","[space]","[nln]");
//r($GLOBALS['ss']["vals_a"]);

//--------------------------------------------
 /*function smiles($text){
    //---------objects 
    $stream="";
    $text=str_replace("**","[star]",$text);
    $array=explode("*",$text);
    $i=-1;
    foreach($array as $part){$i++;
        if($i%2){
            //$stream=$stream.$part;
            list($img,$width)=explode("[star]",$part);
            $img=x2xx($img);
            if(!$width){$width=/*"100%"* /false;}
            //echo($img."<br>");
            if(substr($img,0,1)!='%'){
                $img=name2id($img);
                $stream=$stream.iprofiler($img);//mprofile($img).br.br;//imgr("id_".$img."_icon",$img,$width);
            }else{
                $img=substr($img,1);
                $img=name2id($img);
                $stream=$stream.iprofiler($img,45,2);
            }
        }else{
            $stream=$stream.$part;
        }
    } /** /
    $stream=str_replace("[star]","*",$stream);
    //---------dtree
    $stream=str_replace("%0%",imgr('dtree/x0001.png',lr('dtree'),50),$stream);
    $stream=str_replace("%1%",imgr('dtree/x0002.png',lr('dtree'),50),$stream);
    $stream=str_replace("%2%",imgr('dtree/x0003.png',lr('dtree'),50),$stream);
    $stream=str_replace("%3%",imgr('dtree/x0004.png',lr('dtree'),50),$stream);
    $stream=str_replace("%4%",imgr('dtree/x0005.png',lr('dtree'),50),$stream);
    $stream=str_replace("%5%",imgr('dtree/x0006.png',lr('dtree'),50),$stream);
    $stream=str_replace("%6%",imgr('dtree/x0007.png',lr('dtree'),50),$stream);
    $stream=str_replace("%7%",imgr('dtree/x0008.png',lr('dtree'),50),$stream);
    $stream=str_replace("%8%",imgr('dtree/x0009.png',lr('dtree'),50),$stream);
    $stream=str_replace("%9%",imgr('dtree/x0010.png',lr('dtree'),50),$stream);
    $stream=str_replace("%10%",imgr('dtree/x0011.png',lr('dtree'),50),$stream);
    $stream=str_replace("%11%",imgr('dtree/x0012.png',lr('dtree'),50),$stream);
    $stream=str_replace("%12%",imgr('dtree/x0013.png',lr('dtree'),50),$stream);
    $stream=str_replace("%13%",imgr('dtree/x0014.png',lr('dtree'),50),$stream);
    $stream=str_replace("%14%",imgr('dtree/x0015.png',lr('dtree'),50),$stream);
    $stream=str_replace("%15%",imgr('dtree/x0016.png',lr('dtree'),50),$stream);
    
    //---------smiles
    //zatím není
    //---------
    return($stream);
}
//r(xx2x("own2=2[comma]hybrid[comma]0.000[comma]0.000[comma][comma]qw[comma][comma]login[equate]1[semicolon]use[equate]1[semicolon]info[equate]1[semicolon]profile_edit[equate]1[semicolon]set_edit[equate]1[comma][comma][comma]realname[equate]Beze JmĂ©na[semicolon]gender[equate]m[semicolon]age[equate][semicolon]mail[equate]@[semicolon]showmail[equate][semicolon]web[equate]www.towns.cz[semicolon]description[equate]asdaszdas[semicolon]join[equate][comma][equate]0[comma]1[comma]0[comma]1314648565[comma]0[comma]0;in=0;in2=41[comma]message[comma]0.000[comma]0.000[comma][comma][comma][comma]login[equate]1[semicolon]use[equate]1[semicolon]info[equate]1[semicolon]profile_edit[equate]1[semicolon]set_edit[equate]1[comma][comma][comma]realname[equate][semicolon]gender[equate][semicolon]age[equate][semicolon]mail[equate]@[semicolon]showmail[equate][semicolon]web[equate][semicolon]description[equate][semicolon]join[equate][semicolon]text[equate][comma][equate]0[comma]0[comma]1[comma]1314613091[comma]0[comma]0[semicolon]40[comma]message[comma]0.000[comma]0.000[comma][comma]subject[comma][comma]login[equate]1[semicolon]use[equate]1[semicolon]info[equate]1[semicolon]profile_edit[equate]1[semicolon]set_edit[equate]1[comma][comma][comma]realname[equate][semicolon]gender[equate][semicolon]age[equate][semicolon]mail[equate]@[semicolon]showmail[equate][semicolon]web[equate][semicolon]description[equate][semicolon]join[equate][semicolon]text[equate]text[comma][equate]0[comma]0[comma]1[comma]1314352818[comma]0[comma]0;t=1313699204;x=15;y=0"),2);

*/

//--------------------------------------------
 function array2csv($array){
     $i=0;
     $array_new=array();
    foreach($array as $row){
        $array_new[$i]=array();
        $ii=0;
        foreach($row as $key=>$a){
            //if(is_int($key)){
            $array_new[$i][$ii]=x2xx($a);
            //r($array_new[$i][$ii]);
            //}
            //r($array2[$i][$ii]);
            $ii++;
        }//echo("<br>");
       $array_new[$i]=join(",",$array_new[$i]);
       $i++;
    }
    $array_new=join(";",$array_new);
    //r($array_new);
    return($array_new);
}
//--------------------------------------------
 function csv2array($string){
    $string=explode(';',$string);
    $i=0;
    foreach($string as $row){
        $string[$i]=explode(",",$string[$i]);
        $ii=0;
        foreach($string[$i] as $tmp){
             $string[$i][$ii]=xx2x($string[$i][$ii]);
             $ii++;
        }
        $i++;
    }
    return($string);
}
//die(xx2x("[babracket]"));
//die(xx2x(x2xx("{abc}")));
//print_r(csv2array(array2csv(array(array("{abc}")))));
//exit;
//==========================================================================================convertpos
function convertpos($x,$y){
    $tmp=3;
    $xc=(-(($y-1)/10)+(($x-1)/10));
    $yc=((($y-1)/10)+(($x-1)/10));
    $xx=(($xc-intval($xc))*-414)-($posuv);
    $yy=(($yc-intval($yc)+$tmp)*-211);
    $xx=round($xx/$GLOBALS['mapzoom']);
    $yy=round($yy/$GLOBALS['mapzoom']);
    $xc=intval($xc);
    $yc=intval($yc)-$tmp;
    $posuv=($posuv/$GLOBALS['mapzoom'])+(2.5*(424-(424/$GLOBALS['mapzoom'])));
    return(array($xc,$yc,$xx,$yy,$posuv));
}
//==========================================================================================centerurl

if(!function_exists('centerurl')){
function centerurl($id,$x='x',$y=0,$ww=1,$noclose=false){//echo('bbb');
    if($x=='x'){//echo('aaaaa');echo($id);
        $destinationobject=new object($id);
        if(!$destinationobject->loaded)return('');
        $x=$destinationobject->x;
        $y=$destinationobject->y;
        $ww=$destinationobject->ww;
        unset($destinationobject);  
    }

/*if($GLOBALS['screenwidth']>800){
	$posuv=0;
}else{
	$posuv=400;//530;
}*/

    $posuv=0;


    list($xc,$yc,$xx,$yy,$posuv)=convertpos($x,$y);
    //js2("wm_close();"
    $url='e=map;xc='.$xc.';yc='.$yc.';xx='.$xx.';yy='.$yy.';ww='.$ww.';center='.$id.';noi=1;';
    //echo($url);
    return($url);
}}
//==========================================================================================building

 function building($name,$onlyready=0){
    $q=sql_1data('SELECT count(1) FROM `[mpx]pos_obj` WHERE own=\''.$GLOBALS['ss']['useid'].'\' AND name=\''.$name.'\' AND '.objt().($onlyready?' AND readytime<='.time():''))-1+1;
    return($q);
}
//==========================================================================================rand_color

function rand_color() {
    return str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
}
//die(rand_color());

//==========================================================================================fb_user

function fb_user($id){//$GLOBALS['ss']['logid']
	$useid=sql_1data('SELECT `userid` FROM `[mpx]pos_obj` WHERE `id`='.$id);
	$key=sql_1data('SELECT `fbid` FROM [mpx]users WHERE `id`='.$useid);
    return($key);
    
}

//==========================================================================================create_zip
function create_zip($files,$zipfile,$unlink=true){
    //e($files); e($zipfile);

	if(is_string($files))$files=array($files);

	$zip = new ZipArchive();
	$zip->open($zipfile,ZIPARCHIVE::OVERWRITE);

	foreach($files as $file) {
		$zip->addFile($file,basename($file));
	}

	$zip->close();

    if($unlink and file_exists($zipfile)) {
        foreach ($files as $file) {
            unlink($file);
        }
    }

	chmod($zipfile,0777);
	return file_exists($zipfile);
}
//==========================================================================================create_zip
//[PH] Rozbalení .zip souboru složky $to
//http://php.net/manual/en/ziparchive.open.php

function extract_zip($zipfile,$to,$files=false){

    if(is_string($files))$files=array($files);

	$zip = new ZipArchive;
	$res = $zip->open($zipfile);
	if ($res === TRUE) {//Vše je OK

        if(!$files) {
            $zip->extractTo($to);
        }else{
	        $zip->extractTo($to,$files);
        }

        $zip->close();
	} else {
	    //echo 'failed, code:' . $res;
	}

}

//==========================================================================================remove_javascript

function remove_javascript($html){
    return preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $html);

}


//==========================================================================================
require(root.core."/func_components.php");
require(root.core."/func_api.php");
//require(root.core."/func_map.php");
//r(astream($str));

