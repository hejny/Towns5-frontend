<?php
/**
 *
 * ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗
 * ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
 * ██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝
 * ██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗
 * ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
 * ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
 * © Towns.cz
 * @fileOverview This PHP file generates HTML skeleton for browser...
 */


//======================================================================================================================


error_reporting(E_ALL & ~E_NOTICE);


//----------------------------------------load $LANGUAGE and $MESSAGES

require __DIR__ . '/php/neon/neon.php';

if(isset($_COOKIE['LANGUAGE'])) {
    $LANGUAGE = $_COOKIE['LANGUAGE'];
}else{
    $LANGUAGE = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
}



$file=__DIR__ ."/locale/$LANGUAGE.neon";
if(!file_exists($file)) {
    $LANGUAGE='cs';//todo in future default language should be english
    $file=__DIR__ ."/locale/$LANGUAGE.neon";
}
$MESSAGES = Nette\Neon\Neon::decode(file_get_contents($file));
//print_r($MESSAGES);

function message($path){
    global $MESSAGES;

    $eval='$value=$MESSAGES["'.str_replace('.','"]["',$path).'"];';


    //echo($eval);

    try {
        eval($eval);
    }catch (Exception $err){

    }


    if(!isset($value)){
        $value=$path;
    }

    return $value;

}

//----------------------------------------




//todo zde by se mela analyzovat URI - poslat dotaz do towns API a pote naplnit informace nize podle toho.

$page=[];
$page['title'] = message('page.title');
$page['description'] = message('page.description');
$page['meta_og'] = [
    'site_name' => message('page.title'),
    'title' => $page['title'],
    'description' => $page['description'],
    'type' => 'game'
    //'url' =>
    //'image' =>
];

$window=[];
$window['display'] = 'none';
$window['header'] = '';
$window['content'] = '';

$notifications=[];
$notifications['content'] = '';


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

    //--------------------------------var LANGUAGE
    ?>
    <script>
        var LANGUAGE='<?=$LANGUAGE?>';
    </script>
    <script src="/<?=(isset($config['app']['environment']) && $config['app']['environment'] != "production"?'app':'app-dist')?>/php/locale.php?LANGUAGE=<?=$LANGUAGE?>"></script>

    <?php
    //--------------------------------Includes

    //tady je podminka zda jde o testovaci verzi
    if (isset($config['app']['environment']) && $config['app']['environment'] != "production") {


        foreach ($config['includes']['css'] as $include) {
            echo '<link rel="stylesheet" type="text/css" href="/' . addslashes($include) . '"/>';
        }

        foreach ($config['includes']['js'] as $include) {

            /*print_r($include);
            echo("\n");*/

            if(is_array($include)){
                foreach($include as $environment=>$file){
                    if($environment==$config['app']['environment']){
                        echo '<script src="/' . addslashes($file) . '"></script>';
                    }
                }
            }elseif(is_string($include)){

                echo '<script src="/' . addslashes($include) . '"></script>';

            }

        }


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
        <?=message('ui.prompts.cookies')?>
        <button class="micro-button"><?=message('ui.buttons.agree')?></button>
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
    <div id="selecting-distance-plus" class="mini-button faa-parent animated-hover" title="<?=message('ui.tool_controls.plus')?>"><i class="fa fa-plus faa-tada"></i></div>
    <div id="selecting-distance-minus" class="mini-button faa-parent animated-hover" title="<?=message('ui.tool_controls.minus')?>"><i class="fa fa-minus faa-tada"></i></div>
    <div id="selecting-distance-left" class="mini-button faa-parent animated-hover" title="<?=message('ui.tool_controls.left')?>"><i class="fa fa-angle-double-left"></i></i></div>
    <div id="selecting-distance-right" class="mini-button faa-parent animated-hover" title="<?=message('ui.tool_controls.right')?>"><i class="fa fa-angle-double-right faa-tada"></i></i></div>
    <div id="selecting-distance-color" class="mini-button faa-parent animated-hover" title="<?=message('ui.tool_controls.color')?>"><i class="fa fa-paint-brush faa-tada"></i>
    </div>
    <div id="selecting-distance-close" class="mini-button faa-parent animated-hover" title="<?=message('ui.tool_controls.close')?>"><i class="fa fa-times faa-tada"></i></div>
</div>


<div id="color-ctl" style="display: none;">

    <div id="selecting-distance-color-box"></div>
</div>


<nav class="menu">

    <!--todo [PH] vyřešit nějak lépe lokacizaci v aplikaci-->
    <div class="menu-logo">
        <img src="media/image/icon/logo1.png" alt="<?=message('ui.title)')?>"/>

    </div>


    <ul class="menu-list menu-list-left">

        <li class="menu-list-item">
            <a href="#"><?=message('ui.menu.nature._name')?></a>

            <ul class="menu-dlist">
                <li class="menu-dlist-item"><a href="" onclick="objectMenuTerrainChange();return false;"><?=message('ui.menu.nature.types')?></a></li>
                <li class="menu-dlist-item"><a href="" onclick="terrainNeutralizeStart();return false;"><?=message('ui.menu.nature.neutralize')?></a></li>
            </ul>
        </li>

        <li class="menu-list-item">
            <a href="#"><?=message('ui.menu.buildings._name')?></a>

            <ul class="menu-dlist">
<!--                <li class="menu-dlist-item"><a href="#" onclick="objectMenuUnique('main');return false;"><?/*=message('ui.menu.buildings.main')*/?></a></li>
                <li class="menu-dlist-item"><a href="#" onclick="objectMenuUnique('wall');return false;"><?/*=message('ui.menu.buildings.wall')*/?></a></li>-->
                <li class="menu-dlist-item"><a href="#" onclick="objectMenuUnique('block');return false;"><?=message('ui.menu.buildings.block')?></a></li>
                <li class="menu-dlist-item"><a href="#" onclick="dismantlingStart();return false;"><?=message('ui.menu.buildings.dismantle')?></a></li>
            </ul>
        </li>

        <li class="menu-list-item">
            <a href="#"><?=message('ui.menu.stories._name')?></a>

            <ul class="menu-dlist">
                <li class="menu-dlist-item">

                    <a href="#" onclick="objectMenuStory();return false;"><?=message('ui.menu.stories.write')?></a>



                </li>
            </ul>
        </li>

        <li class="menu-list-item">
            <a href="#"><?=message('ui.menu.messages._name')?></a>

            <ul class="menu-dlist">
            </ul>
        </li>


        <li class="menu-list-item">
            <a href="#"><?=message('ui.menu.map._name')?></a>

            <ul class="menu-dlist">

                <li class="menu-dlist-item"><a href="" onclick="downloadCanvas(map_bg);return false;"><?=message('ui.menu.map.screenshot')?></a></li>
                <li class="menu-dlist-item"><a href="" onclick="Storage.restart();location.reload();return false;"><?=message('ui.menu.map.restart')?></a></li>


            </ul>
        </li>



        <li class="menu-list-item">
            <a href="#"><?=message('ui.menu.blog._name')?></a>

            <ul class="menu-dlist" id="menu-feed">
                <!--This content will be loaded by js-->
            </ul>
        </li>



    </ul>




    <ul class="menu-list menu-list-right">

        <!--<li class="menu-list-item menu-list-item-icon">
            $100
        </li>-->



        <li class="menu-list-item menu-list-item-registration">
            <a class="js-popup-window-open" content="projects" href="#"><?=message('ui.buttons.about_game')?></a><!--todo refactor atribute content to ?page-->
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
        <div class="action-wrapper">

            <div class="action js-popup-action-open" template_params></div>

        </div>
        <div>
</aside>


<div id="popup-action">
    <div class="arrow"></div>
    <div class="content"></div>
    <div class="close js-popup-action-close"><i class="fa fa-times"></i></div>
</div>


<div class="overlay" style="display: <?= addslashes($window['display']) ?>;"></div>

<div class="popup-window" style="display: <?= addslashes($window['display']) ?>;">
    <div class="header"><?= addslashes($window['header']) ?></div>
    <div class="content"><?= addslashes($window['content']) ?></div>


    <div class="close js-popup-window-close"><i class="fa fa-times"></i></div>
</div>


<div class="popup-notification">
    <div class="arrow"></div>
    <div class="header"></div>
    <div class="content">

        <?= htmlspecialchars($notifications['content']) ?>

    </div>
    <div class="footer">
        <a href="#"><?=message('ui.notifications.all_notifications')?></a>
    </div>
</div>


</body>
</html>


<?php
// this will be called implicitly, but we'll
// call it manually to illustrate the point.
ob_end_flush();
?>