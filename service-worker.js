const CACHE_NAME = 'meyhane-pwa-v1';
const URLS = [
  './index.html',
  './manifest.webmanifest',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/main.min.css',
  'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'
];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS))); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(res=>{ const copy=res.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request, copy)); return res; }).catch(()=>caches.match('./index.html')))); });
