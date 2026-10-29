/* =========================================================
   O MARCA-TEXTO QUE CAMINHA (com roteiro de paradas)
   Ao rolar a página, o marca-texto azul visita, em ordem:
   1 não pela tela. → 2 psiu: este site eu mesma codei →
   3 Fotos sem feed → 4 Tá na Lista → 5 Fora das telas, eu desenho. →
   6 Do administrativo para o criativo.

   Como funciona, em 3 ideias:
   1. Achamos as PARADAS no HTML (tudo que tem data-parada="número").
   2. Para cada parada, calculamos em que ponto da rolagem ela fica em destaque.
   3. Entre uma parada e outra, o marca-texto "cai" com gravidade até o próximo
      título e quica de leve ao tocar nele, como algo que tem peso.
   ========================================================= */

(function () {
  const paradas = [...document.querySelectorAll('[data-parada]')]
    .sort((a, b) => a.dataset.parada - b.dataset.parada);
  if (paradas.length < 2) return;

  // Quem pediu "menos movimento" no sistema vê o marca-texto parado na primeira frase.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Cria o marca-texto que vai caminhar
  const marcador = document.createElement('div');
  marcador.className = 'marcador marcador--entrada';
  marcador.setAttribute('aria-hidden', 'true');
  document.body.appendChild(marcador);
  document.documentElement.classList.add('js-marcador');

  // Posição de um elemento na PÁGINA (e não só na tela)
  function caixa(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height };
  }

  const misturar = (a, b, t) => a + (b - a) * t;

  // QUEDA COM QUIQUE (o "easing bounce"): acelera caindo, bate e quica 2 vezes
  function queda(t) {
    const n = 7.5625, d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  }
  // Para os lados e para o tamanho, um movimento suave (sem quique)
  const suave = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let caixas = [];   // onde cada parada está na página
  let marcos = [];   // em que ponto da rolagem cada parada fica em destaque

  function medir() {
    caixas = paradas.map(caixa);
    // Cada parada fica em destaque quando chega a 35% da altura da tela.
    // A primeira já começa destacada (ou assim que aparece, no celular).
    marcos = caixas.map((c, i) =>
      i === 0 ? Math.max(0, c.y - innerHeight * 0.5) : Math.max(0, c.y - innerHeight * 0.35)
    );
    // Garante que os marcos sempre aumentem
    for (let i = 1; i < marcos.length; i++) marcos[i] = Math.max(marcos[i], marcos[i - 1] + 1);
  }

  function desenhar() {
    const y0 = scrollY;

    // Descobre entre quais paradas estamos
    let i = 0;
    while (i < marcos.length - 2 && y0 > marcos[i + 1]) i++;
    const A = caixas[i], B = caixas[i + 1];
    const progresso = Math.min(Math.max((y0 - marcos[i]) / (marcos[i + 1] - marcos[i]), 0), 1);

    const tQueda = queda(progresso);   // vertical: cai e quica
    const tLado = suave(progresso);    // horizontal e tamanho: suave

    // Enquanto cai, ele fica um pouco mais estreito e mais alto ("esticado" pela velocidade)
    const velocidade = Math.sin(Math.PI * Math.min(progresso / 0.36, 1));
    const largura = misturar(A.w, B.w, tLado) * (1 - 0.25 * velocidade);
    const altura = misturar(A.h, B.h, tLado) * (1 + 0.15 * velocidade);

    const x = misturar(A.x, B.x, tLado);
    const y = misturar(A.y, B.y, tQueda);

    marcador.style.width = largura + 'px';
    marcador.style.height = altura + 'px';
    marcador.style.transform = `translate(${x}px, ${y}px)`;
  }

  // Só redesenha uma vez por quadro da tela, para ficar leve
  let pedido = false;
  function aoRolar() {
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(() => { desenhar(); pedido = false; });
  }

  function iniciar() { medir(); desenhar(); }

  addEventListener('scroll', aoRolar, { passive: true });
  addEventListener('resize', iniciar);
  // As fontes e imagens mudam o tamanho das coisas quando terminam de carregar
  addEventListener('load', iniciar);
  if (document.fonts) document.fonts.ready.then(iniciar);
  // Se alguma imagem carregar depois e empurrar os títulos, medimos de novo
  if ('ResizeObserver' in window) new ResizeObserver(iniciar).observe(document.body);
  iniciar();
})();
