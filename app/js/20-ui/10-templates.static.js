/**
 * @author ©Towns.cz
 * @fileOverview Creates object T.Templates with static methods
 */
//======================================================================================================================

/**
 * Container of html templates
 */
T.Templates=class {


    /**
     * left menu item //todo objectmenu vs leftmenu?
     * @static
     * @param {object} params
     * @return {string} html
     */
    static objectMenu(params) {

        if (!is(params.icon_size))params.icon_size = 1;
        params.icon_size = Math.round(params.icon_size * 100);


        var inner = $(`<div class="action js-popup-action-open"></div>`);

        if (isDefined(params.icon)) {
            inner.attr('style', `background: url('` + params.icon + `');background-size: ` + params.icon_size + `% ` + params.icon_size + `%;background-position: center  center;background-repeat: no-repeat;`);//todo via $.css
        }


        if (isDefined(params.title)) {
            inner.attr('popup_title', params.title);
        }

        if (isDefined(params.content)) {
            inner.attr('content', params.content);
        }

        if (isDefined(params.action)) {
            inner.attr('action', params.action);
        }

        if (isDefined(params.selectable)) {
            inner.attr('selectable', 1);
        } else {
            inner.attr('selectable', 0);
        }

        if (isDefined(params.inner)) {
            inner.html(inner);
        }


        return '<div class="action-wrapper">' + inner[0].outerHTML + '</div>';
    };


};