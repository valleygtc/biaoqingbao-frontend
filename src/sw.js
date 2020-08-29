// cache local assets
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// cache image
workbox.routing.registerRoute(
  new RegExp('/api/images/\\d+'),
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// TODO: cache getImageList, getGroups, NetworkFirst
