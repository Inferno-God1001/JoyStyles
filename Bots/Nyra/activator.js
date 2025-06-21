function themeButton() {
      // Verifica se o CSS já foi carregado para evitar duplicação
      if (!document.getElementById('tema-css')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://inferno-god1001.github.io/JoyStyles/Bots/BoaHancock/indexJL.css'; // Substitua com o caminho do seu CSS
        link.id = 'tema-css';
        document.head.appendChild(link);
      } else {
        alert("O tema já foi carregado.");
      }
    }