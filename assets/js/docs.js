$(document).ready(function() {
    $("div.docs > div.category > div.category-item > div.series > div.series-item").hide();
})

$("div.docs > div.category > div.category-head > div.category-title > i").click(function() {
    var target = $(this).closest("div.category-head").siblings("div.category-item");
    var arrow = $(this);

    if(target.is(":visible")) {
        target.hide();
        arrow.removeClass("fa-angle-down");
        arrow.addClass("fa-angle-right");
    } else {
        target.show();
        arrow.removeClass("fa-angle-right");
        arrow.addClass("fa-angle-down");
    }
})

$("div.docs > div.category > div.category-item > div.series > div.series-head > div.series-title > i").click(function() {
    var target = $(this).closest("div.series-head").siblings("div.series-item");
    var arrow = $(this);

    if(target.is(":visible")) {
        target.hide();
        arrow.removeClass("fa-angle-down");
        arrow.addClass("fa-angle-right");
    } else {
        target.show();
        arrow.removeClass("fa-angle-right");
        arrow.addClass("fa-angle-down");
    }
})