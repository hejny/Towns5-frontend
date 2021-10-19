/**
 * @author ©Towns.cz
 * @fileOverview Creates Class Viewer
 */
//======================================================================================================================

T.Plugins.Viewer = class {
  /**
   * Creates object viewer
   * @param {string} uri
   * @param {object} conditions of opened object
   * @param {string} title
   * @param {string} content
   * @param {function} open_callback
   * @constructor
   */
  constructor(uri, conditions, title, content, open_callback) {
    this.uri = uri;
    this.conditions = conditions;

    var self = this;
    this.page = new T.Plugins.Page(
      uri,
      title,
      `
            <div class="button-icon"  id="viewer-object-position" title="{{object show on map}}"><i class="fa fa-map-marker" aria-hidden="true"></i>
</div>
            <div class="button-icon"  id="viewer-object-edit" title="{{object edit}}"><i class="fa fa-pencil" aria-hidden="true"></i></div>
            <div class="button-icon"  id="viewer-object-delete" title="{{object delete}}"><i class="fa fa-trash-o"></i></div>
            ` + content
    );

    this.open_callback = open_callback;

    this.opened = false;
  }

  /**
   * Open viewer
   * @param {number} collection 0=T.User.object_prototypes, 1=objects_external
   * @param {string} id
   */
  open(collection, id) {
    var viewer = this;

    viewer.opened = { collection: collection };

    var object_ready = function () {
      T.URI.object = viewer.opened.object.id;

      viewer.page.open(
        function (open_callback, object) {
          //-----------------------------------------

          open_callback(object, $(".popup-window .content")[0]); // todo refactor not DI popup window content but
          // use static container with function T.ui.get();

          //-----------------------------------------

          //-----------------Position
          $("#viewer-object-position").click(function (e) {
            T.UI.Map.map_center = object.getPosition();
            T.UI.Map.loadMap(true);
            T.UI.popupWindow.close();
          });
          //-----------------

          //-----------------Edit
          $("#viewer-object-edit").click(function (e) {
            if (object.type == "story") {
              T.Plugins.open("story-editor", 1, object.id); // todo better switching between viewers and editors
            } else {
              throw new Error(
                "todo better switching between viewers and editors"
              );
            }
          });
          //-----------------

          //-----------------Delete
          $("#viewer-object-delete").click(function (e) {
            if (confirm(T.Locale.get(object.type, "delete", "confirm"))) {
              T.UI.popupWindow.close();
              deleteObject(object.id, function (result) {
                if (result) {
                  T.UI.Message.success(
                    T.Locale.get(object.type, "delete", "success")
                  );
                } else {
                  T.UI.Message.error(
                    T.Locale.get(object.type, "delete", "error")
                  );
                }
              }); // todo smarter deleting of objects
            }
          });
          //-----------------
        },
        [viewer.open_callback, viewer.opened.object]
      );
    };

    if (collection === 0) {
      viewer.opened.object = T.User.object_prototypes.getById(id); // T.ArrayFunctions.id2item(T.User.object_prototypes,id);
      r("Opening object prototype " + viewer.opened.object.name + ".");

      object_ready();
    } else if (collection == 1) {
      viewer.opened.object = objects_external.getById(id); // T.ArrayFunctions.id2item(objects_external,id);

      if (viewer.opened.object) {
        r(
          "Opening object " +
            viewer.opened.object.name +
            " directly from objects_external."
        );
        object_ready();
      } else {
        T.TownsAPI.townsAPI.get(
          "objects/" + id,
          {},
          function (response) {
            viewer.opened.object = T.Objects.Array.initInstance(response);

            r(
              "Opening object " +
                viewer.opened.object.name +
                " loaded from API."
            );
            object_ready();
          },
          function () {
            T.UI.popupWindow.open(
              T.Locale.get("page", "404", "title"),
              T.Locale.get("page", "404", "content"),
              false,
              "SMALL"
            );
          }
        );
      }
    } else {
      throw new Error(
        "" + collection + " is invalid identificator of collection!"
      );
    }
  }
};
