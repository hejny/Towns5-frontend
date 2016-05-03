

//document.getElementById("para1").innerHTML = dateToSmartString(new Date('2016-01-01T13:39:45.794Z'));



function dayOfUniverse(date){
    return Math.round((date)/8.64e7);
}


function dateToSmartString(date) {


    var now = new Date();


    var day_name;
    if(dayOfUniverse(date)==dayOfUniverse(now)){

        day_name='Dnes';

    }else
    if(dayOfUniverse(date)==dayOfUniverse(now)-1){

        day_name='Včera';

    }else
    if(dayOfUniverse(date)==dayOfUniverse(now)-2){

        day_name='Předevčírem';

    }else{

        return (date.getDay()+1)+'.'+(date.getMonth()+1)+'.'+date.getFullYear();

    }

    return day_name+' v '+date.getHours()+':'+date.getMinutes();

}