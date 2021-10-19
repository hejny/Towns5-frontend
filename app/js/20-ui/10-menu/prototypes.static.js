/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown to create story.
 */
//======================================================================================================================
T.setNamespace("UI.Menu");

T.UI.Menu.Prototypes = class {
  static menu(type, subtype = false) {
    r("ObjectPrototypesMenu " + type + " " + subtype);

    var object_menu_html = "";

    //------------------------Extra buttons
    if (type == "building" && subtype == "block") {
      object_menu_html += T.Templates.menu({
        icon: "/media/image/icons/add.svg",
        icon_size: 0.55,
        title: "",
        content: content,
        action: `mapSpecialCursorStop();T.Plugins.open('building-block-editor',0,-1);`,
      });
    }

    /*if (type == 'building' && subtype == 'main') {
        object_menu_html += T.Templates.menu({
            icon: '/media/image/icons/add.svg',
            icon_size: 0.55,
            title: '',
            content: content,
            action:
    `mapSpecialCursorStop();T.Plugins.Pages.open('building_editor');`
        });
    }*/
    //------------------------.

    T.User.object_prototypes.forEach(function (object) {
      if (object.type == type && (!is(subtype) || object.subtype == subtype)) {
        //----------------------------------------------------

        var icon,
          icon_size = 1,
          title = object.name,
          content = "",
          action = "";

        //------------------------building
        if (object.type == "building") {
          icon = object.getModel().createIcon(50);
          // r(icon);
          // content='popis budovy';
          action = "T.UI.Menu.Building.start('" + object.id + "');"; // todo refactor all object.id to object._id

          content += T.World.game.getObjectPrice(object).toHTML();
        }
        //------------------------

        //------------------------terrain
        if (object.type == "terrain") {
          if (object.getCode() == 14) return; // todo better

          icon =
            appDir +
            "/php/terrain.php?raw&size=60&terrain=t" +
            object.getCode();
          action = "T.UI.Menu.Terrains.start('" + object.id + "');";
          icon_size = 1.2;

          title = T.Locale.get("object terrain", object.getCode());
          content +=
            '<img width="280" height="140" src="' +
            (appDir +
              "/php/terrain.php?raw&size=280&terrain=t" +
              object.getCode()) +
            '">';
          // content+= T.Locale.get('object
          // terrain',object.getCode(),'description');
        }
        //------------------------

        //------------------------story
        if (object.type == "story") {
          icon = "media/image/terrain/t1.png";
          action = "T.UI.Menu.Story.start('" + object.id + "');";
        }
        //------------------------

        //------------------------Viewers, Editors
        ["view", "edit"].forEach(function (action) {
          var possible = T.Plugins.search(action, object);
          possible = possible.map(function (item) {
            return (
              `<button onclick="T.Plugins.open('` +
              item +
              `',0,'` +
              object.id +
              `')">` +
              T.Locale.get(
                "plugin",
                item,
                "open",
                object.type,
                object.subtype,
                action
              ) +
              `</button>`
            );
          });
          possible = possible.join("");

          content += possible;
          /*objectmenu+=T.Templates.T.UI.Menu.Object.menu({
           icon: '/media/image/icons/'+action+'.svg',
           icon_size: 0.8,
           title: T.Locale.get(object.type,object.subtype,action),
           content:
           T.Locale.get(object.type,object.subtype,action,'description')+possible
           });*/
        });
        //------------------------

        object_menu_html += T.Templates.menu({
          icon: icon,
          icon_size: icon_size,
          selectable: true,
          title: title,
          content: content,
          action: action,
        });

        //----------------------------------------------------
      }
    });

    showLeftMenu(object_menu_html);
  }
};
