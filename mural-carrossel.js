/* =========================================================
   CARROSSEL DE DESENHOS
   Os desenhos andam devagar para o lado, sem parar (para ao passar o mouse).
   Para a fila nunca acabar, o JavaScript copia os cards:
   - repete os desenhos até encher a largura da tela
   - depois duplica tudo e anima até o começo da cópia,
     que é igual ao começo do original: assim a volta não "pula".
   ========================================================= */
(function () {
  const carrossel = document.querySelector('.carrossel');
  if (!carrossel) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const fila = carrossel.querySelector('.mural');
  const originais = [...fila.children];
  const VELOCIDADE = 35;   // pixels por segundo (menor = mais devagar)

  function copiar(li) {
    const c = li.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');          // leitor de tela lê só os originais
    c.querySelectorAll('img').forEach(img => { img.alt = ''; img.loading = 'eager'; });
    return c;
  }

  function montar() {
    carrossel.classList.remove('carrossel--andando');
    fila.replaceChildren(...originais);
    // 1) repete até a fila ser maior que a tela
    while (fila.scrollWidth < carrossel.clientWidth + 300) {
      originais.forEach(li => fila.appendChild(copiar(li)));
    }
    // 2) duplica a fila inteira
    const metade = [...fila.children];
    metade.forEach(li => fila.appendChild(copiar(li)));
    // 3) uma volta = a distância até o primeiro card da cópia
    const deslocamento = fila.children[metade.length].offsetLeft - fila.children[0].offsetLeft;
    fila.style.setProperty('--deslocamento', deslocamento + 'px');
    fila.style.setProperty('--duracao', (deslocamento / VELOCIDADE) + 's');
    carrossel.classList.add('carrossel--andando');
  }

  montar();
  let espera;
  addEventListener('resize', () => { clearTimeout(espera); espera = setTimeout(montar, 200); });
})();
