---
---

$(document).ready(function() {
    loadPageview();

    activateHorizontalScrollspy();

    activatePageNavigator();
});

function loadPageview() {
    if($(".pageview").length > 0) {
        $.ajax({
            url: "{{ site.data.info.google-anlytics-superProxy-public-endpoint }}",
            dataType: "jsonp",
            timeout: 1000 * 10,
            success: function(data) {
                let rows = data.rows;
        
                $(".pageview").each(function(idx, elem) {
                    let id = $(this).attr("id");
        
                    for(let row of rows) {
                        if(id == row[0]) {
                            $(this).text(row[1]);
                            return;
                        }
                    }
        
                    $(this).text(0);
                })
            },
            error: function(){
                console.log("Failed to load Pageviews");
            }
        });
    }
}

function activateHorizontalScrollspy() {
    let horizontal_scrollspy = $(".horizontal-scrollspy");

    $(window).scroll(function() {
        let cur_scroll = $(window).scrollTop();
        let total_scroll = $(document).height() - $(window).height();
        horizontal_scrollspy.css("width", `${(cur_scroll / total_scroll) * 100}%`);
    });
}

function activatePageNavigator() {
    $(".page-navigator .top-btn").click(function() {
        $(document).scrollTop(0);
    });

    $(".page-navigator .bottom-btn").click(function() {
        $(document).scrollTop($(document).height());
    });
}