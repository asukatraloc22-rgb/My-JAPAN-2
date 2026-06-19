const CACHE_NAME = 'nihongo-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Étape 1 : Installation (Mise en cache des fichiers)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Fichiers mis en cache avec succès');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Étape 2 : Activation (Nettoyage des anciens caches si on met à jour l'app)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Ancien cache supprimé');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Étape 3 : Interception des requêtes (Mode Hors Ligne)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // On retourne la version en cache si elle existe, sinon on va sur le réseau
        return response || fetch(event.request);
      })
  );
});
