export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("✅ Service Worker registrado com sucesso"))
      .catch((err) => {
        console.error("❌ Falha ao registrar Service Worker:", err);
      });
    });
  }
}

