export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        console.log("✅ Service Worker registrado com sucesso", registration);

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'activated') {
                // Notifique o usuário sobre a atualização
                console.log('Uma nova versão está disponível. Recarregue a página.');
                // Você pode exibir um toast ou banner aqui
                // Exemplo: showUpdatePrompt();
              }
            });
          }
        });
      })
      .catch((err) => {
        console.error("❌ Falha ao registrar Service Worker:", err);
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }
}

