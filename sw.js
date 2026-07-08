/* ═══════════════════════════════════════════════════════════════════════════════
   SERVICE WORKER - VERSION PREMIUM
   Stratégie de cache optimisée pour une PWA performante et hors-ligne
   ═══════════════════════════════════════════════════════════════════════════════ */

const CACHE_VERSION = 'nihongo-v3';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// ─── ASSETS STATIQUES À METTRE EN CACHE À L'INSTALLATION ─── 
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './app.js',
  './database.js',
  './sw.js'
];

// ─── INSTALLATION DU SERVICE WORKER ─── 
self.addEventListener('install', (event) => {
  console.log('[SW] Installation en cours...');
  
  event.waitUntil(
    (async () => {
      try {
        // Ouvrir le cache statique
        const staticCache = await caches.open(STATIC_CACHE);
        
        // Ajouter tous les assets statiques
        await staticCache.addAll(STATIC_ASSETS);
        
        console.log('[SW] ✅ Assets statiques mis en cache');
        
        // Forcer le service worker à devenir actif immédiatement
        self.skipWaiting();
      } catch (error) {
        console.error('[SW] ❌ Erreur lors de l\'installation :', error);
      }
    })()
  );
});

// ─── ACTIVATION DU SERVICE WORKER ─── 
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation en cours...');
  
  event.waitUntil(
    (async () => {
      try {
        // Récupérer tous les noms de caches
        const cacheNames = await caches.keys();
        
        // Supprimer les anciens caches
        const cachesToDelete = cacheNames.filter((name) => {
          return name !== STATIC_CACHE && 
                 name !== DYNAMIC_CACHE && 
                 name !== IMAGE_CACHE;
        });
        
        await Promise.all(
          cachesToDelete.map((name) => {
            console.log(`[SW] 🗑️ Suppression du cache : ${name}`);
            return caches.delete(name);
          })
        );
        
        console.log('[SW] ✅ Anciens caches supprimés');
        
        // Prendre le contrôle de tous les clients
        self.clients.claim();
      } catch (error) {
        console.error('[SW] ❌ Erreur lors de l\'activation :', error);
      }
    })()
  );
});

// ─── STRATÉGIE DE FETCH ─── 
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes vers des domaines externes (sauf les APIs)
  if (url.origin !== location.origin) {
    return;
  }
  
  // ─── STRATÉGIE POUR LES IMAGES ─── 
  if (request.destination === 'image') {
    event.respondWith(cacheImageStrategy(request));
    return;
  }
  
  // ─── STRATÉGIE POUR LES FICHIERS CSS & JS ─── 
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // ─── STRATÉGIE PAR DÉFAUT : NETWORK FIRST ─── 
  event.respondWith(networkFirstStrategy(request));
});

// ─── STRATÉGIE 1 : CACHE FIRST (Pour assets statiques) ─── 
async function cacheFirstStrategy(request) {
  try {
    // Chercher dans le cache d'abord
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log(`[SW] 📦 Cache hit : ${request.url}`);
      return cachedResponse;
    }
    
    // Si pas en cache, aller chercher sur le réseau
    console.log(`[SW] 🌐 Fetching from network : ${request.url}`);
    const networkResponse = await fetch(request);
    
    // Mettre en cache la réponse pour la prochaine fois
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error(`[SW] ❌ Erreur cache-first : ${request.url}`, error);
    
    // Retourner une page d'erreur hors-ligne si disponible
    const offlineResponse = await caches.match('./index.html');
    return offlineResponse || new Response('Hors-ligne', { status: 503 });
  }
}

// ─── STRATÉGIE 2 : NETWORK FIRST (Pour contenu dynamique) ─── 
async function networkFirstStrategy(request) {
  try {
    // Essayer le réseau d'abord
    console.log(`[SW] 🌐 Network-first : ${request.url}`);
    const networkResponse = await fetch(request);
    
    // Mettre en cache la réponse réussie
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      console.log(`[SW] 💾 Cached dynamic content : ${request.url}`);
    }
    
    return networkResponse;
  } catch (error) {
    // Si le réseau échoue, chercher dans le cache
    console.log(`[SW] 📦 Network failed, trying cache : ${request.url}`);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback : retourner la page d'accueil en cache
    console.error(`[SW] ❌ Erreur network-first : ${request.url}`, error);
    return await caches.match('./index.html') || 
           new Response('Contenu indisponible hors-ligne', { status: 503 });
  }
}

// ─── STRATÉGIE 3 : CACHE IMAGES (Avec limite de taille) ─── 
async function cacheImageStrategy(request) {
  try {
    // Chercher dans le cache d'images
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log(`[SW] 🖼️ Image cache hit : ${request.url}`);
      return cachedResponse;
    }
    
    // Aller chercher l'image sur le réseau
    console.log(`[SW] 🌐 Fetching image : ${request.url}`);
    const networkResponse = await fetch(request);
    
    // Mettre en cache l'image
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
      
      // Nettoyer le cache si trop volumineux (> 50 images)
      cleanImageCache();
    }
    
    return networkResponse;
  } catch (error) {
    console.error(`[SW] ❌ Erreur image cache : ${request.url}`, error);
    
    // Retourner une image placeholder par défaut
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<rect fill="#f0f0f0" width="100" height="100"/>' +
      '<text x="50" y="50" text-anchor="middle" dy=".3em" fill="#999">No image</text>' +
      '</svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// ─── NETTOYAGE DU CACHE D'IMAGES ─── 
async function cleanImageCache() {
  const cache = await caches.open(IMAGE_CACHE);
  const keys = await cache.keys();
  
  // Garder seulement les 50 dernières images
  if (keys.length > 50) {
    const keysToDelete = keys.slice(0, keys.length - 50);
    keysToDelete.forEach((key) => {
      cache.delete(key);
      console.log(`[SW] 🗑️ Image supprimée du cache : ${key.url}`);
    });
  }
}

// ─── GESTION DES MESSAGES DU CLIENT ─── 
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Saut de l\'attente demandé par le client');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[SW] Nettoyage du cache demandé');
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }
});

// ─── GESTION DE LA SYNCHRONISATION EN ARRIÈRE-PLAN ─── 
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-stats') {
    console.log('[SW] Synchronisation des statistiques en arrière-plan');
    // Implémenter la logique de synchronisation si nécessaire
  }
});

// ─── GESTION DES NOTIFICATIONS PUSH ─── 
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Nouvelle notification',
      icon: './data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>🌸</text></svg>',
      badge: './data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>🌸</text></svg>',
      tag: 'nihongo-notification',
      requireInteraction: false
    };
    
    event.waitUntil(
      self.registration.showNotification('日本語の道', options)
    );
  }
});

// ─── GESTION DES CLICS SUR NOTIFICATIONS ─── 
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Chercher une fenêtre déjà ouverte
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].url === '/' && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      // Ouvrir une nouvelle fenêtre si aucune n'existe
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});

console.log('[SW] ✅ Service Worker chargé avec succès');
