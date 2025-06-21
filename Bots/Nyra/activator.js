function themeButton() {
  if (!document.getElementById('tema-css')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://inferno-god1001.github.io/JoyStyles/Bots/BoaHancock/indexJL.css'; // coloque o link correto do seu tema.css
    link.id = 'tema-css';
    document.head.appendChild(link);
  } else {
    console.log("Tema já carregado.");
  }
}