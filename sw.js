```javascript
const CACHE_NAME = "shopping-mela-v9.1.9";

const CORE_FILES = [
    "./",
    "./index.html",
    "./manifest.json",

    "./assets/icon/192MILONMELA.svg.svg",
    "./assets/icon/MILKONMELA512.SVG.svg"
];


/* =========================================
   INSTALL
========================================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(CORE_FILES);

            })

    );

    self.skipWaiting();

});


/* =========================================
   ACTIVATE
========================================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(names => {

                return Promise.all(

                    names
                        .filter(name =>
                            name.startsWith(
                                "shopping-mela-"
                            ) &&
                            name !== CACHE_NAME
                        )
                        .map(name =>
                            caches.delete(name)
                        )

                );

            })

    );

    self.clients.claim();

});


/* =========================================
   FETCH
========================================= */

self.addEventListener("fetch", event => {

    if (
        event.request.method !== "GET"
    ) {
        return;
    }


    event.respondWith(

        caches.match(event.request)
            .then(cached => {

                if (cached) {

                    return cached;

                }


                return fetch(event.request)
                    .then(response => {

                        if (
                            !response ||
                            response.status !== 200
                        ) {

                            return response;

                        }


                        const copy =
                            response.clone();


                        caches.open(CACHE_NAME)
                            .then(cache => {

                                cache.put(
                                    event.request,
                                    copy
                                );

                            });


                        return response;

                    })
                    .catch(() => {

                        return caches.match(
                            "./index.html"
                        );

                    });

            })

    );

});
```
