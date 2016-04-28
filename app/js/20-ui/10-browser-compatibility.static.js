//todo headers

var Compatibility=class {


    /**
     * tests all
     * @param {boolean} when is all OK returns only true
     * @returns {object}
     */
    static check(simple = true) {

        compatibility = {
            webgl: null,
            requestAnimationFrame: null,
            localT.Storage: null
        };

        var ok = true;

        for (var key in compatibility) {

            compatibility[key] = this[key]();
            if (compatibility[key] == false)ok = false;

        }

        if (ok && simple)
            return true;
        else
            return compatibility;

    };


    /**
     * Check if browser supports T.WebGL rendring context
     * @returns {boolean}
     */
    static webgl() {

        var support = true;

        try {

            var $canvas = $('<canvas />');
            $('body').append($canvas);
            var canvas = $canvas[0];

            if (canvas.addEventListener) {
                canvas.addEventListener("webglcontextcreationerror", function (event) {
                    console.log('webglcontextcreationerror');
                    support = false;
                }, false);
            }

            var context = canvas.getContext('webgl');

            if (!context) {

                console.log('No webgl context');

                if (!window.T.WebGLRenderingContext) {
                    console.log('No T.WebGLRenderingContext');
                }

                support = false;
            }
        }
        catch (e) {
            console.log(e);
        } finally {
            $canvas.remove();
        }

        return support;
    };


    /**
     * Check if browser supports requestAnimationFrame
     * @returns {boolean}
     */
    static requestAnimationFrame() {
        if (window.requestAnimationFrame) {
            return true;
        } else {
            return false;
        }
    };


    /**
     * Check if browser supports localT.Storage
     * @returns {boolean}
     */
    static localT.Storage() {
        try {
            localT.Storage.setItem('test', 'test');
            localT.Storage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    };


};