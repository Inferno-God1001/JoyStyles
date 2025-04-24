const palavrasParaDestacar = ['**Boa-Hancock:**', '**boa-hancock:**', '**boahancock:**', '**BoaHancock:**']; // palavras que vão ficar braba
    const classeDaDiv = 'minha-div'; // a classe da div onde vai rolar a mágica

    const divs = document.querySelectorAll(`.${classeDaDiv}`);

    divs.forEach(div => {
      let textoOriginal = div.innerHTML;

      palavrasParaDestacar.forEach(palavra => {
        const regex = new RegExp(`\\b(${palavra})\\b`, 'gi');
        textoOriginal = textoOriginal.replace(regex, `<span class="destaque">$1</span>`);
      });

      div.innerHTML = textoOriginal;
    });