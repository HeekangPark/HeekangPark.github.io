$("div.default-content > div.document-series-nav-vertical > table > thead > tr > th > p.series-title").click(function () {
    var target = $(this).closest("table").children("tbody");

    if (target.hasClass("deactivated")) {
        target.removeClass("deactivated");
        target.addClass("activated");
    } else if (target.hasClass("activated")) {
        target.removeClass("activated");
        target.addClass("deactivated");
    }
});