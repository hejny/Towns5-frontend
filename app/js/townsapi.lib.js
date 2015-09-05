

//var model='[1,1,0][10,10,0][10,90,0][90,90,0][90,10,0][20,20,40][20,80,40][80,20,40][80,80,40][40,80,40][60,80,40][40,90,40][60,90,40][40,90,0][60,90,0][45,90,0][55,90,0][45,90,30][55,90,30][56,84,30][56,84,0][30,30,40][30,70,40][70,70,40][70,30,40][40,40,140][60,40,140][40,60,140][60,60,140][45,45,140][45,55,140][55,55,140][55,45,140][50,50,2500][30,20,40][20,30,40][70,20,40][80,30,40][20,70,40][30,80,40][70,80,40][80,70,40][25,75,150][25,25,150][75,25,150][75,75,150][50,61,140]:14,12,13,15,17,19,18,16;16,18,20,21;13,11,15;14,10,12;3,14,10,7;4,9,11,15;6,7,10,12,13,11,9,8;4,9,8,5;3,7,6,2;2,5,8,6;23,28,29,24;23,28,26,22;22,25,27,26;27,29,24,25;26,27,29,28;31,34,32;32,33,34;30,33,34;30,34,31;41,46,9;9,46,42;42,46,24;24,46,41;25,45,38;45,38,8;45,8,37;45,37,25;44,22,35;44,35,6;6,44,36;36,44,22;39,23,43;23,40,43;7,43,40;7,43,39;28,29,47:666666,663300,666666,666666,CCCCCC,CCCCCC,00CC00,CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC,CCCCCC,003300,003300,FFFF00,FFFF00,FFFF00,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900,FF9900:20';

var townsApiUrl='https://towns.cz/api?token='+/*urlencode($this->token).*/'&locale='+/*urlencode($this->locale).*/'&output=jsonp';
//var url='http://towns.local/api/fakeserver.php';

//======================================================================================================================

function townsApiEscape(query){

    //----------------------Následující escapování se dá udělat výrazně elegantněji, tohle by ale mělo fungovat i ve starších verzích PHP
    var separator='';
    var i,l;
    for(i=0,l=query.length;i<l;i++){

        if(query[i] instanceof Array){

            for(ii=0,ll=query[i].length;ii<ll;ii++){

                query[i][ii]=query[i][ii].split('\\').join('\\\\');
                query[i][ii]=query[i][ii].split(',').join('\\,');
            }

            query[i]=query[i].join(',');

        }

        query[i]=query[i].split('\\').join('\\\\');
        query[i]=query[i].split(',').join('\\,');

    }
    //r(query);
    query=query.join(',');
    //----------------------

    return(query);

}


//======================================================================================================================

function townsApi(query,callback){
    //r('townsApi');

    //output=json - Některé funkce např ad nebo model vrací přímo obrázek. Pokud je v GET parametrech output=json je místo toho vrácen json s klíčem url na daný obrázek.



    query=townsApiEscape(query);

    //r(query);

    var response;

    var request = $.ajax({
        type: 'POST',
        url: townsApiUrl,
        data: {q:query},
        dataType: 'jsonp',
        timeout: 4000000
    });



    request.done(function( data ){
        //r('done');
        //r(data);
        callback(data);
    });


    request.fail(function( jqXHR, textStatus ) {
        r('error');
        //r(data);
    });

    //----------------------

    return(request);
}

//======================================================================================================================

function townsApiMulti(querys,callback){

    var response,data={};

    for(var i= 0,l=querys.length;i<l;i++){
        data['q'+(i+1)]=townsApiEscape(querys[i]);
    }



    var request = $.ajax({
        type: 'POST',
        url: townsApiUrl,
        data: data,
        dataType: 'jsonp',
        timeout: 4000000
    });



    request.done(function( data ){
        //r('done');
        //r(data);
        callback(data);
    });


    request.fail(function( jqXHR, textStatus ) {
        r('error');
        //r(data);
    });

    //----------------------

    return(request);
}

