"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    // Register service worker in production/browser
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Check for updates on page load
        registration.update();

        // Listen for new service worker installation for instant cache invalidation
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New update available & old cache invalidated in background!
                console.log("[SW] Cache invalidated and new content updated.");
              }
            }
          };
        };
      })
      .catch((error) => {
        console.warn("[SW] Service Worker registration failed:", error);
      });
  }, []);

  return null;
}
