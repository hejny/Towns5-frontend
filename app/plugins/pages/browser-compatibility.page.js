/**
 * @author ©Towns.cz
 * @fileOverview Information about offline mode
 */
//======================================================================================================================



T.Plugins.install(new T.Plugins.Page(
    'browser-compatibility',
    T.Locale.get('page','compatibility'),
    ``
    ,function(page){


        compatibility = T.UI.Compatibility.check(false);


        table=[];
        for(var key in compatibility){

            var row=[];
            if(compatibility[key]){

                row.push('<span style="font-size: 2.5em;color:#00ff00;"><i class="fa fa-check-circle-o"></i></span>');



            }else{

                row.push('<span style="font-size: 2.5em;color:#ff0000;"><i class="fa fa-times-circle-o"></i></span>');


            }

            row.push('<h3>'+T.Locale.get('compatibility',key).text2html()+'</h3>');


            table.push(row);


            if(!compatibility[key]){
                table.push([T.Locale.get('compatibility',key,'help')]);
            }


        }


        $(page).html(T.ArrayFunctions.array2table(table,'full'));





    },
    undefined,
    'SMALL'
));

