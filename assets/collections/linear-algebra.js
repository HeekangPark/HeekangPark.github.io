$(document).ready(function() {
    $(".document-content .proof-folder").each(function(idx, elem) {
        buildProofFolder($(this));
    });

    activateFolderBtns();
});

function buildProofFolder(content) {
    buildFolder(content, folder_open_msg="증명 열기", folder_close_msg="증명 닫기");
    content.prepend(`<p class="proof-mark">Proof</p>`);
}

function buildFolder(content, folder_open_msg, folder_close_msg) {
    content.addClass("folder-content");

    content.wrap(`<div class="folder-content-wrapper"></div>`);
    let content_wrapper = content.parent();

    //content_wrapper.addClass("hidden");

    content_wrapper.wrap(`<div class="folder-wrapper"></div>`);
    let total_wrapper = content_wrapper.parent();

    total_wrapper.prepend(`<p class="folder-btn folder-close-btn folder-close-top-btn hidden">↓ ${folder_close_msg} ↓</p>`);
    total_wrapper.prepend(`<p class="folder-btn folder-open-btn">${folder_open_msg}</p>`);

    total_wrapper.append(`<p class="folder-btn folder-close-btn folder-close-bottom-btn hidden">↑ ${folder_close_msg} ↑</p>`);
    //total_wrapper.append(`<input class="offset" type="hidden" value="-1">`)
}

function activateFolderBtns() {
    $(".document-content .folder-wrapper .folder-btn.folder-open-btn").click(function() {
        let parent = $(this).parent();
        
        let content_wrapper = parent.find(".folder-content-wrapper");
        let open_btn = parent.find(".folder-btn.folder-open-btn");
        let close_btn = parent.find(".folder-btn.folder-close-btn");
        let input = parent.find(".offset");
        
        //input.attr("value", $(window).scrollTop());

        content_wrapper.css("max-height", `${content_wrapper[0].scrollHeight}px`);
        //content_wrapper.removeClass("hidden");
        open_btn.addClass("hidden");
        close_btn.removeClass("hidden");
    });

    $(".document-content .folder-wrapper .folder-btn.folder-close-btn").click(function() {
        let parent = $(this).parent();

        let content_wrapper = parent.find(".folder-content-wrapper");
        let open_btn = parent.find(".folder-btn.folder-open-btn");
        let close_btn = parent.find(".folder-btn.folder-close-btn");

        content_wrapper.css("max-height", 0);
        //content_wrapper.addClass("hidden");
        open_btn.removeClass("hidden");
        close_btn.addClass("hidden");

        //let offset = parent.find(".offset").attr("value");
        //if(offset == -1) offset = parent.offset().top - 100;
        //$(document).scrollTop(offset);
    });
}



