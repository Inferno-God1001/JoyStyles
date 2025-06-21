const cssURL = "https://inferno-god1001.github.io/JoyStyles/Bots/BoaHancock/indexJL.css";
  const storageKey = "boaHancockTheme";

  function loadTheme() {
    if (!document.getElementById("boa-theme")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssURL;
      link.id = "boa-theme";
      document.head.appendChild(link);
    }
  }

  function unloadTheme() {
    const existing = document.getElementById("boa-theme");
    if (existing) existing.remove();
  }

  function updateButton(state) {
    const btn = document.getElementById("themeToggleBtn");
    btn.textContent = state
      ? "Desativar Tema da Boa Hancock 💔"
      : "Ativar Tema da Boa Hancock 💖";
  }

  document.getElementById("themeToggleBtn").onclick = () => {
    const isActive = localStorage.getItem(storageKey) === "true";
    if (isActive) {
      unloadTheme();
      localStorage.setItem(storageKey, "false");
    } else {
      loadTheme();
      localStorage.setItem(storageKey, "true");
    }
    updateButton(!isActive);
  };

  // Ao carregar a página, aplica o tema se estava ativado anteriormente
  if (localStorage.getItem(storageKey) === "true") {
    loadTheme();
    updateButton(true);
  } else {
    updateButton(false);
  }