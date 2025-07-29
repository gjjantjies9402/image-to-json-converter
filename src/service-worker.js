/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';

// Use with Workbox injection
precacheAndRoute(self.__WB_MANIFEST || []);

const CACHE_NAME = 'image-to-json-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});