self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open('v1').then(function(cache){
			return cache.addAll([
			'/',
			'css/styles.css',
			'index.html',
			'restaurant.html',
			'js/main.js',
			'js/dbhelper.js',
			'js/restaurant_info.js',
			'data/restaurants.json'
			]);
		})
	);
});


self.addEventListener('fetch', function(event){
	event.respondWith(
		fetch(event.request).then(function(response){
			if(response.status === 404){
				console.log('TODO - 404');
				return fetch('favicon.ico');
			} 
			return response;
		}).catch(function(){
			return new Response('Fail');
		})
	);
});


