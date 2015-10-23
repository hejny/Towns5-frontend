/**
 * Created by hejny on 23.10.15.
 */
//======================================================================================================size2size

this.rot2rot = function(rot1,rot2){

    return(((rot1+rot2)/2)%180);

}

//------------------------------------------------------------------------------------------------------------

this.size2size = function(size1,size2){

    size1=Math.pow(size1,3);
    size2=Math.pow(size2,3);

    return(Math.pow(size1+size2,1/3));

}