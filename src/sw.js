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

// cache api requests
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith('/api/images/') || url.pathname.startsWith('/api/groups/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'requests',
    networkTimeoutSeconds: 3,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
