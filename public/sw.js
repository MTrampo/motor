const CACHE_STATIC_NAME = 'static-v0.0.9-alpha';
const CACHE_DYNAMIC_NAME = 'dynamic-v0.0.9-alpha';

const urlsToCache = [
  "/", // Página inicial
  "/signin",
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

  self.skipWaiting();
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
  event.waitUntil(self.clients.claim());

  const cacheWhitelist = [CACHE_STATIC_NAME, CACHE_DYNAMIC_NAME];
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      return await Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_CLEAR') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
        }
        console.log('Service Worker: Todos os caches foram limpos.');
      })
    );
  }
});

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push recebido.');

  const payload = event.data.json() || { title: 'Nova Atualização Disponível', body: 'Recarregue o aplicativo para ver as novidades.' };

  const options = {
    body: payload.body,
    icon: '/web-app-manifest-192x192.png',
    vibrate: [200, 100, 200],
    badge: '/web-app-manifest-512x512.png',
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});