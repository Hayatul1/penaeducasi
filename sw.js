importScripts('js/cache-polyfill.js');

var CACHE_VERSION = 'app-v18';
var CACHE_FILES = [
    '/',
    'https://cdn.jsdelivr.net/gh/Hayatul1/penaeducasi/index.html',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js',
    'https://cdn.jsdelivr.net/gh/Hayatul1/penaeducasi/main%20scrypt%20penaeducasi.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
    'css/style.css',
    'https://www.penaeducasi.com/favicon.ico',
    'https://cdn.jsdelivr.net/gh/Hayatul1/penaeducasi/manifest1.json',
    'https://cdn.jsdelivr.net/gh/Hayatul1/penaeducasi/logo%20pena%20edukasi.png',
    'https://cdn.jsdelivr.net/gh/Hayatul1/penaeducasi/logo%20pena%20edukasi%20%20Tulisan%20Putih.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                return res;
            }
            requestBackend(event);
        })
    )
});

function requestBackend(event){
    var url = event.request.clone();
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });

        return res;
    })
}

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});