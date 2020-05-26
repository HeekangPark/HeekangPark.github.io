$(document).ready(function() {
    foldAllFolders();

    addTitleToFootnotes();
});

function foldAllFolders() {
    $("div.document-content div.folder p.folder-show-btn").show();
    $("div.document-content div.folder p.folder-hide-btn").hide();
    $("div.document-content div.folder div.folder-target").hide();
}

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

$("div.document-content div.folder p.folder-show-btn").click(function() {
    var target = $(this).closest("div.folder").children("div.folder-target");
    var show_btn = $(this);
    var hide_btn = $(this).closest("div.folder").children("p.folder-hide-btn");

    target.show();
    show_btn.hide();
    hide_btn.show();
});

$("div.document-content div.folder p.folder-hide-btn").click(function() {
    var target = $(this).closest("div.folder").children("div.folder-target");
    var show_btn = $(this).closest("div.folder").children("p.folder-show-btn");
    var hide_btn = $(this);

    target.hide();
    show_btn.show();
    hide_btn.hide();
});

function addTitleToFootnotes() {
    $("div.document-content div.footnotes ol li p").each(function(idx, elem) {
        var msg = $.trim($(this).clone().children("a.reversefootnote").remove().end().text());
        var id = $(this).children("a.reversefootnote").attr("href").replace(":", "\\:");

        var target = $(id + " a");
        target.attr("title", msg);
    });
}