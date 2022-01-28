$(document).ready(function () {
    $(".collapsable-content").addClass("hide");
    $(":header.collapsable").addClass("collapsed");

    $(":header.collapsable").click(function () {
        let heading = $(this);
        let content = heading.next(".collapsable-content");
        if (content.hasClass("hide")) {
            heading.removeClass("collapsed");
            content.removeClass("hide");
        } else {
            heading.addClass("collapsed");
            content.addClass("hide");
        }
    })
});

