function activate_nav_btn() {
    var target;

    target = $("body > header > .container > .nav-btn.deactivated");

    target.removeClass("deactivated");
    target.addClass("activated");

    target.removeAttr("onclick");
    target.attr("onclick", "deactivate_nav_btn()");

    target = $("#NavMenu.deactivated");

    target.removeClass("deactivated");
    target.addClass("activated");
}

function deactivate_nav_btn() {
    var target;
    
    target = $("header > .container > .nav-btn.activated");

    target.removeClass("activated");
    target.addClass("deactivated");

    target.removeAttr("onclick");
    target.attr("onclick", "activate_nav_btn()");

    target = $("#NavMenu.activated");

    target.removeClass("activated");
    target.addClass("deactivated");
}