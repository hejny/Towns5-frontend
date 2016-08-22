/**
 * @author ©Towns.cz
 * @fileOverview Creates object TOWNS.Templates with static methods
 */
//======================================================================================================================
TOWNS.setNamespace('UI');




/**
 * Container of html templates
 */
TOWNS.Templates=class {


    /**
     * left menu item //todo objectmenu vs leftmenu?
     * @static
     * @param {object} params
     * @return {string} html
     */
    static menu(params) {

        if (!is(params.icon_size))params.icon_size = 1;
        params.icon_size = Math.round(params.icon_size * 100);


        var inner = $(`<div class="action js-popup-action-open js-left-menu-item"></div>`);

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
    }


};