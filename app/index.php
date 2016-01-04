<?php
/**
 * @author ©Towns.cz
 * @fileOverview This PHP file generates HTML skeleton for browser...
 */
//======================================================================================================================




error_reporting(E_ALL & ~E_NOTICE);


//----------------------------------------load $language and $MESSAGES


//---------------------------Initialization

require __DIR__ . '/php/neon/neon.php';

if(isset($_COOKIE['language'])) {
    $language = $_COOKIE['language'];
}else{
    $language = substr($_SERVER['HTTP_ACCEPT_language'], 0, 2);
}



$language_file=__DIR__ ."/locale/$language.neon";
if(!file_exists($language_file)) {
    $language='cs';//todo in future default language should be english
    $language_file=__DIR__ ."/locale/$language.neon";
}


function locale_init(){
    global $MESSAGES,$language_file;
    $MESSAGES = Nette\Neon\Neon::decode(file_get_contents($language_file));
}

locale_init();

//---------------------------Locale.get equivalent in PHP

function locale($key){
    global $MESSAGES,$language_file;

    $key=str_replace(' ','_',$key);

    if(isset($MESSAGES[$key])){

        $value=$MESSAGES[$key];

    }else {

        if(1/*todo only in develop*/){
            file_put_contents(
                $language_file,
                file_get_contents($language_file) . "\n$key: " . Nette\Neon\Neon::encode($key)
            );
            locale_init();
        }
        $value=$key;

    }


    return $value;

}

//----------------------------------------




//todo zde by se mela analyzovat URI - poslat dotaz do towns API a pote naplnit informace nize podle toho.

$page=[];
$page['title'] = locale('page title');
$page['description'] = locale('page description');
$page['meta_og'] = [
    'site_name' => locale('page title'),
    'title' => $page['title'],
    'description' => $page['description'],
    'type' => 'game'
    //'url' =>
    //'image' =>
];



$inner_window=[];

if($config['app']['environment'] == "production"/** or true/**/){

    $inner_page='home';
    $inner_page_content=file_get_contents(__DIR__.'/js/ui/pages/'.$inner_page.'.page.js');

    function getFromJs($content,$val,$quote){
        $pos=strpos($content,$val);
        $content=substr($content,$pos);
        $pos=strpos($content,$quote);
        $content=substr($content,$pos+1);
        $pos=strpos($content,$quote);
        $content=substr($content,0,$pos);
        return $content;
    }


    $inner_window['header']=getFromJs($inner_page_content,'Pages.'.$inner_page.'.header','\'');
    $inner_window['content']=getFromJs($inner_page_content,'Pages.'.$inner_page.'.content','`');
    //$inner_window['openJS']=getFromJs($inner_page_content,'Pages.'.$inner_page.'.openJS','`');


    $inner_window['content']=explode('{{', $inner_window['content']);


    for($i=1;$i<count($inner_window['content']);$i++){


        $inner_window['content'][$i]=explode('}}',$inner_window['content'][$i]);




        $inner_window['content'][$i][0]=locale($inner_window['content'][$i][0]);
        $inner_window['content'][$i]=implode('',$inner_window['content'][$i]);


    }
    $inner_window['content']=implode('', $inner_window['content']);


}else{


    $inner_window['display'] = 'none';
    $inner_window['header'] = '';
    $inner_window['content'] = '';
    //$inner_window['openJS'] = '';

}





http_response_code(200);



if(isset($config['app']['environment']) && $config['app']['environment'] != "production"){

    $page['title'].=' - '.ucfirst($config['app']['environment']).' enviroment';

}


//------------------------------------------------Nice HTML

function tidyHTML($buffer) {
    // load our document into a DOM object
    $dom = new DOMDocument();
    // we want nice output
    $dom->preserveWhiteSpace = false;
    $dom->loadHTML($buffer);
    $dom->formatOutput = true;
    return($dom->saveHTML());
}

// start output buffering, using our nice
// callback function to format the output.
//ob_start("tidyHTML");//todo Deploy tidyHTML

//------------------------------------------------


?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?= htmlspecialchars($page['title']) ?></title>
    <meta name="description" content="<?= addslashes($page['description']) ?>">
    <link rel="icon" href="/favicon.ico">

    <?php
    //--------------------------------Dodatecne hlavicky
    if (isset($config['app']['facebook']['app_id'])) {
        echo '<meta property="fb:app_id" content="' . $config['app']['facebook']['app_id'] . '" >';
    }

    //--------------------------------Open Graph informace

    foreach ($page['meta_og'] as $key => $value) {
        echo('<meta property="fb:' . addslashes($key) . '" content="' . addslashes($value) . '" >');

    }

    //--------------------------------var language
    ?>
    <script>
        var language='<?=$language?>';
    </script>
    <script src="/<?=(isset($config['app']['environment']) && $config['app']['environment'] != "production"?'app':'app-dist')?>/php/locale.php?language=<?=$language?>"></script>

    <?php
    //--------------------------------Includes
    //tady je podminka zda jde o testovaci verzi
    if (isset($config['app']['environment']) && $config['app']['environment'] != "production") {


        foreach ($config['includes']['css'] as $include) {

            if(is_array($include)){
                foreach($include as $environment=>$file){
                    if($environment==$config['app']['environment']){
                        echo '<link rel="stylesheet" href="/' . addslashes($file) . '"/>' . "\n";
                    }
                }
            }elseif(is_string($include)) {

                echo '<link rel="stylesheet" href="/' . addslashes($include) . '"/>' . "\n";

            }
        }

        /**/
        foreach ($config['includes']['js'] as $include) {


            if(is_array($include)){
                foreach($include as $environment=>$file){
                    if($environment==$config['app']['environment']){
                        echo '<script src="/' . addslashes($file) . '"></script>'."\n";
                    }
                }
            }elseif(is_string($include)){

                echo '<script src="/' . addslashes($include) . '"></script>'."\n";

            }

        }/**/


    }else{
        ?>
            <link rel="stylesheet" type="text/css" href="/app-dist/css/towns.min.css"/>
            <script src="/app-dist/js/towns.min.js" async></script>
        <?php
    }
    //--------------------------------

    ?>



    <link rel="alternate" type="application/rss+xml" title="RSS" href="<?=addslashes($config['app']['blog']['rss_feed'])?>">


</head>
<body>


<?php if (isset($config['app']['google']['tracking_id'])) : ?>
    <!-- Google Analytics -->
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', '<?= $config['app']['google']['tracking_id'] ?>', 'auto');
        ga('send', 'pageview');

    </script>
    <!-- End Google Analytics -->
<?php endif; ?>


<div id="loading">
    <i class="fa fa-spinner faa-spin animated"></i>
</div>



<div id="message"><div id="message_inner"></div></div>


<!--Example of user prompt-->
<div id="eu_cookies">
    <div id="eu_cookies_inner">
        <?=locale('ui prompts cookies')?>
        <button class="micro-button"><?=locale('ui buttons agree')?></button>
    </div>
</div>



<div id="map_drag"></div>

<div id="loadbar_outer">
    <div id="loadbar"></div>
</div>


<canvas id="map_buffer" width="100" height="100"></canvas>
<div id="map-move"></div>
<canvas id="map_bg" width="100" height="100"></canvas><!--todo Maybe refactor map_bg to map?-->



<canvas id="selecting-distance" width="100" height="50"></canvas>


<div id="selecting-distance-ctl" style="display: none;">
    <div id="selecting-distance-plus" class="mini-button" title="<?=locale('ui tool controls plus')?>"><i class="fa fa-plus"></i></div>
    <div id="selecting-distance-minus" class="mini-button" title="<?=locale('ui tool controls minus')?>"><i class="fa fa-minus"></i></div>
    <div id="selecting-distance-left" class="mini-button" title="<?=locale('ui tool controls left')?>"><i class="fa fa-angle-double-left"></i></i></div>
    <div id="selecting-distance-right" class="mini-button" title="<?=locale('ui tool controls right')?>"><i class="fa fa-angle-double-right"></i></i></div>
    <div id="selecting-distance-color" class="mini-button faa-parent animated-hover" title="<?=locale('ui tool controls color')?>"><i class="fa fa-paint-brush faa-tada"></i>
    </div>
    <div id="selecting-distance-blocks" class="mini-button" title="<?=locale('ui tool controls blocks')?>"><i class="fa fa-cubes"></i></div>
    <div id="selecting-distance-close" class="mini-button" title="<?=locale('ui tool controls close')?>"><i class="fa fa-times"></i></div>
</div>


<div id="color-ctl" style="display: none;">

    <div id="selecting-distance-color-box"></div>
</div>


<nav class="menu">

    <!--todo [PH] vyřešit nějak lépe lokacizaci v aplikaci-->
    <div class="menu-logo">
        <img class="js-popup-window-open" content="home" src="media/image/icons/logo.png" alt="<?=locale('ui title')?>"/>

    </div>


    <ul class="menu-list menu-list-left">

        <li class="menu-list-item">
            <a><?=locale('ui menu nature')?></a>

            <ul class="menu-dlist">
                <li class="menu-dlist-item"><a onclick="objectMenuTerrainChange();return false;"><?=locale('ui menu nature types')?></a></li>
                <li class="menu-dlist-item"><a onclick="terrainNeutralizeStart();return false;"><?=locale('ui menu nature neutralize')?></a></li>
            </ul>
        </li>

        <li class="menu-list-item">
            <a><?=locale('ui menu buildings')?></a>

            <ul class="menu-dlist">
                <li class="menu-dlist-item"><a onclick="objectMenuBuildingsPrototypes('main');return false;"><?=locale('ui menu buildings main')?></a></li>
                <li class="menu-dlist-item"><a onclick="objectMenuBuildingsPrototypes('wall');return false;"><?=locale('ui menu buildings wall')?></a></li>
                <li class="menu-dlist-item"><a onclick="objectMenuBuildingsPrototypes('block');return false;"><?=locale('ui menu buildings block')?></a></li>
                <li class="menu-dlist-item"><a onclick="dismantlingStart();return false;"><?=locale('ui menu buildings dismantle')?></a></li>
            </ul>
        </li>

        <li class="menu-list-item">
            <a><?=locale('ui menu stories')?></a>

            <ul class="menu-dlist">
                <li class="menu-dlist-item">

                    <a onclick="objectMenuStory();return false;"><?=locale('ui menu stories write')?></a>



                </li>
            </ul>
        </li>


        <li class="menu-list-item">
            <a><?=locale('ui menu data')?></a>



            <ul class="menu-dlist">

                <li class="menu-dlist-info"><?=locale('ui menu data')?></li>

                <li class="menu-dlist-item"><a onclick="map_bg.downloadCanvas();"><?=locale('ui menu data screenshot')?></a></li>
                <li class="menu-dlist-item"><a onclick="Storage.restart();location.reload();"><?=locale('ui menu data restart')?></a></li>
                <li class="menu-dlist-item"><a class="js-popup-window-open" content="data_json"><?=locale('ui menu data export')?></a></li>


            </ul>
        </li>



    </ul>




    <ul class="menu-list menu-list-right">

        <!--<li class="menu-list-item menu-list-item-icon">
            $100
        </li>-->



        <li class="menu-list-item menu-list-item-registration">
            <a class="js-popup-window-open" content="home"><?=locale('ui buttons about game')?></a><!--todo refactor atribute content to ?page-->
        </li>


        <li class="menu-list-item menu-list-item-icon js-popup-notification-open faa-parent animated-hover"><i
                class="fa fa-flag fa-lg faa-shake"></i></li>
        <li class="menu-list-item menu-list-item-icon faa-parent animated-hover"><i
                class="fa fa-wrench fa-lg faa-wrench"></i></li>
        <li class="menu-list-item menu-list-item-icon faa-parent animated-hover"
            onclick="$(document).toggleFullScreen();"><i class="fa fa-arrows-alt fa-lg faa-pulse"></i></li>
        <!--todo tohle neni ciste reseni js by mel byt mimo html dokumentu v tomhle pripade v ui.js-->


    </ul>

    <div class="cleaner"></div>
</nav>


<aside id="objectmenu">
    <div id="objectmenu-inner">
    </div>
</aside>


<div id="popup-action">
    <div class="arrow"></div>
    <div class="content"></div>
</div>




<div class="overlay" style="display: <?= addslashes($inner_window['display']) ?>;"></div>
<div class="popup-window" style="display: <?= addslashes($inner_window['display']) ?>;">
    <div class="header"><?= htmlspecialchars($inner_window['header']) ?></div>
    <div class="content"><?= ($inner_window['content']) ?></div>


    <div class="close js-popup-window-close"><i class="fa fa-times"></i></div>
</div>
<?php if($inner_window['content']):/*todo this JS is duplicite*/ ?>
    <script>
        $(function(){
            $('.popup-window .content').mousedown(function(){
                $('body').enableSelection();
            });
            $('body').enableSelection();
            window_opened=true;
        });
    </script>
<?php endif; ?>



<div class="popup-notification">
    <div class="arrow"></div>
    <div class="header"></div>
    <div class="content" id="notifications">


    </div>
    <div class="footer">
        <a href="#"><?=locale('ui notifications all')?></a>
    </div>
</div>


</body>
</html>


<?php
// this will be called implicitly, but we'll
// call it manually to illustrate the point.
ob_end_flush();
?>