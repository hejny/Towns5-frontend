/**
 * @author ©Towns.cz
 * @fileOverview Loading and storing images from external URLs
 */
//======================================================================================================================
T.setNamespace("Cache");

T.Cache.ImagesCollection = class {
  /**
   *
   * @param {object} files
   * @param {string} url Prefix of image urls
   * @constructor
   */
  constructor(files, url = "") {
    this.images = {};

    this.images_loaded = 0;
    this.images_count = 0;

    this.files = files;
    this.url = url;
  }

  /**
   * Start loading of images loading
   * @param {function} onload(percent) Callback on each single image load
   */
  load(onload = false) {
    var self = this; // todo maybe refactor use thisImageCollection ???
    this.onload = onload;

    var onload_callback = function () {
      // r('loaded');
      self.images_loaded++;

      if (self.onload) {
        self.onload(self.loaded());
      }
    };

    var onerror_callback = function () {
      r(this);
      throw new Error("Cant load this image!");
    };

    for (var key in this.files) {
      // r('ImagesCollection: start loading '+url+files[key]);

      this.images_count++;

      this.images[key] = new Image();
      this.images[key].src = this.url + this.files[key];
      this.images[key].onload = onload_callback;
      this.images[key].onerror = onerror_callback;
    }
  }

  loaded() {
    var percent = this.images_loaded / this.images_count;
    if (percent > 1) percent = 1;

    return percent;
  }

  get(key) {
    if (typeof this.images[key] === "undefined")
      throw new Error("In this collection is not image with key " + key);
    return this.images[key];
  }

  // todo jsdoc
  getAll(key) {
    return this.images;
  }

  // todo jsdoc
  getInput(NameOfRadios, AdditionalClass = "") {
    var html = "";

    // r(this.files);

    for (var key in this.files) {
      html +=
        `
            <input type="radio" name="` +
        NameOfRadios +
        `" id="` +
        NameOfRadios +
        `-` +
        key +
        `" value="` +
        key +
        `" class="` +
        AdditionalClass +
        `" />
            <label for="` +
        NameOfRadios +
        `-` +
        key +
        `">
                <img src="` +
        this.url +
        this.files[key] +
        `">
            </label>
            `;
    }

    html = '<div class="textures-input">' + html + "</div>";

    // r(html);

    // alert(html);//todo purge Towns from commented alert, r, console.log,
    // ect..
    return html;
  }
};
