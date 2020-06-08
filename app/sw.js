/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "fc8562fd55196320937d6092e7d9ba39"
  },
  {
    "url": "main.js",
    "revision": "3c275dd821735e3cf99f8118f6f2e988"
  },
  {
    "url": "Classes/Camera.js",
    "revision": "473de2d0709c0e68b99e6c7d829d7bdd"
  },
  {
    "url": "Classes/Message.js",
    "revision": "1b1b09235037cfc72d6f30fc003fb2e7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(css|js)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https:\/\/use\.fontawesome\.com.*/, workbox.strategies.staleWhileRevalidate({ cacheName: "fontawesome", plugins: [] }), 'GET');
