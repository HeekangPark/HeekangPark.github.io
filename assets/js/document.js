$(document).ready(function() {
    foldAllFolders();

    addTitleToFootnotes();
    
    //image blackout popup
    $(".caption-img").magnificPopup({
        delegate: "a",
        type: "image"
    });

    //scrollspy horizontal
    var header = $("header");
    var nav_menu = $("#NavMenu");
    var scrollspy_horizontal_container = $("div.scrollspy-horizontal-container");
    var scrollspy_horizontal = $("div.scrollspy-horizontal-container div.scrollspy-horizontal");
    $(window).scroll(function() {
        //container
        var header_height = header.outerHeight(true) + nav_menu.outerHeight(true);
        var cur_scroll = $(window).scrollTop();
        
        if (cur_scroll > header_height) {
            scrollspy_horizontal_container.css("display", "block");
        } else {
            scrollspy_horizontal_container.css("display", "none"); //invisible if current scroll position is smaller than header height
        }

        //scrollspy horizontal
        var total_scrollable_height = $(document).height() - $(window).height();
        scrollspy_horizontal.css("width", (cur_scroll / total_scrollable_height) * 100 + "%");
    });

    //toc scrollspy
    var header_pos = [];
    for(var i = 1; i <= 6; i++) {
        $("div.document-content h" + i).each(function(idx, elem) {
            console.log(idx, elem);
        });
    }
    var content = $("div.toc-content-wrapper.scrollspy div.document-content");
    var toc = $("div.toc-content-wrapper.scrollspy div.toc");
    $(window).scroll(function() {
        var toc_init_offset = content.offset().top;
        var toc_max_offset = content.height() - toc.outerHeight(true);
        
        toc.css("top", Math.min(Math.max($(window).scrollTop() - toc_init_offset, 0), toc_max_offset) + "px")
    });
});

function foldAllFolders() {
    $("div.document-content div.folder p.folder-show-btn").show();
    $("div.document-content div.folder p.folder-hide-btn").hide();
    $("div.document-content div.folder div.folder-target").hide();
}

$("div.default-content > div.document-series-nav-vertical > table > thead > tr > th").click(function () {
    var target = $(this).children("p.opener");

    if (target.hasClass("closed")) {
        target.removeClass("closed");
        target.removeClass("fa-angle-down");
        target.addClass("opened");
        target.addClass("fa-angle-up");
    } else if (target.hasClass("opened")) {
        target.removeClass("opened");
        target.removeClass("fa-angle-up");
        target.addClass("closed");
        target.addClass("fa-angle-down");

    }

    target = target.closest("table").children("tbody");

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

$("div.page-navigator span.page-navigator-btn#top_btn").click(function() {
    window.scrollTo({top: 0, behavior: "auto"});
});

$("div.page-navigator span.page-navigator-btn#bottom_btn").click(function() {
    window.scrollTo({top: document.body.scrollHeight, behavior: "auto"});
});