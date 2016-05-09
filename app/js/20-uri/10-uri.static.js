/**
 * @author ©Towns.cz
 * @fileOverview Creates T.URI
 */
//======================================================================================================================

T.URI=class {

    /**
     * Initialize T.URI pathname from location
     */
    static read() {

        //-------------------
        var pathname = window.location.pathname;

        pathname = pathname.split('/').join(' ');
        pathname = $.trim(pathname);

        pathname = pathname.split(' ');

        /*pathname.map(function(item){
         return item.split('/').join('');

         });*/

        this.object = false;
        this.plugin = false;


        if (pathname.length == 1) {
            this.plugin = pathname[0];
        } else if (pathname.length == 2) {
            this.plugin = pathname[0];
            this.object = pathname[1];
        } else {
            /*throw new Error*/r('T.URI T.Pathname can contain max 2 strings.');
        }

        //-------------------
        var hash = window.location.hash;

        hash = hash.substring(1);
        hash = hash.split(',');

        var position;

        if (hash.length == 2) {

            position = new T.Position(T.Math.toFloat(hash[0]), T.Math.toFloat(hash[1]));
        }

        //-------------------


        if (is(position)) {

            T.UI.Map.map_center.x = position.x;//todo Static object Map
            T.UI.Map.map_center.y = position.y;

        } else {

            T.UI.Map.map_center.x = 2962;
            T.UI.Map.map_center.y = 1976;

            //T.UI.Map.map_center.x=(Math.random()-0.5)*1000000;
            //T.UI.Map.map_center.y=(Math.random()-0.5)*1000000;

        }

        if (isNaN(T.UI.Map.map_center.x) || isNaN(T.UI.Map.map_center.y)) {
            throw new Error('Map x or y is NaN.');
        }

        //-------------------

    }


    static readAndUpdate() {

        var position_last = T.UI.Map.map_center.toString();
        var plugin_last = this.plugin;
        var object_last = this.object;

        r('Reading And Updating T.URI');
        this.read();



        if(position_last !== T.UI.Map.map_center.toString()){
            r('Reading And Updating T.URI - Position was changed');
            T.UI.Map.loadMapAsync();
        }



        if(plugin_last !== this.plugin || object_last !== this.object){

            if(this.plugin){

                if(!T.Plugins.is(this.plugin)){

                    T.UI.popupWindow.open(T.Locale.get('page','404','title'), T.Locale.get('page','404','content'), false, 'SMALL');
                    return;

                }


                if(this.object){

                    r('Reading And Updating T.URI - Opening plugin with object');
                    T.Plugins.open(this.plugin,1,this.object);
                }else{

                    r('Reading And Updating T.URI - Opening plugin without object');
                    T.Plugins.open(this.plugin);
                }

            }else{

                r('Reading And Updating T.URI - Closing window');
                T.UI.popupWindow.close();

            }




        }


    }


    /**
     * Updates window.location after updating object, plugin or position
     */
    static write() {

        T.URI.writed++;

        var pathname = '';
        if (this.plugin) pathname += '/' + this.plugin;
        if (this.object && this.plugin) pathname += '/' + this.object;

        if (pathname === '') pathname = '/';

        var hash;

        if (isDefined(T.UI.Map.map_center.x)) {
            //var hash = '#'+Math.round(T.URI.position.x)+','+Math.round(T.URI.position.y);
            hash = '#' + Math.round(T.UI.Map.map_center.x) + ',' + Math.round(T.UI.Map.map_center.y);
        } else {
            hash = '';
        }


        window.history.pushState('', "Towns", window.location.origin + pathname + hash);

    }


};


T.URI.object = '';//todo better
T.URI.plugin = '';
T.URI.writed = 0;