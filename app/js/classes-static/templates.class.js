/**
 * @author ©Towns.cz
 * @fileOverview Creates object Templates with static methods
 */
//======================================================================================================================

/**
 * Container of html templates
 */
var Templates={};


/**
 * left menu item //todo objectmenu vs leftmenu?
 * @static
 * @param {object} params
 * @return {string} html
 */
Templates.objectMenu = function(params){

    if(!is(params.icon_size))params.icon_size=1;
    params.icon_size=Math.round(params.icon_size*100);


    var inner=$(`<div class="action js-popup-action-open"></div>`);

    if(defined(params.icon)){
        inner.attr('style',`background: url('`+params.icon+`');background-size: `+params.icon_size+`% `+params.icon_size+`%;background-position: center  center;background-repeat: no-repeat;`);//todo via $.css
    }


    if(defined(params.title)){
        inner.attr('popup_title',params.title);
    }

    if(defined(params.content)){
        inner.attr('content',params.content);
    }

    if(defined(params.action)){
        inner.attr('action',params.action);
    }

    if(defined(params.selectable)){
        inner.attr('selectable',1);
    }else{
        inner.attr('selectable',0);
    }

    if(defined(params.inner)){
        inner.html(inner);
    }


    return '<div class="action-wrapper">'+inner[0].outerHTML+'</div>';
};



