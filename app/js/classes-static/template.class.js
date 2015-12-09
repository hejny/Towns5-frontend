



//======================================================================================================================
/*
 ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗███████╗
 ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔════╝
    ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  ███████╗
    ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ╚════██║
    ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗███████║
    ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
 */


var Template={};


Template.get = function(templateName,vars){

    var template = Template.html[templateName];

    if(!is(template))throw 'Template '+templateName+' do not exist.'


    for(var key in vars){

        //r(key,vars[key]);
        if(typeof vars[key]!='string')throw 'Var '+key+' is not string.'

        template=template.split('%'+key).join(vars[key].htmlEncode());

    }

    return(template);

};



//======================================================================================================================
 //todo should be template loading here
//todo vars should be like {{key}} not like %key


Template.html={};

$(function(){

    //todo make templates better - maybe class
    Template.html.objectmenu = $('#objectmenu-inner').html()
        .split('template_params')
        .join('style="background: url(\'%icon\');background-size: cover;" title="%title" content="%content" action="%action"');//todo do content - help better
    //todo in action use callback not string
    //todo here should be htmlencode

});
