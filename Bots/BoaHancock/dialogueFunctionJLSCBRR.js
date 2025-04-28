fetch('https://inferno-god1001.github.io/JoyStyles/Bots/BoaHancock/dialogue.txt')
  .then(response => response.text())
  .then(data => {
    
    const lines = data.split('\n');
    let currentLine = 0;

    // Função para mostrar a próxima linha
    function showNextLine() {
      if (currentLine < lines.length) {
        console.log(lines[currentLine]);   

        currentLine++;
      }
    }

    showNextLine();
  })
  .catch(error => console.error('Error???:', error));