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
    content.addClass("hidden");
    content.addClass("folder-content");

    content.wrap(`<div class="folder-wrapper"></div>`);
    let wrapper = content.parent();

    wrapper.prepend(`<p class="folder-btn folder-close-btn hidden">↓ ${folder_close_msg} ↓</p>`);
    wrapper.prepend(`<p class="folder-btn folder-open-btn">${folder_open_msg}</p>`);

    wrapper.append(`<p class="folder-btn folder-close-btn hidden">↑ ${folder_close_msg} ↑</p>`);
    wrapper.append(`<input class="offset" type="hidden" value="-1">`)
}

function activateFolderBtns() {
    $(".document-content .folder-wrapper .folder-btn.folder-open-btn").click(function() {
        let parent = $(this).parent();
        
        let target = parent.find(".folder-content");
        let open_btn = parent.find(".folder-btn.folder-open-btn");
        let close_btn = parent.find(".folder-btn.folder-close-btn");
        let input = parent.find(".offset");
        
        input.attr("value", $(window).scrollTop());

        target.removeClass("hidden");
        open_btn.addClass("hidden");
        close_btn.removeClass("hidden");
    });

    $(".document-content .folder-wrapper .folder-btn.folder-close-btn").click(function() {
        let parent = $(this).parent();

        let target = parent.find(".folder-content");
        let open_btn = parent.find(".folder-btn.folder-open-btn");
        let close_btn = parent.find(".folder-btn.folder-close-btn");

        target.addClass("hidden");
        open_btn.removeClass("hidden");
        close_btn.addClass("hidden");

        let offset = parent.find(".offset").attr("value");
        if(offset == -1) offset = parent.offset().top - 100;
        $(document).scrollTop(offset);
    });
}



