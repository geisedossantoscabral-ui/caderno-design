/* =========================================================
   VENTO NO MURAL DE DESENHOS
   Ao rolar a página, os cards balançam de leve PARA FRENTE E PARA TRÁS
   (giram presos pela fita, em cima), como papéis embalados pelo vento.
   - a rolagem dá um "empurrão" (quanto mais rápido, mais balança)
   - uma mola puxa cada card de volta para o lugar
   - uma brisa bem fraquinha mantém tudo vivo mesmo parado
   ========================================================= */
(function () {
  const cards = [...document.querySelectorAll('.mural li')];
  if (!cards.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // cada card é um pouco diferente: peso, tempo da brisa e direção
  const estado = cards.map((card, i) => ({
    card,
    angulo: 0,                       // balanço atual (graus)
    vel: 0,                          // velocidade do balanço
    peso: 0.8 + (i % 3) * 0.2,       // cards "mais leves" balançam mais
    fase: i * 1.7,                   // a brisa não chega em todos ao mesmo tempo
    lado: 1,                         // o vento empurra todos para o mesmo lado
  }));

  let ultimoY = scrollY;
  let visivel = false;
  let rodando = false;

  addEventListener('scroll', () => {
    const delta = scrollY - ultimoY;
    ultimoY = scrollY;
    if (!visivel) return;
    const empurrao = Math.max(-40, Math.min(40, delta)) * 0.006;   // empurrão bem pequeno: quase imperceptível
    estado.forEach(e => { e.vel += empurrao * e.peso * e.lado; });
    iniciar();
  }, { passive: true });

  function quadro(t) {
    let mexendo = false;
    estado.forEach(e => {
      const brisa = Math.sin(t / 3200 + e.fase) * 0.6 * e.peso;    // ±0,6 grau, bem devagar
      const mola = -(e.angulo - brisa) * 0.006;                     // mola fraca: vai e volta devagar
      e.vel = (e.vel + mola) * 0.92;                                // amortece
      e.angulo += e.vel;
      e.angulo = Math.max(-3, Math.min(3, e.angulo));
      e.card.style.setProperty('--vento', e.angulo.toFixed(3) + 'deg');
      if (Math.abs(e.vel) > 0.001) mexendo = true;
    });
    if (visivel || mexendo) requestAnimationFrame(quadro);
    else rodando = false;
  }
  function iniciar() {
    if (rodando) return;
    rodando = true;
    requestAnimationFrame(quadro);
  }

  // só anima enquanto o mural está na tela (economiza bateria)
  new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting;
    if (visivel) iniciar();
  }).observe(document.querySelector('.mural'));
})();
