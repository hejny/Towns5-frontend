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

    return `<div class="action-wrapper">

        <div class="action js-popup-action-open"`+

            (defined(params.icon)?` style="background: url('`+params.icon+`');background-size: `+params.icon_size+`% `+params.icon_size+`%;background-position: center  center;background-repeat: no-repeat;"`:``)+
            (defined(params.title)?` popup_title="`+params.title+`"`:``)+//todo towns:title as xml namespace
            (defined(params.content)?` content="`+params.content+`"`:``)+
            (defined(params.action)?` action="`+params.action+`"`:``)+
            (is(params.selectable)?` selectable="1"`:` selectable="0"`)+`>`+
            (defined(params.inner)?params.inner:``)+

        `</div>
    </div>
    `;
};



