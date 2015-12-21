

var token;

if(!Storage.is('townsToken')) {

    //--------------Generate token
    token = '';
    for (var i = 0; i < 2; i++)
        token += Math.random().toString(36).substr(2);
    //--------------

    Storage.save('townsToken', token);

    r('new token');

}else{
    token=Storage.load('townsToken');
}

//r(token);
var townsApiUrl='https://towns.cz/world2/api?token='+token+'&locale=&output=jsonp';
//var url='http://towns.local/api/fakeserver.php';