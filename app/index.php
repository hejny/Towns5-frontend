<?php
/**
 * @author ©Towns.cz
 * @fileOverview This PHP file generates HTML skeleton for browser...
 */
//======================================================================================================================




error_reporting(E_ALL & ~E_NOTICE);


function curPageURL() {
    $pageURL = 'http';
    if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"];
    } else {
        $pageURL .= $_SERVER["SERVER_NAME"];
    }
    return $pageURL;
}
define('PAGE_URL',curPageURL());


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

    $key=str_replace(array(' ','-'),'_',$key);

    if(isset($MESSAGES[$key])){

        $value=$MESSAGES[$key];

    }else {

        if(1/*todo only in develop*/){

            if(is_writable($language_file)){

                file_put_contents(
                    $language_file,
                    file_get_contents($language_file) . "\n$key: " . Nette\Neon\Neon::encode($key)
                );
                locale_init();

            }else{
                $key.='(err)';
            }



        }
        $value=$key;

    }


    return $value;

}

//----------------------------------------




//---------------------------------------------------------------------------------URI

$uri = $_SERVER['REQUEST_URI'];
$uri = explode('?',$uri,2);
$uri=$uri[0];
$uri = trim($uri,'/');
$uri = explode('/',$uri);
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------Search engine
if(count($uri)==1 && $uri[0]=='robots.txt'){
    header('Content-Type: text/plain');

    echo("User-agent: *\n");
    echo("Allow: /story/*\n");
    echo("Sitemap: ".PAGE_URL."/sitemap.xml\n");
    exit;

}else
if(count($uri)==1 && $uri[0]=='sitemap.xml'){

    $stories_json = file_get_contents($config['app']['towns']['url'].'/stories?latest=true&limit=500');
    $stories_json = json_decode($stories_json,true);


    $xml = new SimpleXMLElement('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>');

    foreach($stories_json as $story){

        //print_r($story);
        $track = $xml->addChild('url');
        $track->addChild('loc', PAGE_URL.'/story/'.$story['_id']);
        $track->addChild('lastmod', $story['start_time']);
    }


    header('Content-Type: text/xml');

    if(!isset($_GET['pretty'])){

        echo($xml->asXML());

    }else{

        $dom = new DOMDocument("1.0");
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = true;
        $dom->loadXML($xml->asXML());
        echo $dom->saveXML();

    }

    exit;

}
//---------------------------------------------------------------------------------



//---------------------------------------------------------------------------------Default
$page=[];
$page['title'] = locale('page title');
$page['description'] = locale('page description');
$page['type'] = 'game';
$inner_window=[];
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------Opened object
if($uri[0]=='story'){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~story

    //Set stream options
    $opts = array(
        'http' => array('ignore_errors' => true)
    );

    //Create the stream context
    $context = stream_context_create($opts);

    $story_json = file_get_contents($config['app']['towns']['url'].'/objects/'.$uri[1], false, $context);
    $story_json = json_decode($story_json,true);

    //print_r($story_json);

    if($story_json['status']!='error'){

        require_once(__DIR__ . '/php/markdown/Markdown.inc.php');


        $story_html = \Michelf\Markdown::defaultTransform($story_json['content']['data']);

        //-----------
        function removeqsvar($url, $varname) {
            return preg_replace('/([?&])'.$varname.'=[^&]+(&|$)/','$1',$url);
        }
        //-----------


        //-----------
        $xpath = new DOMXPath(@DOMDocument::loadHTML($story_html));
        $img_src = $xpath->evaluate("string(//img/@src)");
        $img_src = removeqsvar($img_src,'width');
        $img_src = $img_src.'&width=1200';
        //-----------


        //-----------
        $doc = new DOMDocument();
        $doc->loadHTML($story_html);
        $tags = $doc->getElementsByTagName('img');
        foreach ($tags as $tag) {


            $old_src = $tag->getAttribute('src');
            $new_src = removeqsvar($old_src,'width');
            $new_src = $new_src.'&width=800';
            $tag->setAttribute('src', $new_src);
        }
        $story_html = $doc->saveHTML();
        //-----------


        //todo links




        $inner_window['display'] = 'block';
        $inner_window['header'] = $story_json['name'];
        $inner_window['content'] = $story_html;



        $page['title'] = $inner_window['header'].' | '.$page['title'];
        $page['description'] = trim(strip_tags($inner_window['content']));
        $page['image'] = $img_src;
        $page['type'] = 'article';

        http_response_code(200);

    }else{





        $inner_window['display'] = 'block';
        $inner_window['header'] = locale('page 404 title');
        $inner_window['content'] = locale('page 404 content');
        http_response_code(404);


    }




    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}else{
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NONE

    $inner_window['display'] = 'none';
    $inner_window['header'] = '';
    $inner_window['content'] = '';
    http_response_code(200);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
//----------------------------------------------------------------------------------------------------------------------


$page['meta_og'] = [
    'site_name' => $page['title'],
    'title' => $page['title'],
    'description' => $page['description'],
    'type' => $page['type'],
    'url' => PAGE_URL.$_SERVER["REQUEST_URI"],
    'image' => $page['image']
];



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

    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Basic Information|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <title><?= htmlspecialchars($page['title']) ?></title>
    <meta name="description" content="<?= addslashes($page['description']) ?>">
    <link rel="icon" href="/favicon.ico">

    <?php
    //--------------------------------Dodatecne hlavicky
    if (isset($config['app']['facebook']['app_id'])) {
        echo '<meta property="fb:app_id" content="' . $config['app']['facebook']['app_id'] . '" >'."\r\n    ";
    }

    //--------------------------------Open Graph informace

    foreach ($page['meta_og'] as $key => $value) {
        echo('<meta property="og:' . addslashes($key) . '" content="' . addslashes($value) . '" >'."\r\n    ");

    }

    //--------------------------------var language
    ?>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Language|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <script>
        var language='<?=$language?>';//todo capital letters
    </script>
    <script src="/<?=(isset($config['app']['environment']) && $config['app']['environment'] != "production"?'app':'app-build')?>/php/locale.php?language=<?=$language?>"></script>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Towns API|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <script>
        var TOWNS_API_URL='<?=$config['app']['towns']['url']?>';
    </script>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Libraries|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <script>
        var global = window;
        var module={};
    </script>
    <!--<script src="/node_modules/towns-shared/build/towns-shared.js"></script>-->
    <?php
    //--------------------------------Includes
    //tady je podminka zda jde o testovaci verzi
    if (isset($config['app']['environment']) && $config['app']['environment'] != "production") {

        $js_files=array();
        $css_files=array();

        //-----------------------------------------------------

        foreach ($config['includes']['js'] as $include) {


            if(is_array($include)){
                foreach($include as $environment=>$file){
                    if($environment==$config['app']['environment']){
                        $js_files=array_merge($js_files,glob($file));
                    }
                }
            }elseif(is_string($include)){

                $js_files=array_merge($js_files,glob($include));

            }

        }

        foreach ($config['includes']['css'] as $include) {

            if(is_array($include)){
                foreach($include as $environment=>$file){
                    if($environment==$config['app']['environment']){
                        $css_files=array_merge($css_files,glob($file));
                    }
                }
            }elseif(is_string($include)) {

                $css_files=array_merge($css_files,glob($include));

            }
        }
        //-----------------------------------------------------

        $js_files=array_unique($js_files);
        $css_files=array_unique($css_files);

        foreach($js_files as $js_file){
            echo '<script src="/' . addslashes($js_file) . '"></script>'."\r\n    ";
        }
        foreach($css_files as $css_file){
            echo '<link rel="stylesheet" href="/' . addslashes($css_file) . '"/>'."\r\n    ";
        }

        //-----------------------------------------------------

    }else{
        echo '<script src="/app-build/js/towns.min.js"></script>'."\r\n    ";
        echo '<link rel="stylesheet" href="/app-build/css/towns.min.css" async/>'."\r\n";

        /*?>
            <link rel="stylesheet" type="text/css" href="/app-build/css/towns.min.css"/>
            <script src="/app-build/js/towns.min.js" async></script>
        <?php*/
    }
    //--------------------------------

    ?>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->



    <link rel="alternate" type="application/rss+xml" title="RSS" href="<?=addslashes($config['app']['blog']['rss_feed'])?>">


</head>
<body>


<?php if (isset($config['app']['google']['tracking_id'])) : ?>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Tracking|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
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
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
<?php endif; ?>



    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Tracking|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <script type="text/javascript">
        window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},s=d.getElementsByTagName('script')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='//rec.getsmartlook.com/bundle.js';s.parentNode.insertBefore(c,s);
        })(document);
        smartlook('init', '1c0e43faacf49eba3de68d138e0d42646399d313');
    </script>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->



    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Messages|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="loading">
        <i class="fa fa-spinner faa-spin animated"></i>
    </div>



    <div id="message-zone"></div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Map|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--todo delete
    <div id="map_drag"></div>



    <canvas id="map_buffer" width="100" height="100"></canvas>
    <div id="map-move"></div>
    <div id="map-stories"></div>
    <div id="map-out"></div>
    <canvas id="map_bg" width="100" height="100"></canvas><!--todo Maybe refactor map_bg to map?-->
    <canvas id="map-canvas-new"></canvas>
    <div id="fps"></div>

    <style>
        #map-canvas-new {
            width: 100%;
            height: 100%;
            touch-action: none;
            /*border: 2px solid #000;*/
        }

        #fps {

            display: none;

            position: fixed;
            top:60px;
            right:50px;

            font-size: 2em;
            color: #ff0906;
        }
    </style>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Tool control|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

    <!--todo delete
    <div id="selecting-distance">
        <canvas id="selecting-distance-2d" width="100" height="50"></canvas>
        <canvas id="selecting-distance-3d" width="100" height="50"></canvas>
    </div>-->

    <div id="selecting-distance-ctl" style="display: none;">
        <div id="selecting-distance-plus" class="button-icon" title="<?=locale('ui tool controls plus')?>"><i class="fa fa-plus"></i></div>
        <div id="selecting-distance-minus" class="button-icon" title="<?=locale('ui tool controls minus')?>"><i class="fa fa-minus"></i></div>
        <div id="selecting-distance-left" class="button-icon" title="<?=locale('ui tool controls left')?>"><i class="fa fa-angle-double-left"></i></i></div>
        <div id="selecting-distance-right" class="button-icon" title="<?=locale('ui tool controls right')?>"><i class="fa fa-angle-double-right"></i></i></div>
        <div id="selecting-distance-close" class="button-icon" title="<?=locale('ui tool controls close')?>"><i class="fa fa-times"></i></div>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->


    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Map control|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="map-ctl">
        <div id="map-ctl-creating" class="button-icon disabled" title="<?=locale('map mode creating')?>"><i class="fa fa-paint-brush" aria-hidden="true"></i></div>
        <div id="map-ctl-moving" class="button-icon" title="<?=locale('map mode moving')?>"><i class="fa fa-arrows" aria-hidden="true"></i></div>
        <div id="map-ctl-rotating" class="button-icon" title="<?=locale('map mode rotating')?>"><i class="fa fa-repeat" aria-hidden="true"></i></div>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->



    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Map control|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--<div id="map-ctl">
        <div id="map-plus" class="button-icon" title="<?=locale('ui map controls plus')?>"><i class="fa fa-plus"></i></div>
        <div id="map-minus" class="button-icon" title="<?=locale('ui map controls minus')?>"><i class="fa fa-minus"></i></div>
        <div id="map-left" class="button-icon" title="<?=locale('ui map controls left')?>"><i class="fa fa-undo"></i></i></div>
        <div id="map-right" class="button-icon" title="<?=locale('ui map controls right')?>"><i class="fa fa-repeat"></i></i></div>
    </div>-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Shortcut plugins|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="macros">

        <!--<div onclick="objectPrototypesMenu('building','main');T.Plugins.open('building-editor',0,-1);return false;" class="button-icon" title="<?/*=locale('ui macros create building')*/?>"><i class="fa fa-building-o"></i></div>


        <div onclick="objectPrototypesMenu('building','wall');T.Plugins.open('building-block-editor',0,-1);return false;" class="button-icon" title="<?/*=locale('ui macros create building block')*/?>"><i class="fa fa-cube"></i></div>-->

        <div class="button-icon" onclick="T.Plugins.open('feedback')"><i class="fa fa-comment"></i></div>

    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Main menu|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <nav class="menu">

        <!--todo [PH] vyřešit nějak lépe lokacizaci v aplikaci-->
        <div class="menu-logo">
            <img onclick="T.Plugins.open('home')" src="/media/image/icons/logo.png" alt="<?=locale('ui logo')?>"/>

        </div>


        <ul class="menu-list menu-list-left">

            <li class="menu-list-item logged-in" style="display:none">
                <a><?=locale('ui menu nature')?></a>

                <ul class="menu-dlist">
                    <li class="menu-dlist-item"><a onclick="T.UI.Menu.Prototypes.menu('terrain');return false;"><?=locale('ui menu nature main')?></a></li>
                </ul>
            </li>

            <li class="menu-list-item logged-in" style="display:none">
                <a><?=locale('ui menu buildings')?></a>

                <ul class="menu-dlist">
                    <li class="menu-dlist-item"><a onclick="T.UI.Menu.Prototypes.menu('building','main');return false;"><?=locale('ui menu buildings main')?></a></li>
                    <li class="menu-dlist-item"><a onclick="T.UI.Menu.Prototypes.menu('building','wall');return false;"><?=locale('ui menu buildings wall')?></a></li>
                    <li class="menu-dlist-item"><a onclick="T.UI.Menu.Prototypes.menu('building','path');return false;"><?=locale('ui menu buildings path')?></a></li>
                    <!--<li class="menu-dlist-item"><a onclick="T.UI.Menu.Prototypes.menu('building','block');return false;"><?=locale('ui menu buildings block')?></a></li>-->
                    <li class="menu-dlist-item"><a onclick="T.UI.Menu.Building.dismantlingStart();return false;"><?=locale('ui menu buildings dismantle')?></a></li>
                </ul>
            </li>

            <li class="menu-list-item logged-in" style="display:none">
                <a><?=locale('ui menu stories')?></a>

                <ul class="menu-dlist">
                    <li class="menu-dlist-item">

                        <a onclick="T.UI.Menu.Story.start(T.User.object_prototypes.filterTypes('story').getAll()[0].id);T.UI.Message.info(T.Locale.get('story hint'));return false;"><?=locale('ui menu stories write')?></a>



                    </li>
                </ul>
            </li>


            <?php if (isset($config['app']['environment']) && $config['app']['environment'] != "production"): ?>
            <li class="menu-list-item" id="menu-list-item-data">
                <a><?=locale('ui menu develop')?></a>



                <ul class="menu-dlist">

                    <li class="menu-dlist-info"><?=locale('ui menu develop info')?></li>
                    <li class="menu-dlist-item"><a onclick="map_bg.downloadCanvas();"><?=locale('ui menu develop screenshot')?></a></li>
                    <li class="menu-dlist-item"><a onclick="T.Plugins.open('locale-write')"><?=locale('ui menu develop locale write')?> (<span id="locale-write-count">0</span>)</a></li>
                    <li class="menu-dlist-item"><a onclick="window.open( './', 'Towns', 'channelmode=no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, titlebar=no, width=800, height=600, left=100, top=100' );"><?=locale('ui menu develop window')?></a></li>
                    <li class="menu-dlist-item"><a onclick="T.Plugins.open('deleting')"><?=locale('ui menu develop deleting')?></a></li>

                </ul>
            </li>
            <?php endif; ?>



        </ul>




        <ul class="menu-list menu-list-right">


            <li class="menu-list-item" id="resources">
            </li>

            <li class="menu-list-item">
                <button class="width-middle pale logged-out" style="display:none" onclick="T.Plugins.open('home')"><?=locale('ui buttons about game')?></button><!--todo refactor atribute content to ?page-->
                <button class="width-middle logged-out js-townsapi-online" style="display:none" onclick="T.Plugins.open('register')"><?=locale('ui buttons register')?></button><!--todo refactor atribute content to ?page-->
                <button class="width-middle pale logged-out js-townsapi-online" style="display:none" onclick="T.Plugins.open('login')"><?=locale('ui buttons login')?></button><!--todo refactor atribute content to ?page-->

            </li>


            <?php /*<li class="menu-list-item menu-list-item-icon js-menu-top-popup-open faa-parent animated-hover" page="notifications" >
                <i class="fa fa-flag fa-lg faa-shake"></i>
            </li>*/ ?>


            <li class="menu-list-item menu-list-item-icon faa-parent animated-hover">

                <i id="server-loading" style="display: none;" class="fa fa-spinner faa-spin animated"></i>
                <i id="server-ok" class="fa fa-check-circle"></i>
                <i id="server-error" style="display: none;" class="fa fa-exclamation-triangle"></i>

            </li>


            <li class="menu-list-item menu-list-item-icon js-menu-top-popup-open logged-in" page="user" style="display:none"><!--faa-parent animated-hover-->

                <i class="fa fa-user"></i>

            </li>




        </ul>

        <div class="cleaner"></div>
    </nav>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Left menu|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <aside id="objectmenu">
        <div id="objectmenu-inner">
        </div>
    </aside>


    <div id="popup-action">
        <div class="arrow"></div>
        <div class="content"></div>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Window popup|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div class="overlay" style="display: <?= addslashes($inner_window['display']) ?>;"></div>
    <div class="popup-window" style="display: <?= addslashes($inner_window['display']) ?>;">
        <div class="header"><?=htmlspecialchars($inner_window['header'])?></div>
        <div class="content"><?=$inner_window['content']?></div>


        <div class="back js-popup-window-back" style="display: none;" onclick="window.history.back();"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
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
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|Top menu popup|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <?php

    $menu_top_popups = array(/*'notifications','server',*/'user');

    foreach($menu_top_popups as $menu_top_popup){
    ?>
    <div class="menu-top-popup" id="menu-top-popup-<?=$menu_top_popup?>"><!--todo  unify ui names-->
        <div class="arrow"></div>
        <div class="header"></div>
        <div class="content">


        </div>
        <div class="footer">
            <a href="#"><?=locale('ui menu top popup '.$menu_top_popup.' footer')?></a>
        </div>
    </div>
    <?php } ?>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->




</body>
</html>


<?php
// this will be called implicitly, but we'll
// call it manually to illustrate the point.
ob_end_flush();
?>