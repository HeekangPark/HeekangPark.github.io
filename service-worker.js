const VERSION = "0.0.3";

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open("ReinventingTheWheel").then(cache => {
            cache.addAll([
                '/assets/fonts/sans-serif/Noto%20Sans%20KR/NotoSansKR-Light.woff2',
                '/assets/fonts/sans-serif/Noto%20Sans%20KR/NotoSansKR-Medium.woff2',
                '/assets/fonts/monospace/Ubuntu%20Mono/UbuntuMono-Regular.woff2',
                '/assets/fonts/monospace/Nanum%20Gothic%20Coding/NanumGothicCoding-Regular.woff2',
                '/assets/logos/1.png',
                '/assets/logos/2.png',
                '/assets/logos/3.png',
                '/assets/logos/4.png',
                '/assets/logos/5.png',
                '/assets/logos/6.png',
                '/assets/etc/decoration/leaf1.png',
                '/assets/etc/decoration/leaf2.png',
                '/assets/etc/decoration/raindrop.png',
                '/assets/etc/decoration/sakura.png',
                '/assets/etc/decoration/sun.png',
                '/assets/etc/decoration/watermelon.png',
                '/assets/icons/1.ico',
                '/assets/icons/2.ico',
                '/assets/icons/3.ico',
                '/assets/icons/4.ico',
                '/assets/icons/5.ico',
                '/assets/icons/6.ico',
                '/assets/css/layout.default.css',
                '/assets/css/layout.document.css',
                '/assets/css/sysdoc.about.css',
                '/assets/css/sysdoc.categories.css',
                '/assets/css/sysdoc.default.css',
                '/assets/css/sysdoc.draft.css',
                '/assets/css/sysdoc.guestbook.css',
                '/assets/css/sysdoc.home.css',
                '/assets/css/sysdoc.search.css',
                '/assets/css/sysdoc.tags.css',
                'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js',
                'https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js',
                'https://unpkg.com/magic-snowflakes@4.2.0/dist/snowflakes.min.js',
            ]);
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            if (res) {
                console.log("from cache", event.request.url);
                return res;
            } else {
                console.log("fetching", event.request.url);
                return fetch(event.request);
            } 
        })
    );
});