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

    if(idDefined(params.icon)){
        inner.attr('style',`background: url('`+params.icon+`');background-size: `+params.icon_size+`% `+params.icon_size+`%;background-position: center  center;background-repeat: no-repeat;`);//todo via $.css
    }


    if(idDefined(params.title)){
        inner.attr('popup_title',params.title);
    }

    if(idDefined(params.content)){
        inner.attr('content',params.content);
    }

    if(idDefined(params.action)){
        inner.attr('action',params.action);
    }

    if(idDefined(params.selectable)){
        inner.attr('selectable',1);
    }else{
        inner.attr('selectable',0);
    }

    if(idDefined(params.inner)){
        inner.html(inner);
    }


    return '<div class="action-wrapper">'+inner[0].outerHTML+'</div>';
};



