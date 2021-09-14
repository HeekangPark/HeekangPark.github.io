const VERSION = "commit from laptop, 2021-09-15 01:44";

const STATIC_CACHE_NAME = "ReinventingTheWheel"
const DYNAMIC_CACHE_NAME = `${STATIC_CACHE_NAME}-${VERSION}`

const DYNAMIC_CACHE_URLS = [
    "https://heekangpark.github.io/",
    "https://cdn.jsdelivr.net/npm/mathjax@3/",
    "https://utteranc.es/",
    "https://ka-f.fontawesome.com/releases/",
    "https://ajax.googleapis.com/ajax/libs/jquery/",
    'https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/',
    'https://unpkg.com/magic-snowflakes',
]

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(cache => {
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
                '/assets/css/sysdoc.draft.css',
                '/assets/css/sysdoc.guestbook.css',
                '/assets/css/sysdoc.home.css',
                '/assets/css/sysdoc.search.css',
                '/assets/css/sysdoc.tags.css',
                '/assets/css/sysdoc.rcds.css',
                '/assets/css/sysdoc.rmds.css',
            ]);
        })
    )
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if(key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
                    console.log("Removing old cache", key);
                    return caches.delete(key);
                }
            }))
        })
    )

    return self.clients.claim();
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(res => {
            if (res) {
                console.log("from cache", event.request.url);
                return res;
            } else {
                console.log("fetching", event.request.url);
                return fetch(event.request).then(r => {
                    function checkURL(url) {
                        for(let ok_url of DYNAMIC_CACHE_URLS) {
                            if(url.startsWith(ok_url)) return true;
                            else return false;
                        }
                    }

                    if(checkURL(event.request.url)) {
                        return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
                            cache.put(event.request.url, r.clone());
                            return r;
                        })
                    } else {
                        return r;
                    }
                });
            } 
        })
    );
});