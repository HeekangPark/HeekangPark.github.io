const COMMIT_TIME = "2021-10-12 02:59";

const CACHE_STORAGE_NAME = "Reinventing The Wheel"
const STATIC_CACHE_STORAGE_NAME = `${CACHE_STORAGE_NAME} - static`
const DYNAMIC_CACHE_STORAGE_NAME = `${CACHE_STORAGE_NAME} - dynamic - ${COMMIT_TIME}`

const URL_THAT_NEED_TO_BE_CACHED_STATICALLY = [
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
]

const URL_PREFIXES_THAT_NEED_TO_BE_CACHED_DYNAMICALLY = [
    "https://heekangpark.github.io/",
    "https://cdn.jsdelivr.net/npm/mathjax@3/",
    "https://utteranc.es/",
    "https://ka-f.fontawesome.com/releases/",
    "https://kit.fontawesome.com/",
    "https://ajax.googleapis.com/ajax/libs/jquery/",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/",
    "https://unpkg.com/magic-snowflakes"
]

const URL_PREFIXS_THAT_NEED_TO_BE_ALWAYS_REFRESHED = [
]

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE_STORAGE_NAME).then(cache => {
            cache.addAll(URL_THAT_NEED_TO_BE_CACHED_STATICALLY);
        })
    )
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(storages => {
            return Promise.all(storages.map(storage => {
                if(storage !== STATIC_CACHE_STORAGE_NAME && storage !== DYNAMIC_CACHE_STORAGE_NAME) {
                    console.log("Removing old cache storage", storage);
                    return caches.delete(storage);
                }
            }))
        })
    )

    return self.clients.claim();
})

self.addEventListener('fetch', event => {
    function check_if_URL_needed_to_be_cached_dynamically(url) {
        for(let url_prefix of URL_PREFIXES_THAT_NEED_TO_BE_CACHED_DYNAMICALLY) {
            if(url.startsWith(url_prefix)) return true;
        }
        return false;
    }

    function check_if_url_needed_to_be_always_refreshed(url) {
        for(let url_prefix of URL_PREFIXS_THAT_NEED_TO_BE_ALWAYS_REFRESHED) {
            if(url.startsWith(url_prefix)) return true;
        }
        return false;
    }

    event.respondWith(
        caches.match(event.request).then(res => {
            if (res) {
                if(check_if_url_needed_to_be_always_refreshed(event.request.url)) {
                    return fetch(event.request).then(r => {
                        return caches.open(DYNAMIC_CACHE_STORAGE_NAME).then(cache => {
                            cache.put(event.request.url, r.clone());
                            console.log("fetched", event.request.url);
                            return r;
                        })
                    }).catch(() => {
                        //console.log("from cache", event.request.url);
                        return res;
                    });
                } else {
                    //console.log("from cache", event.request.url);
                    return res;
                }
            } else {
                return fetch(event.request).then(r => {
                    if(check_if_URL_needed_to_be_cached_dynamically(event.request.url)) {
                        return caches.open(DYNAMIC_CACHE_STORAGE_NAME).then(cache => {
                            cache.put(event.request.url, r.clone());
                            console.log("fetched", event.request.url);
                            return r;
                        })
                    } else {
                        console.log("fetched", event.request.url);
                        return r;
                    }
                });
            } 
        })
    );
});