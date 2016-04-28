/**
 * @author Towns.cz
 * @fileOverview HTML form functions
 */
//======================================================================================================================
T.setNamespace('UI.Html');



T.UI.Html.Form = class{



    static addRangeNumber(unbind_input=true){

        //r('addRangeNumber');

        //--------------------------------------------delete

        $('input[type="range"].range-number').each(function () {

            $(this).removeClass('range-number');

            //todo unbind_input

        });

        $('input[type="number"].range-number').each(function () {

            $(this).remove();

        });
        //--------------------------------------------

        //--------------------------------------------Add
        $('input[type="range"]').each(function () {

            var input_range=$(this);
            var input_number = $('<input type="number" />');

            input_range.addClass('range-number');
            input_number.addClass('range-number');

            input_number.attr('max',input_range.attr('max'));//todo for
            input_number.attr('min',input_range.attr('min'));
            input_number.attr('step',input_range.attr('step'));
            input_number.val(input_range.val());


            input_number.bind('input',function(){

                var value = $(this).val();

                input_range.val(value);
                input_range.trigger('input');


            });


            input_range.bind('input',function(){

                var value = $(this).val();

                input_number.val(value);

            });


            input_range.after(input_number);

            //todo strict mode//delete input_number;


        });
        //--------------------------------------------

    }



};

