const cacheName = 'todo-js';


const urls = [
  'index.html',
  'script.js',
  'style.css'
]

// self.addEventListener('install', (event) => {
//   event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(urls)))
// })

self.addEventListener('install', async (event) => {
  const cache = await caches.open(cacheName)
  await cache.addAll(urls)
})

self.addEventListener('activate', async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.filter(name => name != cacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request));
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}