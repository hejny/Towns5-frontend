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
            localStorage: null
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
     * Check if browser supports WebGL rendring context
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

                if (!window.WebGLRenderingContext) {
                    console.log('No WebGLRenderingContext');
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
     * Check if browser supports localStorage
     * @returns {boolean}
     */
    static localStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    };


};