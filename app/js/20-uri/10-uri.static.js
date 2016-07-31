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
        var uri = URI(window.location);
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


        var query = uri.query(true);


        var position;

        if (typeof query.x !== 'undefined' && typeof query.y !== 'undefined') {

            map_center = new T.Position(T.TMath.toFloat(query.x), T.TMath.toFloat(query.y));

        } else {

            map_center.x = -1500;
            map_center.y = -2900;

            //map_center.x=(Math.random()-0.5)*1000000;
            //map_center.y=(Math.random()-0.5)*1000000;

        }

        if (isNaN(map_center.x) || isNaN(map_center.y)) {
            throw new Error('Map x or y is NaN.');
        }

        //-------------------

    }


    static readAndUpdate() {

        var position_last = map_center.toString();
        var plugin_last = this.plugin;
        var object_last = this.object;

        r('Reading And Updating T.URI');
        this.read();



        if(position_last !== map_center.toString()){
            r('Reading And Updating T.URI - Position was changed');

            T.Map.loadMap(true);
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

        var search;

        if (isDefined(map_center.x)) {
            //var hash = '#'+Math.round(T.URI.position.x)+','+Math.round(T.URI.position.y);
            search = '?x=' + Math.round(map_center.x) + '&y=' + Math.round(map_center.y);
        } else {
            search = '';
        }


        window.history.pushState('', "Towns", window.location.origin + pathname + search);

    }


};


T.URI.object = '';//todo better
T.URI.plugin = '';
T.URI.writed = 0;