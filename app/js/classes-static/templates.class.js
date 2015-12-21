



//======================================================================================================================
/*
 ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗███████╗
 ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔════╝
    ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  ███████╗
    ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ╚════██║
    ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗███████║
    ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
 */


var Templates={};



Templates.objectMenu = function(params){


    return `<div class="action-wrapper">

        <div class="action js-popup-action-open"`+

            (defined(params.icon)?` style="background: url('`+params.icon+`');background-size: cover;"`:``)+
            (defined(params.title)?` title="`+params.title+`"`:``)+
            (defined(params.content)?` content="`+params.content+`"`:``)+
            (defined(params.action)?` action="`+params.action+`"`:``)+`>`+
            (defined(params.inner)?params.inner:``)+

        `</div>
    </div>
    `;
};



