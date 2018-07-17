const staticCacheName = 'resto-review-cache';

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


self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('resto-') &&
            cacheName != staticCacheName;
        }).map(function(cacheName){
          return cache.delete(cacheName);
        })        
        );
    })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response){
      if(response.status === 404){
        return fetch('img/404.jpg');
      }
      return response;
    }).catch(function(){
      return fetch('img/offline.jpg');
    })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request);
    })
  );
});

