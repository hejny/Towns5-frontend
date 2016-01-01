/**
 * @author Towns.cz
 * @fileOverview Load and display XML blog FEED
 */
//======================================================================================================================


//todo refactor dont load feed_url twice - precache it

$.get(feed_url, function (data) {

    r('LOADED BLOG FEED');

    var html='',
        limit=6;

    $(data).find("item").each(function () {
        if(limit<=0)return;
        limit--;

        var el = $(this);

        html+=[
            '<a class="towns-window" href="' +el.find("link").text()+ '" title="'  +el.find("title").text()+  '" target="_blank">',
            el.find("title").text()
        ].join('');

    });


    $("#notifications").html(html);
    uiScript();
});