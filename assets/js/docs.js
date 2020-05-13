$(window).on('hashchange',function(){ 
    window.location.reload(true); 
});

$(document).ready(function() {
    $("div.docs > div.category > div.category-item > div.series > div.series-item").hide();

    if(window.location.hash.length != 0) {
        var series_label = window.location.hash.substring(1);

        $("div.docs > p.docs-title").hide();
        $("div.docs > p.docs-description").hide();

        $("div.docs > div.category").hide();
        $("div.docs > div.category > div.category-item > div.series").hide();
        
        var target = $("div.docs > div.category > div.category-item > div.series > div.series-head > div.series-title > p.series-" + series_label);
        target.closest("div.category").show();
        target.closest("div.series").show();
        
        target.closest("div.series-head").siblings("div.series-item").show();

        var arrow = target.closest("div.series-title").children("i");
        arrow.removeClass("fa-angle-right");
        arrow.addClass("fa-angle-down");
    }
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
});

$("div.docs > div.category > div.category-head > div.category-title > p.category-title").click(function() {
    var target = $(this).closest("div.category-head").siblings("div.category-item");
    var arrow = $(this).closest("div.category-title").children("i");

    if(target.is(":visible")) {
        target.hide();
        arrow.removeClass("fa-angle-down");
        arrow.addClass("fa-angle-right");
    } else {
        target.show();
        arrow.removeClass("fa-angle-right");
        arrow.addClass("fa-angle-down");
    }
});

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
});