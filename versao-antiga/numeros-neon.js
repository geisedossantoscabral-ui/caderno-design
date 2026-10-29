/* =========================================================
   NEON AZUL NOS NÚMEROS
   Um círculo de neon (o traço do seta.svg da Geise) passa de número em número,
   guiando o olhar: 120 → 2.970 → 0. Ele se desenha em volta do 120, apaga
   enquanto o do 2.970 se desenha, e assim por diante. No 0 (o número que mais
   orgulha) ele fica, com um brilho girando em volta.
   O JavaScript só calcula ONDE desenhar (o tamanho da tela muda).
   A animação fica no CSS.
   ========================================================= */
(function () {
  const caixa = document.querySelector('.numeros');
  if (!caixa) return;
  const blocos = [...caixa.children];          // os 3 números
  if (blocos.length < 2) return;

  /* ---- O traço original (coordenadas do arquivo seta.svg) ---- */
  // círculo: começa por dentro, sobe pela direita, passa por cima e fecha embaixo
  const CIRCULO = [
    [[3378, 4393], [4222, 4380], [4943, 3175], [4935, 2223]],
    [[4935, 2223], [4915, 1], [121, -1098], [214, 2680]],
    [[214, 2680], [257, 4404], [2474, 5684], [3900, 4887]],
  ];
  // tamanho real do círculo (medido nos pontos da curva)
  const pts = [];
  CIRCULO.forEach(([p0, p1, p2, p3]) => {
    for (let t = 0; t <= 1; t += 0.02) {
      const u = 1 - t;
      pts.push([
        u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
        u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
      ]);
    }
  });
  const C = {
    x: Math.min(...pts.map(p => p[0])), y: Math.min(...pts.map(p => p[1])),
    x2: Math.max(...pts.map(p => p[0])), y2: Math.max(...pts.map(p => p[1])),
  };

  /* ---- O desenho (um SVG por cima dos números) ---- */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'numeros-neon');
  svg.setAttribute('aria-hidden', 'true');
  caixa.appendChild(svg);

  const f = n => n.toFixed(1);

  function desenhar() {
    svg.textContent = '';
    const base = caixa.getBoundingClientRect();
    const r = blocos.map(b => {
      const q = b.getBoundingClientRect();
      return { x: q.left - base.left, y: q.top - base.top, w: q.width, h: q.height };
    });
    const folgaX = 30, folgaCima = 22, folgaBaixo = 40;   // espaço entre o texto e o círculo

    r.forEach((q, i) => {
      // o círculo esticado para caber o número + a legenda
      const B = { x: q.x - folgaX, y: q.y - folgaCima, w: q.w + folgaX * 2, h: q.h + folgaCima + folgaBaixo };
      const sx = B.w / (C.x2 - C.x), sy = B.h / (C.y2 - C.y);
      const m = p => [B.x + (p[0] - C.x) * sx, B.y + (p[1] - C.y) * sy];
      const p0 = m(CIRCULO[0][0]);
      const d = `M${f(p0[0])} ${f(p0[1])}` + CIRCULO.map(seg => {
        const [, p1, p2, p3] = seg.map(m);
        return ` C${f(p1[0])} ${f(p1[1])} ${f(p2[0])} ${f(p2[1])} ${f(p3[0])} ${f(p3[1])}`;
      }).join('');

      const ultimo = i === r.length - 1;
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'neon-circulo' + (ultimo ? ' neon-circulo--fica' : ''));
      g.style.setProperty('--ordem', i);          // 0, 1, 2: define o atraso no CSS

      const linha = document.createElementNS(NS, 'path');
      linha.setAttribute('d', d);
      linha.setAttribute('class', 'neon-linha');
      linha.setAttribute('pathLength', '1');
      g.appendChild(linha);

      // no último, um brilho fica girando (camadas da cauda fraca até a cabeça forte)
      if (ultimo) {
        for (let k = 0; k < 6; k++) {
          const comp = 160 - k * 26;                     // tamanho de cada camada (de 1000)
          const b = document.createElementNS(NS, 'path');
          b.setAttribute('d', d);
          b.setAttribute('class', 'neon-brilho');
          b.setAttribute('pathLength', '1000');
          b.style.opacity = 0.25 + k * 0.15;
          b.style.strokeDasharray = `${comp} 2000`;
          b.style.setProperty('--ini', comp);
          b.style.setProperty('--fim', comp - 1000);
          g.appendChild(b);
        }
      }
      svg.appendChild(g);
    });
  }

  desenhar();
  addEventListener('resize', desenhar);
  if (document.fonts) document.fonts.ready.then(desenhar);

  // a animação começa quando os números aparecem na tela
  const observador = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { caixa.classList.add('neon-ativo'); observador.disconnect(); }
  }, { threshold: 0.6 });
  observador.observe(caixa);
})();
