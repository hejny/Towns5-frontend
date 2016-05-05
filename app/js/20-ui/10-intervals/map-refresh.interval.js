/**
 * @author ©Towns.cz
 * @fileOverview Creates map refresh interval
 */
//======================================================================================================================
T.setNamespace('UI.Intervals');



T.UI.Intervals.map_refresh = setInterval(function(){


    T.UI.Map.loadMap(true);


},10000);