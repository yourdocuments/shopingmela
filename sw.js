const CACHE_NAME = "shopping-mela-v9-1-10";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json"
];


// INSTALL
self.addEventListener("install", function (event) {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(FILES_TO_CACHE);
      })
  );

  self.skipWaiting();

});


// ACTIVATE
self.addEventListener("activate", function (event) {

  event.waitUntil(

    caches.keys().then(function (cacheNames) {

      return Promise.all(

        cacheNames.map(function (cacheName) {

          if (
            cacheName !== CACHE_NAME &&
            cacheName.startsWith("shopping-mela-")
          ) {
            return caches.delete(cacheName);
          }

          return Promise.resolve();
        })

      );

    })

  );

  self.clients.claim();

});


// FETCH
self.addEventListener("fetch", function (event) {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    fetch(event.request)
      .then(function (response) {

        if (
          response &&
          response.status === 200
        ) {

          const responseClone =
            response.clone();

          caches.open(CACHE_NAME)
            .then(function (cache) {

              cache.put(
                event.request,
                responseClone
              );

            });

        }

        return response;

      })
      .catch(function () {

        return caches.match(event.request);

      })

  );

});
