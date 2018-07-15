var staticCacheName = 'resto-reviewV1';

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache){
			return cache.addAll([
			'/',
			'css/styles.css',
			'index.html',
			'restaurant.html',
			'js/main.js',
			'js/dbhelper.js',
			'js/restaurant_info.js',
			'img/1.webp',
			'img/2.webp',
			'img/3.webp',
			'img/4.webp',
			'img/5.webp',
			'img/6.webp',
			'img/7.webp',
			'img/8.webp',
			'img/9.webp',
			'img/10.webp',
			'data/restaurants.json',
	        '/restaurant.html?id=1',
	        '/restaurant.html?id=2',
	        '/restaurant.html?id=3',
	        '/restaurant.html?id=4',
	        '/restaurant.html?id=5',
	        '/restaurant.html?id=6',
	        '/restaurant.html?id=7',
	        '/restaurant.html?id=8',
	        '/restaurant.html?id=9',
	        '/restaurant.html?id=10'
	        ]);
		})
	);
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('wittr-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});