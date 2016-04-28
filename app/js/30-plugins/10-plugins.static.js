/**
 * @author Towns.cz
 * @fileOverview Creates static object Plugins - controller of Pages, Editors, Viewers and Buttons
 */
//======================================================================================================================


T.Plugins=class {

    static install(plugin) {
        r('Plugins: Installing plugin ' + plugin.uri);


        if (
            plugin instanceof T.Plugins.Page ||
            plugin instanceof T.Plugins.Viewer ||
            plugin instanceof T.Plugins.Editor
        ) {


            if (!is(plugin.uri)) {

                throw new Error('Plugins: Plugin must contain uri!');
            }


            this.plugins.push(plugin);


        } else {
            throw new Error('Plugins: Unknown plugin type.');
        }

    }




    static uninstall(id) {
        //todo
    }




    static open(uri) {

        var args = [].slice.call(arguments).splice(1);
        //r(args);

        for (var i in this.plugins) {

            //r(this.plugins[i].uri,uri);

            if (this.plugins[i].uri == uri) {


                r('Plugins: Opening plugin ' + this.plugins[i].uri);
                this.plugins[i].open.apply(this.plugins[i], args);
                return (true);

            }
        }


        throw new Error('Plugins: Plugin ' + uri + ' do not exists.');

    }


    static search(action, object) {

        var possible = [];

        for (i in this.plugins) {

            if (
                (action == 'edit' && this.plugins[i] instanceof Towns.Editor) ||
                (action == 'view' && this.plugins[i] instanceof Towns.Viewer)
            ) {

                var is_possible = true;
                for (key in this.plugins[i].conditions) {

                    if (object[key] != this.plugins[i].conditions[key]) {
                        var is_possible = false;
                        break;
                    }

                }

                if (is_possible)
                    possible.push(this.plugins[i].uri);
            }


        }

        return (possible);

    }


};

T.Plugins.plugins = [];//todo better