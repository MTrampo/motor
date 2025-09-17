const CACHE_STATIC_NAME = 'static-v0.0.5';
const CACHE_DYNAMIC_NAME = 'dynamic-v0.0.5';

const urlsToCache = [
  "/", // Página inicial
  "/manifest.webmanifest",
  "/imgs/web-app-manifest-192x192.png",
  "/imgs/web-app-manifest-512x512.png"
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalação iniciada');
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(async (cache) => {
      console.log('Service Worker: Cache aberto');
      try {
        return await cache.addAll(urlsToCache);
      } catch (err) {
        console.log('Service Worker: Falha ao cachear arquivos', err);
      }
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url

  if (url.includes('/api/')) {
    event.respondWith(
      // Estratégia "Network First" para conteúdo dinâmico
      fetch(event.request).then(async (res) => {
        const cache = await caches.open(CACHE_DYNAMIC_NAME);
        cache.put(event.request.url, res.clone());
        return res;
      }).catch((err) => {
        // Se a internet falhar, busca no cache dinâmico
        console.log('Service Worker: Falha na rede, buscando no cache', err);
        return caches.match(event.request);
      })
    );
  } else {
    // Estratégia "Cache First" para conteúdo estático
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((res) => {
          return caches.open(CACHE_STATIC_NAME).then((cache) => {
            cache.put(event.request, res.clone());
            return res;
          });
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Ativação iniciada');
  const cacheWhitelist = [CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});