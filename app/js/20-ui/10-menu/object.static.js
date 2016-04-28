/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown when user select building.
 */
//======================================================================================================================
T.setNamespace('T.UI.Menu');


T.UI.Menu.Object = class {
    

    static menu() {
        
        r('T.UI.Menu.Object.menu');


        $('#objectmenu').stop(true, true);

        if (map_selected_ids.length > 0) {

            //--------------------------------------------------

            var id = map_selected_ids[0];

            var object = T.ArrayFunctions.id2item(objects_external, id);


            var objectmenu = '';

            var icon, content;


            ['view', 'edit'].forEach(function (action) {


                var possible = T.Plugins.search(action, T.ArrayFunctions.id2item(objects_external, id));
                possible = possible.map(function (item) {
                    return (`<button onclick="T.Plugins.open('` + item + `',1,'` + id + `')">` + T.Locale.get('plugin', item, 'open', object.type, object.subtype, action) + `</button>`);
                });
                possible = possible.join('');
                objectmenu += T.Templates.T.UI.Menu.Object.menu({
                    icon: '/media/image/icons/' + action + '.svg',
                    icon_size: 0.8,
                    title: T.Locale.get(object.type, object.subtype, action),
                    content: T.Locale.get(object.type, object.subtype, action, 'description') + '<br>' + possible
                });

            });


            objectmenu += T.Templates.T.UI.Menu.Object.menu({
                icon: '/media/image/icons/clone.svg',
                icon_size: 0.8,
                title: T.Locale.get(object.type, object.subtype, 'clone'),
                content: T.Locale.get(object.type, object.subtype, 'clone', 'description'),
                action: 'T.UI.Menu.Building.start(\'' + object._prototypeId + '\');'
            });


            objectmenu += T.Templates.T.UI.Menu.Object.menu({
                icon: '/media/image/icons/dismantle.svg',
                icon_size: 0.8,
                title: T.Locale.get(object.type, object.subtype, 'dismantle'),
                content: T.Locale.get(object.type, object.subtype, 'dismantle', 'description'),
                action: 'dismantleUI(\'' + id + '\');'
            });


            showLeftMenu(objectmenu);

        } else {

            hideLeftMenu();

        }


    }
    
    

};