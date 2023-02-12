var incrementVar = 0;

$(function() {
    $(".inc").click(function() {
        var $input = $(this).prev();
        var newValue = parseInt($input.val()) + 1;
        $input.val(newValue);
        $(this).addClass('a' + newValue); 
        incrementVar = incrementVar + newValue;
    });
    $(".dec").click(function() {
        var $input = $(this).next();
        var newValue = parseInt($input.val()) - 1;
        $input.val(newValue);
        $(this).addClass('a' + newValue); 
        incrementVar = incrementVar + newValue;
    });
});
