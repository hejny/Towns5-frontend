/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown when user select building.
 */
//======================================================================================================================
TOWNS.setNamespace('UI.Menu');


TOWNS.UI.Menu.Object = class {
    

    static menu() {
        
        r('TOWNS.UI.Menu.Object.menu');


        $('#objectmenu').stop(true, true);

        if (map_selected_ids.length > 0) {

            //--------------------------------------------------

            var id = map_selected_ids[0];
            var object = objects_server.getById(id);

            if(!object){
                throw new Error('Object with selected id '+id+' dont exists in objects_server.');
            }


            if(object.type==='building') {

                var objectmenu = '';

                var icon, content;


                ['view', 'edit'].forEach(function (action) {


                    var possible = TOWNS.Plugins.search(action, object);
                    possible = possible.map(function (item) {
                        return (`<button onclick="TOWNS.Plugins.open('` + item + `',1,'` + id + `')">` + TOWNS.Locale.get('plugin', item, 'open', object.type, object.subtype, action) + `</button>`);
                    });
                    possible = possible.join('');
                    objectmenu += TOWNS.Templates.menu({
                        icon: '/media/image/icons/' + action + '.svg',
                        icon_size: 0.8,
                        title: TOWNS.Locale.get(object.type, object.subtype, action),
                        content: TOWNS.Locale.get(object.type, object.subtype, action, 'description') + '<br>' + possible
                    });

                });
                /**/


                objectmenu += TOWNS.Templates.menu({
                    icon: '/media/image/icons/clone.svg',
                    icon_size: 0.8,
                    title: TOWNS.Locale.get(object.type, object.subtype, 'clone'),
                    content: TOWNS.Locale.get(object.type, object.subtype, 'clone', 'description'),
                    action: 'TOWNS.UI.Menu.Building.start(\'' + object._prototypeId + '\');'
                });


                objectmenu += TOWNS.Templates.menu({
                    icon: '/media/image/icons/dismantle.svg',
                    icon_size: 0.8,
                    title: TOWNS.Locale.get(object.type, object.subtype, 'dismantle'),
                    content: TOWNS.Locale.get(object.type, object.subtype, 'dismantle', 'description'),
                    action: 'dismantleUI(\'' + id + '\');'
                });

                showLeftMenu(objectmenu);

            }else
            if(object.type==='story'){

                TOWNS.Plugins.open('story',1,object.id);
                hideLeftMenu();

            }else{

                console.warn('Unknown object type '+object.type);
                hideLeftMenu();

            }


        } else {

            hideLeftMenu();

        }


    }
    
    

};